import { Trash2, Pencil } from "lucide-react";

export default function TransactionTable({ transactions, onDelete, onEdit }) {
  if (!transactions.length) {
    return (
      <div className="bg-white rounded-2xl p-8 text-center text-slate-500">
        No transactions found
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-slate-50 text-slate-500">
          <tr>
            <th className="p-4 text-left">Date</th>
            <th className="p-4 text-left">Title</th>
            <th className="p-4 text-left">Category</th>
            <th className="p-4 text-right">Amount</th>
            <th className="p-4 text-right">Actions</th>
          </tr>
        </thead>

        <tbody>
          {transactions.map((t) => (
            <tr key={t.id} className="border-t hover:bg-slate-50 transition">
              <td className="p-4">{t.date}</td>
              <td className="p-4 font-medium">{t.title}</td>
              <td className="p-4">{t.category}</td>

              <td className={`p-4 text-right font-medium ${
                t.type === "income" ? "text-green-600" : "text-red-500"
              }`}>
                ₹ {t.amount}
              </td>

              <td className="p-4 text-right space-x-3">
                <button
                  onClick={() => onEdit(t)}
                  className="text-indigo-600 hover:text-indigo-800"
                >
                  <Pencil size={18} />
                </button>

                <button
                  onClick={() => onDelete(t.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
