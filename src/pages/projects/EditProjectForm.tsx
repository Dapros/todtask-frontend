import ProjectForm from "@/components/projects/ProjectForm";
import { Project, ProjectFormData } from "@/types/index";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { updateProject } from "@/api/ProjectAPI";
import { toast } from "react-toastify";

type EditProjectFormProps = {
  data: ProjectFormData
  projectId: Project['_id']
}

export default function EditProjectForm({data, projectId} : EditProjectFormProps) {

  const navigate = useNavigate()
  const initialValues : ProjectFormData = {
      // se llenan los initialValues con los valores de data
      projectName: data.projectName, 
      clientName: data.clientName,
      description: data.description
    }
  
    const { register, handleSubmit, formState: {errors} } = useForm({defaultValues: initialValues})

    const { mutate } = useMutation({
      mutationFn: updateProject,
      onError: (error) => {
        toast.error(error.message)
      },
      onSuccess: (data) => {
        toast.success(data) // no olvidar data es lo que trae desde la API, ese mensaje!
        navigate('/')
      }
    })

    const handleForm = (formData: ProjectFormData) => {
      const data = {
        formData,
        projectId
      }
      mutate(data)
    }

  return (
    <>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl font-black">Editar Proyecto</h1> 
        <p className="text-2xl font-light text-teal-700">Llena el siguiente formulario para editar el proyecto</p>
        
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
            value='Guardar Cambios'
            className="bg-teal-600 hover:bg-teal-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors"
          />
        </form>
      </div>
    </>
  )
}
