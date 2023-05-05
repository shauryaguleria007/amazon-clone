import React, { useState } from 'react'
import "./Product.css"
import { useDispatch } from "react-redux"
import { addToBasket } from "../../store/features/userSlice"

export const Product = ({ id, title, price, image, rating, reviews }) => {
  const dispatch = useDispatch()
  const handelCart = () => {
    dispatch(addToBasket({
      quantity: 1,
      id
    }))
  }
  return (
    <div className='product'>
      <div className="product__info">
        <p>{title}</p>
        <p className="product__price">
          <small>Rs</small>
          <strong>{price}</strong>
        </p>
        <div className="product__rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p key={i}>⭐</p>
            ))}
          <span className="product__reviews">({reviews})</span>
        </div>
      </div>
      <img className="product__image" src={image} alt="Product" />
      <button className="product__button" onClick={() => handelCart() }>
      Add to basket
    </button>
    </div >
  )
}
