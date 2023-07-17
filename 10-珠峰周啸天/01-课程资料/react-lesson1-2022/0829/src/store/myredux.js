import _ from '@/assets/utils';
export const createStore = function createStore(reducer) {
    if (typeof reducer !== 'function') {
        throw new Error("Expected the root reducer to be a function.");
    }

    let state,
        listeners = [];

    /* 获取公共状态 */
    const getState = function getState() {
        return _.clone(true, state);
    };

    /* 向事件池中注入方法 */
    const subscribe = function subscribe(listener) {
        if (typeof listener !== 'function') {
            throw new Error("Expected the listener to be a function.");
        }
        if (!listeners.includes(listener)) {
            listeners.push(listener);
        }
        // 返回移除事件的方法
        return function unsubscribe() {
            listeners = listeners.filter(item => item !== listener);
        };
    };

    /* 派发任务 */
    const dispatch = function dispatch(action) {
        if (!_.isPlainObject(action)) {
            throw new Error("Actions must be plain objects.");
        }
        if (typeof action.type === 'undefined') {
            throw new Error('Actions may not have an undefined "type" property. You may have misspelled an action type string constant.');
        }

        // 通知reducer执行，修改公共状态
        try {
            state = reducer(state, action);
        } catch (_) { }

        // 通知事件池中的方法执行
        listeners.forEach(listener => {
            if (typeof listener === "function") {
                listener();
            }
        });

        return action;
    };

    /* 最开始要先派发一次任务:同步初始状态 */
    dispatch({
        type: "@@redux/INIT" + Math.random().toString(36).substring(7).split('').join('.')
    });

    /* 导出STORE对象 */
    return {
        getState,
        subscribe,
        dispatch
    };
};