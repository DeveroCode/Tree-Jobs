import { Link, useLocation, useNavigate } from "react-router-dom";
import { BanknotesIcon, MapPinIcon } from "@heroicons/react/24/outline";
import type { WorkFilterParams } from "@/api/workAPI";
import { useForm } from "react-hook-form";
import { Search } from "lucide-react";
import { toast } from "react-toastify";
import { useEffect } from "react";
export default function Categorie() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const { register, handleSubmit, watch, setValue } = useForm<WorkFilterParams>(
    {
      defaultValues: {
        title: "",
      },
    }
  );

  const title = watch("title");
  const titleString = params.get("title") || "";

  useEffect(() => {
    if (titleString) {
      setValue("title", titleString);
    }
  }, [titleString, setValue]);

  const handleSendToFindJobs = () => {
    if (!title) {
      toast.error("Please enter a job title or a company");
      return;
    }

    navigate(`/tree-jobs/jobs?title=${title}`);
  };

  return (
    <section className="bg-white border-t border-gray-200 px-32 py-6 md:flex gap-5 items-center justify-between hidden">
      <div className="flex items-center gap-10">
        <nav className="space-x-5 text-gray-500">
          <Link to={"/"}>Designer</Link>
          <Link to={"/"}>Developer</Link>
          <Link to={"/"}>More</Link>
        </nav>

        <form onSubmit={handleSubmit(handleSendToFindJobs)} noValidate>
          <fieldset className="w-md flex items-center gap-4 border border-gray-300 rounded-full p-2 px-5 shadow-sm justify-between">
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
