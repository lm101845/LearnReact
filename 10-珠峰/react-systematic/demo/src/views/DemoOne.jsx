import PropTypes from 'prop-types'
const DemoOne = function DemoOne(props){
    console.log(props,'=====>打印props')
    // props.title = '哈哈哈'
    //
    /**props属性：
     * 传递进来的props属性，是只读的，只能获取，不能修改,原因：这个对象被冻结了
     *  +你就想修改的话，可以let {name} = props,修改name的值(解构赋值，props虽然不能修改，但let name = props.name，修改name是可以的)
     *  +作用：父组件(index.jsx)调用子组件(DemoOne.jsx)的时候，可以基于属性，把不同的信息传递给子组件；
     * 子组件接收相应的属性值，呈现出不同的效果，让组件的复用性更强！
     *  +虽然传递进来的属性，我们不能直接修改，但是可以做一些规则校验(子组件也是有脾气的，不符合我要求的属性，我是不要的)
     *      +属性规则校验，可以设置默认值
     *      +设置其他规则，例如：数据值格式，是否必传(依赖于官方的一个插件:prop-types)
     */
    console.log(Object.isFrozen(props),'是否被冻结')
    let {className,style,title} = props
    title = "这样修改可以的，因为没有直接修改props"
    return <div className={`demo-box ${className}`} style={style}>
        <h2 className="title">{title}</h2>
    </div>
}

/**
 * 通过把函数当做对象，设置静态的私有属性方法，来给其设置属性的校验规则
 *
 */
DemoOne.defaultProps = {
    x:0
}

//后面也可以用ts来写
DemoOne.propTypes = {
    title:PropTypes.string.isRequired,
    x:PropTypes.number
}
export default DemoOne
