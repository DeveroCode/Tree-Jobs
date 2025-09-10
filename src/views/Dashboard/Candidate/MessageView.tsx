import AsideMessages from "@/components/Candidate/AsideMessages";
import { chatParners } from "@/api/UserWorkAPI";
import type { recrutiersSMS } from "@/types/index";
import { useQuery } from "@tanstack/react-query";
// import { Link } from "react-router-dom";
import MessageBox from "@/components/MessageBox";
import { useState } from "react";
import { Link } from "react-router-dom";
export default function MessageView() {
  const [setConversation, isSetConversation] = useState<recrutiersSMS | null>(
    null
  );
  const { data, isLoading, isError } = useQuery<recrutiersSMS[]>({
    queryKey: ["aviableChatParners"],
    queryFn: chatParners,
    refetchOnWindowFocus: false,
    retry: false,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;

  if (data)
    return (
      <div className="flex h-96">
        {/* Desktop */}
        <div className="hidden md:flex flex-1 shadow">
          <AsideMessages
            recruiters={data}
            onSelectRecrutier={isSetConversation}
            selectedRecrutier={setConversation}
          />
          <MessageBox recruiter={setConversation} />
        </div>

        {/* Mobile */}
        <div className="flex flex-1 md:hidden">
          {!setConversation ? (
            <AsideMessages
              recruiters={data}
              onSelectRecrutier={isSetConversation}
              selectedRecrutier={setConversation}
            />
          ) : (
            <div className="flex-1">
              <button
                className="p-3 text-blue-500 font-semibold"
                onClick={() => isSetConversation(null)}
              >
                ← Back
              </button>
              <MessageBox recruiter={setConversation} />
            </div>
          )}
        </div>
      </div>
    );

  return (
    <div className="flex flex-col items-center justify-center h-48 text-center p-6">
      <p className="text-gray-500 mb-4">
        You have no messages yet. Start applying to jobs to connect with
        recruiters!
        <Link to="/jobs" className="text-blue-500 hover:underline ml-1">
          Write Messages
        </Link>
      </p>
    </div>
  );
}

