const express = require('express'),
    bodyparser = require('body-parser'),
    request = require('request'),
    fs = require('fs').promises,
    path = require('path'),
    pathdb = path.resolve(__dirname, 'database'),
    pathupload = path.resolve(__dirname, 'static'),
    md5 = require('blueimp-md5'),
    multiparty = require("multiparty");
const { server = 7000 } = require('./package.json').config || {};
const { Token, filter, responsePublic, queryUserInfo, delay } = require('./utils');

/*-创建&启动服务-*/
const app = express();
app.listen(server, () => {
    console.log(`THE WEB SERVICE SUCCESSFULLY AND LISTENING TO THE PORT：${server}！`);
});

/*-无需登录的接口-*/
const baseURL = 'https://news-at.zhihu.com/api/4';
// 获取最新新闻
app.get('/news_latest', (req, res) => {
    req.pipe(request(`${baseURL}/news/latest`)).pipe(res);
});
// 获取以往新闻
app.get('/news_before', (req, res) => {
    let { time } = req.query;
    if (!time) {
        time = new Date().toLocaleString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' });
        time = time.match(/\d+/g).map(item => {
            item += '';
            return item.length < 2 ? '0' + item : item;
        });
        let [year, month, day] = time;
        time = `${year}${month}${day}`;
    }
    req.pipe(request(`${baseURL}/news/before/${time}`)).pipe(res);
});
// 获取新闻详情
app.get('/news_info', (req, res) => {
    let { id } = req.query;
    if (!id) {
        responsePublic(res, false);
        return;
    }
    req.pipe(request(`${baseURL}/news/${id}`)).pipe(res);
});
// 获取新闻评论信息
app.get('/story_extra', (req, res) => {
    let { id } = req.query;
    if (!id) {
        responsePublic(res, false);
        return;
    }
    req.pipe(request(`${baseURL}/story-extra/${id}`)).pipe(res);
});

/*-需要登录的接口-*/
app.use(bodyparser.urlencoded({ extended: false }));
app.use(async (req, _, next) => {
    // 获取后续需要的数据,并且挂载到REQUEST上
    req.$USERDATA = filter(await fs.readFile(`${pathdb}/user.json`, 'utf-8'));
    req.$CODEDATA = filter(await fs.readFile(`${pathdb}/code.json`, 'utf-8'));
    req.$STOREDATA = filter(await fs.readFile(`${pathdb}/store.json`, 'utf-8'));
    next();
});

// 校验登录态
app.use(async (req, res, next) => {
    // 不在校验范围内的接口直接下一步
    const checkList = ['/user_info', '/store', '/store_list', '/store_remove', '/user_update'];
    if (!checkList.includes(req.path)) {
        next();
        return;
    }
    // 首先校验Token的合法性
    let authorzation = req.headers['authorization'];
    let { token, data } = Token.verify(authorzation);
    if (!token) {
        responsePublic(res, false, {
            codeText: 'no permission to access, possibly because you are not logged in or your login has expired'
        });
        return;
    }
    req.$TOKEN = data;
    next();
});

// 获取登录者信息
app.get('/user_info', (req, res) => {
    responsePublic(res, true, {
        data: queryUserInfo(req, req.$TOKEN.id)
    });
});

// 收藏信息
app.post('/store', async (req, res) => {
    let { newsId } = req.body;
    if (!newsId) {
        responsePublic(res, false);
        return;
    }
    let store = req.$STOREDATA;
    // 检查是否收藏过
    if (store.some(item => (item.userId == req.$TOKEN.id && item.newsId == newsId))) {
        responsePublic(res, false, {
            codeText: 'the current article has been collected'
        });
        return;
    }
    store.push({
        id: store.length === 0 ? 1 : (+store[store.length - 1].id + 1),
        newsId,
        userId: req.$TOKEN.id,
        time: +new Date()
    });
    await fs.writeFile(`${pathdb}/store.json`, JSON.stringify(store), 'utf-8');
    responsePublic(res, true);
});

// 移除收藏
app.get('/store_remove', async (req, res) => {
    let { id } = req.query;
    if (!id) {
        responsePublic(res, false);
        return;
    }
    req.$STOREDATA = req.$STOREDATA.filter(item => {
        return +item.id !== +id;
    });
    await fs.writeFile(`${pathdb}/store.json`, JSON.stringify(req.$STOREDATA), 'utf-8');
    responsePublic(res, true);
});

