import type { Transaction, ChartData, FinancialSummary } from '../types';
import { format, startOfMonth, endOfMonth, eachMonthOfInterval, startOfYear, endOfYear } from 'date-fns';

export class ChartUtils {
  // Generate pie chart data for expenses by category
  static generateExpensePieChart(transactions: Transaction[]): ChartData {
    const expenseTransactions = transactions.filter(t => t.type === 'expense');
    const categoryTotals = new Map<string, number>();
    
    expenseTransactions.forEach(transaction => {
      const current = categoryTotals.get(transaction.category) || 0;
      categoryTotals.set(transaction.category, current + transaction.amount);
    });

    const labels = Array.from(categoryTotals.keys());
    const data = Array.from(categoryTotals.values());
    
    const colors = [
      '#EF4444', '#F59E0B', '#10B981', '#3B82F6', '#8B5CF6',
      '#EC4899', '#06B6D4', '#84CC16', '#F97316', '#6366F1'
    ];

    return {
      labels,
      datasets: [{
        label: 'Expenses by Category',
        data,
        backgroundColor: colors.slice(0, labels.length),
        borderColor: colors.slice(0, labels.length),
        borderWidth: 2
      }]
    };
  }

  // Generate bar chart data for income vs expenses by month
  static generateMonthlyComparisonChart(transactions: Transaction[], year: number = new Date().getFullYear()): ChartData {
    const yearStart = startOfYear(new Date(year, 0, 1));
    const yearEnd = endOfYear(new Date(year, 11, 31));
    const months = eachMonthOfInterval({ start: yearStart, end: yearEnd });

    const monthlyData = months.map(month => {
      const monthStart = startOfMonth(month);
      const monthEnd = endOfMonth(month);
      
      const monthTransactions = transactions.filter(t => {
        const transactionDate = new Date(t.date);
        return transactionDate >= monthStart && transactionDate <= monthEnd;
      });

      const income = monthTransactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);
      
      const expenses = monthTransactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);

      return {
        month: format(month, 'MMM'),
        income,
        expenses
      };
    });

    return {
      labels: monthlyData.map(d => d.month),
      datasets: [
        {
          label: 'Income',
          data: monthlyData.map(d => d.income),
          backgroundColor: ['#10B981'],
          borderColor: ['#059669'],
          borderWidth: 2
        },
        {
          label: 'Expenses',
          data: monthlyData.map(d => d.expenses),
          backgroundColor: ['#EF4444'],
          borderColor: ['#DC2626'],
          borderWidth: 2
        }
      ]
    };
  }

  // Generate line chart for spending trends
  static generateSpendingTrendChart(transactions: Transaction[], days: number = 30): ChartData {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const dailyExpenses = new Map<string, number>();
    
    // Initialize all dates with 0
    for (let i = 0; i <= days; i++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);
      dailyExpenses.set(format(date, 'yyyy-MM-dd'), 0);
    }

    // Fill with actual expenses
    transactions
      .filter(t => t.type === 'expense')
      .forEach(transaction => {
        const dateKey = format(new Date(transaction.date), 'yyyy-MM-dd');
        if (dailyExpenses.has(dateKey)) {
          const current = dailyExpenses.get(dateKey) || 0;
          dailyExpenses.set(dateKey, current + transaction.amount);
        }
      });

    const sortedDates = Array.from(dailyExpenses.keys()).sort();
    const labels = sortedDates.map(date => format(new Date(date), 'MM/dd'));
    const data = sortedDates.map(date => dailyExpenses.get(date) || 0);

    return {
      labels,
      datasets: [{
        label: 'Daily Expenses',
        data,
        backgroundColor: ['rgba(239, 68, 68, 0.1)'],
        borderColor: ['#EF4444'],
        borderWidth: 2
      }]
    };
  }

  // Generate line chart for income trends
  static generateIncomeTrendChart(transactions: Transaction[], months: number = 6): ChartData {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - months);
    
    const monthlyIncome = new Map<string, number>();
    
    // Initialize all months with 0
    for (let i = 0; i < months; i++) {
      const date = new Date(endDate);
      date.setMonth(date.getMonth() - i);
      const monthKey = format(startOfMonth(date), 'yyyy-MM');
      monthlyIncome.set(monthKey, 0);
    }

    // Fill with actual income
    transactions
      .filter(t => t.type === 'income')
      .forEach(transaction => {
        const transactionDate = new Date(transaction.date);
        if (transactionDate >= startDate && transactionDate <= endDate) {
          const monthKey = format(startOfMonth(transactionDate), 'yyyy-MM');
          if (monthlyIncome.has(monthKey)) {
            const current = monthlyIncome.get(monthKey) || 0;
            monthlyIncome.set(monthKey, current + transaction.amount);
          }
        }
      });

    const sortedMonths = Array.from(monthlyIncome.keys()).sort();
    const labels = sortedMonths.map(month => format(new Date(month + '-01'), 'MMM yyyy'));
    const data = sortedMonths.map(month => monthlyIncome.get(month) || 0);

    return {
      labels,
      datasets: [{
        label: 'Monthly Income',
        data,
        backgroundColor: ['rgba(16, 185, 129, 0.2)'],
        borderColor: ['#10B981'],
        borderWidth: 2
      }]
    };
  }

  // Calculate financial summary
  static calculateFinancialSummary(transactions: Transaction[]): FinancialSummary {
    const totalIncome = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);

    const totalExpenses = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    const netAmount = totalIncome - totalExpenses;

    // Find top expense category
    const expensesByCategory = new Map<string, number>();
    transactions
      .filter(t => t.type === 'expense')
      .forEach(t => {
        const current = expensesByCategory.get(t.category) || 0;
        expensesByCategory.set(t.category, current + t.amount);
      });

    const topExpenseCategory = Array.from(expensesByCategory.entries())
      .sort(([, a], [, b]) => b - a)[0]?.[0] || 'N/A';

    return {
      totalIncome,
      totalExpenses,
      netAmount,
      transactionCount: transactions.length,
      topExpenseCategory,
    };
  }
}
