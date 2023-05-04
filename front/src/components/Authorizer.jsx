import React from 'react'
import { Outlet } from 'react-router-dom'
import { Loading} from "./Loading"

export const Authorizer = () => {
    //authenticate ,id failed navigate to login 
    return <Outlet />
    return <Loading />
}
