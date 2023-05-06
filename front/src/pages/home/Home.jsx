import React, { useState, useEffect } from 'react'
import "./Home.css"
import { useDispatch } from "react-redux"
import { addUser } from "../../store/features/userSlice"
import { Slider } from "../../components/slider/Slider"
import { useGlobalContext } from "../../context/globalContext"
import { Product } from "../../components/product/Product"
import { getProducts } from "../../store/store"
import { useAuthenticateUserQuery } from '../../store/services/authService'
import { addCategorie, addProduct, resetProducts } from "../../store/features/productSlice"
import { categorieData } from "../../ProductData"
import da from "../../ProductData"
export const Home = () => {
  const products = getProducts()
  const [show, setShow] = useState(false);
  function loadMore() {
    setShow((prevState) => !prevState);
  }
  const dispatch = useDispatch()
  const { searchField } = useGlobalContext()
  const { data } = useAuthenticateUserQuery()


  useEffect(() => {
    dispatch(addCategorie(categorieData))
    da?.map((res) => dispatch(addProduct(res)))
    return ()=>{
      dispatch(resetProducts())// bad coding 
    }
  }, [])

  useEffect(() => {
    if (data) {
      dispatch(addUser({
        email: "shauray.1@gmail.com",
        name: "shaurya"
      }))
    }
  }, [data])
  const filteredData = products?.filter((el) => {
    if (searchField === '') {
      return el;
    }
    else {
      return el.title.toLowerCase().includes(searchField);
    }

  })
  const ProductComponent = filteredData?.map((element, index) => {
    if (show) {
      return (
        <Product
          key={index}
          id={index}
          title={element.title}
          price={element.price}
          image={element.image}
          rating={element.rating}
          reviews={element.reviews}
        />
      )
    }
    else {
      if (!element.visibility) {
      } else {
        return (
          <Product
            key={index}
            id={index}
            title={element.title}
            price={element.price}
            image={element.image}
            rating={element.rating}
            reviews={element.reviews}
          />
        );
      }
    }
  })
  return <><div className="home">
    <div className="home_container">
      <Slider />
      <div className="home__grid">
        {
          ProductComponent
        }
      </div>
    </div>
  </div>
    <a onClick={loadMore} className="load-more-btn block">{`${show ? 'See less results' : 'See all results'
      }`}</a>
  </>

}
