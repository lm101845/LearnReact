/**
 * @Author liming
 * @Date 2023/8/2 16:50
 **/
import styled from 'styled-components'
import {colorRed,colorBlue,titleSize} from './common'
/**
 * 基于styled.标签名这种方式编写需要的样式
 *  +样式要写在es6模板字符串中
 *  +返回并且导出的结果是一个自定义组件
 *
 */
export const NavBox = styled.nav`
  background: lightblue;
  width:300px;
  .title{
    font-size: ${titleSize};
    color:${colorBlue};
    line-height: 40px;
    &:hover{
      color:green
    }
  }
`
