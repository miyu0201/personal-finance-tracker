import React from "react";
import { useAppSelector } from "../../hooks/redux";
import { ChartUtils } from "../../utils/charts";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from "chart.js";
import { Bar, Pie, Line } from "react-chartjs-2";
import { TrendingUp, TrendingDown, DollarSign, CreditCard } from "lucide-react";
import "./Dashboard.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

const Dashboard: React.FC = () => {
  const { transactions } = useAppSelector((state) => state.transactions);

  const summary = ChartUtils.calculateFinancialSummary(transactions);
  const expensePieData = ChartUtils.generateExpensePieChart(transactions);
  const monthlyComparisonData =
    ChartUtils.generateMonthlyComparisonChart(transactions);
  const spendingTrendData = ChartUtils.generateSpendingTrendChart(transactions);
  const incomeTrendData = ChartUtils.generateIncomeTrendChart(transactions);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: false,
      },
    },
  };

  return (
    <div className="dashboard">
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1>Financial Dashboard</h1>
          <p>Overview of your financial health</p>
        </div>

        <section className="summary-section">
          <div className="summary-cards">
            <div className="summary-card income">
              <div className="card-icon">
                <TrendingUp size={24} />
              </div>
              <div className="card-content">
                <h3>Total Income</h3>
                <p className="amount">{formatCurrency(summary.totalIncome)}</p>
              </div>
            </div>

            <div className="summary-card expense">
              <div className="card-icon">
                <TrendingDown size={24} />
              </div>
              <div className="card-content">
                <h3>Total Expenses</h3>
                <p className="amount">
                  {formatCurrency(summary.totalExpenses)}
                </p>
              </div>
            </div>

            <div
              className={`summary-card net ${
                summary.netAmount >= 0 ? "positive" : "negative"
              }`}
            >
              <div className="card-icon">
                <DollarSign size={24} />
              </div>
              <div className="card-content">
                <h3>Net Amount</h3>
                <p className="amount">{formatCurrency(summary.netAmount)}</p>
              </div>
            </div>

            <div className="summary-card transactions">
              <div className="card-icon">
                <CreditCard size={24} />
              </div>
              <div className="card-content">
                <h3>Transactions</h3>
                <p className="amount">{summary.transactionCount}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="charts-section">
          <div className="charts-grid">
            <div className="chart-container">
              <h3>Monthly Income vs Expenses</h3>
              <div className="chart-wrapper">
                <Bar data={monthlyComparisonData} options={chartOptions} />
              </div>
            </div>

            <div className="chart-container">
              <h3>Expenses by Category</h3>
              <div className="chart-wrapper">
                <Pie data={expensePieData} options={chartOptions} />
              </div>
            </div>
            <div className="chart-container">
              <h3>Income Trend (Last 6 Months)</h3>
              <div className="chart-wrapper">
                <Line data={incomeTrendData} options={chartOptions} />
              </div>
            </div>

            <div className="chart-container">
              <h3>Spending Trend (Last 30 Days)</h3>
              <div className="chart-wrapper">
                <Line data={spendingTrendData} options={chartOptions} />
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="quick-stats">
            <div className="stat-item">
              <span className="stat-label">Top Expense Category</span>
              <span className="stat-value">{summary.topExpenseCategory}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Average Transaction</span>
              <span className="stat-value">
                {summary.transactionCount > 0
                  ? formatCurrency(
                      (summary.totalIncome + summary.totalExpenses) /
                        summary.transactionCount
                    )
                  : formatCurrency(0)}
              </span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Total Transactions</span>
              <span className="stat-value">{summary.transactionCount}</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
