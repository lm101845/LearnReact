import React, {useContext} from 'react';
import TestContext from "../store/testContext";

/*
*   使用Context方式二：
*       1.导入Context
*       2.使用钩子函数useContext()获取到context
*           useContext() 需要一个Context作为参数
*               它会将Context中数据获取并作为返回值返回
*
*   Xxx.Provider
*       - 表示数据的生产者，可以使用它来指定Context中的数据
*       - 通过value来指定Context中存储的数据，
*           这样一来，在该组件的所有的子组件中都可以通过Context来访问它所指定数据
*
*   当我们通过Context访问数据时，他会读取离他最近的Provider中的数据，
*       如果没有Provider，则读取Context中的默认数据
*
* */

const B = () => {

    // 使用钩子函数获取Context
    const ctx = useContext(TestContext);

    return (
        <div>
            {ctx.name} -- {ctx.age}
        </div>
    );
};

export default B;
