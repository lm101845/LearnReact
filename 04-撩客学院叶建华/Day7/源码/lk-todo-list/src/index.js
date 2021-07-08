import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Todo from './components/Todo';
import {Provider} from 'react-redux'
import store from './store'

const App = (
    <Provider store={store}>
        <Todo/>
    </Provider>
);

ReactDOM.render(App, document.getElementById('root'));

