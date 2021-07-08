---
title: React实用教程
date: 2020-12-14 11:30:00
tags: React
categories: React
---

(注1：没有太多时间看视频的话就先试着看看入门教程吧，一方面是熟悉一下React,一方面通过对其他框架的学习来促进对于Vue的理解，现在的主要重心还是放到Vue上面。)

(注2：阅读该教程不需要你预先掌握任何 React 知识。)

(注3：[本篇博文：React实用教程地址](https://reactjs.bootcss.com/tutorial/tutorial.html))

# 课前准备

我们将会在这个教程中开发一个小游戏。**你可能并不打算做游戏开发，然后就直接跳过了这个教程——但是不妨尝试一下！**你将在该教程中学到关于构建 React 应用的基础知识，掌握这些知识后，你将会对 React 有更加深刻的理解。

> 提示
>
> 这篇教程适用于更喜欢**边学边做**的开发者，如果你更喜欢从头开始学习一些概念，请参考[逐步学习指南](https://reactjs.bootcss.com/docs/hello-world.html)。你会发现这篇教程和逐步学习指南是互补的。

这篇教程分为以下几个部分：

- [环境准备](https://reactjs.bootcss.com/tutorial/tutorial.html#setup-for-the-tutorial)是学习该教程的**起点**。
- [概览](https://reactjs.bootcss.com/tutorial/tutorial.html#overview)介绍了 React 的**基础知识**：组件、props 和 state。
- [游戏完善](https://reactjs.bootcss.com/tutorial/tutorial.html#completing-the-game)介绍了在 React 开发过程中最常用的技术。
- [时间旅行](https://reactjs.bootcss.com/tutorial/tutorial.html#adding-time-travel)可以让你更加深刻地了解 React 的独特优势。

**你不必着急一口气学完这篇教程的所有内容，尽力就行，哪怕是先学习一两节**。

> 感觉写这篇教程的人真的非常不错啊，对小白非常的照顾，我很喜欢，感谢作者。

## 我们会做出什么东西？

接下来，我们一起用 React 开发一个井字棋（tic-tac-toe）。

你可以提前预览我们要写的游戏的**[最终效果](https://codepen.io/gaearon/pen/gWWZgR?editors=0010)**。如果你看不懂其中的代码，或不熟悉这些语法，别担心！接下来的教程会一步一步帮助你理解 React 及其语法。

在继续后面的教程之前，推荐你先玩一下这个井字棋。在游戏里，你会看到游戏面板的右边有一个标有序号的列表。这个列表记录了游戏中的每个步骤，并且会随着游戏的进行不断更新。

等你熟悉游戏功能，便可关掉它！我们会在一个简单的模板上开始写起。下一步就是帮做好准备工作，这样你就可以开始游戏开发了。

## 前置知识

我们假定你已经对 HTML 和 JavaScript 都比较熟悉了。即便你之前使用其他编程语言，你也可以跟上这篇教程的。除此之外，我们假定你也已经熟悉了一些编程的概念，例如，函数、对象、数组，以及 class 的一些内容。

如果你想回顾一下 JavaScript，你可以阅读[这篇教程](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/A_re-introduction_to_JavaScript)。注意，我们也用到了一些 ES6（较新的 JavaScript 版本）的特性。在这篇教程里，我们主要使用了[箭头函数（arrow functions）](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Arrow_functions)、[class](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Classes)、[let](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/let) 语句和 [const](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/const) 语句。你可以使用 [Babel REPL](https://babeljs.io/repl/#?presets=react&code_lz=MYewdgzgLgBApgGzgWzmWBeGAeAFgRgD4AJRBEAGhgHcQAnBAEwEJsB6AwgbgChRJY_KAEMAlmDh0YWRiGABXVOgB0AczhQAokiVQAQgE8AkowAUAcjogQUcwEpeAJTjDgUACIB5ALLK6aRklTRBQ0KCohMQk6Bx4gA) 在线预览 ES6 的编译结果。

# 环境准备

完成这篇教程有两种方式：可以直接在浏览器中编写代码，也可以在你电脑上搭建本地开发环境。

## 方式一：在浏览器中编写代码

这是上手最快的一种方式了！

首先在新的浏览器选项卡中打开这个**[初始模板](https://codepen.io/gaearon/pen/oWWQNa?editors=0010)**。 你可以看到一个空的井字棋盘和 React 代码。我们接下来会在本教程中修改该 React 代码。

如果你选择这种方式，就可以跳过方式二，直接从[概览](https://reactjs.bootcss.com/tutorial/tutorial.html#overview)开始阅读教程啦。

## 方式二：搭建本地开发环境

这是完全可选的，本教程不强制要求！

**可选项：使用你喜欢的文本编辑器进行本地开发的步骤：**

虽然在本地搭建环境要费一些时间，但是你可以选择自己喜欢的编辑器来完成开发。以下是具体步骤：

1. 确保你安装了较新版本的 [Node.js](https://nodejs.org/en/)。
2. 按照 [Create React App 安装指南](https://reactjs.bootcss.com/docs/create-a-new-react-app.html#create-react-app)创建一个新的项目

~~~javascript
npx create-react-app my-app
~~~

3. 删除掉新项目中 `src/` 文件夹下的所有文件。

![](React入门教程/01.png)

~~~shell
cd my-app
cd src

# 如果你使用 Mac 或 Linux:
rm -f *

# 如果你使用 Windows:
del *

# 然后回到项目文件夹
cd ..
~~~

4. 在 `src/` 文件夹中创建一个名为 `index.css` 的文件，并拷贝[这些 CSS 代码](https://codepen.io/gaearon/pen/oWWQNa?editors=0100)。

5. 在 `src/` 文件夹下创建一个名为 `index.js` 的文件，并拷贝[这些 JS 代码](https://codepen.io/gaearon/pen/oWWQNa?editors=0010)。

6. 拷贝以下三行代码到 `src/` 文件夹下的 `index.js` 文件的顶部：

~~~javascript
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
~~~

现在，在项目文件夹下执行`npm start`命令，然后在浏览器访问 `http://localhost:3000`。这样你就可以在浏览器中看见一个空的井字棋的棋盘了。

推荐参照[这篇教程](https://babeljs.io/docs/editors/)来给你的编辑器配置语法高亮。

## 寻求帮助

如果你遇到了任何困难，可以去查看[社区支持资源](https://reactjs.bootcss.com/community/support.html)。你也可以在 [Reactiflux Chat](https://discord.gg/reactiflux) 快速求助。如果通过上述方式还是解决不了你的问题，请给我们提 issue，我们会帮助你的。

# 概览

