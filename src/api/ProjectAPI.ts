import api from "@/lib/axios";
import { ProjectFormData } from "@/types/index";


export async function createProject(formData : ProjectFormData) {
  try {
    const { data } = await api.post('/projects', formData) // ya api tiene la parte inicial de la url, se añade /projects y tipo post con formData que es lo que le quiero pasar a la API
    console.log(data)
  } catch (error) {
    console.log(error)
  }
}