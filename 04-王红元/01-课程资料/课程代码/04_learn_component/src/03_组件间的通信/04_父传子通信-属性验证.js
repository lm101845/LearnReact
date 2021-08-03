import React, { Component } from 'react';

import PropTypes from 'prop-types';

function ChildCpn(props) {
  const { name, age, height } = props;
  console.log(name, age, height);
  const { names } = props;

  return (
    <div>
      <h2>{name + age + height}</h2>
      <ul>
        {
          names.map((item, index) => {
            return <li>{item}</li>
          })
        }
      </ul>
    </div>
  )
}

class ChildCpn2 extends Component {
  // es6中的class fields写法
  static propTypes = {

  }

  static defaultProps = {

  }
}

ChildCpn.propTypes = {
  name: PropTypes.string.isRequired,
  age: PropTypes.number,
  height: PropTypes.number,
  names: PropTypes.array
}

ChildCpn.defaultProps = {
  name: "why",
  age: 30,
  height: 1.98,
  names: ["aaa", "bbb"]
}

export default class App extends Component {
  render() {
    return (
      <div>
        <ChildCpn name="why" age={18} height={1.88} names={["abc", "cba"]}/>
        <ChildCpn name="kobe" age={40} height={1.98} names={["nba", "mba"]}/>
        <ChildCpn/>
      </div>
    )
  }
}
