import { Suspense, useEffect, useState } from 'react';
import { Routes, Route, useParams, useSearchParams, useLocation, useMatch, useNavigate } from 'react-router-dom';
import { Toast } from 'antd-mobile';
import routes from "./routes";
import Loading from '../components/Loading';
import store from '../store';
import actions from '../store/actions';

/* 路由匹配渲染的“前置守卫”：渲染组件之前做的事情 */
const isCheckLogin = function isCheckLogin(path) {
    // 检测是否需要“异步派发”去做登录态校验
    let { profile } = store.getState().base,
        checkList = ['/personal', '/mystore', '/update'];
    return !profile && checkList.includes(path);
};
const Element = function Element(props) {
    let { item: { path, meta, component: Component } } = props,
        isCheck = isCheckLogin(path);

    // 登录态校验
    let [_, setRandom] = useState(0),
        navigate = useNavigate();
    useEffect(() => {
        if (!isCheck) return;
        (async () => {
            let { profile } = await store.dispatch(actions.base.queryLoginProfile());
            if (!profile) {
                // 派发后发现获取不到登录者信息「说明没登录」
                Toast.show({
                    icon: 'fail',
                    content: '请您先登录'
                });
                navigate(`/login?to=${path}`, { replace: true });
                return;
            }
            // 派发后发现是登录的
            setRandom(+new Date());
        })();
    });

    // 修改页面的标题
    let title = meta?.title; // -> meta&&meta.title
    document.title = title ? `${title}-知乎日报` : `知乎日报`;

    // 把基于Hook获取的路由匹配信息，作为属性传递给组件「这样组件中无需再自己获取了」
    let options = {
        route: props.item,
        params: useParams(),
        query: useSearchParams()[0],
        location: useLocation(),
        match: useMatch(path),
        navigate: useNavigate()
    };

    // 如果当前并不清楚是否登录，并且需要异步派发最校验，那么我们先呈现Loading效果
    return isCheck ? <Loading /> : <Component {...options} />;
};

/* 路由规则配置 */
const RouterView = function RouterView() {
    // Suspense：处理路由懒加载的
    return <Suspense fallback={<Loading />}>
        <Routes>
            {routes.map(item => {
                let { path, name } = item;
                return <Route
                    key={name}
                    path={path}
                    element={<Element item={item} />}
                />;
            })}
        </Routes>
    </Suspense>;
};
export default RouterView;