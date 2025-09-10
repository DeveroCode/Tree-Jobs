import { getCandidateInformation } from "@/api/UserWorkAPI";
import CardCandidate from "@/components/Postulation/CardCandidate";
import type { CandidateInformation } from "@/types/index";
import { FunnelIcon } from "@heroicons/react/24/outline";
import { useQuery } from "@tanstack/react-query";
import { Navigate } from "react-router-dom";

export default function CandidatesView() {
  const { data, isLoading, isError } = useQuery<CandidateInformation>({
    queryKey: ["candidates"],
    queryFn: getCandidateInformation,
    refetchOnWindowFocus: false,
    retry: false,
  });

  const totalCandidates = data?.length || 0;

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <Navigate to={"/"} />;

  if (data)
    return (
      <main className=" py-5">
        <section className="flex items-center justify-between px-5">
          <h1 className="font-semibold text-3xl">
            <span className="text-purple-button mr-2">{totalCandidates}</span>
            Employees
          </h1>

          <div className="flex items-center">
            <button className="text-gray-800 bg-gray-200 py-2 px-5 rounded-md flex items-center gap-2 cursor-pointer">
              {" "}
              <FunnelIcon className="w-5 h-5" /> Filter
            </button>

            <button className="text-white bg-purple-button py-2 px-5 rounded-md ml-3 cursor-pointer">
              +Add Employee
            </button>
          </div>
        </section>

        {/* Card for employes */}

        <section className="w-full grid grid-cols-1 md:grid-cols-4 gap-6 px-5 mt-5">
          {data.map((candidate) => (
            <CardCandidate key={candidate._id} candidate={candidate} />
          ))}
        </section>
      </main>
    );
}
