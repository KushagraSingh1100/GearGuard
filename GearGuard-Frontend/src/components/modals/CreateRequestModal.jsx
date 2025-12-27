import { useState } from "react";
import Modal from "../common/Modal";
import api from "../../services/api";

export default function CreateRequestModal({ onClose, onSaved }) {
  const [subject, setSubject] = useState("");

  const save = async () => {
    await api.requests.create(
      {
        request_type: "Corrective",
        subject,
        equipment_id: 1,
      },
      1
    );
    onSaved();
    onClose();
  };

  return (
    <Modal onClose={onClose}>
      <h3 className="text-[1.25rem] font-[600] mb-[1rem]">
        Create Maintenance Request
      </h3>

      <input
        className="w-[100%] h-[2.75rem] mb-[1rem] px-[0.75rem] border-[1px] border-[#cbd5e1] rounded-[0.375rem]"
        placeholder="Request Subject"
        onChange={e => setSubject(e.target.value)}
      />

      <button
        onClick={save}
        className="w-[100%] h-[2.75rem] bg-[#16a34a] text-[#ffffff] rounded-[0.375rem]"
      >
        Create Request
      </button>
    </Modal>
  );
}
