import { login } from "@/api/AuthAPI";
import LoginForm from "@/components/Auth/LoginForm";
import type { UserLoginForm } from "@/types/index";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function LoginView() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const initialValues = {
        email: "",
        password: ""
    }

    const { register, handleSubmit, reset, formState: { errors } } = useForm<UserLoginForm>({
        defaultValues: initialValues
    });

    const { mutate } = useMutation({
        mutationFn: login,
        onError: (error) => {
            navigate('/auth/login');
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data?.message);
            localStorage.setItem("AUTH_TOKEN", data!.token);
            queryClient.invalidateQueries({ queryKey: ['profile'] });
            navigate('/dashboard/job-listings');
            reset();
        }
    });
 
    const handleCreateUser = (formData: UserLoginForm) => mutate(formData)

    return (
        <>
            <form noValidate className="space-y-8 max-w-md" onSubmit={handleSubmit(handleCreateUser)}>
                <section>
                    <h1 className='text-7xl font-bold'><span className='text-purple-button'>Welcome</span> back!</h1>
                    <span className="text-gray-400 text-md block mt-2">log in and get the best job offers. </span>
                </section>

                <LoginForm register={register} errors={errors} />

                <button
                    type="submit"
                    className="w-full bg-purple-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 
                    cursor-pointer transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Sign In
                </button>
            </form>

            <section className="mt-4 flex flex-col items-center gap-2">
                <Link to={'/auth/register'}>
                    Already haven't an account? Sign up
                </Link>
                <span className="text-gray-400">or</span>

                <Link to={'/auth/forgot-my-password'}>
                    Forgot my password
                </Link>
            </section>
        </>
    )
}
