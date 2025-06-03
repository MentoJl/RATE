import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { IDeleteUserApiRequest, IUserApiRequest, IUserApiResponse } from "./usersApi.api.types"

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001/api/" }),
  endpoints: (builder) => ({
    getUsers: builder.query<IUserApiResponse, IUserApiRequest>({
      query: ({ _id, name, email, password, role }) => ({
        url: "users",
        method: "GET",
        params: { _id, name, email, password, role },
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
      query: (formData) => ({
        url: "users",
        method: "PATCH",
        body: formData,
      }),
    }),
    deleteUser: builder.mutation<IUserApiResponse, IDeleteUserApiRequest>({
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