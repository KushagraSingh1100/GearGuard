import { useState } from "react";
import Modal from "../common/Modal";
import api from "../../services/api";

export default function AddTeamModal({ onClose, onSaved }) {
  const [name, setName] = useState("");

  const save = async () => {
    await api.teams.create(name);
    onSaved();
    onClose();
  };

  return (
    <Modal onClose={onClose}>
      <h3 className="text-[1.25rem] font-[600] mb-[1rem]">Add Team</h3>

      <input
        className="w-[100%] h-[2.75rem] mb-[1rem] px-[0.75rem] border-[1px] border-[#cbd5e1] rounded-[0.375rem]"
        placeholder="Team Name"
        onChange={(e) => setName(e.target.value)}
      />

      <button
        onClick={save}
        className="w-[100%] h-[2.75rem] bg-[#2563eb] text-[#ffffff] rounded-[0.375rem]"
      >
        Create Team
      </button>
    </Modal>
  );
}
