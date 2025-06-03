import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const commentsApi = createApi({
  reducerPath: "commentsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001/api/" }),
  endpoints: (builder) => ({
    getComment: builder.query<any, any>({
      query: ({ _id }) => ({
        url: `comments?productId=${_id}`,
        method: "GET",
      }),
    }),
    createComment: builder.mutation<any, any>({
      query: ({ userId, productId, text, rate }) => ({
        url: "comments",
        method: "POST",
        body: { userId, productId, text, rate },
      }),
    }),
  }),
})

export const {
  useGetCommentQuery,
  useCreateCommentMutation,
} = commentsApi