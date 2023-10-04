/**
 * @Author liming
 * @Date 2023/9/6 22:16
 **/
import React from "react";
import styled from "styled-components";
import {Link} from 'react-router-dom';
import {RightOutline} from 'antd-mobile-icons';
import {Toast} from 'antd-mobile';
import NavBarAgain from '../components/NavBarAgain';
import {connect} from 'react-redux'
import action from '../store/action'
import _ from '../assets/utils'

/* 组件的样式 */
const StyledDiv = styled.div`
  .baseInfo {
    box-sizing: border-box;
    margin: 40px 0;

    .pic {
      display: block;
      margin: 0 auto;
      width: 172px;
      height: 172px;
      border-radius: 50%;
    }

    .name {
      line-height: 100px;
      font-size: 36px;
      text-align: center;
      color: #000;
    }
  }

  .tab {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 30px;
    height: 80px;
    line-height: 80px;
    font-size: 28px;
    color: #000;
    border-bottom: 2px solid #EEE;
  }
`;

const Personal = function Personal(props) {
    // console.log(props,'personal下的props')
    let {info,clearStoreList,clearUserInfo,navigate} = props
    //info登录信息肯定有，没有的话就进不来这个页面

    //退出登录
    const signout = ()=>{
        //清除redux中的信息
        clearUserInfo()
        /**
         * 当你调用clearUserInfo()函数时，它会返回一个动作对象，这个动作对象会被发送给Redux store。
         * 然后，Redux store会更新其状态以反映这个动作。在这个例子中，由于clearUserInfo动作将info设置为null，
         * 所以当Redux store接收到这个动作时，它会更新其状态，将base.info设置为null，从而清空了info。
         */
        clearStoreList()
        //清除token
        _.storage.remove('tk')
        //提示
        Toast.show({
            icon:'success',
            content:'您已安全退出'
        })
        //跳转
        navigate('/login?to=/personal',{replace:true})
    }

    return <StyledDiv>
        <NavBarAgain title="个人中心"/>
        <div className="baseInfo">
            <Link to='/update'>
                <img className="pic" src={info.pic} alt=""/>
                <p className="name">{info.name}</p>
            </Link>
        </div>
        <div>
            <Link to='/store' className="tab">
                我的收藏
                <RightOutline/>
            </Link>
            <div className="tab" onClick={signout}>
                退出登录
                <RightOutline/>
            </div>
        </div>
    </StyledDiv>;
};
export default connect(state => state.base,
    {
        clearUserInfo: action.base.clearUserInfo,
        clearStoreList:action.store.clearStoreList
    })(Personal);
