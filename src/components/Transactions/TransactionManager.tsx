import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { addTransaction, updateTransaction, deleteTransaction } from '../../store/transactionSlice';
import { Plus, Edit, Trash2, Search, Download } from 'lucide-react';
import { format } from 'date-fns';
import { StorageService } from '../../utils/storage';
import TransactionForm from './TransactionForm';
import type { Transaction } from '../../types';
import './TransactionManager.css';

const TransactionManager: React.FC = () => {
  const dispatch = useAppDispatch();
  const { transactions } = useAppSelector(state => state.transactions);
  const { defaultCategories } = useAppSelector(state => state.settings);
  
  const [showForm, setShowForm] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const handleSubmit = (transactionData: Omit<Transaction, 'id' | 'createdAt'>) => {
    if (editingTransaction) {
      dispatch(updateTransaction({
        ...transactionData,
        id: editingTransaction.id,
        createdAt: editingTransaction.createdAt
      }));
    } else {
      dispatch(addTransaction(transactionData));
    }
    setShowForm(false);
    setEditingTransaction(null);
  };

  const handleEdit = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      dispatch(deleteTransaction(id));
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingTransaction(null);
  };

  const handleDownload = () => {
    StorageService.downloadCSV(transactions, `transactions-${format(new Date(), 'yyyy-MM-dd')}.csv`);
  };

  const filteredBySearch = transactions.filter(transaction =>
    transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getCategoryColor = (categoryName: string) => {
    const category = defaultCategories.find(cat => cat.name === categoryName);
    return category?.color || '#6B7280';
  };

  return (
    <div className="transaction-manager">
      {/* Header */}
      <div className="dashboard-header">
        <h1>Transactions</h1>
        <p>Manage your income and expenses</p>
      </div>

      {/* Search Bar with Actions */}
      <div className="search-bar">
        <div className="search-input">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="search-actions">
          <button
            className="action-btn primary"
            onClick={() => setShowForm(true)}
          >
            <Plus size={20} />
            Add Transaction
          </button>
          <button
            className="action-btn secondary"
            onClick={handleDownload}
            disabled={transactions.length === 0}
          >
            <Download size={20} />
            Export CSV
          </button>
        </div>
      </div>

      {/* Summary Bar */}
      <div className="transaction-summary">
        <div className="summary-item">
          <span className="label">Total Transactions:</span>
          <span className="value">{filteredBySearch.length}</span>
        </div>
        <div className="summary-item">
          <span className="label">Total Income:</span>
          <span className="value income">
            {formatCurrency(filteredBySearch.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0))}
          </span>
        </div>
        <div className="summary-item">
          <span className="label">Total Expenses:</span>
          <span className="value expense">
            {formatCurrency(filteredBySearch.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0))}
          </span>
        </div>
      </div>

      {/* Transaction List */}
      <div className="transaction-list">
        {filteredBySearch.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">
              <Search size={40} />
            </div>
            <h3>No transactions found</h3>
            <p>{searchTerm ? 'Try adjusting your search terms' : 'Start by adding your first transaction'}</p>
            {!searchTerm && (
              <button
                className="action-btn primary"
                onClick={() => setShowForm(true)}
              >
                <Plus size={20} />
                Add Transaction
              </button>
            )}
          </div>
        ) : (
          <div className="transaction-grid">
            {filteredBySearch.map((transaction) => (
              <div key={transaction.id} className="transaction-card">
                <div className="transaction-main">
                  <div className="transaction-icon">
                    <div 
                      className="icon-circle"
                      style={{ backgroundColor: getCategoryColor(transaction.category) }}
                    >
                      <span className="icon-text">
                        {transaction.category.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  </div>

                  <div className="transaction-details">
                    <div className="transaction-description">
                      {transaction.description}
                    </div>
                    <div className="transaction-meta">
                      <span>{transaction.category}</span>
                      <span>{format(new Date(transaction.date), 'MMM dd, yyyy')}</span>
                    </div>
                  </div>

                  <div className="transaction-amount">
                    <div className={`amount ${transaction.type}`}>
                      {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                    </div>
                  </div>
                </div>

                <div className="transaction-actions">
                  <button
                    className="action-btn small secondary"
                    onClick={() => handleEdit(transaction)}
                  >
                    <Edit size={16} />
                    Edit
                  </button>
                  <button
                    className="action-btn small danger"
                    onClick={() => handleDelete(transaction.id)}
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Transaction Form Modal */}
      {showForm && (
        <div className="modal-overlay" onClick={handleCloseForm}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <TransactionForm
              transaction={editingTransaction}
              onSubmit={handleSubmit}
              onCancel={handleCloseForm}
              categories={defaultCategories}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionManager;
