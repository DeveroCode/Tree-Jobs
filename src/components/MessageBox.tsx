import { useUser } from "@/hooks/user";
import type { recrutiersSMS, SMS } from "../types";
import { Search } from "lucide-react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendMessage } from "@/api/UserWorkAPI";
import { toast } from "react-toastify";
import { useSocket } from "@/hooks/useSocket";
import { SOCKET_EVENTS } from "@/utils/socketsEvents";
import { useMessages } from "@/hooks/message";

type MessageBoxProps = {
  recruiter: recrutiersSMS | null;
};

export default function MessageBox({ recruiter }: MessageBoxProps) {
  const queryClient = useQueryClient();
  const socket = useSocket();

  // get Recutier from localstorage
  const storedRecrutier = localStorage.getItem("selectedRecrutier");
  const recrutier = storedRecrutier ? JSON.parse(storedRecrutier) : null;

  // Data user
  const { data: user } = useUser();

  // Message hook
  const { data: messages, isLoading } = useMessages(recrutier);

  const initialValues: SMS = {
    sender: " ",
    receiver: "",
    body: "",
    status: "sent",
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SMS>({
    defaultValues: initialValues,
  });

  const { mutate } = useMutation({
    mutationFn: sendMessage,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      queryClient.invalidateQueries({ queryKey: ["messages", recruiter?._id] });
      socket?.emit(SOCKET_EVENTS.MESSAGE_NEW, data);
      reset();
    },
  });

  const handleSendMessage = async (data: SMS) => {
    const formData = {
      body: data.body,
      sender: user!._id,
      receiver: recruiter!._id,
      status: data.status,
    };

    mutate(formData);
  };

  if (!recruiter)
    return (
      <section className="bg-white w-full md:w-3/4 border border-gray-200 rounded-tr-md rounded-br-md h-full min-h-[600px] flex items-center justify-center">
        <p className="text-gray-400">
          Select a conversation to start messaging
        </p>
      </section>
    );

  return (
    <section className="bg-white w-full md:w-3/4 border border-gray-200 rounded-tr-md rounded-br-md h-full min-h-[600px] flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 border-b p-3 shadow-sm">
        <img
          src={recruiter.image || "/default-profile.png"}
          alt="Profile"
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <h2 className="font-semibold text-gray-800 capitalize">
            {recruiter.name} {recruiter.last_name}
          </h2>
          <p className="text-xs text-gray-500">Online</p>
        </div>

        <div className="ml-auto">
          <Search className="w-6 h-6 text-gray-600 cursor-pointer hover:text-gray-800 transition-colors" />
        </div>
      </div>

      {/* Conversation */}
      <div
        id="chat-container"
        className="flex-1 p-4 overflow-y-auto space-y-3 max-h-[450px] bg-gray-50"
      >
        {isLoading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : (
          messages?.map((msg) => {
            const isMine = msg.sender._id === user?._id;
            return (
              <div
                key={msg._id}
                className={`flex items-end ${
                  isMine ? "justify-end" : "justify-start"
                }`}
              >
                {!isMine && (
                  <img
                    src={recruiter.image || "/default-profile.png"}
                    alt="avatar"
                    className="w-8 h-8 rounded-full object-cover mr-2"
                  />
                )}
                <div className="flex flex-col max-w-xs">
                  <div
                    className={`px-4 py-2 rounded-2xl shadow-sm text-sm ${
                      isMine
                        ? "bg-purple-500 text-white rounded-br-none"
                        : "bg-blue-300 text-gray-900 rounded-bl-none"
                    }`}
                  >
                    {msg.body}
                  </div>
                  <span className="text-xs text-gray-400 mt-1 self-end">
                    {new Date(msg.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Input para escribir mensaje */}
      <form
        className="p-3 border-t bg-white flex items-center gap-2"
        onSubmit={handleSubmit(handleSendMessage)}
      >
        <input
          type="text"
          placeholder="Write your message..."
          className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
          {...register("body", { required: "Message body is required" })}
        />

        <button
          type="submit"
          className="bg-purple-500 text-white px-4 py-2 rounded-full hover:bg-purple-600 transition-colors"
        >
          Send
        </button>
      </form>

      {errors.body && (
        <p className="text-red-500 text-sm mt-1 px-3">{errors.body.message}</p>
      )}
    </section>
  );
}
