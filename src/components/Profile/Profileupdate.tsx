import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { UserUpdateForm } from "@/types/index";
import ErrorMessage from "../ErrorMessage";
import { useUser } from "@/hooks/user";
import { DocumentIcon } from "@heroicons/react/24/outline";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadCV } from "@/api/AuthAPI";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import type React from "react";

type ProfileUpdateProps = {
  errors: FieldErrors<UserUpdateForm>;
  register: UseFormRegister<UserUpdateForm>;
};

export default function Profileupdate({
  errors,
  register,
}: ProfileUpdateProps) {
  const { data } = useUser();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: uploadCV,
    onSuccess: (data) => {
      toast.success(data);
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      navigate("/dashboard/settings/general");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleUploadCV = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      mutate(e.target.files[0]);
    }
  };

  return (
    <>
      {/* Name & Last Name */}
      <fieldset className="grid grid-cols-1 md:grid-cols-2 gap-6 py-8">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            placeholder="example: John"
            className="block w-full border border-gray-300 rounded-md px-4 py-3 text-gray-900 placeholder-gray-500 shadow-sm focus:border-purple-400 focus:outline-none text-sm"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
        </div>
        <div>
          <label
            htmlFor="last_name"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Last Name
          </label>
          <input
            type="text"
            id="last_name"
            placeholder="example: Rodriguez"
            className="block w-full border border-gray-300 rounded-md px-4 py-3 text-gray-900 placeholder-gray-500 shadow-sm focus:border-purple-400 focus:outline-none text-sm"
            {...register("last_name", {
              required: "The last name is required",
            })}
          />
          {errors.last_name && (
            <ErrorMessage>{errors.last_name.message}</ErrorMessage>
          )}
        </div>
      </fieldset>

      {/* Phone, Profession, Role/Company/CV */}
      <fieldset className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8">
        <div>
          <label
            htmlFor="phone_number"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Phone Number
          </label>
          <input
            type="tel"
            id="phone_number"
            placeholder="example: +1234567890"
            className="block w-full border border-gray-300 rounded-md px-4 py-3 text-gray-900 placeholder-gray-500 shadow-sm focus:border-purple-400 focus:outline-none text-sm"
            {...register("phone_number", {
              required: "Phone number is required",
              pattern: /^\+?[1-9]\d{1,10}$/,
            })}
          />
          {errors.phone_number && (
            <ErrorMessage>{errors.phone_number.message}</ErrorMessage>
          )}
        </div>
        <div>
          <label
            htmlFor="profession"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Profession
          </label>
          <input
            type="text"
            id="profession"
            placeholder="example: Software Engineer"
            className="block w-full border border-gray-300 rounded-md px-4 py-3 text-gray-900 placeholder-gray-500 shadow-sm focus:border-purple-400 focus:outline-none text-sm"
            {...register("profession", { required: "Profession is required" })}
          />
          {errors.profession && (
            <ErrorMessage>{errors.profession.message}</ErrorMessage>
          )}
        </div>
        <div>
          {data!.role === "candidate" ? (
            <>
              <label
                htmlFor="cv"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                CV
              </label>
              <label className="flex items-center w-full border border-gray-300 rounded-md px-4 py-3 gap-2 text-gray-900 cursor-pointer placeholder-gray-500 shadow-sm focus:border-purple-400 focus:outline-none text-sm">
                <DocumentIcon className="w-4 h-4 text-gray-400 group-hover:text-purple-500 transition-colors duration-200" />
                CV
                <input
                  type="file"
                  accept="application/pdf"
                  id="cv"
                  className="hidden"
                  onChange={handleUploadCV}
                />
              </label>
              {errors.cv && <ErrorMessage>{errors.cv.message}</ErrorMessage>}
            </>
          ) : (
            <>
              <label
                htmlFor="company"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Empresa
              </label>
              <input
                type="text"
                id="company"
                placeholder="example: MyCompany Inc"
                className="block w-full border border-gray-300 rounded-md px-4 py-3 text-gray-900 placeholder-gray-500 shadow-sm focus:border-purple-400 focus:outline-none text-sm"
                {...register("company")}
              />
              {errors.company && (
                <ErrorMessage>{errors.company.message}</ErrorMessage>
              )}
            </>
          )}
        </div>
      </fieldset>

      {/* Email & Passwords */}
      <fieldset className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-8">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="example: jhon@code.com"
            className="block w-full border border-gray-300 rounded-md px-4 py-3 text-gray-900 placeholder-gray-500 shadow-sm focus:border-purple-400 focus:outline-none text-sm"
            {...register("email", {
              required: "The email field is required",
              pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            })}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="**********"
            className="block w-full border border-gray-300 rounded-md px-4 py-3 text-gray-900 placeholder-gray-500 shadow-sm focus:border-purple-400 focus:outline-none text-sm"
            {...register("password", {
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters long",
              },
              validate: (value) => value === "" || value!.length >= 6,
            })}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>
        <div>
          <label
            htmlFor="password_confirm"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Password Confirm
          </label>
          <input
            type="password"
            id="password_confirm"
            placeholder="**********"
            className="block w-full border border-gray-300 rounded-md px-4 py-3 text-gray-900 placeholder-gray-500 shadow-sm focus:border-purple-400 focus:outline-none text-sm"
            {...register("password_confirm", {
              validate: (value, formValues) =>
                value === formValues.password || "Passwords do not match",
            })}
          />
          {errors.password_confirm && (
            <ErrorMessage>{errors.password_confirm.message}</ErrorMessage>
          )}
        </div>
      </fieldset>
    </>
  );
}
