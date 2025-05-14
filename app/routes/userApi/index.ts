import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001/api/" }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: ({ email, password }) => ({
        url: "users",
        method: "GET",
        body: { email, password },
      }),
    }),
    createUser: builder.mutation({
      query: ({ email, password, name, role }) => ({
        url: "users",
        method: "POST",
        body: { email, password, name, role },
      }),
    }),
    editUser: builder.mutation({
      query: ({ _id, email, password, name, role }) => ({
        url: "users",
        method: "PATCH",
        body: { _id, email, password, name, role },
      }),
    }),
    deleteUser: builder.mutation({
      query: ({ _id }) => ({
        url: "users",
        method: "DELETE",
        body: { _id },
      }),
    }),
  }),
})

export const { 
  useGetUsersQuery, 
  useCreateUserMutation, 
  useEditUserMutation, 
  useDeleteUserMutation,
} = userApi