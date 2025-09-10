import { registerUser } from "@/api/AuthAPI";
import { toast } from "react-toastify";
import RegisterForm from "@/components/Auth/RegisterForm";
import type { UserRegisterForm } from "@/types/index";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

export default function RegisterView() {
    const navigate = useNavigate();
    const initialValues: UserRegisterForm = {
        name: "",
        email: "",
        password: "",
        password_confirm: "",
        role: "candidate",
    };

    const { register, handleSubmit, reset, formState: { errors } } = useForm<UserRegisterForm>({
        defaultValues: initialValues
    });

    const { mutate } = useMutation({
        mutationFn: registerUser,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            reset();
            navigate('/auth/login');
        }
    });

    const handleCreateUser = async (formData: UserRegisterForm) => mutate(formData);

    return (
        <>
            <form noValidate onSubmit={handleSubmit(handleCreateUser)} className="space-y-8 max-w-md">
                <section>
                    <h1 className='text-7xl font-bold'><span className='text-purple-button'>Hello</span> there!</h1>
                    <span className="text-gray-400 text-md block mt-2">Create an account to acces the best jobs and get real-time updates on all your jobs</span>
                </section>

                <RegisterForm register={register} errors={errors} />

                <button
                    type="submit"
                    className="w-full bg-purple-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 cursor-pointer transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Sing Up
                </button>
            </form>

            <section className="flex flex-col items-center gap-2">
                <Link to={'/auth/login'}>
                    Already haven an account? Sign in
                </Link>
                <span className="text-gray-400">or</span>
                <Link to={'/auth/login'}>
                   Forgot my password
                </Link>

            </section>
        </>
    )
}
