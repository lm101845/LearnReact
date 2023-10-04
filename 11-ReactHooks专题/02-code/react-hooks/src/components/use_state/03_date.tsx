/**
 * @Author liming
 * @Date 2023/10/2 7:27
 **/

import React, {useState} from 'react'

const DateCom: React.FC = () => {
    // const [date] = useState({ year: 2023, month: 9, day: 11 })
    const [date, setDate] = useState(() => {
        console.log('userState函数执行了')
        const dt = new Date()
        return { year: dt.getFullYear(), month: dt.getMonth() + 1, day: dt.getDate() }
    })

    return (
        <>
            <h1>今日信息：</h1>
            <p>年份：{date.year}年</p>
            <p>月份：{date.month}月</p>
            <p>日期：{date.day}日</p>
        </>
    )
}

export default DateCom
