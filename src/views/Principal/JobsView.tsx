import { getPostulationsWorks } from "@/api/UserWorkAPI";
import WorkCard from "@/components/Principal/WorkCard";
import type { JobCardData, JobsCardData } from "@/types/index";
import { useQuery } from "@tanstack/react-query";
import { Navigate } from "react-router-dom";
import AsideFilters from "./AsideFilters";
import HeaderJobs from "@/components/Principal/HeaderJobs";
import ModalPostulation from "../../components/Modals/ModalPostulation";
import { useState } from "react";

export default function JobsView() {
  const [isOpen, setIsOpen] = useState(false);
  const [job, setJob] = useState<JobCardData | null>(null);

  const { data, isLoading, isError } = useQuery<JobsCardData>({
    queryFn: getPostulationsWorks,
    queryKey: ["postulationsWorks"],
    refetchOnWindowFocus: false,
    retry: false,
  });

  const handleOpenModal = () => setIsOpen(!isOpen);

  if (isLoading) return <span>Cargando...</span>;
  if (isError) return <Navigate to={"/"} />;

  if (data)
    return (
      <>
        <div className="min-h-screen bg-gray-50">
          {/* Search Bar */}
          <HeaderJobs />

          <section className="px-4 md:px-10 lg:px-32 py-10 gap-5 flex flex-col md:flex-row">
            {/* Aside Filters */}
            <AsideFilters />

            {/* Job Listings */}
            <div className="w-full">
              <h2 className="text-lg md:text-xl font-bold py-4">
                Recommended jobs
              </h2>
              <div className="flex flex-wrap justify-center md:justify-start gap-5">
                {data.map((work) => (
                  <WorkCard
                    key={work._id}
                    work={work}
                    handleOpenModal={handleOpenModal}
                    setJob={setJob}
                  />
                ))}
              </div>
            </div>
          </section>
        </div>

        {isOpen && job && (
          <ModalPostulation handleOpenModal={handleOpenModal} job={job} />
        )}
      </>
    );
}
