import {FC} from "react";
// import Count from '@/components/use_state/01_base'
import Demo from "@/components/use_state/02_demo";
import DateCom from "@/components/use_state/03_date";
// import Count from "@/components/use_state/04_async";
// import Count from "@/components/use_state/05_bug";
// import UserInfo from "@/components/use_state/06_object";
// import FUpdate from "@/components/use_state/06_forceUpdate";
import InputFocus from "@/components/use_ref/01_base";
import Count from "@/components/use_ref/03_share";
import RefTimer from "@/components/use_ref/05_attention";
import Father from "@/components/use_ref/09_forwardref";



const App: FC = () => {
    // console.log('渲染了App根组件')
    return <>
        {/*<h2>这是App组件</h2>*/}
        {/*<Count/>*/}
        {/*<Demo/>*/}
        {/*<DateCom/>*/}
        {/*<Count/>*/}
        {/*<UserInfo/>*/}
        {/*<FUpdate/>*/}
        {/*<InputFocus/>*/}
        {/*<Count/>*/}
        {/*<RefTimer/>*/}
        <Father/>
    </>
}

export default App
