/**
 * @Author liming
 * @Date 2023/9/12 0:00
 **/
import React from 'react'
import styled from 'styled-components'
import {Button} from 'antd'
import {useSelector,useDispatch} from 'react-redux'
import * as TYPES from '../store/action-types'
const DemoBox = styled.div`
  border: 1px solid #ddd;
  padding: 20px;
  margin: 40px auto;
  width: 200px;

  .num {
    display: block;
    font-size: 20px;
    line-height: 40px;
  }
`

const Demo = () => {
    const dispatch = useDispatch()
    const {num} = useSelector(state => state.demo)
    return <DemoBox>
        <span className="num">{num}</span>
        <Button type="primary" onClick={() => {
            dispatch({
                type: TYPES.DEMO_COUNT,
                payload: 10
            })
        }}>同步按钮</Button>
    </DemoBox>
}

export default Demo
