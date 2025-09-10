import type { UserLoginForm } from "@/types/index"
import type { FieldErrors, UseFormRegister } from "react-hook-form"
import ErrorMessage from "../ErrorMessage"

type LoginFormProps = {
    register: UseFormRegister<UserLoginForm>,
    errors: FieldErrors<UserLoginForm>
}

export default function LoginForm({ register, errors }: LoginFormProps) {
    return (
        <>
            <fieldset className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                    type="email"
                    id="email"
                    required
                    placeholder="Example: mateo@code.com"
                    className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                    {...register("email", { required: true, pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ })}
                />

                {errors.email && (
                    <ErrorMessage>{errors.email.message}</ErrorMessage>
                )}
            </fieldset>

            <fieldset className="mb-6">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <input
                    type="password"
                    id="password"
                    required
                    placeholder="*********"
                    className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                    {...register("password", { required: true, minLength: 6 })}
                />
                {errors.password && (
                    <ErrorMessage>{errors.password.message}</ErrorMessage>
                )}
            </fieldset>
        </>
    )
}
