/**
 * @Author liming
 * @Date 2023/9/6 22:16
 **/
import React, {useState} from "react";
import styled from "styled-components";
import {ImageUploader, Input, Button, Toast} from 'antd-mobile';

import NavBarAgain from '../components/NavBarAgain';
import {connect} from 'react-redux'
import action from '../store/action'
import API from '../api'

/* 组件的样式 */
const StyledDiv = styled.div`
  .formBox {
    padding: 30px;

    .item {
      display: flex;
      align-items: center;
      margin-bottom: 20px;
      height: 110px;
      line-height: 110px;
      font-size: 28px;

      &:nth-child(1) {
        height: 160px;
        line-height: 160px;
      }

      .label {
        width: 20%;
        text-align: center;
      }

      .input {
        width: 80%;
      }
    }

    .adm-space-item {
      padding-bottom: 0;
    }
  }

  .submit {
    display: block;
    margin: 0 auto;
    width: 60%;
    height: 70px;
    font-size: 28px;
  }
`;

const Update = function Update(props) {
    console.log(props, 'update的props')
    let {info, queryUserInfoAsync, navigate} = props
    /*定义状态*/
    let [pic, setPic] = useState([{url: info.pic}])
    let [userName, setUserName] = useState(info.name)
    console.log(pic, '打印Pic')
    /*图片上传*/
    const limitImage = (file) => {
        console.log(file, 'file')
        let limit = 1024 * 1024
        if (file.size > limit) {
            Toast.show({
                icon: 'fail',
                content: '图片必须在1MB内'
            })
            return null
        }
        return file
    }
    const uploadImage = async (file) => {
        console.log(file, '开始上传file')
        let temp;
        try {
            let {code, pic} = await API.upload(file)
            if (+code !== 0) {
                Toast.show({
                    icon: 'fail',
                    content: '上传失败'
                })
                return
            }
            temp = pic
            setPic([{
                url: pic
                //从服务器获取的地址
            }])
        } catch (_) {
        }
        //这个方法要返回一个对象！！
        return {
            url: temp
        }
    }

    /*提交信息*/
    const submit = async (props) => {
        //先做表单校验
        if (pic.length === 0) {
            Toast.show({
                icon: 'fail',
                content: '请先上传图片'
            })
            return
        }

        if (userName.trim() === '') {
            Toast.show({
                icon: 'fail',
                content: '请先输入账号'
            })
            return
        }

        //获取信息，发送请求
        let [{url}] = pic
        try {
            let {code} = await API.updateLoginInfo(userName.trim(), url)
            if (+code !== 0) {
                Toast.show({
                    icon: 'fail',
                    content: '修改失败，请稍后再试'
                });
            }
            Toast.show({
                icon: 'success',
                content: '修改成功'
            });
            queryUserInfoAsync()    //同步redux中的信息
            navigate(-1);
        } catch (_) {
        }
    }
    return <StyledDiv>
        <NavBarAgain title="修改信息"/>
        <div className="formBox">
            <div className="item">
                <div className="label">头像</div>
                <div className="input">
                    <ImageUploader
                        maxCount={1}
                        value={pic}
                        onDelete={() => {
                            setPic([])
                        }}
                        beforeUpload={limitImage}
                        upload={uploadImage}
                    />
                </div>
            </div>
            <div className="item">
                <div className="label">姓名</div>
                <div className="input">
                    <Input placeholder='请输入账号名称' value={userName} onChange={val => {
                        console.log('onChange事件触发了')
                        setUserName(val)
                    }}/>
                </div>
            </div>
            <Button color='primary' className="submit" onClick={submit}> 提交</Button>
        </div>
    </StyledDiv>;
};
export default connect(state => state.base, action.base)(Update);
