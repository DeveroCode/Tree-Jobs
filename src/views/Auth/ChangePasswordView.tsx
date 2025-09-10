import { changePassword, validToken, type newPassword } from "@/api/AuthAPI";
import type { changePasswordForm, ConfirmToken } from "@/types/index";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-toastify";
import TokenConfirm from "@/components/Auth/TokenConfirm";
import ChangePassword from "@/components/Auth/ChangePassword";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";


export default function ChangePasswordView() {
    const navigate = useNavigate();
    const [token, setToken] = useState<ConfirmToken['token']>('');
    const [isValid, setIsValid] = useState<boolean>(false);
    const initialValues: changePasswordForm = {
        password: '',
        password_confirm: ''
    }

    const { register, handleSubmit, reset, formState: { errors } } = useForm<changePasswordForm>({
        defaultValues: initialValues
    });


    const { mutate } = useMutation({
        mutationFn: validToken,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            setIsValid(true);
            reset();
            toast.success(data);
        }
    });

    const { mutate: mutatePassword } = useMutation({
        mutationFn: changePassword,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            toast.success(data);
            navigate('/auth/login');
            setIsValid(false);
            setToken('');
            reset();
        }
    });

    const handleData = ({ password }: newPassword) => {
        const data = {
            token,
            password
        }
        mutatePassword(data);
    }

    const handleChange = (token: ConfirmToken['token']) => {
        setToken(token);
    }

    const handleComplete = (token: ConfirmToken['token']) => mutate(token);
    return (
        <>
            <section>
                <h1 className='text-5xl font-bold'><span className='text-purple-button'>Almost,</span> there!</h1>
                <span className="text-gray-400 text-md block mt-2">you're one step away from recovery your job offers</span>
            </section>

            {!isValid ? (
                <TokenConfirm token={token} handleChange={handleChange} handleComplete={handleComplete} />
            ) : (
                <ChangePassword register={register} errors={errors} handleSubmit={handleSubmit} handleData={handleData} />
            )}
        </>
    )
}
