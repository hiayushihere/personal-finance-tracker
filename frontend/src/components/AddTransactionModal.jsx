import { useState, useEffect } from "react";
import api from "../services/api";

export default function AddTransactionModal({ onClose, onSuccess, existing }) {
  const [form, setForm] = useState({
    title: "",
    amount: "",
    type: "expense",
    category: "",
    date: "",
  });

  useEffect(() => {
    if (existing) {
      setForm(existing);
    }
  }, [existing]);

  const submit = async (e) => {
    e.preventDefault();
  
    const payload = {
      title: form.title,
      amount: Number(form.amount),
      type: form.type,
      category: form.category,
      date: form.date,
    };
  
    try {
      if (existing) {
        await api.put(`/transactions/${existing.id}`, payload);
      } else {
        await api.post("/transactions", payload);
      }
  
      onSuccess();
      onClose();
    } catch (err) {
      console.error("Save failed", err);
      alert("Failed to save transaction");
    }
  };
  

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
        <h3 className="text-lg font-semibold mb-4">
          {existing ? "Edit Transaction" : "Add Transaction"}
        </h3>

        <form className="space-y-4" onSubmit={submit}>
          <input className="input" placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })} />

          <input className="input" type="number" placeholder="Amount"
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: +e.target.value })} />

          <select className="input"
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}>
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>

          <input className="input" placeholder="Category"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })} />

          <input className="input" type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })} />

          <div className="flex justify-end gap-3">
            <button type="button" onClick={onClose} className="btn-secondary">
              Cancel
            </button>
            <button className="btn-primary">
              {existing ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
