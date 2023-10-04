import React from "react";
import './App.less';

export default class App extends React.Component {
    componentDidMount() {
        document.addEventListener('click', () => {
            console.log('native document bubble');
        });
        document.addEventListener('click', () => {
            console.log('native document capture');
        }, true);

        this.outer.addEventListener('click', () => {
            console.log('native outer bubble');
        });
        this.outer.addEventListener('click', () => {
            console.log('native outer capture');
        }, true);

        this.inner.addEventListener('click', (ev) => {
            console.log('native inner bubble');
            // ev.stopPropagation(); //只会阻止原生的，但是决定了React在root上加的方法，也不会再执行了，所有合成事件(冒泡阶段也不会执行)
        });
        this.inner.addEventListener('click', () => {
            console.log('native inner capture');
        }, true);
    }

    syntheticOuterBubble = () => {
        console.log('synthetic outer bubble');
    };
    syntheticOuterCapture = () => {
        console.log('synthetic outer capture');
    };

    syntheticInnerBubble = (syntheticEvent) => {
        console.log('synthetic inner bubble');
        // syntheticEvent.stopPropagation(); //阻止合成事件/原生事件冒泡「在root bubble阶段触发」
        // syntheticEvent.nativeEvent.stopPropagation(); //只会阻止原生事件冒泡，合成事件还会继续传播
    };
    syntheticInnerCapture = () => {
        console.log('synthetic inner capture');
    };

    render() {
        return <div className="outer"
            ref={x => this.outer = x}
            onClick={this.syntheticOuterBubble}
            onClickCapture={this.syntheticOuterCapture}>

            <div className="inner"
                ref={x => this.inner = x}
                onClick={this.syntheticInnerBubble}
                onClickCapture={this.syntheticInnerCapture}>
            </div>
        </div>;
    }
};