/**
 * @Author liming
 * @Date 2023/9/13 9:22
 **/

/**放运行时的配置*/
import {matchRoutes} from "umi";

/*每一次路由切换时触发*/
export function onRouteChange({ clientRoutes, location,routes }) {
    //clientRoutes:和当前匹配的路由配置项
    //location:当前匹配的location对象
    //当前的路由配置项[扁平化后的]
    const route = matchRoutes(clientRoutes, location.pathname)?.pop()?.route;
    if (route) {
        document.title = route.title || '';
    }
}
