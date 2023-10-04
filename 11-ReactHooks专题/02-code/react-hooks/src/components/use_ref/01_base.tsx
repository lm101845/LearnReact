/**
 * @Author liming
 * @Date 2023/10/4 9:43
 **/

import React, {useRef} from 'react'

const InputFocus:React.FC = () => {
    const iptRef = useRef<HTMLInputElement>(null!)
    //在这个代码中，null!是一个非空断言，它告诉TypeScript：“我知道这里看起来是null，但实际上它不会是null，你放心吧”。
    //只有加了泛型才有类型提示

    const getFocus = ()=> {
        // console.log(iptRef.current)
        iptRef.current.focus()
    }

    return <div>
        <input type="text" ref={iptRef}/>
        <button onClick={getFocus}>获取焦点</button>
    </div>
}

export default InputFocus
