const DemoOne = function DemoOne(props){
    console.log(props,'=====>打印props')
    return <div className="demo-box" style={{fontSize:props.x + 'px'}}>我是DemoOne</div>
}

export default DemoOne
