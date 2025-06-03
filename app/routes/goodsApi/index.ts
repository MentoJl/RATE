import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { 
  ICreateGoodsApiRequest, 
  IGetGoodsApiRequest, 
  IGoodsApiResponse,
  IGetProductBuyIdRequest,
  IGetProductBuyIdResponse,
} from "./goodsApi.api.types"

export const goodsApi = createApi({
  reducerPath: "goodsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001/api/" }),
  endpoints: (builder) => ({
    getAllGoods: builder.query<IGoodsApiResponse, IGetGoodsApiRequest>({
      query: (props) => ({
        url: "goods",
        method: "GET",
        params: props,
      }),
    }),
    getProductById: builder.query<IGetProductBuyIdResponse, IGetProductBuyIdRequest>({
      query: ({_id}) => ({
        url: `goods/${_id}`,
        method: "GET",
      }),
    }),
    getProductByUser: builder.query<IGetProductBuyIdResponse, IGetProductBuyIdRequest>({
      query: ({_id}) => ({
        url: `goods/userId`,
        method: "GET",
        params: { _id },
      }),
    }),
    createGoods: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: 'goods',
        method: 'POST',
        body: formData,
      }),
    }),
    editGoods: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: 'goods',
        method: 'PATCH',
        body: formData,
      }),
    }),
    deleteGoods: builder.mutation<IGoodsApiResponse, IGetProductBuyIdRequest>({
      query: ({_id}) => ({
        url: "goods",
        method: "DELETE",
        body: {_id},
      }),
    }),
  }),
})

export const { 
  useGetAllGoodsQuery, 
  useGetProductByIdQuery,
  useCreateGoodsMutation,
  useGetProductByUserQuery,
  useEditGoodsMutation,
  useDeleteGoodsMutation,
} = goodsApi