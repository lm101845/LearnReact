/**
 * @Author liming
 * @Date 2023/9/4 17:06
 **/
import React, {useReducer, useState} from 'react'

const A1 = () => {
    const initialState = {
        num: 0
    }
    const reducer = (state, action) => {
        state = {...state}
        switch (action.type) {
            case 'plus':
                state.num++;
                break;
            case 'minus':
                state.num--;
                break;
            default:
        }
        console.log(state,'state')
        return state
    }

    // let [num, setNum] = useState(0)

    let [state, dispatch] = useReducer(reducer, initialState)
    return <div>
        {/*<span>{num}</span>*/}
        <span>{state.num}</span>
        <br/>
        <button onClick={() => {
            // setNum(num + 1)
            dispatch({type:'plus'})
        }}>增加
        </button>
        <button onClick={() => {
            // setNum(num - 1)
            dispatch({type:'minus'})
        }}>减少
        </button>
    </div>
}

export default A1
