import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { loadTransactions } from './store/transactionSlice';
import { updateSettings } from './store/settingsSlice';
import { StorageService } from './utils/storage';
import Dashboard from './components/Dashboard/Dashboard';
import TransactionManager from './components/Transactions/TransactionManager';
import { DollarSign, BarChart3, Moon, Sun, Menu, X } from 'lucide-react';
import './App.css';

type ViewType = 'dashboard' | 'transactions';

const AppContent: React.FC = () => {
  const dispatch = useAppDispatch();
  const { theme } = useAppSelector(state => state.settings);
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Load data from localStorage on app start
  useEffect(() => {
    const savedTransactions = StorageService.loadTransactions();
    const savedSettings = StorageService.loadSettings();

    if (savedTransactions.length > 0) {
      dispatch(loadTransactions(savedTransactions));
    }

    if (savedSettings) {
      dispatch(updateSettings(savedSettings));
    }
  }, [dispatch]);

  // Save data to localStorage when state changes
  const { transactions } = useAppSelector(state => state.transactions);
  const settings = useAppSelector(state => state.settings);

  useEffect(() => {
    StorageService.saveTransactions(transactions);
  }, [transactions]);

  useEffect(() => {
    StorageService.saveSettings(settings);
  }, [settings]);

  // Apply theme
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    dispatch(updateSettings({ theme: theme === 'light' ? 'dark' : 'light' }));
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'transactions':
        return <TransactionManager />;
      default:
        return <Dashboard />;
    }
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'transactions', label: 'Transactions', icon: DollarSign },
  ] as const;

  return (
    <div className="app">
      <nav className="navigation">
        <div className="nav-container">
          <a href="#" className="nav-brand">
            <DollarSign size={28} />
            Finance Tracker
          </a>

          <div className="nav-menu">
            {/* Empty center section - could add other menu items here later */}
          </div>

          <div className="nav-actions">
            {navItems.map(item => {
              const Icon = item.icon;
              return (
                <a
                  key={item.id}
                  href="#"
                  className={`nav-link ${currentView === item.id ? 'active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentView(item.id as ViewType);
                    setMobileMenuOpen(false);
                  }}
                >
                  <Icon size={18} />
                  {item.label}
                </a>
              );
            })}
            
            <button
              className="theme-toggle"
              onClick={toggleTheme}
              title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>

            <button
              className="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`mobile-nav ${mobileMenuOpen ? 'open' : ''}`}>
          <div className="nav-menu">
            {navItems.map(item => {
              const Icon = item.icon;
              return (
                <a
                  key={item.id}
                  href="#"
                  className={`nav-link ${currentView === item.id ? 'active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentView(item.id as ViewType);
                    setMobileMenuOpen(false);
                  }}
                >
                  <Icon size={18} />
                  {item.label}
                </a>
              );
            })}
          </div>
        </div>
      </nav>

      <main className="main-content">
        {renderCurrentView()}
      </main>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
};

export default App;
