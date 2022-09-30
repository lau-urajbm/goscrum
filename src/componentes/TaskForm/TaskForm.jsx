import React from 'react'
import './TaskForm.css'
import {ErrorMessage, replace, useFormik} from 'formik'
import * as Yup from 'yup'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const {REACT_APP_API_ENDPOINT}=process.env


const TaskForm = () => {
  const initialValues={
    title:'',
    status:'',
    importance:'',
    description:'',
}

const required='*El campo es obligatorio'
const validationSchema=Yup.object().shape({
  title: Yup.string().min(6, '*La cantidad mínima de caracteres es 6').required(required),
  status:Yup.string().required(required),
  importance:Yup.string().required(required),
  description:Yup.string().required(required)
})
const onSubmit= (e)=>{
  fetch(`${REACT_APP_API_ENDPOINT}task`, {
    method: 'POST',
    headers:{
      "Content-Type": "application/json",
      "Authorization": "Bearer " + localStorage.getItem('token')
    },
    body: JSON.stringify({
      task:formik.values  
    })
   })
   .then(response => response.json())
   .then(data => {
    formik.resetForm()
    toast('tu tarea se creó')
    
    
   })
}
const formik = useFormik({initialValues, validationSchema, onSubmit} )

  return (
    <section className="task-form">
      <h2>Crear tarea</h2>
      <p>Crea tus tareas</p>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <div>
            <input
              name="title"
              className={formik.errors.title ? "error" : ""}
              placeholder="Título"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.title}
            ></input>
            {formik.errors.title && formik.touched.title && (
              <span className="error-message">{formik.errors.title}</span>
            )}
          </div>
          <div>
            <select
              name="status"
              value={formik.values.status}
              className={formik.errors.status ? "error" : ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <option value="">Seleccione una opción</option>
              <option value="NEW">Nueva</option>
              <option value="IN PROGRESS">En proceso</option>
              <option value="FINISHED">Finalizado</option>
            </select>
            {formik.errors.status && formik.touched.status && (
              <span className="error-message">{formik.errors.status}</span>
            )}
          </div>
          <div>
            <select
              name="importance"
              value={formik.values.importance}
              className={formik.errors.importance ? "error" : ""}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            >
              <option value="">Seleccione una opción</option>
              <option value="LOW">Baja</option>
              <option value="MEDIUM">Media</option>
              <option value="HIGH">Alta</option>
            </select>
            {formik.errors.importance && formik.touched.importance && (
              <span className="error-message">{formik.errors.importance}</span>
            )}
          </div>
        </div>
        <div>
          <textarea
            name="description"
            value={formik.values.description}
            placeholder="descripción"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            className={formik.errors.description ? "error" : ""}
          ></textarea>
          {formik.errors.description && formik.touched.description && (
              <span className="error-message">{formik.errors.description}</span>
            )}
        </div>
        <button type="submit">Crear</button>
      </form>
      <ToastContainer/>
    </section>
  );
}
export default TaskForm
