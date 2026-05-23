import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from '../Slices/AuthSlice/AuthSlice'
import userReducer from '../Slices/UserSlice/UserSlice';
import contentReducer from '../Slices/ContentSlice/ContentSlice'
import mediaReducer from '../Slices/MediaSlice/MediaSlice'

/* Combine all slice reducers */
const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    content: contentReducer,
    media: mediaReducer
});

/* Persist config — saves redux state to localStorage */
const persistConfig = {
    key: 'root',
    storage,
}

/* Wrap rootReducer with persist */
const persistedReducer = persistReducer(persistConfig, rootReducer);

/* Configure Redux store */
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }),
});

/* Persistor — delays render until state is rehydrated (PersistGate) */
export const persistor = persistStore(store);