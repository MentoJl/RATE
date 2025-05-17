import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { IGoodsApiRequest, IGoodsApiResponse } from "./goodsApi.api.types"

export const goodsApi = createApi({
  reducerPath: "goodsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001/api/" }),
  endpoints: (builder) => ({
    getAllGoods: builder.query({
      query: () => "goods",
    }),
    createGoods: builder.mutation<IGoodsApiResponse, IGoodsApiRequest>({
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