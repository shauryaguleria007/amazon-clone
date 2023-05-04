import React from 'react'
import { Login } from "./pages/Login"
import { Register } from "./pages/Register"
import { Product } from "./pages/Product"
import { Order } from "./pages/Order"
import { Cart } from "./pages/Cart"
import { Home } from "./pages/Home"
import { Error } from "./pages/Error"
import { Authorizer } from './components/Authorizer'
import { Header } from "./components/header/Header"



import { BrowserRouter, Route, Routes } from "react-router-dom"

export const App = () => {
  return <BrowserRouter>
    <Routes>
      <Route path="/" element={<><Header/><Home /></>} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/product/:productId" element={<Product />} />
      <Route path="/" element={<Authorizer />}>
        <Route path="/cart" element={<Cart />} />
        <Route path='/order' element={<Order />} />
      </Route >
      <Route path="*" element={<Error />} />



    </Routes>
  </BrowserRouter >
}

export default App
