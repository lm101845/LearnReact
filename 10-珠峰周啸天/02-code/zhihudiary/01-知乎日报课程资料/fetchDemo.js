import { Toast } from 'antd-mobile';

/*
 客户端和服务器之间的数据通信方案：
   + ajax「核心 XMLHttpRequest」： 
     + 自己去写四步操作
     + JQ:$.ajax「基于回调函数方式管理ajax请求」
     + Axios「基于promise方案管理ajax请求」
   + 某些跨域请求方案：jsonp、postMessage...
   + Fetch「核心不是XMLHttpRequest，和ajax不是相同的方案，它具备独有的通信机制」

 fetch：浏览器内置的一个函数(ES6+规范)
   + window.fetch「存储在GO中的」
   + 它不兼容IE浏览器「而且@babel/polyfill也没有对它进行重写」
   + 天生就是基于promise进行管理「基于fetch发送请求，返回的是一个promise实例」
   + 因为fetch的发展时间还短，不如XMLHttpRequest强大，例如：没有设置超时时间的方法、中断请求的方式也是在试行(AbortController)...

 MDN:https://developer.mozilla.org/zh-CN/docs/Web/API/fetchb
 fetch([url],[options]?) -> promise实例
    [url]:请求的地址
    [options]:相应的配置项
 */

/* 
// 特点：基于fetch发送请求，只要服务器有反馈信息「不论HTTP状态码是多少」，FETCH都认为是请求成功的，让返回的promsie实例都是fulfilled状态；只有服务器没有任何的反馈「例如:断网」，返回的实例才是rejected！
setTimeout(() => {
    let controll = new AbortController(),
        signal = controll.signal;
    fetch('/api/news_latest', { signal })
        .then(response => {
            let { status, statusText } = response;
            // 进入这里不代表请求成功，我们还需要手动对HTTP状态码做校验
            if (!/^(2|3)\d{2}$/.test(status)) {
                // 请求失败:让其进入最后的catch中处理
                return Promise.reject({
                    code: -1000,
                    status,
                    statusText
                });
            }
            /!* 
            请求成功的，我们需要获取响应头/响应主体的信息
              + response.headers：获取响应头的信息，但是获取到的是一个“headers实例对象”
                例如：response.headers.get('date') 获取是服务器时间
              + response.body：获取响应主体信息，但是获取的是一个ReadableStream可读流对象，此时还需要我们基于response对象中提供的方法，把获取的信息转换为我们期望的数据格式（一般都是JSON对象）！！
                + arrayBuffer/blob/formData/json/text 用哪个方法，就是把从服务器获取的ReadableStream对象转换为啥格式的数据！！
                + 执行这些方法实现数据格式转换的时候，首先返回一个promise实例「原因：服务器可能会返回很多种格式的数据内容，如果我们基于某个方法进行转换，很可能出现返回的内容和我们需要转换的格式不匹配，此时只需要返回失败的实例即可...」
            *!/
            return response.json()
                .catch(err => {
                    // 转换失败，重构一个对应的失败原因对象
                    return Promise.reject({
                        code: -2000,
                        message: err.message
                    });
                });
        }).then(value => {
            // 彻底成功了：服务器有反馈、状态码也是正确的、而且也成功把从服务器获取的信息变为了JSON对象
            console.log('成功:', value);
        }).catch(reason => {
            /!* 
            如果是网络中断等原因导致的服务器没有反馈，reason->{message,stack} Error实例对象
            如果是状态码问题导致的，reason->{code:-1000,status,statusText} 自己构建的对象
            如果是转换数据失败导致的，reason->{code:-2000,message} 自己构建的对象
            如果是请求被中断，reason->{code:20,message,name} 
            ==>我们需要在catch中，针对不同的失败原因，做不同的提示 
            *!/
            let msg = '网络繁忙，请稍后再试~',
                { code, status } = reason;
            if (code === -1000) {
                switch (+status) {
                    case 404:
                        msg = '请求地址有误';
                        break;
                    case 500:
                        msg = '服务器出现异常';
                        break;
                    default:
                        msg = '获取数据失败';
                }
            } else if (code === -2000) {
                msg = '数据转换失败';
            } else if (code === 20) {
                msg = '请求被中断';
            }
            Toast.show({
                icon: 'fail',
                content: msg
            });
            // 即便统一提示完毕，后续如果还有处理，也依然要走失败的逻辑
            return Promise.reject(reason);
        });
    // controll.abort();
}, 5000); */

/*
 https://developer.mozilla.org/zh-CN/docs/Web/API/Headers
 Headers：ES6内置类
   + new Headers() 创建类的实例对象（“headers”对象）
   + 基于此类可以有效管理 请求头/响应头 信息「基于fetch发送请求，请求头信息可以是一个普通对象，也可以是一个headers对象(推荐使用)」
     + append 新增头信息
     + delete 删除某个头信息
     + forEach 迭代headers对象中的每一条头信息
     + get 获取某个头的信息
     + has 验证是否拥有某个头的信息
     + set 修改现有的某个头信息
     + ...
 */


/* // 关于fetch发送请求的配置项
//  + 没有类似于axios中的params，需要问号传参，只能自己手动拼接到URL的末尾
//  + fetch无法设置超时时间
let requestHeaders = new Headers();
requestHeaders.append('token', '....');
requestHeaders.append('Content-Type', 'application/json');

fetch('/api/news_latest', {
    // signal: 中断控制器的信号源「目的：可以中断此请求」
    method: 'GET', //设置请求方式 GET系列&POST系列
    headers: requestHeaders, //设置请求头信息「可以是一个普通对象、也可以是一个headers对象」
    body: null, //设置请求主体信息「但是只能针对POST系列请求，GET系列请求设置其后会报错；请求主体的数据格式是有限制的；并且需要我们自己基于Content-Type来指定其MIME类型(axios是内部自己处理了，会自动根据请求主体的数据格式，设置对应的Content-Type)；」
    credentials: 'include', //设置跨域请求中，是否允许携带资源凭证  omit\same-origin\include
    cache: 'no-cache', //去掉请求的缓存效果
    referrer: 'client' //控制请求头中Referrer字段的值  no-referrer\client\自己写个地址
}); */

import http from './api/http';

(async function () {
    try {
        let result = await http.get('/api/news_before', {
            params: {
                time: '20230317'
            }
        });
        console.log(result);
    } catch (_) { }

    /* try {
        let result = await http.post('/api/phone_code', {
            phone: '18310612838'
        });
        console.log(result);
    } catch (_) { } */
})();