// 收藏列表
const queryNewsInfo = id => {
    return new Promise((resolve, reject) => {
        request(`${baseURL}/news/${id}`, (err, _, body) => {
            if (err) {
                reject(err);
                return;
            }
            body = filter(body);
            if (Array.isArray(body) && body.length === 0) {
                reject(body);
                return;
            }
            resolve(body);
        });
    });
};
app.get('/store_list', async (req, res) => {
    let store = req.$STOREDATA.filter(item => {
        return +item.userId === +req.$TOKEN.id;
    });
    store.reverse();
    store[Symbol.asyncIterator] = function asyncIterator() {
        let index = 0,
            self = this;
        return {
            next() {
                if (index > self.length - 1) return Promise.resolve({ done: true });
                return new Promise(async resolve => {
                    try {
                        let item = self[index++]
                        let info = await queryNewsInfo(item.newsId);
                        resolve({
                            value: {
                                id: item.id,
                                userId: item.userId,
                                news: {
                                    id: item.newsId,
                                    title: info.title,
                                    image: info.image
                                }
                            },
                            done: false
                        });
                    } catch (err) {
                        resolve({
                            value: null,
                            done: false
                        });
                    }
                });
            }
        };
    };
    let data = [];
    for await (item of store) {
        if (item) data.push(item);
    }
    responsePublic(res, true, {
        data
    });
});

// 获取手机验证码
const queryRandom = () => {
    let str = ``;
    while (str.length < 6) {
        let ran = Math.round(Math.random() * 9);
        str += ran;
    }
    return str;
};
app.post('/phone_code', async (req, res) => {
    let { phone } = req.body;
    if (!phone) {
        responsePublic(res, false);
        return;
    }
    let codeData = req.$CODEDATA,
        code = queryRandom(),
        time = +new Date();
    // 验证手机号是否存在,存在更新验证码 & 不存在创建验证码
    let item = codeData.find(item => item.phone === phone);
    if (item) {
        item.code = code;
        item.time = time;
    } else {
        codeData.push({
            id: codeData.length === 0 ? 1 : (+codeData[codeData.length - 1].id) + 1,
            phone,
            code,
            time: +new Date()
        });
    }
    await fs.writeFile(`${pathdb}/code.json`, JSON.stringify(codeData), 'utf-8');
    // 发送短信
    await fs.appendFile(`${path.resolve(__dirname, '')}/code.txt`, `手机号 ${phone} 的用户于 ${new Date(time).toLocaleString('zh-CN', { hour12: false })} 发送短信验证码：${code} \n`, 'utf-8');
    responsePublic(res, true);
});

// 登录&注册
app.post('/login', async (req, res) => {
    let { phone, code } = req.body;
    // 校验验证码是否正确
    let flag = req.$CODEDATA.find(item => {
        return item.phone === phone && item.code === String(code) && (+new Date() - item.time) <= 1800000;
    });
    if (!flag) {
        // 登录失败，把刚才此手机号生成的验证码移除掉
        req.$CODEDATA = req.$CODEDATA.filter(item => item.phone !== phone);
        await fs.writeFile(`${pathdb}/code.json`, JSON.stringify(req.$CODEDATA), 'utf-8');
        responsePublic(res, false, {
            codeText: 'the mobile phone number and verification code do not match'
        });
        return;
    }
    // 校验手机号是否存在，不存在注册一个，存在则登录成功
    let item = req.$USERDATA.find(item => item.phone === phone);
    if (!item) {
        item = {
            id: req.$USERDATA.length === 0 ? 1 : (+req.$USERDATA[req.$USERDATA.length - 1].id + 1),
            name: `知乎用户${queryRandom()}`,
            phone,
            pic: 'timg.jpg',
            time: +new Date()
        };
        req.$USERDATA.push(item);
        await fs.writeFile(`${pathdb}/user.json`, JSON.stringify(req.$USERDATA), 'utf-8');
    }
    let token = Token.sign({
        id: item.id,
        phone: item.phone
    });
    responsePublic(res, true, { token });
});

// 修改用户名 & 头像
const multiparty_upload = function multiparty_upload(req) {
    let config = {
        maxFieldsSize: 200 * 1024 * 1024,
    };
    config.uploadDir = pathupload;
    return new Promise(async (resolve, reject) => {
        await delay();
        new multiparty.Form(config)
            .parse(req, (err, fields, files) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve({
                    fields,
                    files
                });
            });
    });
};
app.post('/upload', async (req, res) => {
    try {
        let { files } = await multiparty_upload(req);
        let file = (files.file && files.file[0]) || {},
            filename = file.path.match(/static(?:\/|\\)(.+)/)[1] || 'timg.jpg';
        responsePublic(res, true, {
            pic: `http://127.0.0.1:${server}/${filename}`
        });
    } catch (err) {
        responsePublic(res, false);
    }
});
app.post('/user_update', async (req, res) => {
    try {
        let { username, pic } = req.body;
        req.$USERDATA = req.$USERDATA.map(item => {
            if (+item.id === +req.$TOKEN.id) {
                item.name = username;
                item.pic = pic;
            }
            return item;
        });
        await fs.writeFile(`${pathdb}/user.json`, JSON.stringify(req.$USERDATA), 'utf-8');
        responsePublic(res, true, {
            data: queryUserInfo(req, req.$TOKEN.id)
        });
    } catch (err) {
        responsePublic(res, false);
    }
});

app.use(express.static('./static'));
app.use((_, res) => {
    res.status(404);
    res.send();
});