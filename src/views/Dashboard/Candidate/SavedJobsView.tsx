import { getAllSavedJobs } from "@/api/workAPI";
import SaveWorkCard from "@/components/Candidate/SaveWorkCard";
import ModalPostulation from "@/components/Modals/ModalPostulation";
import { useUser } from "@/hooks/user";
import type { JobCardData, SavedJobs } from "@/types/index";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function SavedJobsView() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSavedJob, setSelectedSavedJob] = useState<
    SavedJobs[number] | null
  >(null);
  const { data: user } = useUser();

  const { data, isLoading, isError } = useQuery<SavedJobs>({
    queryKey: ["savedJobs"],
    queryFn: getAllSavedJobs,
    refetchOnWindowFocus: false,
    retry: false,
  });

  const sanitizeJob = (savedJob: SavedJobs[number]): JobCardData => {
    return {
      _id: savedJob.work._id,
      title: savedJob.work.title,
      isSaved: true,
      company: savedJob.work.company,
      description: savedJob.work.description,
      location: savedJob.work.location,
      salary: savedJob.work.salary,
      endDate: savedJob.work.endDate,
      user: user!,
      createdAt: savedJob.createdAt,
    };
  };

  const openModalWithSavedJob = (savedJob: SavedJobs[number]) => {
    setSelectedSavedJob(savedJob);
    setIsOpen(true);
  };

  const totalSavedJobs = data?.length || 0;

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading saved jobs</p>;

  return (
    <div>
      <section className="flex items-center justify-between px-5">
        <h1 className="font-semibold text-3xl">
          <span className="text-purple-button mr-2">{totalSavedJobs}</span>
          Saved {totalSavedJobs === 1 ? "Job" : "Jobs"}
        </h1>
      </section>

      <main className="my-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {data && data.length ? (
          data.map((savedJob) => (
            <SaveWorkCard key={savedJob._id} job={savedJob} setJob={setSelectedSavedJob} handleOpenModal={() => openModalWithSavedJob(savedJob)} />
          ))
        ) : (
          <p className="text-center col-span-full">
            You don't have any jobs saved yet
          </p>
        )}
      </main>

      {isOpen &&
        selectedSavedJob && (
          <ModalPostulation
            handleOpenModal={() => setIsOpen(false)}
            job={sanitizeJob(selectedSavedJob)}
          />
        )}
    </div>
  );
}
