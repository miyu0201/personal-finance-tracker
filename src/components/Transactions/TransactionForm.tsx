import React, { useState, useEffect } from 'react';
import { X, Save } from 'lucide-react';
import type { Transaction, Category } from '../../types';

interface TransactionFormProps {
  transaction?: Transaction | null;
  categories: Category[];
  onSubmit: (transaction: Omit<Transaction, 'id' | 'createdAt'>) => void;
  onCancel: () => void;
}

const TransactionForm: React.FC<TransactionFormProps> = ({
  transaction,
  categories,
  onSubmit,
  onCancel
}) => {
  const [formData, setFormData] = useState({
    type: 'expense' as 'income' | 'expense',
    amount: '',
    description: '',
    category: '',
    date: new Date().toISOString().split('T')[0]
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (transaction) {
      setFormData({
        type: transaction.type,
        amount: transaction.amount.toString(),
        description: transaction.description,
        category: transaction.category,
        date: new Date(transaction.date).toISOString().split('T')[0]
      });
    }
  }, [transaction]);

  const filteredCategories = categories.filter(cat => cat.type === formData.type);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Please enter a valid amount';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Please enter a description';
    }

    if (!formData.category) {
      newErrors.category = 'Please select a category';
    }

    if (!formData.date) {
      newErrors.date = 'Please select a date';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    onSubmit({
      type: formData.type,
      amount: parseFloat(formData.amount),
      description: formData.description.trim(),
      category: formData.category,
      date: new Date(formData.date)
    });
  };

  const handleTypeChange = (type: 'income' | 'expense') => {
    setFormData(prev => ({
      ...prev,
      type,
      category: '' // Reset category when type changes
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="transaction-form">
      <div className="form-header">
        <h2>{transaction ? 'Edit Transaction' : 'Add New Transaction'}</h2>
        <button type="button" onClick={onCancel} className="close-btn">
          <X size={20} />
        </button>
      </div>

      <div className="form-content">
        {/* Transaction Type */}
        <div className="form-group">
          <label className="form-label">Type</label>
          <div className="type-selector">
            <button
              type="button"
              className={`type-btn ${formData.type === 'income' ? 'active' : ''}`}
              onClick={() => handleTypeChange('income')}
            >
              Income
            </button>
            <button
              type="button"
              className={`type-btn ${formData.type === 'expense' ? 'active' : ''}`}
              onClick={() => handleTypeChange('expense')}
            >
              Expense
            </button>
          </div>
        </div>

        {/* Amount */}
        <div className="form-group">
          <label htmlFor="amount" className="form-label">Amount</label>
          <input
            id="amount"
            type="number"
            step="0.01"
            min="0"
            value={formData.amount}
            onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
            className={`form-input ${errors.amount ? 'error' : ''}`}
            placeholder="0.00"
          />
          {errors.amount && <span className="error-message">{errors.amount}</span>}
        </div>

        {/* Description */}
        <div className="form-group">
          <label htmlFor="description" className="form-label">Description</label>
          <input
            id="description"
            type="text"
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            className={`form-input ${errors.description ? 'error' : ''}`}
            placeholder="Enter transaction description"
          />
          {errors.description && <span className="error-message">{errors.description}</span>}
        </div>

        {/* Category */}
        <div className="form-group">
          <label htmlFor="category" className="form-label">Category</label>
          <select
            id="category"
            value={formData.category}
            onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
            className={`form-input ${errors.category ? 'error' : ''}`}
          >
            <option value="">Select a category</option>
            {filteredCategories.map(category => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
          {errors.category && <span className="error-message">{errors.category}</span>}
        </div>

        {/* Date */}
        <div className="form-group">
          <label htmlFor="date" className="form-label">Date</label>
          <input
            id="date"
            type="date"
            value={formData.date}
            onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
            className={`form-input ${errors.date ? 'error' : ''}`}
          />
          {errors.date && <span className="error-message">{errors.date}</span>}
        </div>
      </div>

      <div className="form-actions">
        <button type="button" onClick={onCancel} className="action-btn secondary">
          Cancel
        </button>
        <button type="submit" className="action-btn primary">
          <Save size={18} />
          {transaction ? 'Update' : 'Save'} Transaction
        </button>
      </div>
    </form>
  );
};

export default TransactionForm;
