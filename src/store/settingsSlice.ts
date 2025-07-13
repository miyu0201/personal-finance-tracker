import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Settings, Category } from '../types';

const defaultCategories: Category[] = [
  // Income categories
  { id: '1', name: 'Salary', type: 'income', color: '#10B981', icon: 'DollarSign' },
  { id: '2', name: 'Freelance', type: 'income', color: '#3B82F6', icon: 'Briefcase' },
  { id: '3', name: 'Investment', type: 'income', color: '#8B5CF6', icon: 'TrendingUp' },
  { id: '4', name: 'Other Income', type: 'income', color: '#06B6D4', icon: 'Plus' },
  
  // Expense categories
  { id: '5', name: 'Food & Dining', type: 'expense', color: '#EF4444', icon: 'UtensilsCrossed' },
  { id: '6', name: 'Transportation', type: 'expense', color: '#F59E0B', icon: 'Car' },
  { id: '7', name: 'Shopping', type: 'expense', color: '#EC4899', icon: 'ShoppingBag' },
  { id: '8', name: 'Entertainment', type: 'expense', color: '#8B5CF6', icon: 'Film' },
  { id: '9', name: 'Bills & Utilities', type: 'expense', color: '#6B7280', icon: 'Receipt' },
  { id: '10', name: 'Healthcare', type: 'expense', color: '#10B981', icon: 'Heart' },
  { id: '11', name: 'Education', type: 'expense', color: '#3B82F6', icon: 'GraduationCap' },
  { id: '12', name: 'Travel', type: 'expense', color: '#06B6D4', icon: 'Plane' },
  { id: '13', name: 'Other Expenses', type: 'expense', color: '#6B7280', icon: 'MoreHorizontal' }
];

const initialState: Settings = {
  theme: 'light',
  defaultCategories
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    updateSettings: (state, action: PayloadAction<Partial<Settings>>) => {
      return { ...state, ...action.payload };
    },

    addCategory: (state, action: PayloadAction<Omit<Category, 'id'>>) => {
      const newCategory: Category = {
        ...action.payload,
        id: crypto.randomUUID()
      };
      state.defaultCategories.push(newCategory);
    },

    updateCategory: (state, action: PayloadAction<Category>) => {
      const index = state.defaultCategories.findIndex(c => c.id === action.payload.id);
      if (index !== -1) {
        state.defaultCategories[index] = action.payload;
      }
    },

    deleteCategory: (state, action: PayloadAction<string>) => {
      state.defaultCategories = state.defaultCategories.filter(c => c.id !== action.payload);
    },

    resetSettings: () => initialState,

    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    }
  }
});

export const {
  updateSettings,
  addCategory,
  updateCategory,
  deleteCategory,
  resetSettings,
  toggleTheme
} = settingsSlice.actions;

export default settingsSlice.reducer;
