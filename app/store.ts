import { configureStore } from "@reduxjs/toolkit"
import { userApi } from "./routes/userApi"
import { goodsApi } from "./routes/goodsApi"
import { mailApi } from "./routes/mailApi"
import { orderApi } from "./routes/orderApi"

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [goodsApi.reducerPath]: goodsApi.reducer,
    [mailApi.reducerPath]: mailApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
    .concat(userApi.middleware)
    .concat(goodsApi.middleware)
    .concat(mailApi.middleware)
    .concat(orderApi.middleware)
})