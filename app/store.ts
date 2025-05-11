import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./routes/userApi";
import { goodsApi } from "./routes/goodsApi";

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [goodsApi.reducerPath]: goodsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
    .concat(userApi.middleware)
    .concat(goodsApi.middleware),
});