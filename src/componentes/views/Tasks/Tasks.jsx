import React, {useEffect, useState} from "react";
import Header from "../../Header/Header";
import Card from "../../Card/Card";
import "./Tasks.css";
import debounce from 'lodash.debounce'
import useResize from '../../../hooks/useResize'
import TaskForm from "../../TaskForm/TaskForm";
import Skeleton from 'react-loading-skeleton'
import {
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
} from "@mui/material";
import 'react-loading-skeleton/dist/skeleton.css'
import {useSelector, useDispatch} from 'react-redux'
import { getTasks, deleteTask, editTaskStatus} from "../../../store/actions/taskActions";

const Tasks = () => {
  const {isPhone}=useResize()
  const [list, setList]=useState([])
  const [renderList, setRenderList]=useState([])
  const [tasksfromWho, setTasksfromWho]=useState("ALL")
  const [search, setSearch]=useState('')
 

  const dispatch = useDispatch()




  

  useEffect(()=>{
    
    dispatch(getTasks(tasksfromWho ==="ME"?'/me':''))
  },[tasksfromWho])

  const {loading, error, task}=useSelector(state=>{
    return state.taskReducer
  })

  console.log(task)
  useEffect(()=>{
    if(task?.length){
      setList(task)
      setRenderList(task)
    }
  },[task])

  useEffect(()=>{
    if(search)
      setRenderList(
        list.filter((data) => data.title.startsWith(search))
      )
      else setRenderList(list)
  },[search])

  if(error)return <div>hubo un error, inténtalo nuevamente</div>


  const renderAllCards =()=>{
    return renderList.map(data=>{
      return <Card key={data._id} data={data} deleteCard={handleDelete} editCardStatus={handleEditCardStatus}></Card>

    })
  }

  const renderNewCards =()=>{
    return renderList?.filter(data=> data.status ==='NEW')
    .map(data=><Card key={data._id} data={data} deleteCard={handleDelete} editCardStatus={handleEditCardStatus}></Card>
    )
  }
  const renderInProgressCards =()=>{
    return renderList?.filter(data=>data.status ==='IN PROGRESS')
    .map(data=><Card key={data._id} data={data} deleteCard={handleDelete} editCardStatus={handleEditCardStatus}></Card>
    )
  }

  const renderFinishedCards =()=>{
    return renderList?.filter(data=> data.status ==='FINISHED'  

    ).map(data=> <Card key={data._id} data={data} deleteCard={handleDelete} editCardStatus={handleEditCardStatus}></Card>
    )
  }
  
  
const handleSearch = debounce((e)=>{
  setSearch(e.target.value)

}, 1000)
  const handleChangeImportance = (e)=>{
    if(e.currentTarget.value === "ALL")setRenderList(list)
    else
    setRenderList(
      list.filter((data) => data.importance === e.currentTarget.value)
    )

    
  }
   const handleDelete = (id) => {
    dispatch(deleteTask(id));
  };
  const handleEditCardStatus = (data)=>{
    dispatch(editTaskStatus(data))
  }
  return (
    <>
      <Header></Header>
      <main id="tasks">
        <TaskForm></TaskForm>
        <section className="wrapper_list">
          <div className="list_header">
            <h2>Mis tareas</h2>
          </div>
          <div className="filters">
            <FormControl>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                 onChange={(event) => setTasksfromWho(event.currentTarget.value)}
              >
                <FormControlLabel
                  value="ALL"
                  control={<Radio />}
                  label="Todas"
                />
                <FormControlLabel
                  value="ME"
                  control={<Radio />}
                  label="Mis tareas"
                />
              </RadioGroup>
            </FormControl>
            <div className="search">
              <input
                type="text"
                placeholder="Buscar por título..."
                
                onChange={handleSearch} 
              />
            </div>
            <select name="importance" onChange={handleChangeImportance}>
              <option value="">Seleccionar una prioridad</option>
              <option value="ALL">Todas</option>
              <option value="LOW">Baja</option>
              <option value="MEDIUM">Media</option>
              <option value="HIGH">Alta</option>
            </select>
          </div>

          {isPhone ? ( 
            !renderList?.length? <div>No tienes tareas creadas</div> :
            loading?(
              <>
              <Skeleton height={90}/>
              <Skeleton height={90}/>
              <Skeleton height={90}/>
              </>
              
            ):
            <div className="list phone">
              {renderAllCards()}
            </div>
  ) : (
            <div className="list_group">
              {!renderList.length? <div>No tienes tareas creadas</div>:
              loading?(
                <>
                <Skeleton height={90}/>
                <Skeleton height={90}/>
                <Skeleton height={90}/>
                </>
                
              ):
              <>
              <div className="list">
                <h4>Nuevas</h4>
                {renderNewCards()}
              </div>
              <div className="list ">
                <h4>En proceso</h4>
                {renderInProgressCards()}
              </div>
              <div className="list ">
                <h4>Finalizado</h4>
                {renderFinishedCards()}
              </div>
              </>
              }
              
            </div>
          )}
        </section>
      </main>
    </>
  );
};
export default Tasks;
