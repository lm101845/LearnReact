const express = require('express'),
	bodyparser = require('body-parser'),
	fs = require('fs').promises,
	path = require('path');
const pathdb = path.resolve(__dirname, 'database'),
	config = require('./package.json').config,
	server = config.server,
	{ open, safeList } = config.cros,
	{ filter, responsePublic, nowTimeFn } = require('./utils');

/*-创建&启动服务-*/
const app = express();
app.listen(server, () => {
	console.log(`THE WEB SERVICE SUCCESSFULLY AND LISTENING TO THE PORT：${server}!`);
});

/*-中间件-*/
if (open) {
	app.use((req, res, next) => {
		let origin = req.headers.origin || req.headers.referer || "";
		origin = origin.replace(/\/$/g, '');
		origin = !safeList.includes(origin) ? '' : origin;
		res.header("Access-Control-Allow-Origin", origin);
		res.header("Access-Control-Allow-Methods", 'GET,POST,DELETE,HEAD,OPTIONS,PATCH,PUT');
		res.header("Access-Control-Allow-Headers", 'DNT,authorzation,web-token,app-token,Authorization,Accept,Origin,Keep-Alive,User-Agent,X-Mx-ReqToken,X-Data-Type,X-Auth-Token,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,x-token');
		res.header("Access-Control-Allow-Credentials", true);
		req.method === 'OPTIONS' ? res.send() : next();
	});
}
app.use(bodyparser.urlencoded({ extended: false }));
app.use(async (req, _, next) => {
	req.$taskDATA = filter(await fs.readFile(`${pathdb}/task.json`, 'utf-8'));
	next();
});

/*-接口管理-*/
app.get('/getTaskList', async (req, res) => {
	let $taskDATA = req.$taskDATA;
	let { limit = 100, page = 1, state = 0 } = req.query;
	$taskDATA.reverse();
	if (+state !== 0) $taskDATA = $taskDATA.filter(item => +item['state'] === +state);
	let total = $taskDATA.length,
		pageNum = Math.ceil(total / limit),
		list = [];
	if (page <= pageNum) {
		for (let i = (page - 1) * limit; i <= (page * limit - 1); i++) {
			let item = $taskDATA[i];
			if (!item) break;
			list.push({
				id: +item['id'],
				task: item['task'],
				state: item['state'],
				time: item['time'],
				complete: item['complete']
			});
		}
	}
	responsePublic(res, true, {
		page,
		pageNum,
		total,
		limit,
		list
	});
});

app.post('/addTask', async (req, res) => {
	let $taskDATA = req.$taskDATA,
		len = $taskDATA.length,
		body = req.body,
		nowTime = nowTimeFn();
	body = {
		id: len === 0 ? 1 : +($taskDATA[len - 1]['id']) + 1,
		task: '',
		state: 1,
		time: nowTime,
		complete: nowTime,
		...body,
	};
	body.complete = body.time;
	$taskDATA.push(body);
	try {
		await fs.writeFile(`${pathdb}/task.json`, JSON.stringify($taskDATA), 'utf-8');
		responsePublic(res, true);
	} catch (_) {
		responsePublic(res, false);
	}
});

app.get('/removeTask', async (req, res) => {
	let $taskDATA = req.$taskDATA,
		{ id = 0 } = req.query,
		flag = false;
	$taskDATA = $taskDATA.filter(item => {
		if (+item.id === +id) {
			flag = true;
			return false;
		}
		return true;
	});
	if (!flag) {
		responsePublic(res, false);
		return;
	}
	try {
		await fs.writeFile(`${pathdb}/task.json`, JSON.stringify($taskDATA), 'utf-8');
		responsePublic(res, true);
	} catch (_) {
		responsePublic(res, false);
	}
});

app.get('/completeTask', async (req, res) => {
	let $taskDATA = req.$taskDATA,
		{ id = 0 } = req.query,
		flag = false;
	$taskDATA = $taskDATA.map(item => {
		if (+item.id === +id) {
			flag = true;
			item.state = 2;
			item.complete = nowTimeFn();
		}
		return item;
	});
	if (!flag) {
		responsePublic(res, false);
		return;
	}
	try {
		await fs.writeFile(`${pathdb}/task.json`, JSON.stringify($taskDATA), 'utf-8');
		responsePublic(res, true);
	} catch (_) {
		responsePublic(res, false);
	}
});

/*-静态页面&404-*/
app.use(express.static('./static'));
app.use((_, res) => {
	res.status(404);
	res.send();
});