import { NavLink } from "react-router-dom";

export default function Navbar() {
  const link =
    "px-[1rem] py-[0.5rem] rounded-[0.375rem] text-[#e5e7eb] hover:bg-[#1e293b] transition-[all] duration-[200ms]";

  return (
    <nav className="flex gap-[0.75rem] bg-[#020617] px-[1.5rem] py-[1rem]">
      <NavLink className={link} to="/">
        Dashboard
      </NavLink>
      <NavLink className={link} to="/equipment">
        Equipment
      </NavLink>
      <NavLink className={link} to="/board">
        Board
      </NavLink>
      <NavLink className={link} to="/calendar">
        Calendar
      </NavLink>
      <NavLink className={link} to="/teams">
        Teams
      </NavLink>
      <NavLink className={link} to="/users">
        Users
      </NavLink>
    </nav>
  );
}
