import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const goodsApi = createApi({
  reducerPath: "goodsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001/api/" }),
  endpoints: (builder) => ({
    getAllGoods: builder.query({
      query: () => "goods",
    }),
    createGoods: builder.mutation({
      query: (newGoods) => ({
        url: "goods",
        method: "POST",
        body: newGoods,
      }),
    }),
  }),
})

export const { 
  useGetAllGoodsQuery, 
  useCreateGoodsMutation 
} = goodsApi