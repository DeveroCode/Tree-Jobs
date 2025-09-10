import {
  EnvelopeIcon,
  PhoneIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import profile from "/logo.png";
import PoverOptionsCandidate from "./PoverOptionsCandidate";
import type { CandidateInformation } from "@/types/index";
import { formatDateTime } from "@/utils/index";
import { useState } from "react";
import ModalUpdateStatus from "../Modals/ModalUpdateStatus";
import ModalRejectPostulation from "../Modals/ModalRejectPostulation";

type CardCandidateProps = {
  candidate: CandidateInformation[number];
};
export default function CardCandidate({ candidate }: CardCandidateProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isRejectOpen, setIsRejectOpen] = useState(false);
  return (
    <div className="bg-white shadow-md rounded-lg p-5 w-full">
      <section className="flex justify-between mb-5">
        <div>
          <div className="flex gap-2">
            <img
              src={profile}
              alt="Profile"
              className="w-12 h-12 rounded-full mb-3"
            />
            <h2 className="font-semibold text-xs capitalize mt-2">
              {candidate.candidate.name} {candidate.candidate.last_name}
            </h2>
          </div>
        </div>

        <PoverOptionsCandidate
          cv={candidate.candidate.cv}
          setIsOpen={setIsOpen}
          setIsRejectOpen={setIsRejectOpen}
        />
      </section>

      <section>
        <div className="flex flex-col justify-between mb-3">
          <div className="flex justify-between">
            <div className="space-y-2">
              <h3 className="text-xs text-gray-500">City</h3>
              <p className="text-sm font-semibold">Chihuahua</p>
            </div>
            <div className="space-y-2">
              <h4 className="text-xs text-gray-500">Day Postulation</h4>
              <p className="text-sm font-semibold">
                {formatDateTime(candidate.createdAt)}
              </p>
            </div>
          </div>

          <span className="flex items-center gap-3 mt-7 text-sm">
            <EnvelopeIcon className="w-5 h-5" />
            {candidate.candidate.email}
          </span>
          <span className="flex items-center gap-3 mt-3 text-sm">
            <PhoneIcon className="w-5 h-5" />
            {candidate.candidate.phone_number}
          </span>
          <span className="flex items-center gap-3 mt-3 text-sm">
            <ClockIcon className="w-5 h-5" />
            {candidate.status}
          </span>
        </div>
      </section>

      {isOpen && (
        <ModalUpdateStatus
          setIsOpen={setIsOpen}
          postulationId={candidate._id}
        />
      )}
      {isRejectOpen && <ModalRejectPostulation setIsRejectOpen={setIsRejectOpen} postulationId={candidate._id} />}
    </div>
  );
}
