import type { recrutiersSMS } from "@/types/index";
import { Pen } from "lucide-react";
type AsideMessagesProps = {
  recruiters: recrutiersSMS[];
  onSelectRecrutier: (recrutier: recrutiersSMS) => void;
  selectedRecrutier: recrutiersSMS | null;
};
export default function AsideMessages({
  recruiters,
  onSelectRecrutier,
  selectedRecrutier,
}: AsideMessagesProps) {
  // save recrutier in localstorage
  const handleSelectRecrutier = (recrutier: recrutiersSMS) => {
    localStorage.setItem("selectedRecrutier", JSON.stringify(recrutier._id));
    onSelectRecrutier(recrutier);
  };
  return (
    <div className="w-full md:w-1/4 border-l border-y bg-white border-gray-200 rounded-tl-md rounded-bl-md h-full min-h-[600px] overflow-y-auto">
      {" "}
      <section className="flex items-center gap-1 border-b p-3 border-gray-400">
        {" "}
        <Pen className="w-4 h-4 text-gray-700" />{" "}
        <p className="font-bold text-gray-700">Messages</p>{" "}
      </section>{" "}
      <section className="p-0">
        {" "}
        {recruiters.map((recrutier) => (
          <div
            key={recrutier._id}
            className="flex items-center gap-2 p-3 border-b border-gray-200 cursor-pointer"
            onClick={() => handleSelectRecrutier(recrutier)}
            style={{
              backgroundColor:
                selectedRecrutier?._id === recrutier._id
                  ? "#f0f0f0"
                  : "transparent",
            }}
          >
            {" "}
            <img
              src={recrutier.image ? recrutier.image : "/default-profile.png"}
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover"
            />{" "}
            <div className="flex flex-col">
              {" "}
              <span className="font-medium text-gray-800 capitalize">
                {" "}
                {recrutier.name}{" "}
              </span>{" "}
              <span className="text-sm text-gray-500">
                {" "}
                Click to start a conversation{" "}
              </span>{" "}
            </div>{" "}
          </div>
        ))}{" "}
      </section>{" "}
    </div>
  );
}
