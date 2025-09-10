import type { Work } from "@/types/index";
import {
  ArrowTopRightOnSquareIcon,
  MapPinIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { getCompanyBadge } from "@/utils/index";
import { useState } from "react";
import { Switch } from "@headlessui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateWorkEnabled } from "@/api/workAPI";
import { toast } from "react-toastify";

type CardWorkProps = {
  work: Work;
};

export default function CardWork({ work }: CardWorkProps) {
  const [enabled, setEnabled] = useState(work.enabled);
  const { firstLetter, bg, border, text } = getCompanyBadge(work.company);
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: updateWorkEnabled,
    onSuccess: (message) => {
      toast.success(message);
      queryClient.invalidateQueries({ queryKey: ["works"] });
    },
    onError: (error: string) => {
      toast.error(error);
    },
  });

  const handleSetEnable = () => {
    mutate({ workId: work._id });
  };

  return (
    <div className="border border-gray-200 shadow rounded-md flex flex-col py-5 px-5 col-span-1">
      <section className="flex justify-between">
        <div
          className={`py-3 px-5 rounded-md ${bg} ${border} shadow-sm shadow-gray-200`}
        >
          <strong className={`${text}`}>{firstLetter}</strong>
        </div>

        <Link
          to={"/"}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between mb-5"
        >
          <ArrowTopRightOnSquareIcon className="w-5 h-5 text-gray-400" />
        </Link>
      </section>

      <section className="mt-5 min-h-[100px]">
        <h3 className="text-lg font-bold">{work.title}</h3>
        <p className="text-sm text-gray-400">{work.description}</p>
        <p className="text-sm text-gray-400 flex items-center">
          <MapPinIcon className="w-3 h-3 text-gray-400" /> {work.location}
        </p>
      </section>

      <section className="mt-7 flex items-center justify-between">
        <Link
          to={`/dashboard/edit-work/${work._id}`}
          rel="noopener noreferrer"
          className="text-sm text-purple-button flex items-center gap-2 border-purple-button border rounded-md px-3 py-2"
        >
          <PencilSquareIcon className="w-5 h-5" />
          Edit
        </Link>
        <div>
          <Switch
            checked={enabled}
            onChange={setEnabled}
            onClick={handleSetEnable}
            className="group inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition data-checked:bg-blue-600"
          >
            <span className="size-4 translate-x-1 rounded-full bg-white transition group-data-checked:translate-x-6" />
          </Switch>
        </div>
      </section>
    </div>
  );
}
