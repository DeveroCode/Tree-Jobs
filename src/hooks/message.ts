import { useQuery } from "@tanstack/react-query";
import { getAllMessages } from "@/api/UserWorkAPI";
import type { User } from "../types";

export const useMessages = (receiver: User['_id']) => {
    return useQuery({
        queryKey: ['messages', receiver],
        queryFn: () => getAllMessages(receiver),
        enabled: !!receiver,
        refetchOnWindowFocus: false,
        retry: false,
    });
}