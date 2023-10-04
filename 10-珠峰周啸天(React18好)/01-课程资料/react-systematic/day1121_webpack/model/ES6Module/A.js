let name = "A";
const sum = function sum(...params) {
    let len = params.length,
        total = 0;
    if (len === 0) return 0;
    if (len === 1) return params[0];
    params.forEach(item => {
        total += item;
    });
    return total;
};
/* 模块导出 */
export default sum; //Module对象{ default:sum函数 }


//=====================
/* 
 模块导出：export 或者 export default 
 无论基于何种方式，模块导出的永远是一个“Module对象”！！

 第一种方式：export
   + 一个模块中可以使用多次，分别导出多项内容
   + 导出的每一项内容，都是给“Module对象”设置相关的成员
 第二种方式：export default 
   + 一个模块中只能用一次
   + 它是给“Module对象”设置一个叫做default的成员，成员值是导出的内容
*/

/* // 正确语法：导出一个变量/值/创建函数表达式/对象...
// export default sum;
// export default 10;
// export default function fn() { };
// export default {
//     x: 10,
//     name
// };
// 错误语法
// export default let age = 12;
 */

/* // 语法：不能直接导出一个变量/值，必须在声明的时候“同时导出”
// export name; //错误的写法
export let age = 14; //声明一个变量并且导出「Module对象.age=14」
export function fn() { };
export const obj = {};

// 语法：可以导出一个对象(或代码块)，其中包含多个我们需要导出的内容
export {
    name, //正确语法：前提name是存在的，我们把name赋值给Module对象，值就是name变量的值
    // x:10 //错误语法：不能直接在这用键值对方式赋值
}; */