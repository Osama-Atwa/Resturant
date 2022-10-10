import { useState } from "react";
import Cart from "./Components/Cart/Cart";
import Header from "./Components/Layout/Header";
import Meals from "./Components/Meals/Meals";
import CartProvider from "./store/cartProvider";
function App() {
  const [showCart, setShowCart] = useState(false);
  const ShowCartHandler = () => {
    setShowCart(true);
  };
  const hideCartHandler = () => {
    setShowCart(false);
  };

  return (
    <CartProvider>
      {showCart && <Cart onHideCart={hideCartHandler} />}
      <Header onShowCart={ShowCartHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
