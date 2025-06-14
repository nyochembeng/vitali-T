import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./features/user/userSlice";
import { profileSlice } from "./features/profile/profileSlice";

export const store = configureStore({
  reducer: {
    [userSlice.reducerPath]: userSlice.reducer,
    [profileSlice.reducerPath]: profileSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userSlice.middleware,
      profileSlice.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
