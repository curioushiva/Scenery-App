import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "@/Utils/Redux/Slices/AuthSlice/AuthSlice";
import accountReducer from "@/Utils/Redux/Slices/AccountSlice/AccountSlice";
import contentReducer from "@/Utils/Redux/Slices/ContentSlice/ContentSlice";
import discoverReducer from "@/Utils/Redux/Slices/DiscoverSlice/DiscoverSlice";

/* Combine all slice reducers */
const rootReducer = combineReducers({
  auth: authReducer,
  account: accountReducer,
  content: contentReducer,
  discover: discoverReducer,
});

/* Persist config — saves redux state to localStorage */
const persistConfig = {
  key: "root",
  storage,
  blacklist: ["content"]
};

/* Wrap rootReducer with persist */
const persistedReducer = persistReducer(persistConfig, rootReducer);

/* Configure Redux store */
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
});

/* Persistor — delays render until state is rehydrated (PersistGate) */
export const persistor = persistStore(store);
