import NewProject from "./components/NewProject";
import ProjectSideBar from "./components/ProjectSideBar";
import NoProjectSelected from "./components/NoProjectSelected";
import { useState } from "react";
import SelectedProject from "./components/SelectedProject";
function App() {
  const[projectState,setProjectState]=useState({
    selectedProjectId:undefined, //id: selectedproject , null :adding new project , undefined : not adding a new project or not selected a project
    projects:[],
    tasks:[]
  });


  function handleStartAddProject(){
    setProjectState(
      (prevState)=>{
        return {...prevState ,selectedProjectId:null}
        //overwrites the selectedProjectId to null
     
      }
  )
  }
    function handleCancelAddProject(){
         setProjectState(
          (prevState)=>{
            return {...prevState ,selectedProjectId:undefined}
        //overwrites the selectedProjectId to null
          }
       )
    }


 function handleSelectProject(id){
    setProjectState(
      (prevState)=>{
        return {...prevState ,selectedProjectId:id}
        //overwrites the selectedProjectId to the id of sekecetd project
     
      }
  )
  }

  function handleAddProject(projectData){
    setProjectState(
      (prevState)=>{
        const projectId =Math.random();
        const newProject = {...projectData , id:projectId}
          return{ ...prevState ,selectedProjectId:undefined ,projects:[...prevState.projects, newProject]}
     
      })
  }

  function handleDeleteProject(){
    setProjectState(
      (prevState)=>{
        return {
              ...prevState ,
              selectedProjectId:undefined,
              projects : prevState.projects.filter((project)=>project.id !== prevState.selectedProjectId)
               }

     
      }
  )}

  function handleAddTask(text){
     setProjectState(
      (prevState)=>{
        const taskId =Math.random();
        const newTask = {text : text, id:taskId ,projectId:prevState.selectedProjectId}
          return{ ...prevState ,tasks : [...prevState.tasks,newTask]}
     
      })

  }

  function handleDeleteTask(id){
        setProjectState(
      (prevState)=>{
        return {
              ...prevState ,
              
              tasks : prevState.tasks.filter((task)=>task.id !== id)
               }

     
      }
  )}

  
  const selectedproject = projectState.projects.find(project => project.id === projectState.selectedProjectId)
  let content=<SelectedProject project={selectedproject} onDelete={handleDeleteProject} onAddTask={handleAddTask} onDeleteTask={handleDeleteTask} tasks={projectState.tasks}/>;

  if(projectState.selectedProjectId===null){
    content=<NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject}/>
  }else if(projectState.selectedProjectId===undefined){
    content=<NoProjectSelected onStartAddProject={handleStartAddProject}/>
  }
  return (
    <main className="h-screen my-8 flex gap-8 ">
     <ProjectSideBar onStartAddProject={handleStartAddProject} projects={projectState.projects} onSelectProject={handleSelectProject} selectedProjectId={projectState.selectedProjectId}/>
     {content}
    </main>
  );
}

export default App;
