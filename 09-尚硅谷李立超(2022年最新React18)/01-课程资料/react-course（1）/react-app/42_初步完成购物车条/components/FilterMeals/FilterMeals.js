import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import classes from './FilterMeals.module.css';

const FilterMeals = (props) => {

    const inputChangeHandler = e => {
        const keyword = e.target.value.trim();
        props.onFilter(keyword);
    };

    return (
        <div className={classes.FilterMeals}>
            <div className={classes.InputOuter}>
                <input
                    onChange={inputChangeHandler}
                    className={classes.SearchInput}
                    type="text"
                    placeholder={"请输入关键字"}/>
                <FontAwesomeIcon
                    className={classes.SearchIcon}
                    icon={faSearch}/>
            </div>
        </div>
    );
};

export default FilterMeals;
