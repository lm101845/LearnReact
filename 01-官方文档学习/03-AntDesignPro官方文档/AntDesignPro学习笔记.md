# AntDesignPro学习笔记

> https://pro.ant.design/zh-CN/

## 环境变量

### 多运行环境管理

在开发中经常会有一些需求，根据应用运行的不同环境进行不同的逻辑处理。

比如，`dev` 环境使用 `dev` 的对应的 Url，而线上则使用 `prod` 对应的 Url。 或者，在某些特定的环境需要打开只有在该环境下才会生效的功能。

### 获取当前运行环境名称

在 Pro 的脚手架中有这样的一个环境变量 `REACT_APP_ENV`，该变量代表当前应用所处环境的具体名称。如 dev、test、pre、prod 等。

如若需要在 `config` 外的非 node 环境文件中使用该环境变量，则需要在 `config` 导出默认 `defineConfig()` 时配置 `define{}`。

## Mock

在很多情况下前端是在后端还没有开发完成之前就开始开发的，这时候我们就需要用到 mock 数据了。Pro 中约定了两种 mock 的定义方式。

- 在根目录的 mock 中接入
- 在 src/page 中的 mock.ts 的文件中配置

## 部署

* Pro 默认提供了 mock 数据，但是在 build 之后 mock 数据将不再起作用。