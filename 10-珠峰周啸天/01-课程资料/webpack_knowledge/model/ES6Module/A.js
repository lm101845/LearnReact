let name = 'A';
const sum = function sum(...params) {
    let len = params.length,
        total = 0;
    if (len === 0) return 0;
    if (len === 1) return params[0];
    params.forEach(item => {
        total += +item;
    });
    return total;
};
export default sum;

/* 
 模块的导出 
   export default 
     + 每个模块只能使用一次
     + 导出的是一个值「可以是变量」
   export
     + 可以使用多次
     + 导出的是一个表达式
*/
/* // export default sum;
export default {
    sum,
    name
};
export let num = 10;
export function fn() { }; */