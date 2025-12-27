const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function Calendar() {
  return (
    <div className="p-[2rem]">
      <h2 className="text-[1.5rem] font-[600] mb-[1rem]">
        Maintenance Calendar
      </h2>

      <div className="grid grid-cols-[repeat(7,1fr)] bg-[#ffffff] rounded-[0.75rem] overflow-hidden shadow-[0_10px_25px_rgba(0,0,0,0.1)]">
        {days.map(d => (
          <div
            key={d}
            className="h-[3rem] flex items-center justify-center bg-[#f1f5f9] font-[600]"
          >
            {d}
          </div>
        ))}

        {Array.from({ length: 35 }).map((_, i) => (
          <div
            key={i}
            className="h-[7rem] border-[1px] border-[#e2e8f0] p-[0.5rem]"
          >
            <div className="text-[0.85rem] text-[#64748b]">
              {i + 1 <= 31 ? i + 1 : ""}
            </div>

            {i === 10 && (
              <div className="mt-[0.25rem] bg-[#2563eb] text-[#ffffff] text-[0.75rem] rounded-[0.25rem] px-[0.25rem]">
                Pump Service
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
