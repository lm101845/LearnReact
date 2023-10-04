import React from "react";

// 创建JSX元素对象
const createElement = function createElement(type, props, ...children) {
    let len = children.length,
        virtualDOM = {
            $$typeof: Symbol(React.element),
            type,
            props: {}
        };
    if (props !== null) virtualDOM.props = { ...props };
    if (len === 1) virtualDOM.props.children = children[0];
    if (len > 1) virtualDOM.props.children = children;
    return virtualDOM;
};

// 基于render渲染为真实DOM
const each = function each(obj, callback) {
    if (typeof callback !== "function") throw new TypeError("callback is not a function");
    let keys = Reflect.ownKeys(obj);
    keys.forEach(key => {
        let value = obj[key];
        callback(value, key);
    });
};
const render = function render(virtualDOM, container) {
    let { type, props } = virtualDOM;
    // 如果type是一个字符串:渲染的是一个HTML标签
    if (typeof type === "string") {
        let ele = document.createElement(type);
        // 给标签设置属性
        each(props, (value, key) => {
            // className
            if (key === 'className') {
                ele.setAttribute('class', value);
                return;
            }
            // style
            if (key === 'style') {
                // value->style对象
                each(value, (styVal, styKey) => {
                    ele.style[styKey] = styVal;
                });
                return;
            }
            // children
            if (key === 'children') {
                // value->children值「一个值，也可以是数组」
                let children = value;
                if (!Array.isArray(children)) children = [children];
                children.forEach(item => {
                    // item->每个子节点
                    // 如果是文本节点:直接插入进来
                    if (typeof item === "string") {
                        let textNode = document.createTextNode(item);
                        ele.appendChild(textNode);
                        return;
                    }
                    // 如果是元素节点:递归
                    render(item, ele);
                });
                return;
            }
            ele.setAttribute(key, value);
        });
        container.appendChild(ele);
    }
    // 如果type是一个函数:渲染的是一个函数组件
    // 如果type是一个类:渲染的是一个类组件
};

const jsx = createElement(
    "div",
    { className: "box" },
    createElement(
        "h2",
        { className: "title" },
        "\u6211\u662F\u6807\u9898"
    ),
    createElement(
        "ul",
        {
            className: "list",
            style: {
                color: 'red'
            }
        },
        createElement("li", null, "\u5217\u88681"),
        createElement("li", null, "\u5217\u88682"),
        createElement("li", null)
    )
);
render(jsx, document.getElementById('root'));