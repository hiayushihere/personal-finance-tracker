import { useEffect, useState, useMemo } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import SummaryCard from "../components/SummaryCard";
import TransactionTable from "../components/TransactionTable";
import AddTransactionModal from "../components/AddTransactionModal";

function TableSkeleton() {
  return (
    <div className="bg-white rounded-2xl p-6 space-y-4 animate-pulse shadow-sm">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex gap-4">
          <div className="h-4 w-24 bg-slate-200 rounded" />
          <div className="h-4 flex-1 bg-slate-200 rounded" />
          <div className="h-4 w-20 bg-slate-200 rounded" />
        </div>
      ))}
    </div>
  );
}

export default function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [editTransaction, setEditTransaction] = useState(null);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const res = await api.get("/transactions");
      setTransactions(res.data);
    } catch (err) {
      console.error("Failed to fetch transactions", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const income = useMemo(
    () =>
      transactions
        .filter((t) => t.type === "income")
        .reduce((sum, t) => sum + t.amount, 0),
    [transactions]
  );

  const expense = useMemo(
    () =>
      transactions
        .filter((t) => t.type === "expense")
        .reduce((sum, t) => sum + t.amount, 0),
    [transactions]
  );

  const balance = income - expense;

  const filteredTransactions = useMemo(() => {
    return transactions.filter((t) => {
      const matchesSearch =
        t.title.toLowerCase().includes(search.toLowerCase()) ||
        t.category.toLowerCase().includes(search.toLowerCase());

      const matchesFilter = filter ? t.type === filter : true;
      return matchesSearch && matchesFilter;
    });
  }, [transactions, search, filter]);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this transaction?")) return;
    await api.delete(`/transactions/${id}`);
    fetchTransactions();
  };

  const handleEdit = (tx) => {
    setEditTransaction(tx);
    setShowModal(true);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-emerald-100 via-white to-teal-100" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(16,185,129,0.25),transparent_40%),radial-gradient(circle_at_80%_30%,rgba(34,197,94,0.2),transparent_45%),radial-gradient(circle_at_50%_80%,rgba(52,211,153,0.2),transparent_45%)]" />

      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-10">

        {/*  SUMMARY  */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <SummaryCard
            title="Total Income"
            value={income}
            gradient="from-emerald-500 to-green-600"
          />
          <SummaryCard
            title="Total Expense"
            value={expense}
            gradient="from-rose-500 to-red-600"
          />
          <SummaryCard
            title="Balance"
            value={balance}
            gradient="from-indigo-500 to-purple-600"
          />
        </div>

        {/* ACTION BAR */}
        <div className="flex flex-col md:flex-row gap-4 items-stretch">
          <input
            className="input flex-1"
            placeholder="Search by title or category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="input md:w-44"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="">All</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>

          <button
            className="btn-primary transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
            onClick={() => {
              setEditTransaction(null);
              setShowModal(true);
            }}
          >
            + Add Transaction
          </button>
        </div>

        {/* CONTENT */}
        {loading ? (
          <TableSkeleton />
        ) : filteredTransactions.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center shadow-sm">
            <div className="mx-auto mb-4 h-16 w-16 rounded-full
                            bg-gradient-to-br from-emerald-200 to-green-200
                            flex items-center justify-center text-2xl">
              🌱
            </div>
            <h3 className="text-lg font-medium text-slate-700">
              No transactions yet
            </h3>
            <p className="text-sm text-slate-500 mt-1">
              Add your first income or expense to get started.
            </p>
          </div>
        ) : (
          <TransactionTable
            transactions={filteredTransactions}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        )}
      </main>

      {/* MODAL */}
      {showModal && (
        <AddTransactionModal
          onClose={() => setShowModal(false)}
          onSuccess={fetchTransactions}
          existing={editTransaction}
        />
      )}
    </div>
  );
}
