import React, { memo } from 'react';

import Layout from '../layout';
import { InfoWrapper } from './style';

export default memo(function ProfileInfo() {
  return (
    <Layout>
      <InfoWrapper>
        <span>我的名字: coderwhy</span>
      </InfoWrapper>
    </Layout>
  )
})
