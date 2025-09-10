import type { UserRegisterForm } from "@/types/index"
import ErrorMessage from "../ErrorMessage"
import type { FieldErrors, UseFormRegister } from "react-hook-form"


type RegisterFormProps = {
    register: UseFormRegister<UserRegisterForm>,
    errors: FieldErrors<UserRegisterForm>
}
export default function RegisterForm({ errors, register }: RegisterFormProps) {
    return (
        <>
            <fieldset className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <input
                    type="text"
                    id="name"
                        required
                        placeholder="Only Name, example: Mateo"
                        className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                    {...register("name", {
                            required: "The name is required",
                        })}
                    />

                {errors.name && (
                    <ErrorMessage>{errors.name.message}</ErrorMessage>
                )}
            </fieldset>
            <fieldset className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                    type="email"
                    id="email"
                    required
                    placeholder="Example: mateo@code.com"
                    className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                {...register("email", { required: "The email field is required", pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ })}
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
                {...register("password", { required: "The password field is required", minLength: 6 })}
                />
                {errors.password && (
                                <ErrorMessage>{errors.password.message}</ErrorMessage>
                            )}
            </fieldset>
            <fieldset className="mb-6">
                <label htmlFor="password_confirm" className="block text-sm font-medium text-gray-700">Password confirm</label>
                <input
                    type="password"
                    id="password_confirm"
                    required
                    placeholder="*********"
                    className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                {...register("password_confirm", {
                        required: "The password confirm field is required",
                        validate: (value, formValues) => value === formValues.password || "Passwords do not match"
                    })}
                />
                {errors.password_confirm && (
                                <ErrorMessage>{errors.password_confirm.message}</ErrorMessage>
                            )}
            </fieldset>
        </>
    )
}
