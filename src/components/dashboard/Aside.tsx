import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import {
  Cog6ToothIcon,
  ArrowRightEndOnRectangleIcon,
} from "@heroicons/react/24/outline";
import logo from "/logo.svg";
import { toast } from "react-toastify";
import { useUser } from "@/hooks/user";
import NavRecrutier from "./NavRecrutier";
import NavCandidate from "./NavCandidate";
import { useState } from "react";

export default function Aside() {
  const navigate = useNavigate();
  const { data: user } = useUser();
  const [open, setOpen] = useState(false);

  const logOut = () => {
    localStorage.removeItem("AUTH_TOKEN");
    toast.success("You have logged out successfully");
    navigate("/auth/login");
  };

  return (
    <>
      {/* DESKTOP ASIDE */}
      <aside className="hidden md:block sticky top-0 h-screen border-r border-gray-200 max-w-[290px] bg-white">
        <div className="flex items-center p-4">
          <img src={logo} alt="SVG logo" className="w-1/5" />
          <Link to={"/jobs"} className="text-xl mb-3">
            Tree Jobs
          </Link>
        </div>

        <nav className="px-10 flex flex-col gap-4 text-gray-500">
          <section className="flex flex-col space-y-4">
            <span className="text-gray-400 uppercase font-semibold text-xs tracking-widest">
              my account
            </span>
            <Link
              to={"/dashboard/settings/general"}
              className="px-2 py-1 animation_links icon_separation"
            >
              <Cog6ToothIcon className="w-5 h-5" />
              Account Settings
            </Link>
          </section>

          <section className="flex flex-col space-y-4 mt-10">
            <span className="text-gray-400 uppercase font-semibold text-xs tracking-widest">
              intercom
            </span>
            {user?.role === "candidate" && <NavCandidate />}
            {user?.role === "recrutier" && <NavRecrutier />}
          </section>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 flex justify-end text-xs">
          <button
            className="bg-purple-button text-white font-extrabold rounded-md px-2 py-2 flex items-center cursor-pointer"
            onClick={logOut}
          >
            <ArrowRightEndOnRectangleIcon className="w-5 h-5 inline-block" />
          </button>
        </div>
      </aside>

      {/* MOBILE FLOATING BUTTON */}
      <button
        onClick={() => setOpen(true)}
        className="md:hidden fixed bottom-5 left-5 z-50 bg-purple-600 text-white rounded-full p-4 shadow-lg"
      >
        <Menu className="h-6 w-6" />
      </button>

      <div
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setOpen(false)}
      ></div>

      <aside
        className={`fixed top-0 left-0 h-full w-72 bg-white z-50 transform transition-transform duration-500 ease-in-out
        ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <img src={logo} alt="SVG logo" className="w-10" />
            <Link to={"/jobs"} className="text-lg font-semibold">
              Tree Jobs
            </Link>
          </div>
          <button onClick={() => setOpen(false)}>
            <X className="h-6 w-6 text-gray-600" />
          </button>
        </div>

        <nav className="px-6 flex flex-col gap-4 text-gray-500 mt-6">
          <section className="flex flex-col space-y-4">
            <span className="text-gray-400 uppercase font-semibold text-xs tracking-widest">
              my account
            </span>
            <Link
              to={"/dashboard/settings/general"}
              className="px-2 py-1 animation_links icon_separation"
            >
              <Cog6ToothIcon className="w-5 h-5" />
              Account Settings
            </Link>
          </section>

          <section className="flex flex-col space-y-4 mt-10">
            <span className="text-gray-400 uppercase font-semibold text-xs tracking-widest">
              intercom
            </span>
            {user?.role === "candidate" && <NavCandidate />}
            {user?.role === "recrutier" && <NavRecrutier />}
          </section>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 flex justify-end text-xs">
          <button
            className="bg-purple-button text-white font-extrabold rounded-md px-2 py-2 flex items-center cursor-pointer"
            onClick={logOut}
          >
            <ArrowRightEndOnRectangleIcon className="w-5 h-5 inline-block" />
          </button>
        </div>
      </aside>
    </>
  );
}
