import React, { useState } from "react";
import styled from "styled-components";
import { ImageUploader, Input, Button, Toast } from 'antd-mobile';
import { connect } from 'react-redux';
import actions from '../store/actions';
import NavBarAgain from '../components/NavBarAgain';
import API from "../api";

/* 组件的样式 */
const StyledDiv = styled.div`
    .formBox {
        padding: 15px;

        .item {
            display: flex;
            align-items: center;
            margin-bottom: 10px;
            height: 55px;
            line-height: 55px;
            font-size: 14px;

            &:nth-child(1){
                height: 80px;
                line-height: 80px;
            }

            .label {
                width: 20%;
                text-align: center;
            }

            .input {
                width: 80%;
            }
        }

        .adm-space-item{
            padding-bottom: 0;
        }
    }

    .submit {
        display: block;
        margin: 0 auto;
        width: 60%;
        height: 35px;
        font-size: 14px;
    }
`;

const Update = function Update(props) {
    let { profile, queryLoginProfile, navigate } = props;

    // 定义状态
    let [username, setUsername] = useState(profile.name),
        [pic, setPic] = useState([{ url: profile.pic }]),
        [loading, setLoading] = useState(false);

    // 提交信息
    const submit = async () => {
        if (pic.length === 0) {
            Toast.show({
                icon: 'fail',
                content: '请先上传头像'
            });
            return;
        }
        username = username.trim();
        if (!username) {
            Toast.show({
                icon: 'fail',
                content: '用户名是必填项'
            });
            return;
        }
        // 通过表单校验
        setLoading(true);
        try {
            let { code } = await API.updateLoginInfo(username, pic[0].url);
            if (+code !== 0) {
                Toast.show({
                    icon: 'fail',
                    content: '修改失败，请稍后再试'
                });
            } else {
                await queryLoginProfile();
                Toast.show({
                    icon: 'success',
                    content: '修改成功'
                });
                navigate(-1);
            }
        } catch (_) { }
        setLoading(false);
    };

    // 文件上传的处理
    const limit = (file) => {
        if (file.size > 1024 * 1024) {
            Toast.show({
                icon: 'fail',
                content: '图片大小不得超过1MB'
            });
            return null;
        }
        return file;
    };
    const uploadImg = async (file) => {
        let newPic = '';
        try {
            let { code, pic } = await API.upload(file);
            if (+code !== 0) {
                Toast.show({
                    icon: 'fail',
                    content: '上传失败'
                });
            } else {
                newPic = pic;
                setPic([{ url: pic }]);
            }
        } catch (_) { }
        return { url: newPic };
    };

    return <StyledDiv>
        <NavBarAgain title="修改信息" />
        <div className="formBox">
            <div className="item">
                <div className="label">头像</div>
                <div className="input">
                    <ImageUploader
                        value={pic}
                        maxCount={1}
                        beforeUpload={limit}
                        onDelete={() => setPic([])}
                        upload={uploadImg}
                    />
                </div>
            </div>
            <div className="item">
                <div className="label">姓名</div>
                <div className="input">
                    <Input placeholder='请输入账号名称'
                        value={username}
                        onChange={setUsername} />
                </div>
            </div>
            <Button color='primary'
                className="submit"
                loading={loading}
                onClick={submit}>
                提交
            </Button>
        </div>
    </StyledDiv>;
};
export default connect(
    state => state.base,
    actions.base
)(Update);