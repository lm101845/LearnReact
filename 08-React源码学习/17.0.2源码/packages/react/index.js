/*
 * @Author: liming
 * @Date: 2021-08-21 16:34:27
 * @LastEditTime: 2021-08-21 20:25:50
 * @FilePath: \17.0.2源码\packages\react\index.js
 */

/**
 * 有关笔记：
 * index.js是文件夹的入口文件
 */
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */



// Keep in sync with https://github.com/facebook/flow/blob/master/lib/react.js
export type StatelessFunctionalComponent<
  P,
> = React$StatelessFunctionalComponent<P>;
export type ComponentType<-P> = React$ComponentType<P>;
export type AbstractComponent<
  -Config,
  +Instance = mixed,
> = React$AbstractComponent<Config, Instance>;
export type ElementType = React$ElementType;
export type Element<+C> = React$Element<C>;
export type Key = React$Key;
export type Ref<C> = React$Ref<C>;
export type Node = React$Node;
export type Context<T> = React$Context<T>;
export type Portal = React$Portal;
export type ElementProps<C> = React$ElementProps<C>;
export type ElementConfig<C> = React$ElementConfig<C>;
export type ElementRef<C> = React$ElementRef<C>;
export type Config<Props, DefaultProps> = React$Config<Props, DefaultProps>;
export type ChildrenArray<+T> = $ReadOnlyArray<ChildrenArray<T>> | T;

// Export all exports so that they're available in tests.
// We can't use export * from in Flow for some reason.
// export{}，这个大括号里面所有东西给它起了一个名字叫React
// React.createElement(...)中的React就是指的是React

// 这里这些导出的东西都是src里面的React.js里面的，它在这里又给它导出了一遍
// 因为index.js是入口文件，统一暴露，所以这里又暴露了一遍
export {
  __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
  act as unstable_act,
  Children,
  Component,
  Fragment,
  Profiler,
  PureComponent,
  StrictMode,
  Suspense,
  SuspenseList,
  cloneElement,
  createContext,
  createElement,
  createFactory,
  createMutableSource,
  createRef,
  forwardRef,
  isValidElement,
  lazy,
  memo,
  startTransition,
  unstable_Cache,
  unstable_DebugTracingMode,
  unstable_LegacyHidden,
  unstable_Offscreen,
  unstable_Scope,
  unstable_getCacheForType,
  unstable_useCacheRefresh,
  unstable_useOpaqueIdentifier,
  useCallback,
  useContext,
  useDebugValue,
  useDeferredValue,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useMutableSource,
  useReducer,
  useRef,
  useState,
  useTransition,
  version,
} from './src/React';

// 它导出的大括号里的所有东西本质上是从./src/React里面导入的
