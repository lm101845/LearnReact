/**
 * @Author liming
 * @Date 2023/5/16 17:50
 **/

/**
 * createElement创建虚拟DOM对象
 * @param ele
 * @param props
 * @param children
 */
export function createElement(ele,props,...children){
    let virtualDOM = {
        $$typeof:Symbol('react.element'),
        key: null,
        ref:null,
        type:null,
        props:{}
    }
    let len = children.length
    virtualDOM.type = ele
    if(props !== null){
        virtualDOM.props = {...props}
    }
    if(len === 1){
        virtualDOM.props.children = children[0]
    }
    if(len > 1) {
        virtualDOM.props.children = children
    }
    return virtualDOM
}
