import { saveJobs } from "@/api/UserWorkAPI";
import type { SavedJobs } from "@/types/index";
import { formatDateTime } from "@/utils/index";
import { BanknotesIcon } from "@heroicons/react/24/outline";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BookmarkIcon as BookmarkSolid } from "@heroicons/react/24/solid";
import { MapPinIcon } from "lucide-react";
import { toast } from "react-toastify";

type PropsSavedJobs = {
  job: SavedJobs[number];
  handleOpenModal?: () => void;
  setJob?: (savedJob: SavedJobs[number]) => void;
};

export default function SaveWorkCard({
  job,
  setJob,
  handleOpenModal,
}: PropsSavedJobs) {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: saveJobs,
    onSuccess: (data) => {
      toast.success(data);
      queryClient.invalidateQueries({ queryKey: ["postulationsWorks"] });
      queryClient.invalidateQueries({ queryKey: ["savedJobs"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleSaveJob = () => mutate(job.work._id);
  return (
    <div
      key={job.work._id}
      className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300
             w-full sm:w-[300px] md:w-[500px] min-h-[250px] cursor-pointer flex flex-col justify-between"
    >
      <div>
        <div className="flex justify-between items-center mb-2">
          <p className="text-purple-600 text-sm font-semibold capitalize">
            {job.work.company ?? "Empresa desconocida"}
          </p>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400">
              {formatDateTime(job.createdAt)}
            </span>
            <BookmarkSolid
              className="w-5 h-5 text-purple-500 cursor-pointer"
              onClick={handleSaveJob}
            />
          </div>
        </div>

        <h2 className="text-xl font-bold text-gray-800 mb-1">
          {job.work.title}
        </h2>
        <p className="text-gray-500 text-sm line-clamp-3">
          {job.work.description}
        </p>

        <div className="flex flex-wrap items-center gap-4 mt-4">
          {job.work.salary && (
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <BanknotesIcon className="w-5 h-5 text-green-500" />
              <span>${job.work.salary!.toLocaleString()} MXN</span>
            </div>
          )}
          {job.work.location && (
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <MapPinIcon className="w-5 h-5 text-blue-500" />
              <span>{job.work.location}</span>
            </div>
          )}
        </div>
      </div>

      <button
        onClick={() => {
          if (setJob) setJob(job);
          if (handleOpenModal) handleOpenModal();
        }}
        className="mt-auto bg-purple-600 hover:bg-purple-700 transition-colors text-white text-sm font-medium py-2 px-6 rounded-md"
      >
        Postularme
      </button>
    </div>
  );
}
