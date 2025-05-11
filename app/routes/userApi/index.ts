import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001/api/" }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: ({ email, password }) => ({
        url: "users",
        method: "POST",
        body: { email, password },
      }),
    }),
  }),
})

export const { useGetUsersQuery } = userApi