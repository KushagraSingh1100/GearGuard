import { useState } from "react";
import Modal from "../common/Modal";
import api from "../../services/api";

export default function AddUserModal({ onClose, onSaved }) {
  const [name, setName] = useState("");
  const [role, setRole] = useState("User");

  const save = async () => {
    await api.users.create({ name, role });
    onSaved();
    onClose();
  };

  return (
    <Modal onClose={onClose}>
      <h2 className="text-[1.25rem] font-[600] mb-[1rem]">Add User</h2>

      <input
        className="w-[100%] h-[2.75rem] border-[1px] border-[#cbd5e1] rounded-[0.375rem] px-[0.75rem] mb-[0.75rem]"
        placeholder="Name"
        onChange={e => setName(e.target.value)}
      />

      <select
        className="w-[100%] h-[2.75rem] border-[1px] border-[#cbd5e1] rounded-[0.375rem] px-[0.75rem] mb-[1rem]"
        onChange={e => setRole(e.target.value)}
      >
        <option>User</option>
        <option>Technician</option>
        <option>Manager</option>
      </select>

      <button
        onClick={save}
        className="w-[100%] h-[2.75rem] bg-[#2563eb] text-[#ffffff] rounded-[0.375rem]"
      >
        Save User
      </button>
    </Modal>
  );
}
