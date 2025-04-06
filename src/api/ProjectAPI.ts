import api from "@/lib/axios";
import { ProjectFormData } from "@/types/index";
import { isAxiosError } from "axios";


export async function createProject(formData : ProjectFormData) {
  try {
    const { data } = await api.post('/projects', formData) // ya api tiene la parte inicial de la url, se añade /projects y tipo post con formData que es lo que le quiero pasar a la API
    return data // devuelve data
  } catch (error) {
    //verifica si hay un error y verifica si existe una response
    if(isAxiosError(error) && error.response){ // type que revisa si es un error de axios
      throw new Error(error.response.data.error)
    }
  }
}