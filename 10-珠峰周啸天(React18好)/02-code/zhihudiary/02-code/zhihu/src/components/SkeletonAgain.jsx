/**
 * @Author liming
 * @Date 2023/9/7 11:46
 **/
import React from 'react'
import {Skeleton} from "antd-mobile";
import './SkeletonAgain.less'

const SkeletonAgain = () => {
    return <div className="skeleton-again-box">
        <Skeleton.Title animated />
        <Skeleton.Paragraph lineCount={5} animated />
    </div>
}

export default SkeletonAgain
