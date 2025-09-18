import Categorie from "../Navs/Categorie";
import CategorieSelectMobile from "../Navs/CategorieSelectMobile";
import { useLocation, useNavigate } from "react-router-dom";
import type { WorkFilterParams } from "@/api/workAPI";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useEffect } from "react";

export default function HeaderJobs() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const { register, handleSubmit, watch, setValue } = useForm<WorkFilterParams>(
    {
      defaultValues: {
        title: "",
      },
    }
  );

  const title = watch("title");
  const titleString = params.get("title") || "";

  useEffect(() => {
    if (titleString) {
      setValue("title", titleString);
    }
  }, [titleString, setValue]);

  const handleSendToFindJobs = () => {
    if (!title) {
      toast.error("Please enter a job title or a company");
      return;
    }

    navigate(`/tree-jobs/jobs?title=${title}`);
  };
  return (
    <>
      <CategorieSelectMobile
        handleSendToFindJobs={handleSendToFindJobs}
        handleSubmit={handleSubmit}
        register={register}
      />
      <Categorie
        handleSendToFindJobs={handleSendToFindJobs}
        handleSubmit={handleSubmit}
        register={register}
      />
    </>
  );
}
