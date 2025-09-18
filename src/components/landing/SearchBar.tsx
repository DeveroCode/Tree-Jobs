import type { WorkFilterParams } from "@/api/workAPI";
import { Search, Locate } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function SearchBar() {
  const navigate = useNavigate();

  const { register, handleSubmit, reset, watch } = useForm<WorkFilterParams>({
    defaultValues: {
      title: "",
      location: "",
    },
  });

  const title = watch("title");
  const location = watch("location");

  const handleSendToFindJobs = () => {
    if (!title && !location) {
      toast.error("Please enter at least a job title or a location");
      return;
    }

    const params = new URLSearchParams();
    if (title) params.append("title", title);
    if (location) params.append("location", location);

    navigate(`/tree-jobs/jobs?${params.toString()}`);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(handleSendToFindJobs)}
      className="p-2 px-5 bg-white rounded-full shadow-md mt-3 w-2xl border border-gray-100 flex items-center justify-between"
    >
      <fieldset className="w-1/3 flex items-center gap-4">
        <Search className="w-4 h-4" />
        <input
          type="text"
          id="title"
          placeholder="Job title or company"
          className="focus:outline-none text-gray-600"
          {...register("title")}
        />
      </fieldset>

      <div className="border-l border-gray-400 h-6" />

      <fieldset className="w-1/3 flex items-center gap-4">
        <Locate className="w-4 h-4" />
        <input
          type="text"
          id="location"
          placeholder="Nvo. Casas Grandes"
          className="focus:outline-none text-gray-600"
          {...register("location")}
        />
      </fieldset>

      <button
        type="submit"
        className="py-2 bg-purple-800 text-white rounded-full px-5 cursor-pointer"
      >
        Search
      </button>
    </form>
  );
}
