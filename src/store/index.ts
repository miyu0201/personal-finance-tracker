import { configureStore } from '@reduxjs/toolkit';
import transactionReducer from './transactionSlice';
import settingsReducer from './settingsSlice';

export const store = configureStore({
  reducer: {
    transactions: transactionReducer,
    settings: settingsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
        ignoredPaths: ['transactions.transactions.*.date', 'transactions.transactions.*.createdAt'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
