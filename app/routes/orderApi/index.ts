import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001/api/" }),
  endpoints: (builder) => ({
    getOrders: builder.query<any, void>({
      query: () => ({
        url: "order",
        method: "GET",
      }),
    }),
    getOrderById: builder.query<any, string>({
      query: (id) => ({
        url: `order/${id}`,
        method: "GET",
      }),
    }),
    createOrder: builder.mutation<any, any>({
      query: (mailBody) => ({
        url: "order",
        method: "POST",
        body: mailBody,
      }),
    }),
  }),
})

export const {
  useGetOrdersQuery,
  useGetOrderByIdQuery,
  useCreateOrderMutation
} = orderApi