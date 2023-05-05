import React, { useEffect } from 'react'
import { Login } from "./pages/login/Login"
import { Register } from "./pages/register/Register"
import { Product } from "./pages/Product"
import { Order } from "./pages/Order"
import { Cart } from "./pages/Cart"
import { Home } from "./pages/home/Home"
import { Error } from "./pages/Error"
import { Authorizer } from './components/Authorizer'
import { Header } from "./components/header/Header"
import { Navbar } from "./components/navbar/Navbar"
import { Footer } from "./components/footer/Footer"
import { Categorie } from "./components/categories/Categorie"

import { BrowserRouter, Route, Routes } from "react-router-dom"



import { categorieData } from "./ProductData"
import products from "./ProductData"
import { useDispatch } from "react-redux"
import { addCategorie, addProduct } from "./store/features/productSlice"


export const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(addCategorie(categorieData))
    products.map((res) => dispatch(addProduct(res)))
  }, [])


  return <div className="App"><BrowserRouter>
    <Routes>
      <Route path="/" element={<><Header /><Navbar /><Home /><Categorie /></>} />
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
    <Footer />
  </div>
}

export default App
