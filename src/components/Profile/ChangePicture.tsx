import { useUser } from "@/hooks/user";
import { MapPinIcon, PencilIcon } from "@heroicons/react/24/outline";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadImage } from "@/api/AuthAPI";
import { toast } from "react-toastify";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function ChangePicture() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: user } = useUser();

  const { mutate } = useMutation({
    mutationFn: uploadImage,
    onError: (error) => toast.error(error.message),
    onSuccess: (data) => {
      toast.success(data);
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      navigate("/dashboard/settings/general");
    },
  });

  const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) mutate(e.target.files[0]);
  };

  return (
    <div className="flex flex-col md:flex-row justify-between gap-6">
      {/* Foto + Info */}
      <section className="flex flex-col sm:flex-row gap-6 sm:gap-10 items-center sm:items-start">
        <img
          src={user?.image}
          alt="profile user"
          className="w-24 h-24 sm:w-32 sm:h-32 object-cover object-center rounded-full"
        />

        <div className="space-y-1 text-center sm:text-left">
          <h2 className="text-lg font-semibold text-gray-800 capitalize">
            {user?.name}
          </h2>
          <p className="text-gray-400 capitalize">
            Role: <span className="text-purple-500">{user?.role}</span>
          </p>
          <span className="flex items-center justify-center sm:justify-start gap-1 text-gray-600">
            <MapPinIcon className="w-4 h-4" /> Nuevo Casas Grandes
          </span>
        </div>
      </section>

      {/* Botón Edit */}
      <section className="flex justify-center md:justify-end">
        {pathname === "/dashboard/settings/profile-photo" ? (
          <label className="flex items-center gap-2 text-gray-400 cursor-pointer group hover:text-purple-500 transition-colors duration-200 border border-gray-200 hover:border-purple-500 px-3 py-2 rounded-md">
            <PencilIcon className="w-6 h-6 text-gray-400 group-hover:text-purple-500 transition-colors duration-200" />
            Edit
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleUploadImage}
            />
          </label>
        ) : (
          <Link
            to="/dashboard/settings/profile-photo"
            className="mt-2 flex items-center gap-2 text-gray-400 hover:text-purple-500 transition-colors duration-200 border border-gray-200 hover:border-purple-500 px-3 py-2 rounded-md"
          >
            <PencilIcon className="w-6 h-6 text-gray-400 group-hover:text-purple-500 transition-colors duration-200" />
            Edit
          </Link>
        )}
      </section>
    </div>
  );
}
