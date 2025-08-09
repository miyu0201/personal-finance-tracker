# Personal Finance Tracker

A modern, responsive personal finance management application built with React 19 and TypeScript. Track your income and expenses with nice visualizations and intuitive user interface.

![Personal Finance Tracker](https://img.shields.io/badge/React-19.1.0-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2.8.2-764ABC?style=for-the-badge&logo=redux&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-4.0+-646CFF?style=for-the-badge&logo=vite&logoColor=white)

View demo on https://my-finance-tracker2.netlify.app/

<img width="1882" height="852" alt="finance-tracker" src="https://github.com/user-attachments/assets/7073ab70-f454-4342-95a5-64ef7e1bfbda" />

## ✨ Features

### 📊 Dashboard
- **Financial Overview**: Comprehensive summary of your financial health
- **Interactive Charts**: 
  - Pie chart for expense breakdown by category
  - Bar chart for monthly income vs expenses comparison
  - Line chart for spending trends over time
- **Summary Cards**: Quick view of total income, expenses, net amount, and transaction count
- **Top Expense Category**: Identifies your highest spending category

### 💳 Transaction Management
- **Add Transactions**: Easy-to-use form for recording income and expenses
- **Edit & Delete**: Full CRUD operations for managing transactions
- **Smart Search**: Real-time search functionality across all transactions
- **Export Data**: Download your transactions as CSV for external analysis
- **Category Management**: Predefined categories with color coding
- **Transaction Summary**: Real-time statistics display

### 🎨 User Experience
- **Dark/Light Theme**: Toggle between themes for comfortable viewing
- **Modern UI**: Clean, intuitive interface with smooth animations
- **Consistent Layout**: Uniform styling across all pages (900px max-width for optimal readability)
- **Accessible**: Built with accessibility best practices

## 🛠️ Tech Stack

- **Frontend Framework**: React 19.1.0
- **Language**: TypeScript
- **State Management**: Redux Toolkit
- **Charts**: Chart.js with react-chartjs-2
- **Date Handling**: date-fns
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Styling**: CSS with CSS Custom Properties (CSS Variables)
- **Linting**: ESLint

## 🚀 Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/miyu0201/personal-finance-tracker.git
   cd personal-finance-tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint for code quality

## 📱 Usage

### Adding Transactions
1. Navigate to the Transactions page
2. Click "Add Transaction" button
3. Fill in the transaction details:
   - Type: Income or Expense
   - Amount: Transaction value
   - Description: Brief description
   - Category: Select from predefined categories
   - Date: Transaction date
4. Click "Save Transaction"

### Viewing Analytics
1. Go to the Dashboard
2. View your financial summary cards
3. Analyze spending patterns with interactive charts
4. Track trends over time

### Exporting Data
1. Go to the Transactions page
2. Click "Export CSV" to download your transaction data
3. Open the file in Excel, Google Sheets, or any spreadsheet application

## 🏗️ Project Structure

```
src/
├── components/
│   ├── Dashboard/
│   │   ├── Dashboard.tsx          # Main dashboard component
│   │   └── Dashboard.css          # Dashboard styles
│   └── Transactions/
│       ├── TransactionManager.tsx # Transaction management
│       ├── TransactionManager.css # Transaction styles
│       └── TransactionForm.tsx    # Transaction form component
├── store/
│   ├── index.ts                   # Redux store configuration
│   ├── transactionSlice.ts        # Transaction state management
│   └── settingsSlice.ts           # Settings state management
├── utils/
│   ├── charts.ts                  # Chart data generation utilities
│   └── storage.ts                 # Local storage utilities
├── types/
│   └── index.ts                   # TypeScript type definitions
├── hooks/
│   └── redux.ts                   # Typed Redux hooks
├── App.tsx                        # Main application component
├── App.css                        # Global styles
└── main.tsx                       # Application entry point
```

## 🎯 Key Features Explained

### State Management
The application uses Redux Toolkit for predictable state management:
- **Transaction Slice**: Manages all transaction data and operations
- **Settings Slice**: Handles theme preferences and default categories
- **Persistent Storage**: Automatically saves data to localStorage

### Chart Visualizations
Powered by Chart.js for interactive and responsive charts:
- **Expense Pie Chart**: Visual breakdown of spending by category
- **Monthly Comparison**: Bar chart comparing income vs expenses
- **Spending Trends**: Line chart showing daily expense patterns

### Responsive Design
- **Desktop**: Optimized layout with 900px max-width for readability
- **Mobile**: Stacked layout with full-width components
- **Tablet**: Adaptive grid system for medium screens

## 🔧 Customization

### Adding New Categories
1. Navigate to `src/store/settingsSlice.ts`
2. Add new categories to the `defaultCategories` array
3. Include name, color, and icon properties

### Modifying Themes
1. Edit CSS custom properties in `src/index.css`
2. Update theme variables for colors, spacing, and typography
3. Themes automatically apply across the entire application

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [React](https://reactjs.org/)
- State management by [Redux Toolkit](https://redux-toolkit.js.org/)
- Charts powered by [Chart.js](https://www.chartjs.org/)
- Icons by [Lucide](https://lucide.dev/)
- Build tool by [Vite](https://vitejs.dev/)

## 📞 Support

If you have any questions or need help, please [open an issue](https://github.com/miyu0201/personal-finance-tracker/issues) on GitHub.

---

Made with ❤️ by miyu0201
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
# personal-finance-tracker
