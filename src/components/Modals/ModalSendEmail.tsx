import { sendEmailFollowUp } from "@/api/UserWorkAPI";
import { useUser } from "@/hooks/user";
import type { EmailApplication } from "@/types/index";
import {
  PaperAirplaneIcon,
  SparklesIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

type modalProps = {
  setIsOpenEmail: React.Dispatch<React.SetStateAction<boolean>>;
  workTitle: EmailApplication["workTitle"];
  to: EmailApplication["to"];
  fullNameRecrutier: EmailApplication["fullNameRecrutier"];
  idRecrutier: EmailApplication["idRecrutier"];
};

export default function ModalSendEmail({
  setIsOpenEmail,
  workTitle,
  to,
  fullNameRecrutier,
  idRecrutier,
}: modalProps) {
  const { data: user } = useUser();

  const { mutate } = useMutation<unknown, Error, EmailApplication>({
    mutationFn: sendEmailFollowUp,
    onSuccess: (message) => {
      toast.success(message as string);
      setIsOpenEmail(false);
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = {
      from: user?.email,
      to,
      workTitle,
      nameCandidate: user?.name,
      fullNameRecrutier,
      idRecrutier,
    };

    mutate(formData as EmailApplication);
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-xs shadow-lg w-full max-w-xl p-6 animate-fade-in">
        <header className="flex items-center justify-between mb-4">
          <h1 className="text-lg font-semibold text-purple-700 flex items-center gap-2">
            <SparklesIcon className="w-5 h-5" /> New Message
          </h1>

          <button
            className="cursor-pointer"
            onClick={() => setIsOpenEmail(false)}
          >
            <XCircleIcon className="w-5 h-5 text-gray-500" />
          </button>
        </header>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <fieldset className="flex gap-4 items-center">
            <label
              htmlFor=""
              className="block text-sm font-light text-gray-500"
            >
              From:
            </label>
            <input
              type="text"
              className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
              value={`${user?.email}`}
            />
          </fieldset>
          <fieldset className="flex gap-4 items-center">
            <label
              htmlFor="to"
              className="block text-sm font-light text-gray-500"
            >
              To:
            </label>
            <input
              name="to"
              id="to"
              type="text"
              className="mt-1 ml-5 block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
              value={`${to}`}
            />
          </fieldset>

          <fieldset className="mt-1 block w-full px-3 py-3 border-y border-gray-300 sm:text-sm">
            <p className="font-bold text-sm">Application follow-up</p>
          </fieldset>

          <textarea
            name="message"
            id="message"
            className="mt-1 block w-full px-3 min-h-[250px] py-3 focus:outline-none sm:text-sm"
            placeholder="Type your message here..."
            value={`Hello ${fullNameRecrutier},\n\nI hope this message finds you well. I wanted to kindly ask if there have been any updates regarding my application or if any progress has been made.\n\nI am more than happy to provide further details about my experience in ${workTitle} the field if needed.\n\nBest regards,\n\n${user?.name} ${user?.last_name}`}
          />

          <div className="flex justify-end mt-2">
            <button className="text-white bg-purple-button font-semibold py-2 px-5 rounded-md cursor-pointer flex items-center gap-2">
              {" "}
              <PaperAirplaneIcon className="w-5 h-5" /> Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
