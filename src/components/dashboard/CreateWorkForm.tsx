
import type { FieldErrors, UseFormRegister } from "react-hook-form"
import ErrorMessage from "../ErrorMessage"
import type { WorkRegistrationForm } from "@/types/index"

type CreateWorkFormProps = {
    errors: FieldErrors<WorkRegistrationForm>
    register: UseFormRegister<WorkRegistrationForm>
}


export default function CreateWorkForm({ errors, register }: CreateWorkFormProps) {
    return (
        <>
            <fieldset className="flex gap-5 border-y border-gray-200 py-5 pr-13">
                <div className="flex flex-col gap-2 w-1/2">
                    <label htmlFor="title" className="text-gray-600 text-lg capitalize">Job title<span className="text-red-600">*</span>
                    </label>
                    {errors.title && (
                        <ErrorMessage>{errors.title.message}</ErrorMessage>
                    )}
                    <span className="text-sm text-gray-400">Job title must describe one position</span>
                </div>
                <input
                    id="title"
                    type="text"
                    placeholder="Example: Frontend Developer"
                    className="w-1/4 py-1 px-4 border border-gray-300 rounded-md h-10 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-transparent"
                    {...register("title", {
                        required: "The job title is required",
                    })}
                />
            </fieldset>
            <fieldset className="flex gap-5 border-b border-gray-200 py-5 pr-13">
                <div className="flex flex-col gap-2 w-1/2">
                    <label htmlFor="company" className="text-gray-600 text-lg capitalize">Company
                    </label>
                    <span className="text-sm text-gray-400">If your vacancy is for a company you should put it here, otherwise the field is optional.</span>
                </div>
                <input
                    id="company"
                    type="text"
                    placeholder="Example: Bodega Aurrera"
                    className="w-1/4 py-1 px-4 border border-gray-300 rounded-md h-10 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-transparent"
                    {...register("company")}
                />
            </fieldset>
            <fieldset className="flex gap-5 border-b border-gray-200 py-5 pr-13">
                <div className="flex flex-col gap-2 w-1/2">
                    <label htmlFor="location" className="text-gray-600 text-lg capitalize">Location
                    </label>
                    <span className="text-sm text-gray-400">This option is optional. for default it will be set to "Nvo. Casas Grandes".</span>
                </div>
                <select
                    id="location"
                    className="w-1/4 py-2 px-4 border border-gray-300 rounded-md h-10 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-transparent"
                    {...register("location")}
                >
                    <option value="">Selecciona una opción</option>
                    <option value="Casas Grandes">Casas Grandes</option>
                    <option value="Nuevo Casas Grandes">Nuevo Casas Grandes</option>
                    <option value="Chihuahua">Chihuahua</option>
                </select>
            </fieldset>
            <fieldset className="flex gap-5 border-b border-gray-200 py-5 pr-13">
                <div className="flex flex-col gap-2 w-1/2">
                    <label htmlFor="salary" className="text-gray-600 text-lg capitalize">Salary
                    </label>
                    <span className="text-sm text-gray-400">This option is optional. But if you are offering a salary, please put it here.</span>
                </div>
                <input
                    id="salary"
                    type="number"
                    placeholder="Example: $200.00"
                    className="w-1/4 py-1 px-4 border border-gray-300 rounded-md h-10 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-transparent"
                    {...register("salary", {
                        required: "The salary is required",
                    })}
                />
            </fieldset>
            <fieldset className="flex gap-5 border-b border-gray-200 py-5 pr-13">
                <div className="flex flex-col gap-2 w-1/2">
                    <label htmlFor="description" className="text-gray-600 text-lg capitalize">Description<span className="text-red-600">*</span>
                    </label>
                    {errors.description && (
                        <ErrorMessage>{errors.description.message}</ErrorMessage>
                    )}
                    <span className="text-sm text-gray-400">Describe the vacancy: add if any knowledge or level of education is required.</span>
                </div>
                <textarea id="description" className="w-1/4 py-2 h-32 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-transparent"
                    {...register("description", {
                        required: "La descripcion es obligatoria",
                    })} />
            </fieldset>
            <fieldset className="flex gap-5 border-b border-gray-200 py-5 pr-13">
                <div className="flex flex-col gap-2 w-1/2">
                    <label htmlFor="endDate" className="text-gray-600 text-lg capitalize">End date
                    </label>
                    {errors.endDate && (
                        <ErrorMessage>{errors.endDate.message}</ErrorMessage>
                    )}
                    <span className="text-sm text-gray-400">Set the end date of the vacancy</span>
                </div>
                <input
                    id="endDate"
                    type="date"
                    className="w-1/4 py-1 px-4 border border-gray-300 rounded-md h-10 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-transparent"
                    {...register("endDate", {
                        required: "The end date is required",
                    })}
                />
            </fieldset>
        </>
    )
}
