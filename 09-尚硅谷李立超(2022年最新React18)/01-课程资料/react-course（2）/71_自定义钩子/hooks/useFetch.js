/*
*   React中的钩子函数只能在函数组件或自定钩子中调用
*       当我们需要将React中钩子函数提取到一个公共区域时，就可以使用自定义钩子
*
*   自定义钩子其实就是一个普通函数，只是它的名字需要使用use开头
* */
import {useCallback, useState} from "react";

export default function useFetch() {
    const [data, setData] = useState([]);
    // 添加一个state来记录数据是否正在加载,false表示没有加载数据，true表示加载
    const [loading, setLoading] = useState(false);
    // 创建一个state来记录错误信息
    const [error, setError] = useState(null);

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const res = await fetch('http://localhost:1337/api/students');
            //判断请求是否加载成功
            if (res.ok) {
                const data = await res.json();
                setData(data.data);
            } else {
                throw new Error('数据加载失败！');
            }
        } catch (e) {
            setError(e);
        } finally {
            setLoading(false);
        }
    }, []);


    // 设置返回值
    return {
        loading,
        error,
        data,
        fetchData
    };
}


