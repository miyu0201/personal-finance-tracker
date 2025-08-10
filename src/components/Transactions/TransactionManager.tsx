import React, { useState } from "react";
import { useAppSelector, useAppDispatch } from "../../hooks/redux";
import {
  addTransaction,
  updateTransaction,
  deleteTransaction,
} from "../../store/transactionSlice";
import { Plus, Edit, Trash2, Search, Download } from "lucide-react";
import { format } from "date-fns";
import { StorageService } from "../../utils/storage";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import TransactionForm from "./TransactionForm";
import type { Transaction } from "../../types";
import "./TransactionManager.css";

const TransactionManager: React.FC = () => {
  const dispatch = useAppDispatch();
  const { transactions } = useAppSelector((state) => state.transactions);
  const { defaultCategories } = useAppSelector((state) => state.settings);

  const [showForm, setShowForm] = useState(false);
  const [editingTransaction, setEditingTransaction] =
    useState<Transaction | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

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

  const filteredBySearch = transactions.filter(
    (transaction) =>
      transaction.description
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      transaction.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          <div className="controls-grid">
            <div className="search-container">
              <div className="input-group">
                <Search className="search-icon" size={15} />
                <input
                  type="text"
                  placeholder="Search transactions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
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

          <div className="summary-section">
            <div className="summary-stats">
              <div className="stat-item">
                <span className="stat-label">Total Transactions:</span>
                <span className="stat-value">{filteredBySearch.length}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Total Income:</span>
                <span className="stat-value income">
                  {formatCurrency(
                    filteredBySearch
                      .filter((t) => t.type === "income")
                      .reduce((sum, t) => sum + t.amount, 0)
                  )}
                </span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Total Expenses:</span>
                <span className="stat-value expense">
                  {formatCurrency(
                    filteredBySearch
                      .filter((t) => t.type === "expense")
                      .reduce((sum, t) => sum + t.amount, 0)
                  )}
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="transactions-section">
          <div className="transactions-grid">
            {filteredBySearch.length === 0 ? (
              <div className="empty-state">
                <Search size={64} className="empty-icon" />
                <h3>No transactions found</h3>
                <p>
                  {searchTerm
                    ? "Try adjusting your search terms"
                    : "Start by adding your first transaction"}
                </p>
                {!searchTerm && (
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
              filteredBySearch.map((transaction) => (
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
