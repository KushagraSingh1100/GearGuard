import { useEffect, useState } from "react";
import api from "../services/api";
import KanbanBoard from "../components/Board/KanbanBoard";

export default function MaintenanceBoard() {
  const [requests, setRequests] = useState([]);

  const load = async () => setRequests(await api.requests.getAll());

  const move = async (id, state) => {
    await api.requests.updateState(id, state);
    load();
  };

  useEffect(() => { load(); }, []);

  return <KanbanBoard requests={requests} onMove={move} />;
}
