import { useContext } from "react";
import CartContext from "../../../store/cart-context";
import MealItemForm from "./MealItemForm";
import classes from "./MealItem.module.css";

const MealItem = (props) => {
  const CartCxt = useContext(CartContext);
  const price = `$${props.price.toFixed(2)}`;
  const EnteredAmountHandler = (amount) => {
    // console.log("price is : " + price + " and Amount is : " + amount);
    CartCxt.addItems({
      id: props.id,
      name: props.name,
      price: props.price.toFixed(2),
      amount: amount,
    });
  };
  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
        <MealItemForm AddToCart={EnteredAmountHandler} />
      </div>
    </li>
  );
};

export default MealItem;
