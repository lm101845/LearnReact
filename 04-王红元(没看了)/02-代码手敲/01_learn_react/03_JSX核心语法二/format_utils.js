/*
 * @Author: liming
 * @Date: 2021-08-18 14:59:51
 * @LastEditTime: 2021-08-18 15:29:41
 * @FilePath: \04-王红元\02-代码手敲\01_learn_react\03_JSX核心语法二\format_utils.js
 */
export function getSizeImage() {
    return imgUrl + `?param=${size}x${size}`;
}

// 有一些浏览器不支持ES6的export写法，所以我还是把这段代码写到html文件里面吧