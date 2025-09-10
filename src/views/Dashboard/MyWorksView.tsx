import Title from "@/components/Title";
import { Link, Navigate } from "react-router-dom";
import { ClipboardDocumentIcon } from "@heroicons/react/24/outline";
import CardWork from "@/components/dashboard/CardWork";
import { useQuery } from "@tanstack/react-query";
import { getWorks } from "@/api/workAPI";
import type { Work } from "@/types/index";

export default function MyWorksView() {
  const { data, isLoading, isError } = useQuery<Work[]>({
    queryKey: ["works"],
    queryFn: getWorks,
    refetchOnWindowFocus: false,
    retry: false,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <Navigate to={"/"} />;

  if (data)
    return (
      <>
        <section className="flex itesm-center justify-between">
          <Title text="View all your active jobs so far, manage your jobs in a better away">
            My work list
          </Title>

          <Link
            to={"/dashboard/add-work"}
            className="bg-purple-button text-white py-1 px-4 rounded-md flex items-center gap-3 cursor-pointer h-10"
          >
            <ClipboardDocumentIcon className="w-5 h-5" />
            Add Work
          </Link>
        </section>

        <main className="py-12 px-4 grid grid-cols-4 gap-6">
          {data.length ? (
            data.map((work) => <CardWork key={work._id} work={work} />)
          ) : (
            <p>You don't have any work yet</p>
          )}
        </main>
      </>
    );
}
