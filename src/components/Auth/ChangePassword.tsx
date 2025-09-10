import type { changePasswordForm } from "@/types/index"
import type { FieldErrors, UseFormRegister, SubmitHandler, UseFormHandleSubmit } from "react-hook-form"
import ErrorMessage from "../ErrorMessage"
type EmailForTokenProps = {
  register: UseFormRegister<changePasswordForm>,
  errors: FieldErrors<changePasswordForm>,
  handleSubmit: UseFormHandleSubmit<changePasswordForm>,
  handleData: SubmitHandler<changePasswordForm>
}

export default function ChangePassword({ register, errors, handleSubmit, handleData }: EmailForTokenProps) {
  return (
    <form
      noValidate
      className="space-y-2 mt-10 max-w-xs mx-auto"
    onSubmit={handleSubmit(handleData)}
    >
      <label
        htmlFor="email"
        className="block text-sm font-medium text-gray-700"
      >
        Password
      </label>
      <input
        type="password"
        id="password"
        placeholder="*********"
        className="mt-1 w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
        {...register("password", {
          required: "The password field is required", minLength: {
            value: 6,
            message: "Password must be at least 6 characters long"
          }
        })}
      />
      {errors.password && (
        <ErrorMessage>{errors.password.message}</ErrorMessage>
      )}

      <label htmlFor="password_confirm" className="block text-sm font-medium text-gray-700">Password confirm</label>
      <input
        type="password"
        id="password_confirm"
        required
        placeholder="*********"
        className="mt-1 w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
        {...register("password_confirm", {
          required: "The password confirm field is required",
          validate: (value, formValues) => value === formValues.password || "Passwords do not match"
        })}
      />
      
      {errors.password_confirm && (
        <ErrorMessage>{errors.password_confirm.message}</ErrorMessage>
      )}

      <button
        type="submit"
        className="w-full bg-purple-600 mt-5 text-white font-semibold py-2 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 cursor-pointer transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Send me the code
      </button>
    </form>
  )
}
