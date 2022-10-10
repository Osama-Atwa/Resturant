import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import Modal from "../UI/Modal";
import { useContext } from "react";
import CartItem from "./CartItem";

const Cart = (props) => {
  const CartCXT = useContext(CartContext);
  const totalAmount = `$${CartCXT.totalAmount.toFixed(2)}`;
  const hasItems = CartCXT.items.length > 0;

  const onRemoveHandler = (id) => {
    CartCXT.removeItem(id);
  };

  const onAddHandler = (item) => {
    CartCXT.addItems({ ...item, amount: 1 });
  };

  const CartItems = (
    <ul className={classes["cart-items"]}>
      {CartCXT.items.map((meal) => {
        return (
          <CartItem
            key={meal.id}
            name={meal.name}
            price={+meal.price}
            amount={meal.amount}
            onRemove={onRemoveHandler.bind(null, meal.id)}
            onAdd={onAddHandler.bind(null, meal)}
          />
        );
      })}
    </ul>
  );

  return (
    <Modal onClose={props.onHideCart}>
      {CartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onHideCart}>
          Close
        </button>
        {hasItems && <button className={classes.button}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;
