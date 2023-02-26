import React from "react";
import { Products } from "../data/products";
import "./styles/ProductCard.css";
import "./styles/Navbar.css";

const Product = ({ name, price, vat, discount, image, onAddToBasket }) => {
  return (
    <div className="product">
      <img src={image} alt={name} />
      <div className="product-details">
        <h2>{name}</h2>
        <p>Price: ${price.toFixed(2)}</p>
        <p>VAT: {vat}%</p>
        {discount && <p>Discount: ${discount.toFixed(2)}</p>}
        <button onClick={onAddToBasket}>Add to basket</button>
      </div>
    </div>
  );
};

const ProductList = ({ basketItems, setBasketItems }) => {
  const addToBasket = (product) => {
    setBasketItems([...basketItems, product]);
  };

  return (
    <>
      <div className="product-list">
        {Products.map((product) => (
          <Product
            key={product.name}
            name={product.name}
            price={product.price}
            vat={product.vat}
            discount={product.discount}
            image={product.image}
            onAddToBasket={() => addToBasket(product)}
          />
        ))}
      </div>
    </>
  );
};

export default ProductList;
