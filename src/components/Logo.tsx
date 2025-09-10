import { Link } from "react-router-dom";
import logo from "/logo.svg";

export default function Logo() {
  return (
    <div className="flex items-center md:gap-2">
      <img src={logo} alt="SVG logo" className="h-12 w-12 md:w-10 md:h-10" />
      <Link to="/tree-jobs" className="mb-2 md:mb-0 md:text-xl font-bold text-purple-700">
        Tree Jobs
      </Link>
    </div>
  );
}
