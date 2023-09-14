import { Dropdown } from 'antd';
import React from 'react';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import classNames from 'classnames';

const HeaderDropdown = ({ overlayClassName: cls, ...restProps }) => {
  const className = useEmotionCss(({ token }) => {
    return {
      [`@media screen and (max-width: ${token.screenXS})`]: {
        width: '100%',
      },
    };
  });
  return <Dropdown
    overlayClassName={classNames(className, cls)}
    getPopupContainer={(target)=>target.parentElement || document.body}
    {...restProps} />;
};

export default HeaderDropdown;
