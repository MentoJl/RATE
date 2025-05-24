import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { IMailApiResponse, ISendMailApiRequest } from "./mailApi.api.types"

export const mailApi = createApi({
  reducerPath: "mailApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001/api/" }),
  endpoints: (builder) => ({
    sendMail: builder.mutation<IMailApiResponse, FormData>({
      query: (mailBody) => ({
        url: "mail",
        method: "POST",
        body: mailBody,
      }),
    }),
  }),
})

export const {
  useSendMailMutation
} = mailApi