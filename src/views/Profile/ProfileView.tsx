import { updateUser } from "@/api/AuthAPI";
import Profileupdate from "@/components/Profile/Profileupdate";
import Title from "@/components/Title";
import { useUser } from "@/hooks/user";
import type { UserUpdateForm } from "@/types/index";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function ProfileView() {

    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { data: user } = useUser();

    const initialvalues : UserUpdateForm = {
        name: user!.name,
        last_name: user!.last_name,
        email: user!.email,
        role: user!.role,
        company: user!.company,
        profession: user!.profession,
        phone_number: user!.phone_number,
        password: "",
        password_confirm: ""
    }

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: initialvalues
    });

    const {mutate} = useMutation({
        mutationFn: updateUser,
        onError: (error) => {
            toast.error(error?.message || "An error occurred while updating your profile");
        },
        onSuccess: (data) => {
            toast.success(data);
            queryClient.invalidateQueries({ queryKey: ["profile"] });
            navigate("/dashboard/settings/general");
        }
    });

    const handleUpdateUser = (formData : UserUpdateForm) => mutate(formData);

    return (
        <div className="flex flex-col space-y-5 md:border-l border-gray-200 lg:px-16 md:px-8 py-12 w-full">
            <Title text="Update your photos & personal details here">Account information</Title>

            <form noValidate onSubmit={handleSubmit(handleUpdateUser)}>
                <Profileupdate register={register} errors={errors} />

                <input type="submit" value="Update" className="py-2 px-4 text-white font-semibold bg-purple-button rounded-md cursor-pointer" />
            </form>
        </div>
    )
}
