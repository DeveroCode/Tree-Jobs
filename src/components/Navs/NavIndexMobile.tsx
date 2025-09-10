import { useState } from "react";
import Logo from "../Logo";
import { Menu } from "lucide-react";
import { Link } from "react-router-dom";

export default function NavIndexMobile() {
  const [isEnable, setIsEnable] = useState(false);
  return (
    <>
      <div className="py-4 px-4 border-b border-gray-200 md:hidden flex justify-between items-center w-full">
        <Logo />
        <Menu className="h-6 w-6 text-gray-600 cursor-pointer" onClick={() => setIsEnable(!isEnable)} />
      </div>

      {isEnable && (
        <nav className="flex flex-col gap-4 p-4 md:hidden">
          <Link to="/jobs" className="text-gray-600 hover:text-gray-800">
            Home
          </Link>
          <Link to="/auth/login" className="text-gray-600 hover:text-gray-800">
            About Us
          </Link>
          <Link to="/auth/register" className="text-gray-600 hover:text-gray-800">
            Contact
          </Link>
        </nav>
      )}
    </>
  );
}
