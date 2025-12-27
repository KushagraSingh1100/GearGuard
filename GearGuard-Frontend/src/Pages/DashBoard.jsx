export default function Dashboard() {
  return (
    <div className="p-[2rem]">
      <h1 className="text-[1.5rem] font-[600] mb-[1.5rem]">Dashboard</h1>

      <div className="grid grid-cols-[repeat(3,1fr)] gap-[1.5rem]">
        <StatCard title="Equipment" value="12" />
        <StatCard title="Open Requests" value="5" />
        <StatCard title="Teams" value="3" />
      </div>
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="bg-[#ffffff] p-[1.5rem] rounded-[0.75rem] shadow-[0_10px_25px_rgba(0,0,0,0.1)]">
      <p className="text-[#64748b] text-[0.9rem]">{title}</p>
      <p className="text-[2.25rem] font-[700]">{value}</p>
    </div>
  );
}
