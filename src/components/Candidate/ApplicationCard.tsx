import { BriefcaseIcon, EnvelopeIcon } from "@heroicons/react/24/outline";
import logo from "/logo.png";
import type { ApplicationData } from "@/types/index";
import { formatCurrency } from "@/utils/index";
import { useState } from "react";
import ModalSendEmail from "../Modals/ModalSendEmail";

type applicationProps = {
  application: ApplicationData[number];
};

export default function ApplicationCard({ application }: applicationProps) {
  const [isOpenEmail, setIsOpenEmail] = useState(false);
  return (
    <div className="bg-white shadow-md rounded-lg p-5 w-full flex flex-col justify-between min-h-[280px] transition hover:shadow-lg">
      {/* Header */}
      <section className="flex items-center gap-3 mb-4">
        <img
          src={logo}
          alt="Company Logo"
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full"
        />
        <header className="capitalize">
          <p className="text-base sm:text-lg font-semibold capitalize">
            {application.work.company}
          </p>
          <span className="block mt-[-4px] text-gray-500 text-sm sm:text-base">
            {application.work.title}
          </span>
        </header>

        <button
          className="ml-auto mb-[10px] cursor-pointer"
          onClick={() => setIsOpenEmail(true)}
        >
          <EnvelopeIcon className="w-5 h-5 text-gray-500" />
        </button>

        {isOpenEmail && application.status !== "reject" && (
          <ModalSendEmail
            setIsOpenEmail={setIsOpenEmail}
            workTitle={application.work.title}
            to={application.recrutier.email}
            fullNameRecrutier={`${application.recrutier.name} ${application.recrutier.last_name}`}
            idRecrutier={application.recrutier._id}
          />
        )}
      </section>

      {/* Body */}
      <section className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <BriefcaseIcon className="w-5 h-5 text-gray-500" />
          <h2 className="text-sm sm:text-md font-semibold">
            {application.work.title}
          </h2>
        </div>

        <span className="text-sm text-gray-500 line-clamp-3">
          {application.work.description}
        </span>
      </section>

      {/* Footer */}
      <section className="mt-5 border-t border-gray-200 pt-4 flex justify-between text-sm">
        <div className="flex flex-col items-center">
          <span className="text-xs text-purple-600">
            {formatCurrency(application.work.salary!)}
          </span>
          <p className="font-semibold capitalize">Salary</p>
        </div>
        <div className="flex flex-col items-center">
          <span
            className={`text-xs capitalize ${
              application.status === "Accepted"
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            {application.status}
          </span>
          <p className="font-semibold capitalize">Status</p>
        </div>
      </section>
    </div>
  );
}
