import { configureStore } from "@reduxjs/toolkit"
import { userApi } from "./routes/userApi"
import { goodsApi } from "./routes/goodsApi"
import { mailApi } from "./routes/mailApi"
import { orderApi } from "./routes/orderApi"
import { commentsApi } from './routes/commentsApi'
import { paymentApi } from "./routes/paymentApi"

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [goodsApi.reducerPath]: goodsApi.reducer,
    [mailApi.reducerPath]: mailApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [commentsApi.reducerPath]: commentsApi.reducer,
    [paymentApi.reducerPath]: paymentApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
    .concat(userApi.middleware)
    .concat(goodsApi.middleware)
    .concat(mailApi.middleware)
    .concat(orderApi.middleware)
    .concat(commentsApi.middleware)
    .concat(paymentApi.middleware)
})