import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProyectById } from "@/api/workAPI";
import EditWorkForm from "@/components/dashboard/EditWorkForm";

export default function EditWorkView() {
    const params = useParams();
    const workId = params.workId!;
    

    const {data, isLoading, isError} = useQuery({
        queryKey: ['editWork', workId],
        queryFn: () => getProyectById(workId),
        refetchOnWindowFocus: false,
        retry: false
    })
   
    if(isLoading) return <p>Loading...</p>
    if (isError) return <Navigate to={'/'} />
    
    if (data) return <EditWorkForm workId={workId} data={data} />
}
