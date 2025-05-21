import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { 
  ICreateGoodsApiRequest, 
  IGetGoodsApiRequest, 
  IGoodsApiResponse,

} from "./goodsApi.api.types"

export const goodsApi = createApi({
  reducerPath: "goodsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001/api/" }),
  endpoints: (builder) => ({
    getAllGoods: builder.query<IGoodsApiResponse, IGetGoodsApiRequest>({
      query: ({searchValue}) => ({
        url: "goods",
        method: "GET",
        params: { searchValue },
      }),
    }),
    createGoods: builder.mutation<IGoodsApiResponse, ICreateGoodsApiRequest>({
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