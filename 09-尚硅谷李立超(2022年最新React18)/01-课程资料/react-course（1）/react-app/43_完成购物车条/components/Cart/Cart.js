import React, {useContext} from 'react';
import classes from './Cart.module.css';
import iconImg from '../../asset/bag.png';
import CartContext from "../../store/cart-context";

const Cart = () => {

    const ctx = useContext(CartContext);

    return (
        <div className={classes.Cart}>
            <div className={classes.Icon}>
                <img src={iconImg}/>
                {ctx.totalAmount === 0? null : <span className={classes.TotalAmount}>{ctx.totalAmount}</span>}
            </div>

            {ctx.totalAmount === 0 ? <p className={classes.NoMeal}>未选购商品</p> : <p className={classes.Price}>{ctx.totalPrice}</p>}

            <button className={`${classes.Button} ${ctx.totalAmount === 0 ? classes.Disabled:''}`}>去结算</button>
        </div>
    );
};

export default Cart;
