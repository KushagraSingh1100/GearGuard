import { useEffect, useState } from "react";
import api from "../services/api";
import AddTeamModal from "../components/modals/AddTeamModal";

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [open, setOpen] = useState(false);

  const load = async () => setTeams(await api.teams.getAll());
  useEffect(() => { load(); }, []);

  return (
    <div className="p-[2rem]">
      <div className="flex justify-between mb-[1rem]">
        <h2 className="text-[1.25rem] font-[600]">Teams</h2>
        <button
          onClick={() => setOpen(true)}
          className="h-[2.5rem] px-[1rem] bg-[#2563eb] text-[#ffffff] rounded-[0.375rem]"
        >
          Add Team
        </button>
      </div>

      <div className="bg-[#ffffff] rounded-[0.75rem] p-[1rem] shadow-[0_10px_25px_rgba(0,0,0,0.1)]">
        {teams.map(t => (
          <div
            key={t.team_id}
            className="p-[0.75rem] border-b-[1px] border-[#e2e8f0]"
          >
            {t.team_name}
          </div>
        ))}
      </div>

      {open && <AddTeamModal onClose={() => setOpen(false)} onSaved={load} />}
    </div>
  );
}
