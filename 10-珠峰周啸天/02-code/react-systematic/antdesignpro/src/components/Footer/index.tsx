import { DefaultFooter } from '@ant-design/pro-components';
import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      copyright={`${currentYear}珠峰培训讲师出品`}
    />
  );
};

export default Footer;
