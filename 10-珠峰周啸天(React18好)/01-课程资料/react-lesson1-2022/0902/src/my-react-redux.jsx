import { createContext, useContext, useState, useLayoutEffect, useMemo } from 'react';
import { bindActionCreators } from 'redux';

const ThemeContext = createContext();

export function Provider(props) {
    let { store, children } = props;
    return <ThemeContext.Provider
        value={{
            store
        }}>
        {children}
    </ThemeContext.Provider>;
};

// React高阶组件：基于闭包管理组件
export function connect(mapStateToProps, mapDispatchToProps) {
    if (!mapStateToProps) {
        mapStateToProps = () => {
            return {};
        };
    }
    if (!mapDispatchToProps) {
        mapDispatchToProps = () => {
            return {};
        };
    }
    return function HOC(Component) {
        // Component:我最后要渲染的组件 
        // Proxy:是供别人调用的组件  props是调用这个组件传递的属性
        return function Proxy(props) {
            // 获取store
            let { store: { getState, dispatch, subscribe } } = useContext(ThemeContext);

            // mapStateToProps
            let state = getState();
            let stateProps = useMemo(() => {
                return mapStateToProps(state);
            }, [state]);

            // mapDispatchToProps
            let dispatchProps = useMemo(() => {
                if (typeof mapDispatchToProps === "function") {
                    return mapDispatchToProps(dispatch);
                }
                return bindActionCreators(mapDispatchToProps, dispatch);
            }, [dispatch]);

            // 向事件池中注入让组件更新的办法 
            let [, forceUpdate] = useState(0);
            useLayoutEffect(() => {
                subscribe(() => {
                    forceUpdate(+new Date());
                });
            }, [subscribe]);

            return <Component {...props} {...stateProps} {...dispatchProps} />
        };
    };
};