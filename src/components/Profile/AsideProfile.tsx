import {
  UserIcon,
  Cog6ToothIcon,
  VideoCameraIcon,
} from "@heroicons/react/24/outline";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function AsideProfile() {
  const navigate = useNavigate();
  const location = useLocation();

  const links = [
    { to: "/dashboard/settings/general", label: "General", icon: UserIcon },
    {
      to: "/dashboard/settings/security-settings",
      label: "Security Settings",
      icon: Cog6ToothIcon,
    },
    {
      to: "/dashboard/settings/profile-photo",
      label: "Profile Picture",
      icon: VideoCameraIcon,
    },
  ];

  return (
    <aside className="w-full md:w-[280px] lg:w-[350px] py-4 md:py-6 px-4 md:px-8 bg-white md:bg-transparent">
      <legend className="text-gray-400 uppercase font-semibold tracking-widest text-xs mb-4 md:py-6">
        My Account
      </legend>

      {/* mobile */}
      <div className="block md:hidden mb-4">
        <select
          value={location.pathname}
          onChange={(e) => navigate(e.target.value)}
          className="w-full px-3 py-2 text-gray-700 focus:ring-0 focus:outline-none"
        >
          {links.map(({ to, label }) => (
            <option key={to} value={to}>
              {label}
            </option>
          ))}
        </select>
      </div>

      {/* desktop */}
      <nav className="hidden md:flex md:flex-col gap-4 md:gap-6 px-1 md:px-5">
        {links.map(({ to, label, icon: Icon }) => {
          const active = location.pathname === to;
          return (
            <Link
              key={to}
              to={to}
              className={`flex items-center gap-2 px-2 py-1 rounded-lg transition ${
                active
                  ? "text-purple-button bg-purple-50"
                  : "text-gray-500 hover:text-gray-800 hover:bg-gray-50"
              }`}
            >
              <Icon className="w-5 h-5 shrink-0" />
              {label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
