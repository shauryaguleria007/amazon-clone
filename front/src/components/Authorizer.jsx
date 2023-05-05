import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Loading } from "./Loading"
import { useNavigate } from "react-router-dom"
import { useAuthenticateUserQuery } from '../store/services/authService'
import { useDispatch } from "react-redux"
import { addUser } from "../store/features/userSlice"
export const Authorizer = () => {
    const { data, error } = useAuthenticateUserQuery()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [verified, setVerified] = useState(false)

    useEffect(() => {
        if (data) {
            setVerified(true)
            dispatch(addUser({
                email: "shauray.1@gmail.com",
                name: "shaurya"
            }))
        }
    }, [data])

    useEffect(() => {
        if (error) return navigate("/login")
    }, [error])
    //authenticate ,id failed navigate to login 
    if (verified) return <Outlet />
    return <Loading />
}
