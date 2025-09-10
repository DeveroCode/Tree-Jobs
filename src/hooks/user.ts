import { getUser } from "@/api/AuthAPI";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export const useUser = () => {
    const queryClient = useQueryClient();

    return useQuery({
        queryKey: ['profile'],
        queryFn: getUser,
        initialData: () => queryClient.getQueryData(['profile']),
        retry: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        refetchOnMount: false,
        staleTime: 1000 * 60 * 5,
    });
}