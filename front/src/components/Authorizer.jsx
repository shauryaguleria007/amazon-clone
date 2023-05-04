import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Loading } from "./Loading"
import { getUser } from '../store/store'
import { useNavigate } from "react-router-dom"

export const Authorizer = () => {
    const user = getUser()
    const navigate = useNavigate()
    const [verified, setVerified] = useState(false)
    useEffect(() => {
        if (!user) return navigate("/login")
        setVerified(true)
    }, [user])

    //authenticate ,id failed navigate to login 
    if (verified) return <Outlet />
    return <Loading />
}
