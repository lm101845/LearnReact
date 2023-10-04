import sum from "./A.js";
import average from "./B.js";

console.log(sum(10, 20, 30, 40));
console.log(average(10, 20, 30, 40));

/* 
模块导入：把模块导出的“Module对象”中的每一项内容拿到 => import
  导入模块的地址：相对地址、不能省略后缀名「后期在weblack中可以省略」
  语法一：
    import xxx from './A.js'
    不是把“Module对象”整体导入进来赋值给xxx，而是只拿到了“Module对象.default”属性值「xxx=Module对象.default」「换句话说，基于export default xxx导出的内容，用这种方式直接导入」
  语法二：
    import {x,y} from './A.js'
    用解构赋值的方式获取导出的内容，首先不是把“Module对象.default属性值”进行解构赋值；而是直接给“Module对象”解构赋值「换句话来讲，它是获取基于 export let xxx=xxx 这种方式导出的内容」
  语法三：
    import * as A from './A.js'
    把模块导出的“Module对象”中的所有内容都拿到，最后赋值给A「A=Module对象」
*/
/* import A from './A.js';
console.log(A);

import obj from './xxx.js'; //obj->0x001
import { x, m } from './xxx.js'; //不是把default导出的对象先获取，然后解构赋值
// x-> Module.x -> undefined
// m-> Module.m -> 100
import * as A from './xxx.js'
// A.default -> 0x001
// A.m -> 100

export default { x: 10, y: 20 }; //对象0x001  => Module{ default:0x001 }
export let m = 100; //=> Module{ default:0x001,m:100 } */