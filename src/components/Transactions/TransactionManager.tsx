import React, { useState } from "react";
import { useAppSelector, useAppDispatch } from "../../hooks/redux";
import {
  addTransaction,
  updateTransaction,
  deleteTransaction,
  setTypeFilter,
  setCategoryFilter,
  setSearchTerm,
  clearFilters,
  setSortField,
} from "../../store/transactionSlice";
import {
  Plus,
  Edit,
  Trash2,
  Search,
  Download,
  X,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import { format } from "date-fns";
import { StorageService } from "../../utils/storage";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import TransactionForm from "./TransactionForm";
import type { Transaction } from "../../types";
import "./TransactionManager.css";

const TransactionManager: React.FC = () => {
  const dispatch = useAppDispatch();
  const { transactions, filters, sorting } = useAppSelector(
    (state) => state.transactions
  );
  const { defaultCategories } = useAppSelector((state) => state.settings);

  const [showForm, setShowForm] = useState(false);
  const [editingTransaction, setEditingTransaction] =
    useState<Transaction | null>(null);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const handleSubmit = (
    transactionData: Omit<Transaction, "id" | "createdAt">
  ) => {
    if (editingTransaction) {
      dispatch(
        updateTransaction({
          ...transactionData,
          id: editingTransaction.id,
          createdAt: editingTransaction.createdAt,
        })
      );
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
    if (window.confirm("Are you sure you want to delete this transaction?")) {
      dispatch(deleteTransaction(id));
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingTransaction(null);
  };

  const handleDownload = () => {
    StorageService.downloadCSV(
      transactions,
      `transactions-${format(new Date(), "yyyy-MM-dd")}.csv`
    );
  };

  // Filter and sort transactions based on current filters and sorting
  const getFilteredAndSortedTransactions = () => {
    let filtered = transactions.filter((transaction) => {
      // Type filter
      if (filters.type !== "all" && transaction.type !== filters.type) {
        return false;
      }

      // Category filter
      if (
        filters.category !== "all" &&
        transaction.category !== filters.category
      ) {
        return false;
      }

      // Search term filter
      if (
        filters.searchTerm &&
        !transaction.description
          .toLowerCase()
          .includes(filters.searchTerm.toLowerCase()) &&
        !transaction.category
          .toLowerCase()
          .includes(filters.searchTerm.toLowerCase())
      ) {
        return false;
      }

      return true;
    });

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue: number | Date;
      let bValue: number | Date;

      if (sorting.field === "date") {
        aValue = new Date(a.date);
        bValue = new Date(b.date);
      } else {
        aValue = a.amount;
        bValue = b.amount;
      }

      if (sorting.order === "asc") {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

    return filtered;
  };

  const filteredTransactions = getFilteredAndSortedTransactions();

  // Get unique categories for filter dropdown
  const getUniqueCategories = () => {
    const categories = new Set(transactions.map((t) => t.category));
    return Array.from(categories).sort();
  };

  const uniqueCategories = getUniqueCategories();

  const handleSearchChange = (value: string) => {
    dispatch(setSearchTerm(value));
  };

  const handleTypeFilterChange = (type: "all" | "income" | "expense") => {
    dispatch(setTypeFilter(type));
  };

  const handleCategoryFilterChange = (category: string) => {
    dispatch(setCategoryFilter(category));
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
  };

  const handleSortFieldChange = (field: "date" | "amount") => {
    dispatch(setSortField(field));
  };

  const getSortIcon = (field: "date" | "amount") => {
    if (sorting.field !== field) {
      return <ArrowUpDown size={16} className="sort-icon" />;
    }
    return sorting.order === "asc" ? (
      <ArrowUp size={16} className="sort-icon active" />
    ) : (
      <ArrowDown size={16} className="sort-icon active" />
    );
  };

  const hasActiveFilters =
    filters.type !== "all" ||
    filters.category !== "all" ||
    filters.searchTerm !== "";

  const getCategoryColor = (categoryName: string) => {
    const category = defaultCategories.find((cat) => cat.name === categoryName);
    return category?.color || "#6B7280";
  };

  return (
    <div className="transaction-manager">
      <div className="transaction-container">
        <div className="transaction-header">
          <h1>Transaction Management</h1>
          <p>Track and manage your financial transactions</p>
        </div>

        <section className="controls-section">
          <div className="summary-section">
            <div className="summary-stats">
              <div className="stat-item">
                <span className="stat-label">Total Transactions:</span>
                <span className="stat-value">
                  {filteredTransactions.length}
                </span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Total Income:</span>
                <span className="stat-value income">
                  {formatCurrency(
                    filteredTransactions
                      .filter((t: Transaction) => t.type === "income")
                      .reduce(
                        (sum: number, t: Transaction) => sum + t.amount,
                        0
                      )
                  )}
                </span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Total Expenses:</span>
                <span className="stat-value expense">
                  {formatCurrency(
                    filteredTransactions
                      .filter((t: Transaction) => t.type === "expense")
                      .reduce(
                        (sum: number, t: Transaction) => sum + t.amount,
                        0
                      )
                  )}
                </span>
              </div>
            </div>
          </div>

          <div className="controls-grid">
            <div className="search-container">
              <div className="input-group">
                <Search className="search-icon" size={15} />
                <input
                  type="text"
                  placeholder="Search transactions..."
                  value={filters.searchTerm}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="search-input"
                />
              </div>
            </div>

            <div className="actions-container">
              <button
                onClick={() => {
                  console.log("Add transaction button clicked");
                  setShowForm(true);
                }}
                className="btn btn-primary add-transaction-btn"
              >
                <Plus size={18} />
                Add Transaction
              </button>
              <button
                onClick={handleDownload}
                disabled={transactions.length === 0}
                className="btn btn-outline export-btn"
              >
                <Download size={18} />
                Export CSV
              </button>
            </div>
          </div>

          {/* Filter Section */}
          <div className="filter-section">
            <div className="filter-grid">
              <div className="filter-group">
                <label className="filter-label">Type:</label>
                <select
                  value={filters.type}
                  onChange={(e) =>
                    handleTypeFilterChange(
                      e.target.value as "all" | "income" | "expense"
                    )
                  }
                  className="filter-select"
                >
                  <option value="all">All Types</option>
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                </select>
              </div>

              <div className="filter-group">
                <label className="filter-label">Category:</label>
                <select
                  value={filters.category}
                  onChange={(e) => handleCategoryFilterChange(e.target.value)}
                  className="filter-select"
                >
                  <option value="all">All Categories</option>
                  {uniqueCategories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div className="filter-group">
                <label className="filter-label">Sort by:</label>
                <div className="sort-buttons">
                  <button
                    onClick={() => handleSortFieldChange("date")}
                    className={`sort-btn ${
                      sorting.field === "date" ? "active" : ""
                    }`}
                  >
                    Date {getSortIcon("date")}
                  </button>
                  <button
                    onClick={() => handleSortFieldChange("amount")}
                    className={`sort-btn ${
                      sorting.field === "amount" ? "active" : ""
                    }`}
                  >
                    Amount {getSortIcon("amount")}
                  </button>
                </div>
              </div>

              {hasActiveFilters && (
                <div className="filter-actions">
                  <button
                    onClick={handleClearFilters}
                    className="btn btn-ghost clear-filters-btn"
                  >
                    <X size={16} />
                    Clear Filters
                  </button>
                </div>
              )}
            </div>

            {/* Sort Info */}
            <div className="sort-info">
              <span className="sort-text">
                Showing {filteredTransactions.length} transaction
                {filteredTransactions.length !== 1 ? "s" : ""}
                {sorting.field === "date"
                  ? ` sorted by date (${
                      sorting.order === "desc" ? "newest first" : "oldest first"
                    })`
                  : ` sorted by amount (${
                      sorting.order === "desc"
                        ? "highest first"
                        : "lowest first"
                    })`}
              </span>
            </div>
          </div>
        </section>

        <section className="transactions-section">
          <div className="transactions-grid">
            {filteredTransactions.length === 0 ? (
              <div className="empty-state">
                <Search size={64} className="empty-icon" />
                <h3>No transactions found</h3>
                <p>
                  {filters.searchTerm || hasActiveFilters
                    ? "Try adjusting your search terms or filters"
                    : "Start by adding your first transaction"}
                </p>
                {!filters.searchTerm && !hasActiveFilters && (
                  <button
                    className="btn btn-primary"
                    onClick={() => setShowForm(true)}
                  >
                    <Plus size={20} />
                    Add Transaction
                  </button>
                )}
              </div>
            ) : (
              filteredTransactions.map((transaction: Transaction) => (
                <div key={transaction.id} className="transaction-card">
                  <div className="transaction-main">
                    <div className="transaction-icon">
                      <div
                        className="icon-circle"
                        style={{
                          backgroundColor: getCategoryColor(
                            transaction.category
                          ),
                        }}
                      >
                        <span className="icon-text">
                          {transaction.category.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    </div>

                    <div className="transaction-details">
                      <h4 className="transaction-description">
                        {transaction.description}
                      </h4>
                      <div className="transaction-meta">
                        <span className="category">{transaction.category}</span>
                        <span className="date">
                          {format(new Date(transaction.date), "MMM dd, yyyy")}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="transaction-amount">
                    <div className={`amount ${transaction.type}`}>
                      {transaction.type === "income" ? "+" : "-"}
                      {formatCurrency(transaction.amount)}
                    </div>
                    <div className="transaction-actions">
                      <button
                        className="btn btn-outline btn-sm"
                        onClick={() => handleEdit(transaction)}
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(transaction.id)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>

      {/* Transaction Form Modal using ReactStrap */}
      <Modal
        isOpen={showForm}
        toggle={handleCloseForm}
        size="lg"
        centered={true}
        backdrop={true}
        keyboard={true}
        fade={true}
        className="transaction-modal"
      >
        <ModalHeader toggle={handleCloseForm}>
          {editingTransaction ? "Edit Transaction" : "Add New Transaction"}
        </ModalHeader>
        <ModalBody>
          <TransactionForm
            transaction={editingTransaction}
            onSubmit={handleSubmit}
            onCancel={handleCloseForm}
            categories={defaultCategories}
          />
        </ModalBody>
      </Modal>
    </div>
  );
};

export default TransactionManager;
