import React from 'react';
import socketClient from 'socket.io-client';
import './App.css';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import { Login, Register, Products, Checkout, Orders, OrdersSeller,
  OrderDetails, OrderDetailsSeller, Management } from './pages';

function App() {
  const socket = socketClient('http://localhost:3001', { transports: ['websocket'] });
  socket.on('new', () => {
    console.log('I\'m connected with the back-end');
  });
  socket.emit('xablau');

  return (
    <Router>
      <Routes>
        <Route exact path="/login" element={ <Login /> } />
        <Route exact path="/register" element={ <Register /> } />
        <Route exact path="/customer/products" element={ <Products /> } />
        <Route exact path="/customer/checkout" element={ <Checkout /> } />
        <Route exact path="/customer/orders/" element={ <Orders /> } />
        <Route exact path="/customer/orders/:id" element={ <OrderDetails /> } />
        <Route exact path="/seller/orders/" element={ <OrdersSeller /> } />
        <Route exact path="/seller/orders/:id" element={ <OrderDetailsSeller /> } />
        <Route exact path="/admin/manage" element={ <Management /> } />
        <Route exact path="/" element={ <Navigate to="/login" /> } />
      </Routes>
    </Router>
  );
}

export default App;
