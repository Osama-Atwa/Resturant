import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import Modal from "../UI/Modal";
import React, { useContext, useState } from "react";
import CartItem from "./CartItem";
import CheckOut from "./CheckOut";

const Cart = (props) => {
  const [isCheckOut, setIsCheckOut] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmitted, setIsSubmitted] = useState(false);

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
  const onOrderHandler = () => {
    setIsCheckOut(true);
  };

  const onConfirmHandler = async (userData) => {
    setIsSubmitting(true);
    await fetch(
      "https://react-http-34f49-default-rtdb.europe-west1.firebasedatabase.app/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          items: CartCXT.items,
        }),
      }
    );
    setIsSubmitting(false);
    setIsSubmitted(true);
    CartCXT.clearCart();
  };
  const ButtonAction = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onHideCart}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={onOrderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const CartItemsContent = (
    <React.Fragment>
      {CartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckOut && (
        <CheckOut onConfirm={onConfirmHandler} OnCancel={props.onHideCart} />
      )}
      {!isCheckOut && ButtonAction}
    </React.Fragment>
  );
  const IsSubmittingContent = (
    <React.Fragment>
      <p>The Order is Being Processed...</p>
    </React.Fragment>
  );
  const DidSubmittedContent = (
    <React.Fragment>
      <p>Your Order is Submitted Successfully!</p>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onHideCart}>
          Close
        </button>
      </div>
    </React.Fragment>
  );
  return (
    <Modal onClose={props.onHideCart}>
      {!isSubmitting && !didSubmitted && CartItemsContent}
      {isSubmitting && IsSubmittingContent}
      {!isSubmitting && didSubmitted && DidSubmittedContent}
    </Modal>
  );
};

export default Cart;
