import type { RequestNewToken } from "@/types/index";
import type { FieldErrors, UseFormRegister, SubmitHandler, UseFormHandleSubmit } from "react-hook-form"
import ErrorMessage from "../ErrorMessage";
type EmailForTokenProps = {
  handleSubmit: UseFormHandleSubmit<RequestNewToken>;
  handleSubmitEmail: SubmitHandler<RequestNewToken>;
  register: UseFormRegister<RequestNewToken>;
  errors: FieldErrors<RequestNewToken>;
};

export default function EmailForToken({
  handleSubmit,
  handleSubmitEmail,
  register,
  errors
}: EmailForTokenProps) {
  return (
    <form
      noValidate
      className="space-y-2 mt-10 max-w-xs mx-auto"
      onSubmit={handleSubmit(handleSubmitEmail)}
    >
      <label
        htmlFor="email"
        className="block text-sm font-medium text-gray-700"
      >
        E-mail
      </label>
      <input
        type="email"
        id="email"
        required
        placeholder="Example: devero@code.com"
        className="mt-1 w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
        {...register("email", {
          required: "The email field is required",
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: "Please enter a valid email address"
          }
        })}
      />
      {errors.email && (
        <ErrorMessage>{errors.email.message}</ErrorMessage>
      )}

      <button
        type="submit"
        className="w-full bg-purple-600 mt-5 text-white font-semibold py-2 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 cursor-pointer transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Send me the code
      </button>
    </form>
  );
}
