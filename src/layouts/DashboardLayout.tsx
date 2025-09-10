import Header from "@/components/Header";
import Aside from "@/components/dashboard/Aside";
import { ToastContainer } from "react-toastify";
import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "@/hooks/user";
import { useSocket } from "@/hooks/useSocket";

export default function DashboardLayout() {
  const { data, isLoading, isError } = useUser();
  useSocket(); // WebSocket

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        Cargando...
      </div>
    );
  if (isError) return <Navigate to={"/auth/login"} />;
  if (data)
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col md:grid md:grid-cols-[290px_1fr]">
        {/* Sidebar */}
        <Aside />

        {/* Content */}
        <div className="flex flex-col flex-1">
          <Header image={data?.image} />

          {/* Main content */}
          <main className="px-4 sm:px-6 md:px-10 py-6">
            <Outlet />
          </main>
        </div>

        <ToastContainer pauseOnHover={false} pauseOnFocusLoss={false} />
      </div>
    );
}
