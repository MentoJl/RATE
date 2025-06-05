import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const paymentApi = createApi({
  reducerPath: "paymentApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001/api/" }),
  endpoints: (builder) => ({
    getPayments: builder.query<any, void>({
      query: () => ({
        url: "payment",
        method: "GET",
      }),
    }),
    createPayment: builder.mutation<any, any>({
      query: (body) => ({
        url: "payment",
        method: "POST",
        body: body,
      }),
    }),
  }),
})

export const {
  useCreatePaymentMutation,
} = paymentApi