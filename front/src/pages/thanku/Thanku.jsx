import React, { useEffect, useState } from 'react'
import "./Thanku.css";
import { Navigate, useNavigate } from "react-router-dom"
export const Thanku = () => {
    const navigate = useNavigate()
    useEffect(() => {
        return () => navigate("/")
    }, [])
    return (
        <div className="thanku">
            <h2>Thank You for shopping with us!</h2>
            <h2> We hope to see you back...</h2>

        </div>
    )
}

