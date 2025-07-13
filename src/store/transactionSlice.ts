import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Transaction } from '../types';

interface TransactionState {
  transactions: Transaction[];
}

const initialState: TransactionState = {
  transactions: []
};

const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    addTransaction: (state, action: PayloadAction<Omit<Transaction, 'id' | 'createdAt'>>) => {
      const newTransaction: Transaction = {
        ...action.payload,
        id: crypto.randomUUID(),
        createdAt: new Date(),
        date: new Date(action.payload.date)
      };
      state.transactions.push(newTransaction);
    },

    updateTransaction: (state, action: PayloadAction<Transaction>) => {
      const index = state.transactions.findIndex(t => t.id === action.payload.id);
      if (index !== -1) {
        state.transactions[index] = action.payload;
      }
    },

    deleteTransaction: (state, action: PayloadAction<string>) => {
      state.transactions = state.transactions.filter(t => t.id !== action.payload);
    },

    loadTransactions: (state, action: PayloadAction<Transaction[]>) => {
      state.transactions = action.payload;
    }
  }
});

export const {
  addTransaction,
  updateTransaction,
  deleteTransaction,
  loadTransactions
} = transactionSlice.actions;

export default transactionSlice.reducer;
