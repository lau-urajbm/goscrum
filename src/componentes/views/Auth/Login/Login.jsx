import {replace, useFormik} from 'formik'
import { useNavigate } from 'react-router-dom'
import '../Auth.css'
import { Link } from 'react-router-dom'
import * as Yup from 'yup'
import swal from '../../../../utils/Alert'

const {REACT_APP_API_ENDPOINT}=process.env

const Login = () => {
  const navigate=useNavigate()
    const initialValues={
        userName:'',
        password:'',
    }
    const required = 'campo obligatorio'
    const validationSchema=Yup.object().shape({
      userName:Yup.string().min(4, '*La cantidad mínima de caracteres es 4').required(required),
      password:Yup.string().required(required),   
    })


    const onSubmit= (e)=>{
        /* localStorage.setItem('token', 'yes') */
        fetch(`${REACT_APP_API_ENDPOINT}auth/login`, {
          method: 'POST',
          headers:{
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            
              userName: formik.values.userName,
              password: formik.values.password,
              
            
          })
         })
         .then(response => response.json())
         .then(data => {
          if(data.status_code===200){
            console.log(data)
            localStorage.setItem('token', data?.result?.token)
            localStorage.setItem('userName', data?.result?.user.userName)
          navigate('/', {replace:true})
          }else{
            swal({
              title:'Credenciales inválidas',
              text:'Introduzca credenciales correctas',
              confirmButtonText:'Aceptar',
              width:'400px',
              timer:'10000',
              timerProgressBar:true
            })
          }
          
          
         })
      
        
    }

    const formik = useFormik({initialValues,validationSchema, onSubmit} )

  return (
    <div className="auth">
      <form onSubmit={formik.handleSubmit}>
        <h1>iniciar sesión</h1>
        <div>
          <label>Nombre de usuario</label>
          <input
            type="text"
            name="userName"
            value={formik.values.userName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={formik.errors.userName ? "error" : ""}
          ></input>
          {formik.errors.userName && formik.touched.userName && <div>{formik.errors.userName}</div>}
        </div>
        <div>
          <label>Contraseña</label>
          <input
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={formik.errors.password ? "error" : ""}
          ></input>
          {formik.errors.password&& formik.touched.password && <div>{formik.errors.password}</div>}{" "}
        </div>
        <div>
          <button type="submit">ingresar</button>
        </div>
        <div>
          <Link to="/register">Registrarme</Link>
        </div>
      </form>
    </div>
  );
}
export default Login
