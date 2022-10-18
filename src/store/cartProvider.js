import { useReducer } from "react";
import CartContext from "./cart-context";

const cartDefault = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "Add") {
    const existingItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const existingItem = state.items[existingItemIndex];
    let updatedItems;
    let updateItem;
    if (existingItem) {
      updateItem = {
        ...existingItem,
        amount: existingItem.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[existingItemIndex] = updateItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }
    const price = action.item.price;
    const updatedTotalAmount = state.totalAmount + price * action.item.amount;
    const item = {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
    // console.log(
    //   "totalAmount : " +
    //     state.totalAmount +
    //     " price is : " +
    //     price +
    //     " amount is :" +
    //     action.item
    // );
    // console.log(item);
    return item;
  }

  if (action.type === "Remove") {
    const existingItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingItem = state.items[existingItemIndex];
    const updatedTotalAmount = state.totalAmount - existingItem.price;
    let updatedItems;
    if (existingItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
      updatedItems = [...state.items];
      updatedItems[existingItemIndex] = updatedItem;
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === "Clear") {
    return cartDefault;
  }
  return cartDefault;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartState] = useReducer(cartReducer, cartDefault);
  const addItemHandler = (item) => {
    dispatchCartState({ type: "Add", item: item });
  };
  const removeItemHandler = (id) => {
    dispatchCartState({ type: "Remove", id: id });
  };

  const clearCartHandler = () => {
    dispatchCartState({ type: "Clear" });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItems: addItemHandler,
    removeItem: removeItemHandler,
    clearCart: clearCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
