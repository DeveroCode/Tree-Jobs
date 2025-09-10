import { getAllMyPostulations } from "@/api/UserWorkAPI";
import ApplicationCard from "@/components/Candidate/ApplicationCard";
import type { ApplicationData } from "@/types/index";
import { FunnelIcon } from "@heroicons/react/24/outline";
import { useQuery } from "@tanstack/react-query";

export default function MyApplicationsView() {
  const { isLoading, isError, data } = useQuery<ApplicationData>({
    queryKey: ["myApplications"],
    queryFn: getAllMyPostulations,
    refetchOnWindowFocus: false,
    retry: false,
  });

  const totalApplications = data?.length || 0;

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (isError)
    return <p className="text-center mt-10">Error loading applications</p>;

  if (data)
    return (
      <>
        {/* Header */}
        <section className="flex items-center justify-between px-5">
          {" "}
          <h1 className="font-semibold text-3xl">
            {" "}
            <span className="text-purple-button mr-2">{totalApplications}</span>
            Employees{" "}
          </h1>{" "}
          <button className="text-gray-800 bg-gray-200 py-2 px-5 rounded-md flex items-center gap-2 cursor-pointer">
            {" "}
            <FunnelIcon className="w-5 h-5" /> Filter{" "}
          </button>{" "}
        </section>

        {/* Card for Applications */}
        <main className="py-10 px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.length ? (
            data.map((application) => (
              <ApplicationCard
                key={application._id}
                application={application}
              />
            ))
          ) : (
            <p className="text-center col-span-full">
              You don't have any applications yet
            </p>
          )}
        </main>
      </>
    );
}
