import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from '../features/cart/cartSlice';

function ShoppingCart() {
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const handleRemove = (id) => {
    dispatch(removeItem({ id }));
  };

  const handleQuantityChange = (e, id) => {
    const quantity = parseInt(e.target.value, 10);
    dispatch(updateQuantity({ id, quantity }));
  };

  return (
    <div>
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="cart-list">
          {cartItems.map(item => (
            <div key={item.id} className="cart-item">
              <span>{item.name} (${item.price})</span>
              <input
                type="number"
                value={item.quantity}
                onChange={(e) => handleQuantityChange(e, item.id)}
                min="0"
              />
              <button onClick={() => handleRemove(item.id)}>Remove</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ShoppingCart;