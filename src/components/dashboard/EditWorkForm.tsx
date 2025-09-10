import { Link, useNavigate } from "react-router-dom";
import type { WorkRegistrationForm } from "@/types/index"
import { useForm } from "react-hook-form";
import { ClipboardDocumentCheckIcon } from "@heroicons/react/24/outline";
import Title from "../Title";
import CreateWorkForm from "./CreateWorkForm";
import { formatDate } from "@/utils/index";
import { useMutation } from "@tanstack/react-query";
import { updateWork } from "@/api/workAPI";
import { toast } from "react-toastify";

type EditWorkFormProps = {
    workId: string,
    data: WorkRegistrationForm
}

export default function EditWorkForm({ workId, data }: EditWorkFormProps) {
    const navigate = useNavigate();

    const { register, handleSubmit, reset,formState: { errors } } = useForm({
        defaultValues: {
            title: data.title,
            company: data.company,
            description: data.description,
            location: data.location,
            salary: data.salary,
            endDate: formatDate(data.endDate)
        }
    });

    const { mutate } = useMutation({
        mutationFn: updateWork,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (response) => {
            toast.success(response);
            navigate('/dashboard/job-listings');
            reset();
        }
    });

    const handleForm = (formData: WorkRegistrationForm) => {
        const data = {
            workId,
            formData
        }
        mutate(data);
    }
    return (
        <form noValidate onSubmit={handleSubmit(handleForm)}>
            <section className="flex itesm-center justify-between">
                <Title text="Have there been any changes in the vacancy? No problem, edit the necessary fields and republish the position applied for">
                    Edit Work
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


            {/* Start edit form to create a new work */}

            <section className="py-12">
                <CreateWorkForm register={register} errors={errors} />
            </section>
        </form>
    )
}
