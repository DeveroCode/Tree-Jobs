import { Search, Locate } from "lucide-react";
export default function SearchBar() {
  return (
    <form
      action=""
      className="p-2 px-5 bg-white rounded-full shadow-md mt-3 w-2xl border border-gray-100 flex items-center justify-between"
    >
      <fieldset className="w-1/3 flex items-center gap-4">
      <Search className="w-4 h-4" />
        <input
          type="text"
          id="search"
          name="search"
          placeholder="Job title or company"
          className=" focus:outline-none text-gray-600"
        />
      </fieldset>
      <div className="border-l border-gray-400 h-6" />
      <fieldset className="w-1/3 flex items-center gap-4">
      <Locate className="w-4 h-4" />
        <input
          type="text"
          id="search"
          name="search"
          placeholder="Nvo. Casas Grandes"
          className=" focus:outline-none text-gray-600"
        />
      </fieldset>

      <button className="py-2 bg-purple-800 text-white rounded-full px-5 cursor-pointer">
        Search
      </button>
    </form>
  );
}
