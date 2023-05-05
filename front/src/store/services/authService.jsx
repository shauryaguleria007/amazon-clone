import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const authApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3000/auth",
        withCredentials: true,
        credentials: 'include',
        prepareHeaders: (Headers) => {
            const token = localStorage.getItem("token")
            if (!token) return Headers
            Headers.set("Authorization", token)
            return Headers
        }
    }),
    endpoints: (builder) => ({
        authenticateUser: builder.query({
            query: () => "/protected",
            keepUnusedDataFor: 0.001,


        }),
        registerUser: builder.mutation({
            query: (body) => ({
                url: "/signup",
                method: "POST",
                body
            }),
            keepUnusedDataFor: 0.001,
        }),
        loginUser: builder.mutation({
            query: (body) => ({
                url: "/signin",
                method: "POST",
                body
            })
        })
    })
})

export default authApi
export const { useRegisterUserMutation, useLoginUserMutation, useAuthenticateUserQuery } = authApi