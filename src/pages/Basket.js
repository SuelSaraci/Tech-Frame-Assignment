import React from "react";
import { Link } from "react-router-dom";
import "../components/styles/BasketCard.css";

const Basket = ({ basketItems, setBasketItems }) => {
  const removeItem = (itemIndex) => {
    const updatedItems = [...basketItems];
    updatedItems.splice(itemIndex, 1);
    setBasketItems(updatedItems);
  };

  const totalPrice = basketItems.reduce((total, item) => {
    return total + item.price;
  }, 0);

  return (
    <div className="cart-page">
      <h1>Cart</h1>
      {basketItems.length === 0 && <p>Your cart is empty.</p>}
      {basketItems.map((item, index) => (
        <div key={index} className="cart-item">
          <img src={item.image} alt={item.name} />
          <div>
            <h2>{item.name}</h2>
            <p>Price: ${item.price.toFixed(2)}</p>
            <button onClick={() => removeItem(index)}>Remove</button>
          </div>
        </div>
      ))}
      {basketItems.length > 0 && (
        <div className="cart-total">
          <p>Total: ${totalPrice.toFixed(2)}</p>
          <Link to="/invoice">
            <button>Checkout</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Basket;
