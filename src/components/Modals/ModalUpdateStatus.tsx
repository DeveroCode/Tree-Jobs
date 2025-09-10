import { updateStatus } from "@/api/UserWorkAPI";
import { status, type updateStatusForm } from "@/types/index";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

type ModalUpdateStatusProps = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  postulationId: updateStatusForm["postulationId"];
};

export default function ModalUpdateStatus({
  setIsOpen,
  postulationId,
}: ModalUpdateStatusProps) {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: updateStatus,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      queryClient.invalidateQueries({ queryKey: ["candidates"] });
      setIsOpen(false);
    },
  });

  const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = {
      postulationId,
      status: (e.target as HTMLFormElement).status.value,
    };

    mutate(formData);
    setIsOpen(false);
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 animate-fade-in">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Update Candidate Status
        </h2>

        <form className="space-y-4" onSubmit={handleUpdate}>
          <div>
            <label
              htmlFor="status"
              className="block mb-1 text-sm font-medium text-gray-600"
            >
              Select Status
            </label>
            <select
              id="status"
              name="status"
              className="w-full p-2.5 border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-purple-button focus:border-purple-button"
            >
              {status.map((stat) => (
                <option key={stat} value={stat}>
                  {stat.charAt(0).toUpperCase() + stat.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors cursor-pointer"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-purple-button hover:bg-purple-700 transition-colors text-white px-4 py-2 rounded-md text-sm cursor-pointer"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
