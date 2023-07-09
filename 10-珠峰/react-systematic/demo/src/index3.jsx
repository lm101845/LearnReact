import React from 'react';
import ReactDOM from 'react-dom/client';
import DemoOne from "./views/DemoOne";
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <>
        <DemoOne title="我是标题1" x = {100} data = {[100,200]} className="box" style={{fontSize:'100px'}}/>
        <DemoOne title="我是标题2">
            <span>哈哈哈</span>
            <span>嘿嘿嘿</span>
        </DemoOne>
        <DemoOne title="我是标题3"/>
    </>
)

let obj = {
    x:10,
    y:20
}
// Object.freeze(obj)     //冻结对象
// Object.seal(obj)       //密封对象
Object.preventExtensions(obj)    //把对象设置为不可扩展
console.log(Object.isFrozen(obj))   //检测是否被冻结
console.log(Object.isExtensible(obj))   //检测是否可扩展
obj.x = 100
obj.y = 200
// obj.z = 300
// delete obj.x
console.log(obj)
