import Header from "@/components/Principal/Header";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

export default function IndexMainLayout() {
  return (
    <div className="max-w-[1920px] mx-auto">
      <Header />
      <Outlet />

      <ToastContainer pauseOnHover={false} pauseOnFocusLoss={false} />
    </div>
  );
}
