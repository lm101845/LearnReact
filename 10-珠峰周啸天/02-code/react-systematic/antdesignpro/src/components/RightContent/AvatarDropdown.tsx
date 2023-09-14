/**
 * @Author liming
 * @Date 2023/9/14 13:58
 **/
import {LogoutOutlined, SettingOutlined, UserOutlined} from '@ant-design/icons';
import {useEmotionCss} from '@ant-design/use-emotion-css';
import {useModel} from '@umijs/max';
import {Avatar, Spin} from 'antd';
import React, {useCallback} from 'react';
import HeaderDropdown from '../HeaderDropdown';
import {setAlpha} from "@ant-design/pro-provider";


//用户名
const Name = () => {
  const {initialState} = useModel('@@initialState');
  const currentUser = initialState?.currentUser;

  //组件样式
  const nameClassName = useEmotionCss(({token}) => {
    return {
      width: '70px',
      height: '48px',
      overflow: 'hidden',
      lineHeight: '48px',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      [`@media only screen and (max-width: ${token.screenMD}px)`]: {
        display: 'none'
      },
    }
  })
  return <span className={`${nameClassName} anticon`}>{currentUser?.name}</span>;
};

//头像logo
const AvatarLogo = () => {
  const {initialState} = useModel('@@initialState');
  const currentUser = initialState?.currentUser;

  const avatarClassName = useEmotionCss(({token}) => {
    return {
      marginRight: '8px',
      color: token.colorPrimary,
      verticalAlign: 'top',
      background: setAlpha(token.colorBgContainer, 0.85),
      [`@media only screen and (max-width: ${token.screenMD}px)`]: {
        margin: 0
      },
    }
  })
  return <Avatar size="small" className={avatarClassName} src={currentUser?.avatar} alt={"avatar"}></Avatar>
}

const AvatarDropdown = () => {
  //组件样式
  const actionClassName = useEmotionCss(({token}) => {
    return {
      display: 'flex',
      height: '48px',
      marginLeft: 'auto',
      overflow: 'hidden',
      alignItems: 'center',
      padding: '0 8px',
      cursor: 'pointer',
      borderRadius: token.borderRadius,
      '&:hover': {
        backgroundColor: token.colorBgTextHover,
      },
    };
  });

  //登录信息处理
  const loading = (
    <span className={actionClassName}>
      <Spin
        size="small"
        style={{
          marginLeft: 8,
          marginRight: 8,
        }}
      />
    </span>
  );

  const {initialState, setInitialState} = useModel('@@initialState');
  const currentUser = initialState ?.currentUser

  if (!currentUser) {
    return loading;
  }

  //menu处理
  const menuItems = [
    {
      key: 'center',
      icon: <UserOutlined/>,
      label: '个人中心',
    },
    {
      key: 'settings',
      icon: <SettingOutlined/>,
      label: '个人设置',
    },
    {
      type:'divider'
    },
    {
      key: 'logout',
      icon: <LogoutOutlined/>,
      label: '退出登录',
    },
  ];

  const onMenuClick = useCallback(
    ({key}) => {
      if (key === 'logout') {
        //退出
        return;
      }
      //点击其他
    },
    [setInitialState],
  );

  return (
    <HeaderDropdown
      menu={{
        selectedKeys: [],
        onClick: onMenuClick,
        items: menuItems,
      }}
    >
      <span className={actionClassName}>
        <AvatarLogo/>
        <Name/>
      </span>
    </HeaderDropdown>
  );
};

export default AvatarDropdown
