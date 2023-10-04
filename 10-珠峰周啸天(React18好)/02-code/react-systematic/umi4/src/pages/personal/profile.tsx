/**
 * @Author liming
 * @Date 2023/9/13 16:04
 **/
import React from 'react'
import {withRouter,useSearchParams,createSearchParams,history,useLocation} from "umi";

const profilePage = ({location}) => {
    // console.log(location.search)    //?lx=0&name=zhufeng
    // const usp = new URLSearchParams(location.search)
    // console.log(usp.get('lx'))   //0
    // // console.log(createSearchParams(location.search))
    //
    // const [usp1] = useSearchParams()
    // console.log(usp1,'usp1')
    // console.log(usp1.get('name'),'usp1.getname')

    const location6 = useLocation()
    console.log(location6.state,'location6.state')
    return (
        <div>
            <h2>我的信息</h2>
        </div>
    );
};

export default withRouter(profilePage);

/**
 * 在这个代码片段中，profilePage是一个React组件，它接受一个名为location的prop。
 * location对象包含了当前URL的信息，例如路径（pathname）、搜索参数（search）等。
 *
 * withRouter是一个高阶组件（HOC），它将React Router的history对象作为prop传入组件。
 * 在这个例子中，withRouter将location对象作为prop传给了profilePage组件。因此，你可以在profilePage组件中通过props.location访问到当前URL的信息。
 *
 * 当你使用withRouter(profilePage)来导出组件时，profilePage组件会被包装在withRouter中。
 * 这样，无论你在哪里使用这个组件，它都会自动接收location对象作为prop。
 */
