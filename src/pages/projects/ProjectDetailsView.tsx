import { getProjectById } from "@/api/ProjectAPI"
import AddTaskModal from "@/components/task/AddTaskModal"
import EditTaskData from "@/components/task/EditTaskData"
import TaskList from "@/components/task/TaskList"
import { useQuery } from "@tanstack/react-query"
import { Navigate, useNavigate, useParams } from "react-router-dom"

export default function ProjectDetailsView() {

  const navigate = useNavigate()

  const params = useParams() // extraemos el parametro en este caso sera projectId
  const projectId = params.projectId! // projectId con ! para que no infiera undefined
  const { data, isLoading, isError} = useQuery({ // query
    queryKey: ['editProject', projectId],
    queryFn: () => getProjectById(projectId),
    retry: false
  })
  if(isLoading) return 'Cargando...'
  if(isError) return <Navigate to='/404' />
  if(data) return (
    <>
     <h1 className="text-5xl font-black">{data.projectName}</h1> 
     <p className="text-2xl font-light text-gray-500 mt-5">{data.description}</p>

     <nav className="my-5 flex gap-3">
      <button
        type="button"
        className="bg-teal-400 hover:bg-teal-500 px-10 py-3 text-white  text-xl font-bold cursor-pointer transition-colors"
        onClick={() => navigate(location.pathname + '?newTask=true')}
      >Agregar Tarea</button>
     </nav>
     <TaskList 
      tasks={data.tasks}
     />
     <AddTaskModal />
     <EditTaskData />
    </>
  )
}
