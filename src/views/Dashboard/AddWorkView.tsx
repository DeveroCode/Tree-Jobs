import { addWork } from "@/api/workAPI";
import type { WorkRegistrationForm } from "@/types/index";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { ClipboardDocumentCheckIcon } from "@heroicons/react/24/outline";
import Title from "@/components/Title";
import CreateWorkForm from "@/components/dashboard/CreateWorkForm";
import { Link, useNavigate } from "react-router-dom";

export default function AddWorkView() {

    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const initialValues: WorkRegistrationForm = {
        title: "",
        company: "",
        description: "",
        location: "Nuevo Casas Grandes",
        salary: 1200,
        endDate: ""
    }

    const { register, handleSubmit, reset, formState: { errors } } = useForm<WorkRegistrationForm>({
        defaultValues: initialValues
    });

    const { mutate } = useMutation({
        mutationFn: addWork,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (response) => {
            toast.success(response);
            navigate('/dashboard/job-listings');
            queryClient.invalidateQueries({ queryKey: ['works'] });
            reset()
        }
    });

    const handleCreateWork = (formData: WorkRegistrationForm) => mutate(formData);

    return (
        <>
            <form noValidate onSubmit={handleSubmit(handleCreateWork)}>
                <section className="flex itesm-center justify-between">
                    <Title text="Fill out the form below to post your available vancancy">
                        Create a new job
                    </Title>

                    <div className="flex gap-3">
                        <Link className="cursor-pointer flex items-center gap-2 bg-purple-300 hover:bg-purple-button text-white py-1 px-4 rounded-md h-10 transition-all duration-150 ease-in" to={'/dashboard/job-listings'}>
                            <ClipboardDocumentCheckIcon className="w-5 h-5" />
                            Return
                        </Link>
                        <div className="flex items-center gap-2 bg-purple-button text-white py-1 px-4 rounded-md cursor-pointer h-10">
                            <ClipboardDocumentCheckIcon className="w-5 h-5" />
                            <input type="submit" value={'Save changes'} className="cursor-pointer" />
                        </div>
                    </div>
                </section>


                {/* Start form to create a new work */}

                <section className="py-12">
                    <CreateWorkForm register={register} errors={errors} />
                </section>
            </form>
        </>
    )
}
