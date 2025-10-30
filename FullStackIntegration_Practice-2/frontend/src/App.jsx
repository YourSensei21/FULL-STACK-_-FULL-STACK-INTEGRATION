import React from 'react';
import ProductList from './components/ProductList';
import ShoppingCart from './components/ShoppingCart';
import './App.css'; 

function App() {
  return (
    <div className="App">
      <h1>My Shop</h1>
      <ProductList />
      <ShoppingCart />
    </div>
  );
}

export default App;