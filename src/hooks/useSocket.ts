// src/hooks/useSocket.ts
import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { toast } from "react-toastify";
import { useUser } from "@/hooks/user";
import { SOCKET_EVENTS } from "@/utils/socketsEvents";
import { useQueryClient } from "@tanstack/react-query";

const socket_url = import.meta.env.VITE_SOCKET_URL;

export const useSocket = () => {
    const socketRef = useRef<Socket | null>(null);
    const queryClient = useQueryClient();
    const { data: user } = useUser(); // <-- Get the user

    useEffect(() => {
        if (!user) return; // Wait the user to be available

        const token = localStorage.getItem("AUTH_TOKEN");
        if (!token) {
            toast.error("No estás autenticado");
            return;
        }

        const socket: Socket = io(socket_url, {
            auth: { token },
        });

        socketRef.current = socket;

        // ✅  Listen for notifications
        socket.on(SOCKET_EVENTS.NEW_NOTIFICATION, (data: { message: string }) => {
            toast.info(data.message);
            queryClient.invalidateQueries({ queryKey: ['notifications'] });
        });

        // Message listener
        socket.on(SOCKET_EVENTS.MESSAGE_NEW, (data: { sender: string, receiver: string }) => {
            console.log("New message received:", data);
            queryClient.invalidateQueries({ queryKey: ['messages', data.sender] });
            queryClient.invalidateQueries({ queryKey: ['messages', data.receiver] });
        });

        // 👋 Confirm Connection
        socket.on(SOCKET_EVENTS.CONNECTED, (data: { message: string }) => {
            console.log("✅ Connected:", data.message);
        });

        // ❌ Error Handling
        socket.on(SOCKET_EVENTS.ERROR, (err: { message: string }) => {
            toast.error(`Socket error: ${err.message}`);
        });

        // 🔌 Cleanup
        return () => {
            socket.disconnect();
        };
    }, [user, queryClient]); // 👈

    return socketRef.current;
};
