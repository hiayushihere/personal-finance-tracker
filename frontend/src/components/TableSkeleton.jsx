export default function TableSkeleton() {
    return (
      <div className="bg-white rounded-2xl p-6 space-y-4 animate-pulse">
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
  