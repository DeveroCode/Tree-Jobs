import type { WorkFilterParams } from "@/api/workAPI";
import { Search } from "lucide-react";
import type { UseFormHandleSubmit, UseFormRegister } from "react-hook-form";

export type CategorieProps = {
  handleSendToFindJobs: () => void;
  handleSubmit: UseFormHandleSubmit<WorkFilterParams, WorkFilterParams>;
  register: UseFormRegister<WorkFilterParams>;
};

export default function CategorieSelectMobile({
  handleSendToFindJobs,
  handleSubmit,
  register,
}: CategorieProps) {
  return (
    <div className="md:hidden w-full overflow-x-auto bg-white py-3 px-4 shadow-sm gap-4 flex flex-col justify-between items-center">
     <form onSubmit={handleSubmit(handleSendToFindJobs)} noValidate className="w-full">
          <fieldset className="w-full flex items-center gap-4 border border-gray-300 rounded-full p-2 px-5 shadow-sm justify-between">
            <input
              type="text"
              id="title"
              placeholder="Job title or company"
              className="focus:outline-none text-gray-600 w-full"
              {...register("title")}
            />

            <button type="submit" className="bg-purple-700 text-white p-2 rounded-full cursor-pointer hover:bg-purple-800 transition-all duration-100">
              <Search className="w-4 h-4" />
            </button>
          </fieldset>
        </form>
      <section className="w-full flex gap-2">
        <select
          name="category"
          id="category"
          className="bg-gray-50 rounded-md p-2 focus:ring-0 focus:outline-none"
          defaultValue={"Category"}
        >
          <option value="all">All</option>
          <option value="engineering">Engineering</option>
          <option value="design">Design</option>
        </select>
        <select
          name="category"
          id="category"
          className="bg-gray-50 rounded-md p-2 focus:ring-0 focus:outline-none"
          defaultValue={"Location"}
        >
          <option value="all">All</option>
          <option value="nvo_casas_grandes">Nvo. Casas Grandes</option>
          <option value="chihuahua">Chihuahua</option>
          <option value="cd_juarez">CD. Juarez</option>
          <option value="el_pueblo">El Pueblo</option>
        </select>
        <select
          name="category"
          id="category"
          className="bg-gray-50 rounded-md p-2 focus:ring-0 focus:outline-none"
          defaultValue={"💵"}
        >
          <option value="all">All</option>
          <option value="nvo_casas_grandes">1200</option>
          <option value="chihuahua">1200 - 1500</option>
          <option value="cd_juarez">1500 - 2500</option>
          <option value="el_pueblo">2500+</option>
        </select>
      </section>
    </div>
  );
}
