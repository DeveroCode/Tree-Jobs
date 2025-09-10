import { useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { AdjustmentsVerticalIcon } from "@heroicons/react/24/outline";
import type { User } from "../types";
import PoverNotification from "./dashboard/PoverNotification";

type HeaderProps = {
  image: User["image"];
};

export default function Header({ image }: HeaderProps) {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData<User>(["profile"]);

  return (
    <header className="border-b border-gray-200 py-8 px-6 bg-white">
      <nav className="flex justify-between items-center">
        <div className="flex flex-col">
          <span className="text-sm text-purple-600">
            Welcome to {user?.name}
          </span>
          <Link to="/jobs" className="text-xl font-semibold text-gray-700">
            Tree Jobs
          </Link>
        </div>

        {/* Icons */}
        <section className="flex items-center gap-4">
          <PoverNotification />
          <Link
            to="/dashboard/settings/general"
            className="w-10 h-10 flex items-center justify-center rounded-md bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <AdjustmentsVerticalIcon className="w-6 h-6 text-purple-button" />
          </Link>
          <img
            src={image}
            alt="Profile"
            className="w-10 h-10 rounded-md object-cover"
          />
        </section>
      </nav>
    </header>
  );
}
