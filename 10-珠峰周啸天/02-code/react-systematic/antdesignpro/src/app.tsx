import React from 'react';
import {SettingDrawer} from '@ant-design/pro-components';
import {history} from '@umijs/max';

import Footer from '@/components/Footer';
import RightContent from '@/components/RightContent'
import defaultSettings from '../config/defaultSettings';

import {message} from "antd";

const loginPath = '/login';

/**给getInitialState赋值
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export const getInitialState = async () => {
  // 页面加载时，只要跳转的不是登录页，我们都需要从服务器获取登陆者信息，存放到iitialState.currentUser中，
  // 以此来处理后续的登录态校验！！=》如果没有登录，则直接跳转到登录页
  const {location} = history;
  if (location.pathname !== loginPath) {
    const currentUser = {
      name: '珠峰培训',
      avatar: 'https://avatars.githubusercontent.com/u/57181681?v=4'
    }
    return {
      currentUser,
      settings: defaultSettings,
    };
  }
  return {
    settings: defaultSettings,
  };
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout = ({initialState, setInitialState}) => {
  return {
    //头部导航右侧内容渲染
    rightContentRender: () => <RightContent/>,
    //尾部内容渲染
    footerRender: () => <Footer/>,
    //路由切换时触发
    onPageChange: () => {
      //TODO:先注释掉
      // const {location} = history;
      // 如果没有登录，重定向到 login
      // if (!initialState?.currentUser && location.pathname !== loginPath) {
      //   history.push(loginPath);
      // }
    },
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // 增加一个 loading 的状态
    //右侧切换主题的按钮
    childrenRender: (children:any) => {
      return (
        <>
          {children}
          <SettingDrawer
            disableUrlParams
            enableDarkTheme
            settings={initialState?.settings}
            //当主题改变时[setting最新配置项]，我们需要修改initialStata.settings
            onSettingChange={(settings) => {
              setInitialState((preInitialState:any) => ({
                ...preInitialState,
                settings,
              }));
            }}
          />
        </>
      );
    },
    //其余的配置项
    ...initialState?.settings,
  };
};

/**
 * @name request 配置，可以配置错误处理
 * 它基于 axios 和 ahooks 的 useRequest 提供了一套统一的网络请求和错误处理方案。
 * @doc https://umijs.org/docs/max/request#配置
 */
/**
 * 对Axios的配置：包含请求拦截器、响应拦截器、错误的统一处理等
 */
export const request = {
  //基础配置
  timeout: 60000,
  errorConfig: {
    errorHandler() {
      message.error("网络繁忙，请稍后再试")
    },
    // 请求拦截器
    requestInterceptors: [
      (config:any) => {
        const token = ""
        if (token && config.url !== '/api/adminUser/login') {
          config.headers['token'] = token
        }
        return config
      }
    ],
    // 响应拦截器
    responseInterceptors: [
      (response:any) => {

      }
    ]
  }
}

