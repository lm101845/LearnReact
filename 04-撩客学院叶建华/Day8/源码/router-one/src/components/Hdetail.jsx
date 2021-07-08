import React, {Component} from 'react';
import url from 'url';

export default class Hdetail extends Component{
    constructor(props){
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div style={{backgroundColor: 'yellow'}}>
                hhhhhhh
            </div>
        )
    }

    componentDidMount() {
        console.log(this.props);
        console.log(url.parse(this.props.location.search,true).query);
    }
}