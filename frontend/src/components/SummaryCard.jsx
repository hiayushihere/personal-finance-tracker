export default function SummaryCard({ title, value, gradient }) {
  return (
    <div
      className={`rounded-2xl p-6 text-white shadow-md 
      bg-gradient-to-br ${gradient}
      transition-all duration-300 hover:-translate-y-1 hover:shadow-xl`}
    >
      <p className="text-sm opacity-90">{title}</p>
      <p className="text-3xl font-semibold mt-2">₹ {value}</p>
    </div>
  );
}
