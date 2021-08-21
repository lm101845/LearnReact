//创建"外壳"组件App

//这里我们使用类式组件(不使用函数式组件)

//这个js文件要使用React.Component就需要引入它
import React, { Component}from "react";
import axios from "axios";
class App extends React.Component {
    getStudentData = () => {
        // axios.get('http://localhost:5000/students').then(
        axios.get('http://localhost:3000/api1/students').then(
            // package.json里面设置了以后，你这样写就给代理服务器发了(代理服务器端口号也是3000，没有跨域限制，到时候它给5000服务器发请求)
            // 服务器和服务器之间是不受跨域影响的
            response => {
                console.log('成功了',response.data);
            }, error => {
                console.log('失败了',error);
            }
        )
    }

    getCarData = () => {
        axios.get('http://localhost:3000/api2/cars').then(
              response => {
                console.log('成功了',response.data);
            }, error => {
                console.log('失败了',error);
            }
        )
    }
    render() {
        return (
            <div>
                <button onClick={this.getStudentData}>点我获取学生数据(服务器1)</button>
                <button onClick={this.getCarData}>点我获取汽车数据(服务器2)</button>
            </div>
        )
    }
}

export default App
//默认暴露App组件(必须要暴露，别人才能用)