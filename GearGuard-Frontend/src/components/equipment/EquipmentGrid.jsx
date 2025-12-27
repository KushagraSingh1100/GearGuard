export default function EquipmentGrid({ data }) {
  return (
    <div className="bg-[#ffffff] rounded-[0.75rem] overflow-hidden shadow-[0_10px_25px_rgba(0,0,0,0.1)]">
      <table className="w-[100%] border-collapse">
        <thead className="bg-[#f1f5f9]">
          <tr>
            <th className="p-[1rem] text-left text-[#475569]">Name</th>
            <th className="p-[1rem] text-left text-[#475569]">Serial</th>
          </tr>
        </thead>
        <tbody>
          {data.map((eq) => (
            <tr
              key={eq.equipment_id}
              className="border-t-[1px] border-[#e2e8f0]"
            >
              <td className="p-[1rem]">{eq.name}</td>
              <td className="p-[1rem]">{eq.serial_number}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
