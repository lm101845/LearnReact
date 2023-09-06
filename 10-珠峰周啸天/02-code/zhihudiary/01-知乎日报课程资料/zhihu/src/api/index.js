import http from './http';

// 获取今日新闻&今天日期&轮播图数据
const queryNewsLatest = () => {
    return http.get('/api/news_latest');
};

// 获取往日的新闻列表
const queryNewsBefore = (time) => {
    return http.get('/api/news_before', {
        params: {
            time
        }
    });
};

// 获取新闻的详细信息
const queryNewsInfo = (id) => {
    return http.get('/api/news_info', {
        params: {
            id
        }
    });
};

// 获取新闻的点赞和评论数
const queryNewsExtra = (id) => {
    return http.get('/api/story_extra', {
        params: {
            id
        }
    });
};

// 发送验证码
const sendPhoneCode = (phone) => {
    return http.post('/api/phone_code', {
        phone
    });
};

// 用户登录
const userLogin = (phone, code) => {
    return http.post('/api/login', {
        phone,
        code
    });
};

//==========下面的请求，都需要携带Token信息了「在Fetch中已经处理了」
// 获取登录者信息
const queryUserInfo = () => {
    return http.get('/api/user_info');
};

// 获取登录者的收藏列表
const queryStoreList = () => {
    return http.get('/api/store_list');
};

// 新增收藏记录
const addStoreInfo = (newsId) => {
    return http.post('/api/store', {
        newsId
    });
};

// 移除收藏记录
const removeStoreInfo = (id) => {
    return http.get('/api/store_remove', {
        params: {
            id
        }
    });
};

// 上传图片
const upload = (file) => {
    let fm = new FormData();
    fm.append('file', file);
    return http.post('/api/upload', fm);
};

// 修改登录者信息
const updateLoginInfo = (username, pic) => {
    return http.post('/api/user_update', {
        username,
        pic
    });
};

/* 导出接口 */
const API = {
    queryNewsLatest,
    queryNewsBefore,
    queryNewsInfo,
    queryNewsExtra,
    sendPhoneCode,
    userLogin,
    queryUserInfo,
    queryStoreList,
    addStoreInfo,
    removeStoreInfo,
    upload,
    updateLoginInfo
};
export default API;