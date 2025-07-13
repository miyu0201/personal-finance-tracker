# Personal Finance Tracker

A comprehensive personal finance management application built with React, TypeScript, Redux Toolkit, and Chart.js. This project showcases modern React development practices, state management, data visualization, and responsive UI/UX design.

## 🚀 Features

### Core Functionality
- **Income/Expense Tracking**: Add, edit, delete, and categorize financial transactions
- **Interactive Dashboard**: Visual overview with charts and financial summaries
- **Budget Management**: Set spending limits with alerts and progress tracking
- **Advanced Filtering**: Filter transactions by date range, category, type, and amount
- **Data Export**: Export transaction data to CSV format
- **Local Storage**: Persistent data storage in browser

### Data Visualization
- **Expense Pie Chart**: Breakdown of expenses by category
- **Monthly Comparison**: Income vs expenses bar chart
- **Spending Trends**: Line chart showing daily spending patterns
- **Budget Progress**: Visual budget usage indicators with alerts

### User Experience
- **Responsive Design**: Mobile-first approach with modern UI
- **Dark/Light Theme**: Toggle between theme modes
- **Real-time Updates**: Automatic budget calculations and alerts
- **Intuitive Navigation**: Clean, accessible interface

## 🛠️ Technologies Used

### Frontend Framework
- **React 19**: Latest React with hooks and functional components
- **TypeScript**: Type safety and enhanced developer experience
- **Vite**: Fast build tool and development server

### State Management
- **Redux Toolkit**: Modern Redux with simplified syntax
- **React Redux**: Official React bindings for Redux
- **Redux Slices**: Organized state management for transactions, budgets, and settings

### Data Visualization
- **Chart.js**: Powerful charting library
- **React Chart.js 2**: React wrapper for Chart.js
- **Multiple Chart Types**: Pie, bar, line, and doughnut charts

### Styling & UI
- **CSS Custom Properties**: Theme system with CSS variables
- **Flexbox & Grid**: Modern layout techniques
- **Responsive Design**: Mobile-first responsive design
- **Lucide React**: Beautiful icon library

### Utilities
- **date-fns**: Modern date utility library
- **Local Storage API**: Browser storage for data persistence
- **CSV Export**: Client-side CSV generation and download

## 📁 Project Structure

```
src/
├── components/
│   ├── Dashboard/
│   │   ├── Dashboard.tsx
│   │   └── Dashboard.css
│   ├── Transactions/
│   │   ├── TransactionManager.tsx
│   │   ├── TransactionForm.tsx
│   │   ├── TransactionFilters.tsx
│   │   └── TransactionManager.css
│   └── Budget/
│       ├── BudgetManager.tsx
│       ├── BudgetForm.tsx
│       └── BudgetManager.css
├── store/
│   ├── index.ts
│   ├── transactionSlice.ts
│   ├── budgetSlice.ts
│   └── settingsSlice.ts
├── utils/
│   ├── storage.ts
│   └── charts.ts
├── hooks/
│   └── redux.ts
├── types/
│   └── index.ts
├── App.tsx
├── App.css
└── main.tsx
```

## 🎯 Skills Demonstrated

### React & TypeScript
- Functional components with hooks
- Custom hooks for Redux integration
- TypeScript interfaces and type safety
- Component composition and reusability

### Redux Toolkit
- Modern Redux with createSlice
- Async actions and middleware
- Typed selectors and dispatchers
- State normalization patterns

### UI/UX Design
- Responsive design principles
- Accessible form design
- Visual hierarchy and spacing
- Interactive feedback and animations

### Data Management
- Local storage integration
- Data filtering and searching
- Real-time calculations
- CSV export functionality

### Performance
- Optimized re-renders
- Memoization strategies
- Efficient state updates
- Chart.js optimization

## 🚦 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd personal-finance-tracker
```

2. Install dependencies:
```bash
npm install --legacy-peer-deps
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

## 📊 Usage

### Adding Transactions
1. Navigate to the Transactions page
2. Click "Add Transaction"
3. Fill in the transaction details (type, amount, description, category, date)
4. Save the transaction

### Setting Budgets
1. Go to the Budget Management page
2. Click "Add Budget"
3. Select a category and set spending limits
4. Configure alert thresholds
5. Monitor progress on the dashboard

### Viewing Analytics
1. Visit the Dashboard for an overview
2. View charts showing:
   - Monthly income vs expenses
   - Expense breakdown by category
   - Spending trends over time
   - Budget usage progress

### Filtering & Export
1. Use the filter panel to narrow down transactions
2. Search by description or category
3. Export filtered data to CSV

## 🎨 Design Features

- **Modern Material Design**: Clean, professional interface
- **Dark/Light Theme**: Automatic theme switching
- **Responsive Layout**: Works on desktop, tablet, and mobile
- **Interactive Charts**: Hover effects and responsive charts
- **Visual Feedback**: Loading states, error handling, success messages

## 🔧 Configuration

The application uses default categories for income and expenses, but these can be customized through the settings. The theme preference and other settings are automatically saved to local storage.

## 📈 Future Enhancements

- Multi-currency support
- Recurring transactions
- Goal tracking
- Bank account integration
- Advanced reporting
- Data import from CSV/Excel
- Cloud synchronization

## 🤝 Contributing

This project demonstrates personal finance management capabilities and modern React development practices. Feel free to explore the code and suggest improvements!

## 📄 License

This project is for educational and portfolio purposes.
