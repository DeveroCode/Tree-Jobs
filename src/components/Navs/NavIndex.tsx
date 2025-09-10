import { Link } from "react-router-dom";
import { useUser } from "@/hooks/user";
import { MapPinIcon } from "@heroicons/react/24/outline";
import Logo from "../Logo";

export default function NavIndex() {
  const { data: user } = useUser();

  return (
    <header className="hidden md:flex justify-between items-center py-5 px-32">
      {/* Logo + Nav */}
      <section className="flex items-center gap-10">
        <Logo />

        <nav>
          <ul className="flex items-center gap-6 text-sm text-gray-700 font-light">
            <li>
              <Link to="/tree-jobs">Home</Link>
            </li>
            <li>
              <Link to="/tree-jobs/jobs">Find Jobs</Link>
            </li>
            <li>
              <Link to="/contact">Join Us</Link>
            </li>
          </ul>
        </nav>
      </section>

      {/* Location + User info */}
      <section className="flex items-center gap-6">
        <div className="flex items-center gap-2 text-gray-500 text-sm">
          <MapPinIcon className="w-5 h-5" />
          <span>Nuevo Casas Grandes</span>
        </div>

        <div className="flex items-center gap-3 font-light">
          {user ? (
            <>
              <img
                src={user?.image || "/default-avatar.png"}
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover"
              />
              <Link to="/dashboard/settings/general" className="flex flex-col">
                <span className="text-sm font-semibold text-gray-800 capitalize">
                  {user?.name || "User"} {user?.last_name || ""}
                </span>
                <span className="text-xs text-gray-400 capitalize">
                  {user?.role || "Member"}
                </span>
              </Link>
            </>
          ) : (
            <>
              <Link to="/auth/login" className="text-sm">Login</Link>
              <Link
                to="/auth/register"
                className="rounded-full py-1 px-2 border border-purple-700 text-gray-700 text-sms"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </section>
    </header>
  );
}
