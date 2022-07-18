import React from 'react';
import Meal from "./Meal/Meal";
import classes from './Meals.module.css';

/*
*   食物列表的组件
* */
const Meals = (props) => {
    return (

        /*现在将滚动条设置给了Meals*/
        <div className={classes.Meals}>
            {props.mealsData.map(item =>
                <Meal
                    key={item.id}
                    meal={item}
                    onAdd={props.onAdd}
                    onSub={props.onSub}
                />
            )}
        </div>
    );
};

export default Meals;
