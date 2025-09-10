import { rejectPostulation } from "@/api/UserWorkAPI";
import type { updateStatusForm } from "@/types/index";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type React from "react";
import { toast } from "react-toastify";

type ModalRejectPostulationProps = {
  setIsRejectOpen: React.Dispatch<React.SetStateAction<boolean>>;
  postulationId: updateStatusForm["postulationId"];
};

export default function ModalRejectPostulation({
  setIsRejectOpen,
  postulationId,
}: ModalRejectPostulationProps) {
  const queryClient = useQueryClient();
  const handleClose = () => {
    setIsRejectOpen(false);
  };

  const { mutate } = useMutation({
    mutationFn: rejectPostulation,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      queryClient.invalidateQueries({ queryKey: ["candidates"] });
      setIsRejectOpen(false);
    },
  });

  const handleReject = () => mutate(postulationId);

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-sm p-6 animate-fade-in">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">
          Reject Candidate
        </h2>
        <p className="text-gray-600 text-sm mb-6">
          Are you sure you want to reject this postulation? This action cannot
          be undone.
        </p>

        <form className="flex justify-end gap-3">
          <button
            type="button"
            className="px-4 py-2 text-sm rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors"
            onClick={handleClose}
          >
            No
          </button>
          <button
            type="button"
            className="px-4 py-2 text-sm rounded-md bg-red-600 text-white hover:bg-red-700 transition-colors"
            onClick={handleReject}
          >
            Yes
          </button>
        </form>
      </div>
    </div>
  );
}
