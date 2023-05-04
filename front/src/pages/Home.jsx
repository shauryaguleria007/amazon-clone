import React from 'react'
import { useDispatch } from "react-redux"
import { addUser } from "../store/features/userSlice"
export const Home = () => {
  const dispatch = useDispatch()
  // dispatch(addUser({
  //   email: "shauray.1@gmail.com",
  //   name: "shaurya"
  // }))
  return (
    <div>homH</div>
  )
}
