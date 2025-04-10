import { getTaskById } from "@/api/TaskAPI"
import { useQuery } from "@tanstack/react-query"
import { useLocation, useParams } from "react-router-dom"
import EditTaskModal from "./EditTaskModal"


export default function EditTaskData() {
  const params = useParams()
  const projectId = params.projectId!

  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const taskId = queryParams.get('editTask')!
  
  const { data } = useQuery({
    queryKey: ['tasks', taskId],
    queryFn: () => getTaskById({projectId, taskId}),
    enabled: !!taskId // !! convierte variable a boolean y si tiene algo retorna true sino a false -  es decir que no se va a ejecutar hasta que taskId tenga algo
  })

  if(data) return <EditTaskModal />
}
