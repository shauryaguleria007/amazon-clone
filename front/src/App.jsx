import React, { useEffect } from 'react'
import { Login } from "./pages/login/Login"
import { Register } from "./pages/register/Register"
import { Product } from "./pages/product/Product"
import { Order } from "./pages/Order"
import { Cart } from "./pages/Cart/Cart"
import { Home } from "./pages/home/Home"
import { Error } from "./pages/error/Error"
import { Authorizer } from './components/Authorizer'
import { Header } from "./components/header/Header"
import { Navbar } from "./components/navbar/Navbar"
import { Footer } from "./components/footer/Footer"
import { Categorie } from "./components/categories/Categorie"
import { Payment } from "./pages/payment/Payment"
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom"
import {addCategorie, addProduct,  resetProducts } from "./store/features/productSlice"
import { resetUser } from "./store/features/userSlice"
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { Thanku } from "./pages/thanku/Thanku"
import { v4 as uuidv4 } from 'uuid';
import { categorieData } from "./ProductData"
import da from "./ProductData"

const stripePromise = loadStripe(
  'pk_test_51JdCsbSDjgMnau9ncKpDOaddNIWtdhVTTV92V4ShkTzLec033vWcRQjqEUByb1s4D6vmPmH6oMK0bkBJyBlRsStp00wQV1pNuX'
);
import { useDispatch } from "react-redux"
export const App = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(addCategorie(categorieData))
    da?.map((res) => dispatch(addProduct({ ...res, id: uuidv4() })))
  }, [])

  return <div className="App"><BrowserRouter>
    <Routes>
      <Route path="/" element={<><Header /><Navbar /><Home /><Categorie /></>} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/product/:productId" element={<Product />} />
      <Route path="/" element={<Authorizer />}>
        <Route path="/payment" element={<Elements stripe={stripePromise}>
          <Payment />
        </Elements>} />
        <Route path='/order' element={<Order />} />
        <Route path='/thanku' element={<><Header /><Thanku /></>} />

      </Route >
      <Route path="/cart" element={<><Header /><Navbar /><Cart /></>} />
      <Route path="/logout" element={<Logout />} />
      <Route path="*" element={<><Header /><Error /></>} />
    </Routes>
  </BrowserRouter >
    <Footer />
  </div>
}



const Logout = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  useEffect(() => {
    localStorage.removeItem("token")
    dispatch(resetUser())

    return navigate("/")
  }, [])
  return <div className=""></div>
}

export default App
