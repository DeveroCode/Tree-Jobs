import { confirmToken } from "@/api/AuthAPI";
import TokenConfirm from "@/components/Auth/TokenConfirm"
import type { ConfirmToken } from "@/types/index";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export default function ConfirmAccountView() {
    const navigate = useNavigate();
    const [token, setToken] = useState<ConfirmToken['token']>('');

    const { mutate } = useMutation({
        mutationFn: confirmToken,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            toast.success(data);
            navigate('/auth/login');
            setToken('');
        }
    });

    const handleChange = (token: ConfirmToken['token']) => {
        setToken(token);
    }

    const handleComplete = (token: ConfirmToken['token']) => mutate(token);
    return (
        <form noValidate className="space-y-8 max-w-md">
            <section>
                <h1 className='text-7xl font-bold'><span className='text-purple-button'>Yeap</span> let's confirm!</h1>
                <span className="text-gray-400 text-md block mt-2">Is just one step away from getting a job offer</span>
            </section>

            <TokenConfirm token={token} handleChange={handleChange} handleComplete={handleComplete} />
        </form>
    )
}
