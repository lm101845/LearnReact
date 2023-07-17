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
            // ev.stopPropagation();
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
        console.log('synthetic inner bubble', syntheticEvent);
        // syntheticEvent.stopPropagation();
        // syntheticEvent.nativeEvent.stopPropagation();
        // syntheticEvent.nativeEvent.stopImmediatePropagation();
        syntheticEvent.persist();
        setTimeout(() => {
            console.log(syntheticEvent);
        }, 1000);
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