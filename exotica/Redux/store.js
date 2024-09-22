import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import userReducer from './Reducers/userSlice';
import profileReducer from './Reducers/profileSlice';
import wishlistReducer from './Reducers/wishlistSlice';
import cartReducer from './Reducers/cartSlice';
import adminAuthReducer from './Reducers/adimnAuthSlice';

// Persist configuration for user slice
const userPersistConfig = {
  key: 'user',
  storage,
};

const persistedUserReducer = persistReducer(userPersistConfig, userReducer);

export const store = configureStore({
  reducer: {
    user: persistedUserReducer,
    profile: profileReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    admin: adminAuthReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'persist/PERSIST',
          'persist/REHYDRATE',
          'persist/PAUSE',
          'persist/PURGE',
          'persist/REGISTER',
          'persist/FLUSH',
        ],
      },
    }),
});

export const persistor = persistStore(store);
