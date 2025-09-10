import type { JobCardData } from "@/types/index";
import logo from "/logo.png";
import {
  BanknotesIcon,
  BookmarkIcon,
  BriefcaseIcon,
  MapPinIcon,
  ShareIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useMutation } from "@tanstack/react-query";
import { postulateToWork } from "@/api/UserWorkAPI";
import { toast } from "react-toastify";
import { useUser } from "@/hooks/user";

type ModalPostulationProps = {
  handleOpenModal: () => void;
  job: JobCardData;
};

export default function ModalPostulation({
  handleOpenModal,
  job,
}: ModalPostulationProps) {
  const { data: user } = useUser();
  const { mutate } = useMutation({
    mutationFn: postulateToWork,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
    },
  });
  const handleSubmitPostulation = () => {
    const formData = {
      work: job._id,
      recrutier: job.user._id,
      cv: user?.cv || "",
    };
    mutate(formData);
    handleOpenModal();
  };

  return (
    <div className="w-full fixed top-0 left-0 bg-gray-900/50 flex justify-end overflow-hidden min-h-screen">
      {" "}
      <div className="bg-white p-8 w-full md:w-md shadow-lg">
        {" "}
        <section className="flex items-center justify-between">
          {" "}
          <h1 className="text-2xl font-bold py-4">Job Details</h1>{" "}
          <button
            className="bg-purple-button rounded-full p-2"
            onClick={handleOpenModal}
          >
            <XMarkIcon className="w-4 h-4 cursor-pointer" />
          </button>{" "}
        </section>{" "}
        <header className="rounded-md py-3 px-4 bg-gray-100 mt-5">
          {" "}
          <section className="flex items-center gap-4">
            {" "}
            <img
              src={logo}
              alt="logo tree jobs"
              className="rounded-md w-12 h-12 object-cover mt-2 shadow-md"
            />{" "}
            <div>
              {" "}
              <strong className="capitalize">{job.company}</strong>{" "}
              <p className="text-xs text-purple-button">
                Published by{" "}
                <span className="capitalize">
                  {job.user.name} {job.user.last_name}
                </span>
              </p>{" "}
            </div>{" "}
          </section>{" "}
          <section className="flex items-center justify-between">
            {" "}
            <button
              onClick={handleSubmitPostulation}
              className="mt-5 bg-purple-600 hover:bg-purple-700 transition-colors text-white text-sm font-bold py-2 px-6 rounded-md cursor-pointer"
            >
              {" "}
              Send CV{" "}
            </button>{" "}
            <ol className="unstyled-list flex items-center gap-2 mt-4">
              {" "}
              <BookmarkIcon className="w-6 h-6 cursor-pointer" />{" "}
              <ShareIcon className="w-6 h-6 cursor-pointer" />{" "}
            </ol>{" "}
          </section>{" "}
        </header>{" "}
        <section className="mt-5 py-4">
          {" "}
          <h2 className="text-lg font-bold">About the job</h2>{" "}
          <p className="text-sm text-gray-600 mt-2"> {job.description} </p>{" "}
        </section>{" "}
        <section className="mt-5 bg-gray-100 py-3 px-4 rounded-md">
          {" "}
          <ul className="unstyled-list flex flex-col gap-2 space-y-3">
            {" "}
            <li className="flex items-center gap-2">
              {" "}
              <div className="bg-purple-button rounded-full p-2">
                {" "}
                <MapPinIcon className="w-5 h-5 text-white" />{" "}
              </div>{" "}
              <span className="text-sm font-bold">{job.location}</span>{" "}
            </li>{" "}
            <li className="flex items-center gap-2">
              {" "}
              <div className="bg-green-600 rounded-full p-2">
                {" "}
                <BriefcaseIcon className="w-5 h-5 text-white" />{" "}
              </div>{" "}
              <span className="text-sm font-bold">Full Time</span>{" "}
            </li>{" "}
            <li className="flex items-center gap-2">
              {" "}
              <div className="bg-orange-600 rounded-full p-2">
                {" "}
                <BanknotesIcon className="w-5 h-5 text-white" />{" "}
              </div>{" "}
              <span className="text-sm font-bold">
                ${job.salary!.toLocaleString()} MXN
              </span>{" "}
            </li>{" "}
          </ul>{" "}
        </section>{" "}
        <p className="mt-20 text-center text-xs text-purple-500 cursor-pointer">
          feel it's a scam, submit a report anonymously
        </p>{" "}
      </div>{" "}
    </div>
  );
}
