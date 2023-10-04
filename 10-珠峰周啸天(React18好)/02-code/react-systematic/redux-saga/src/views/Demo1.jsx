/**
 * @Author liming
 * @Date 2023/9/12 0:00
 **/
import React from 'react'
import styled from 'styled-components'
import {Button} from 'antd'
import {connect} from 'react-redux'

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

const Demo = (props) => {
    console.log(props, 'demo-props')
    let {num, dispatch} = props
    return <DemoBox>
        <span className="num">{num}</span>
        <Button type="primary" onClick={() => {
            dispatch({
                type: 'DEMO_COUNT',
                payload: 10
            })
        }}>按钮</Button>
    </DemoBox>
}

export default connect(state => state.demo)(Demo)
