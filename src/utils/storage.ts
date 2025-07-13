import type { Transaction, Settings } from '../types';

const STORAGE_KEYS = {
  TRANSACTIONS: 'finance-tracker-transactions',
  SETTINGS: 'finance-tracker-settings',
} as const;

export class StorageService {
  // Transactions
  static saveTransactions(transactions: Transaction[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(transactions));
    } catch (error) {
      console.error('Failed to save transactions:', error);
    }
  }

  static loadTransactions(): Transaction[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.TRANSACTIONS);
      if (stored) {
        const transactions = JSON.parse(stored);
        // Ensure dates are properly converted
        return transactions.map((t: any) => ({
          ...t,
          date: new Date(t.date),
          createdAt: new Date(t.createdAt),
        }));
      }
    } catch (error) {
      console.error('Failed to load transactions:', error);
    }
    return [];
  }

  // Settings
  static saveSettings(settings: Settings): void {
    try {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    } catch (error) {
      console.error('Failed to save settings:', error);
    }
  }

  static loadSettings(): Settings | null {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      return stored ? JSON.parse(stored) : null;
    } catch (error) {
      console.error('Failed to load settings:', error);
      return null;
    }
  }

  // Export data
  static exportToCSV(transactions: Transaction[]): string {
    const headers = ['Date', 'Type', 'Category', 'Description', 'Amount'];
    const csvContent = [
      headers.join(','),
      ...transactions.map(t => [
        t.date.toISOString().split('T')[0],
        t.type,
        t.category,
        `"${t.description.replace(/"/g, '""')}"`, // Escape quotes in description
        t.amount.toString()
      ].join(','))
    ].join('\n');

    return csvContent;
  }

  static downloadCSV(transactions: Transaction[], filename = 'financial-data.csv'): void {
    const csvContent = this.exportToCSV(transactions);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', filename);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }

  // Clear all data
  static clearAllData(): void {
    try {
      Object.values(STORAGE_KEYS).forEach(key => {
        localStorage.removeItem(key);
      });
    } catch (error) {
      console.error('Failed to clear data:', error);
    }
  }
}
