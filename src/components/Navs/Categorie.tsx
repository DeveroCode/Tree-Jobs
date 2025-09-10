import { Link } from "react-router-dom";
import { BanknotesIcon, MapPinIcon } from "@heroicons/react/24/outline";
export default function Categorie() {
  return (
    <section className="bg-white border-t border-gray-200 px-32 py-8 md:flex gap-5 items-center justify-between hidden">
      <div className="flex items-center gap-10">
        <nav className="space-x-5 text-gray-500">
          <Link to={"/"}>Designer</Link>
          <Link to={"/"}>Developer</Link>
          <Link to={"/"}>More</Link>
        </nav>
        <input
          type="text"
          placeholder="Find a job your're interested in"
          className="px-5 bg-blue-50 rounded-full p-2 w-98 focus:outline-0"
        />
      </div>

      <div>
        <nav className="flex gap-4 text-gray-500">
          <Link to={"/"} className="flex items-center gap-2">
            <MapPinIcon className="w-5 h-5" />
            Location
          </Link>
          <Link to={"/"} className="flex items-center gap-2">
            <BanknotesIcon className="w-5 h-5" />
            Per Month
          </Link>
        </nav>
      </div>
    </section>
  );
}
