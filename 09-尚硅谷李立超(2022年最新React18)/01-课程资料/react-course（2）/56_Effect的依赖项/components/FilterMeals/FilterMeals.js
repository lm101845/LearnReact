import React, {useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import classes from './FilterMeals.module.css';

const FilterMeals = (props) => {

    const [keyword, setKeyword] = useState('');

    // 通过Effect来改造练习


    const inputChangeHandler = e => {
        setKeyword(e.target.value.trim()) ;
        // props.onFilter(keyword);
    };

    return (
        <div className={classes.FilterMeals}>
            <div className={classes.InputOuter}>
                <input
                    value={keyword}
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
