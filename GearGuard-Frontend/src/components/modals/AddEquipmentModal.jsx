import { useState } from "react";
import Modal from "../common/Modal";
import api from "../../services/api";

export default function AddEquipmentModal({ onClose, onSaved }) {
  const [name, setName] = useState("");
  const [serial, setSerial] = useState("");

  const save = async () => {
    await api.equipment.create({
      name,
      serial_number: serial,
      department: "General",
    });
    onSaved();
    onClose();
  };

  return (
    <Modal onClose={onClose}>
      <h3 className="text-[1.25rem] font-[600] mb-[1rem]">Add Equipment</h3>

      <input
        className="w-[100%] h-[2.75rem] mb-[0.75rem] px-[0.75rem] border-[1px] border-[#cbd5e1] rounded-[0.375rem]"
        placeholder="Equipment Name"
        onChange={(e) => setName(e.target.value)}
      />

      <input
        className="w-[100%] h-[2.75rem] mb-[1rem] px-[0.75rem] border-[1px] border-[#cbd5e1] rounded-[0.375rem]"
        placeholder="Serial Number"
        onChange={(e) => setSerial(e.target.value)}
      />

      <button
        onClick={save}
        className="w-[100%] h-[2.75rem] bg-[#2563eb] text-[#ffffff] rounded-[0.375rem]"
      >
        Save Equipment
      </button>
    </Modal>
  );
}
