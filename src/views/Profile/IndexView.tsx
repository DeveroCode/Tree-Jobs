import { Link } from "react-router-dom";
import { useUser } from "@/hooks/user";
import { PencilIcon } from "@heroicons/react/24/outline";
import Title from "@/components/Title";
import ChangePicture from "@/components/Profile/ChangePicture";

export default function IndexView() {
  const { data: user } = useUser();
  return (
    <div className="flex flex-col space-y-5 md:border-l md:border-gray-200 lg:px-16 md:px-8 px-4 py-12 w-full">
      <Title text="View your profile summary">General information</Title>

      <main className="mt-5 space-y-10">
        {/* Change Picture */}
        <section className="border border-gray-200 py-5 px-6 rounded-lg max-w-5xl mx-auto w-full">
          <ChangePicture />
        </section>

        {/* Personal Info */}
        <section className="border border-gray-200 py-5 px-6 rounded-lg w-full max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h2 className="font-bold text-lg">Personal information</h2>
            <Link
              to={"/dashboard/settings/security-settings"}
              className="flex items-center gap-2 text-gray-400 cursor-pointer group hover:text-purple-500 transition-colors duration-200 border border-gray-200 hover:border-purple-500 px-3 py-2 rounded-md w-fit"
            >
              <PencilIcon className="w-6 h-6 text-gray-400 group-hover:text-purple-500 transition-colors duration-200" />
              Edit
            </Link>
          </div>

          {/* Name / Last Name */}
          <div className="mt-6 flex flex-wrap gap-6">
            <fieldset className="w-full md:w-[48%]">
              <label className="text-gray-400 tracking-widest">Name</label>
              <p className="mt-2 capitalize">{user?.name}</p>
            </fieldset>
            <fieldset className="w-full md:w-[48%]">
              <label className="text-gray-400 tracking-widest">Last Name</label>
              <p className="mt-2 capitalize">Martinez</p>
            </fieldset>
          </div>

          {/* Email / Company */}
          <div className="mt-6 flex flex-wrap gap-6">
            <fieldset className="w-full md:w-[48%]">
              <label className="text-gray-400 tracking-widest">
                Email Address
              </label>
              <p className="mt-2 break-words">{user?.email}</p>
            </fieldset>
            <fieldset className="w-full md:w-[48%]">
              <label className="text-gray-400 tracking-widest">Company</label>
              <p className="mt-2 capitalize">{user?.company}</p>
            </fieldset>
          </div>

          {/* Bio */}
          <div className="mt-6">
            <fieldset className="w-full">
              <label className="text-gray-400 tracking-widest">Bio</label>
              <p className="mt-2 text-purple-button capitalize">{user?.role}</p>
            </fieldset>
          </div>
        </section>
      </main>
    </div>
  );
}
