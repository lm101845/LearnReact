import React from 'react';
import Meal from "./Meal/Meal";
import classes from './Meals.module.css';

/*
*   食物列表的组件
* */
const Meals = () => {
    return (

        /*现在将滚动条设置给了Meals*/
        <div className={classes.Meals}>
            <Meal/>
            <Meal/>
            <Meal/>
            <Meal/>
            <Meal/>
            <Meal/>
            <Meal/>
            <Meal/>
            <Meal/>
            <Meal/>
        </div>
    );
};

export default Meals;
