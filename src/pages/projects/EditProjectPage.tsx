import { getProjectById } from "@/api/ProjectAPI"
import { useQuery } from "@tanstack/react-query"
import { Navigate, useParams } from "react-router-dom"
import EditProjectForm from "./EditProjectForm"

export default function EditProjectPage() {

  const params = useParams() // trae el parametro id de project
  const projectId = params.projectId! // valor que siempre va a exister quita el undefined

  const { data, isLoading, isError } = useQuery({
    queryKey: ['editProject', projectId], // como segundo parametro el projectId para que tome valores unicos
    queryFn: () => getProjectById(projectId), // usar callback cuando la funcion requiera parametros
    retry: false // para que haga una sola consulta y no se quede mucho timpo cargando, esto para que en caso de que no funcione la consulta
  })

  if(isLoading) return 'cargando...'
  if(isError) return <Navigate to='/404' />

  // hasta que existan los datos va a renderizar el formulario
  if(data) return <EditProjectForm data={data} projectId={projectId} />
}
