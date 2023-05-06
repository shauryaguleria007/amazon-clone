
import React, { createContext, useContext, useState } from "react"



export const GlobalContext = createContext()

export const GlobalContextProvider = ({ children }) => {
    const [searchField, setSearchField] = useState("")


    const inputHandler = (e) => {
        setSearchField(e.target.value)
    }

    return <GlobalContext.Provider value={{
        searchField,
        inputHandler
    }}>
        {children}
    </GlobalContext.Provider>
}


export const useGlobalContext = () => {
    return useContext(GlobalContext)
}