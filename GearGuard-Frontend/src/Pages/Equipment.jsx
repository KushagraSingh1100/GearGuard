import { useEffect, useState } from "react";
import api from "../services/api";
import AddEquipmentModal from "../components/modals/AddEquipmentModal";

export default function Equipment() {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);

  const load = async () => setData(await api.equipment.getAll());
  useEffect(() => {
    load();
  }, []);

  return (
    <div className="p-[2rem]">
      <div className="flex justify-between items-center mb-[1.25rem]">
        <h1 className="text-[1.25rem] font-[600]">Equipment</h1>

        <button
          onClick={() => setOpen(true)}
          className="h-[2.75rem] px-[1.25rem] bg-[#2563eb] text-[#ffffff] rounded-[0.375rem]"
        >
          Add Equipment
        </button>
      </div>

      <div className="bg-[#ffffff] rounded-[0.75rem] overflow-hidden">
        <table className="w-[100%]">
          <thead className="bg-[#f8fafc]">
            <tr>
              <th className="p-[1rem] text-left">Name</th>
              <th className="p-[1rem] text-left">Serial</th>
            </tr>
          </thead>
          <tbody>
            {data.map((eq) => (
              <tr
                key={eq.equipment_id}
                className="border-t-[1px] border-[#e5e7eb]"
              >
                <td className="p-[1rem]">{eq.name}</td>
                <td className="p-[1rem]">{eq.serial_number}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {open && (
        <AddEquipmentModal onClose={() => setOpen(false)} onSaved={load} />
      )}
    </div>
  );
}
