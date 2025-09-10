import { saveJobs } from "@/api/UserWorkAPI";
import type { JobCardData } from "@/types/index";
import { formatDateTime } from "@/utils/index";
import {
  BanknotesIcon,
  MapPinIcon,
  BookmarkIcon as BookmarkOutline,
} from "@heroicons/react/24/outline";
import { BookmarkIcon as BookmarkSolid } from "@heroicons/react/24/solid";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useUser } from "@/hooks/user";

type WorkCardProps = {
  work: JobCardData;
  handleOpenModal?: () => void;
  setJob?: (work: JobCardData) => void;
};

export default function WorkCard({
  work,
  handleOpenModal,
  setJob,
}: WorkCardProps) {
  const [saved, setSaved] = useState(work.isSaved);
  const queryClient = useQueryClient();
  const { data: user } = useUser();
  const location = useLocation();

  const { mutate } = useMutation({
    mutationFn: saveJobs,
    onSuccess: (data) => {
      toast.success(data);
      queryClient.invalidateQueries({ queryKey: ["postulationsWorks"] });
      setSaved((prev) => !prev);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleSaveJob = () => mutate(work._id);

  return (
    <div
      key={work._id}
      className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300
             w-full sm:w-[300px] md:w-[500px] min-h-[250px] cursor-pointer flex flex-col justify-between"
    >
      <div>
        <div className="flex justify-between items-center mb-2">
          <p className="text-purple-600 text-sm font-semibold capitalize">
            {work.company ?? "Empresa desconocida"}
          </p>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400">
              {formatDateTime(work.createdAt)}
            </span>

            {saved ? (
              <BookmarkSolid
                className="w-5 h-5 text-purple-600 cursor-pointer"
                onClick={handleSaveJob}
              />
            ) : (
              <BookmarkOutline
                className="w-5 h-5 text-gray-500 cursor-pointer"
                onClick={handleSaveJob}
              />
            )}
          </div>
        </div>

        <h2 className="text-xl font-bold text-gray-800 mb-1">{work.title}</h2>
        <p className="text-gray-500 text-sm line-clamp-3">{work.description}</p>

        <div className="flex flex-wrap items-center gap-4 mt-4">
          {work.salary && (
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <BanknotesIcon className="w-5 h-5 text-green-500" />
              <span>${work.salary.toLocaleString()} MXN</span>
            </div>
          )}
          {work.location && (
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <MapPinIcon className="w-5 h-5 text-blue-500" />
              <span>{work.location}</span>
            </div>
          )}
        </div>
      </div>

      {location.pathname === "/tree-jobs" ? (
        <Link
          to={"/tree-jobs/jobs"}
          className="mt-auto bg-purple-600 hover:bg-purple-700 transition-colors text-white text-sm font-medium py-2 px-6 rounded-md capitalize text-center"
        >
          Go to find jobs
        </Link>
      ) : user ? (
        <button
          onClick={() => {
            if (setJob) setJob(work);
            if (handleOpenModal) handleOpenModal();
          }}
          className="mt-auto bg-purple-600 hover:bg-purple-700 transition-colors text-white text-sm font-medium py-2 px-6 rounded-md"
        >
          Postularme
        </button>
      ) : (
        <Link
          to="/auth/login"
          className="mt-auto bg-purple-600 hover:bg-purple-700 transition-colors text-white text-sm font-medium py-2 px-6 rounded-md text-center"
        >
          Login to Apply
        </Link>
      )}
    </div>
  );
}
