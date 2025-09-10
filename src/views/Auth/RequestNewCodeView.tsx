import { requestNewToken } from "@/api/AuthAPI";
import EmailForToken from "@/components/Auth/EmailForToken";
import type { RequestNewToken } from "@/types/index";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function RequestNewCodeView() {

    const initialValues: RequestNewToken = {
        email: ''
    }

    const { register, handleSubmit, reset, formState: { errors } } = useForm<RequestNewToken>({
        defaultValues: initialValues
    });


    const { mutate } = useMutation({
        mutationFn: requestNewToken,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            toast.success(data);
            reset();
        }
    });

    const handleSubmitEmail = (data: RequestNewToken) =>  mutate(data);

    return (
        <>
            <section>
                <h1 className='text-5xl font-bold'><span className='text-purple-button'>Sooo,</span> what do you think?!</h1>
                <span className="text-gray-400 text-md block mt-2">enter the e-mail address you used to register to receive the instructions</span>
            </section>

            <EmailForToken handleSubmitEmail={handleSubmitEmail} handleSubmit={handleSubmit} register={register} errors={errors} />
        </>
    )
}
