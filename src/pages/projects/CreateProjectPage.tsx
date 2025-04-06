import { Link, useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import ProjectForm from "@/components/projects/ProjectForm";
import { ProjectFormData } from "@/types/index";
import { createProject } from "@/api/ProjectAPI";


export default function CreateProjectPage() {

  const navigate = useNavigate()

  const initialValues : ProjectFormData = {
    projectName: "",
    clientName: "",
    description: ""
  }

  const { register, handleSubmit, formState: {errors} } = useForm({defaultValues: {initialValues}})

  // mutacion
  const mutation = useMutation({
    mutationFn: createProject,
    onError: () => {

    },
    onSuccess: (data) => {
      toast.success(data)
      navigate('/')
    }
  })

  const handleForm = async (formData : ProjectFormData) => {
    //llamando la mutacion
    await mutation.mutateAsync(formData) // se envia formData con mutateAsync hacia mutation y la mutationFN tomara este para su ejecucion.
  }

  return (
    <>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl font-black">Crear Proyecto</h1> 
        <p className="text-2xl font-light text-teal-700">Llena el siguiente formulario para crear un proyecto</p>
        
        <nav className="my-5">
          <Link
            className="bg-teal-400 hover:bg-teal-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
            to='/'
          >Volver a Proyectos</Link>
        </nav> 

        <form 
          className="mt-10 bg-white shadow-lg p-10 rounded-lg"
          onSubmit={handleSubmit(handleForm)}  
          noValidate
        >
          <ProjectForm 
            register={register}
            errors={errors}
          />
          <input 
            type="submit"
            value='Crear proyecto'
            className="bg-teal-600 hover:bg-teal-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors"
          />
        </form>
      </div>
    </>
  )
}
