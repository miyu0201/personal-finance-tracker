import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Transaction } from "../types";

// Sample initial transactions
const initialTransactions: Transaction[] = [
  {
    id: "sample-1",
    type: "income",
    amount: 5000,
    description: "Monthly Salary",
    category: "Salary",
    date: new Date("2025-04-01"),
    createdAt: new Date("2025-04-01"),
  },
  {
    id: "sample-2",
    type: "expense",
    amount: 1200,
    description: "Rent Payment",
    category: "Bills & Utilities",
    date: new Date("2025-04-21"),
    createdAt: new Date("2025-04-21"),
  },
  {
    id: "sample-3",
    type: "income",
    amount: 5575,
    description: "salary",
    category: "Salary",
    date: new Date("2025-05-02"),
    createdAt: new Date("2025-05-02"),
  },
  {
    id: "sample-4",
    type: "expense",
    amount: 320,
    description: "Electric Bill",
    category: "Bills & Utilities",
    date: new Date("2025-05-25"),
    createdAt: new Date("2025-05-25"),
  },
  {
    id: "sample-5",
    type: "expense",
    amount: 435,
    description: "Coffee & Lunch",
    category: "Food & Dining",
    date: new Date("2025-06-05"),
    createdAt: new Date("2025-06-05"),
  },
  {
    id: "sample-6",
    type: "income",
    amount: 6550,
    description: "other income",
    category: "Other Income",
    date: new Date("2025-06-17"),
    createdAt: new Date("2025-08-07"),
  },
  {
    id: "sample-7",
    type: "income",
    amount: 2350,
    description: "Stock Dividend",
    category: "Investment",
    date: new Date("2025-07-18"),
    createdAt: new Date("2025-07-18"),
  },
  {
    id: "sample-8",
    type: "expense",
    amount: 335,
    description: "movie",
    category: "Entertainment",
    date: new Date("2025-07-25"),
    createdAt: new Date("2025-07-25"),
  },
  {
    id: "sample-9",
    type: "expense",
    amount: 3375,
    description: "Travel",
    category: "Travel",
    date: new Date("2025-08-25"),
    createdAt: new Date("2025-08-25"),
  },
];

interface TransactionState {
  transactions: Transaction[];
}

const initialState: TransactionState = {
  transactions: initialTransactions,
};

const transactionSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    addTransaction: (
      state,
      action: PayloadAction<Omit<Transaction, "id" | "createdAt">>
    ) => {
      const newTransaction: Transaction = {
        ...action.payload,
        id: crypto.randomUUID(),
        createdAt: new Date(),
        date: new Date(action.payload.date),
      };
      state.transactions.push(newTransaction);
    },

    updateTransaction: (state, action: PayloadAction<Transaction>) => {
      const index = state.transactions.findIndex(
        (t) => t.id === action.payload.id
      );
      if (index !== -1) {
        state.transactions[index] = action.payload;
      }
    },

    deleteTransaction: (state, action: PayloadAction<string>) => {
      state.transactions = state.transactions.filter(
        (t) => t.id !== action.payload
      );
    },

    loadTransactions: (state, action: PayloadAction<Transaction[]>) => {
      state.transactions = action.payload;
    },
  },
});

export const {
  addTransaction,
  updateTransaction,
  deleteTransaction,
  loadTransactions,
} = transactionSlice.actions;

export default transactionSlice.reducer;
