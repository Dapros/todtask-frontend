import api from "@/lib/axios";
import { dashboardProjectSchema, Project, ProjectFormData } from "@/types/index";
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

export async function getProjects(){
  try {
    const { data } = await api('/projects') //get es default con axios por eso no lo escribo
    const response = dashboardProjectSchema.safeParse(data) //data cumpla con la schema definida
    if(response.success){
      return response.data // el success es true retorna data
    }
  } catch (error) {
    if(isAxiosError(error) && error.response){
      throw new Error(error.response.data.error)
    } 
  }
}

export async function getProjectById(id: Project['_id']){
  try {
    const { data } = await api(`/projects/${id}`) // obtener por default get hacia la url de /projects/id
    return data
  } catch (error) {
    if(isAxiosError(error) && error.response){
      throw new Error(error.response.data.error)
    } 
  }
}



type ProjectAPIType = {
  formData: ProjectFormData, 
  projectId: Project['_id']
}

export async function updateProject({formData, projectId}: ProjectAPIType){
  try {
    const { data } = await api.put<string>(`/projects/${projectId}`, formData) // peticion tipo put hacia la url para actualizar - con formData como valores que va a tomar para actualizar!
    return data
  } catch (error) {
    if(isAxiosError(error) && error.response){
      throw new Error(error.response.data.error)
    } 
  }
}


export async function deleteProject(id: Project['_id']){
  try {
    const { data } = await api.delete<string>(`/projects/${id}`) // consulta para eliminar proyecto y espera un mensaje de que el proyecto fue eliminado por eso se usa <string>
    return data
  } catch (error) {
    if(isAxiosError(error) && error.response){
      throw new Error(error.response.data.error)
    } 
  }
}