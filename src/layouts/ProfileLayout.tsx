import AsideProfile from "@/components/Profile/AsideProfile";
import Title from "@/components/Title";
import { Outlet } from "react-router-dom";

export default function ProfileLayout() {
  return (
    <>
      {/* Header title */}
      <section className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <Title text="Update your photos & personal details here">
          Account information
        </Title>
      </section>

      {/* Main content */}
      <main className="bg-white mt-8 sm:mt-12 rounded-md shadow-md w-full mx-auto flex flex-col md:flex-row gap-6 p-4 sm:p-6">
        <AsideProfile />
        <div className="flex-1">
          <Outlet />
        </div>
      </main>
    </>
  );
}
