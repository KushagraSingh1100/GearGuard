const states = ["New", "In Progress", "Repaired", "Scrap"];

export default function KanbanBoard({ requests, onMove }) {
  return (
    <div className="grid grid-cols-[repeat(4,1fr)] gap-[1.25rem] p-[2rem]">
      {states.map((state) => (
        <div key={state} className="bg-[#f8fafc] rounded-[0.75rem] p-[1rem]">
          <h2 className="font-[600] mb-[0.75rem]">{state}</h2>

          {requests
            .filter((r) => r.state === state)
            .map((r) => (
              <div
                key={r.request_id}
                className="bg-[#ffffff] p-[1rem] mb-[0.75rem] rounded-[0.5rem] shadow-[0_5px_15px_rgba(0,0,0,0.1)]"
              >
                <p className="font-[500]">{r.subject}</p>
                <select
                  value={r.state}
                  onChange={(e) => onMove(r.request_id, e.target.value)}
                  className="mt-[0.5rem] w-[100%] h-[2.25rem] border-[1px] border-[#cbd5f5] rounded-[0.375rem]"
                >
                  {states.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </div>
            ))}
        </div>
      ))}
    </div>
  );
}
