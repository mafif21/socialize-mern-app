import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import authReducer from "../features/Auth";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistsConfig = { key: "root", storage, version: 1 };
const persistedreducer = persistReducer(persistsConfig, authReducer);

export const store = configureStore({
  reducer: persistedreducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
