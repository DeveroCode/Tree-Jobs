import Header from "@/components/Principal/Header";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

export default function IndexLayout() {
    return (
        <div className="w-full">
            <Header />

            <main className="w-full">
                <Outlet />
            </main>

    
        </div>
    )
}
