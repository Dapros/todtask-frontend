import { UseFormRegister, FieldErrors } from "react-hook-form";
import ErrorMessage from "../ErrorMessage";


type ProjectFormProps = {
  register: UseFormRegister<{
    initialValues: {
        projectName: string;
        clientName: string;
        description: string;
    };
  }>
  errors: FieldErrors<{
    initialValues: {
        projectName: string;
        clientName: string;
        description: string;
    };
  }>
}

export default function ProjectForm({register, errors} : ProjectFormProps) {
  return (
    <>
      <div className="mb-5 space-y-3">
        <label htmlFor="projectName" className="text-sm uppercase font-bold">
          Nombre del Proyecto
        </label>
        <input
          id="projectName"
          className="w-full p-3  border border-gray-200"
          type="text"
          placeholder="Nombre del Proyecto"
          {...register("initialValues.projectName", {
            required: "El Titulo del Proyecto es obligatorio",
          })}
        />

        {errors.initialValues?.projectName && (
          <ErrorMessage>{errors.initialValues.projectName.message}</ErrorMessage>
        )}
      </div>

      <div className="mb-5 space-y-3">
        <label htmlFor="clientName" className="text-sm uppercase font-bold">
          Nombre Cliente
        </label>
        <input
          id="clientName"
          className="w-full p-3  border border-gray-200"
          type="text"
          placeholder="Nombre del Cliente"
          {...register("initialValues.clientName", {
            required: "El Nombre del Cliente es obligatorio",
          })}
        />

        {errors.initialValues?.clientName && (
          <ErrorMessage>{errors.initialValues.clientName.message}</ErrorMessage>
        )}
      </div>

      <div className="mb-5 space-y-3">
        <label htmlFor="description" className="text-sm uppercase font-bold">
          Descripción
        </label>
        <textarea
          id="description"
          className="w-full p-3  border border-gray-200 min-h-20"
          placeholder="Descripción del Proyecto"
          {...register("initialValues.description", {
            required: "Una descripción del proyecto es obligatoria"
          })}
        />

        {errors.initialValues?.description && (
          <ErrorMessage>{errors.initialValues.description.message}</ErrorMessage>
        )}
      </div>
    </>
  )
}