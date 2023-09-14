import React from 'react'
import {useParams, withRouter} from "umi";

//获取路由参数方案1：
// const TestPage = () => {
//     let params = useParams()
//     console.log(params, 'params')
//     return (
//         <div>
//             <h2>测试页</h2>
//         </div>
//     );
// };
//
// export default TestPage;

//获取路由参数方案2：
const TestPage = ({match}) => {
    console.log(match, 'match')
    return (
        <div>
            <h2>测试页</h2>
        </div>
    );
};

export default withRouter(TestPage);
