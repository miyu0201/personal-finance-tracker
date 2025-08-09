import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Transaction } from '../types';

// Sample initial transactions
const initialTransactions: Transaction[] = [
  {
    id: 'sample-1',
    type: 'income',
    amount: 5000,
    description: 'Monthly Salary',
    category: 'Salary',
    date: new Date('2025-06-01'),
    createdAt: new Date('2025-08-01')
  },
  {
    id: 'sample-2',
    type: 'expense',
    amount: 1200,
    description: 'Rent Payment',
    category: 'Bills & Utilities',
    date: new Date('2025-06-21'),
    createdAt: new Date('2025-08-01')
  },
  {
    id: 'sample-3',
    type: 'expense',
    amount: 85,
    description: 'Grocery Shopping',
    category: 'Food & Dining',
    date: new Date('2025-07-02'),
    createdAt: new Date('2025-08-02')
  },
  {
    id: 'sample-4',
    type: 'expense',
    amount: 120,
    description: 'Electric Bill',
    category: 'Bills & Utilities',
    date: new Date('2025-07-25'),
    createdAt: new Date('2025-08-05')
  },
  {
    id: 'sample-5',
    type: 'expense',
    amount: 35,
    description: 'Coffee & Lunch',
    category: 'Food & Dining',
    date: new Date('2025-08-05'),
    createdAt: new Date('2025-08-05')
  },
  {
    id: 'sample-6',
    type: 'expense',
    amount: 50,
    description: 'Movie Night',
    category: 'Entertainment',
    date: new Date('2025-08-17'),
    createdAt: new Date('2025-08-07')
  },
  {
    id: 'sample-7',
    type: 'income',
    amount: 150,
    description: 'Stock Dividend',
    category: 'Investment',
    date: new Date('2025-08-28'),
    createdAt: new Date('2025-08-08')
  }
];

interface TransactionState {
  transactions: Transaction[];
}

const initialState: TransactionState = {
  transactions: initialTransactions
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
