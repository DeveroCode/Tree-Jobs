// src/components/PoverNotification.tsx
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { BellIcon, CheckBadgeIcon } from "@heroicons/react/24/outline";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { confirmNotification, getNotifications } from "@/api/UserWorkAPI";
import { formatDateTime } from "@/utils/index";
import { toast } from "react-toastify";

export default function PoverNotification() {
  const queryClient = useQueryClient();
  const {
    data: notifications = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["notifications"],
    queryFn: getNotifications,
    refetchOnWindowFocus: false,
    retry: false,
  });

  const { mutate } = useMutation({
    mutationFn: confirmNotification,
    onSuccess: (data) => {
      toast.success(data);
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
    onError: (error) => {
      toast.error("Error confirming notification: " + error);
    },
  });

  const unreadCount = notifications.filter((n) => !n.isRead).length;
  const displayCount = unreadCount > 99 ? "99+" : unreadCount;

  const handleConfirmNotification = (id: string) => mutate(id);

  return (
    <Popover className="relative">
      <PopoverButton className="relative">
        <BellIcon className="w-6 h-6 text-purple-button cursor-pointer" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-purple-button text-white text-[10px] font-semibold px-1.5 py-0.5 rounded-full">
            {displayCount}
          </span>
        )}
      </PopoverButton>

      <PopoverPanel className="absolute right-0 z-10 mt-2 w-62 md:w-80 bg-white rounded-md shadow-lg border border-gray-200 overflow-y-scroll max-h-96">
        <section className="border-b border-gray-200">
          <h4 className="text-sm font-semibold text-gray-700 mb-2 p-2">
            Notifications
          </h4>
        </section>
        {isLoading && <p className="text-sm text-gray-500">Loading...</p>}
        {isError && (
          <p className="text-sm text-red-500">Failed to load notifications</p>
        )}
        {notifications.length === 0 && !isLoading ? (
          <p className="text-sm text-gray-500">No notifications yet.</p>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification._id}
              className="p-4 cursor-pointer"
              onClick={() => handleConfirmNotification(notification._id)}
            >
              <div className="flex py-2 items-center">
                <CheckBadgeIcon className="w-5 h-5 text-green-500 mr-2" />
                <span className="text-sm font-semibold text-gray-800">
                  Job Postulation
                </span>
              </div>
              <p className="text-sm text-gray-700">{notification.message}</p>
              <span className="text-xs text-gray-400">
                {formatDateTime(notification.createdAt)}
              </span>
            </div>
          ))
        )}
      </PopoverPanel>
    </Popover>
  );
}
