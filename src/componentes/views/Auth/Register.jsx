import React from 'react'
import {useFormik} from 'formik'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import './Auth.css'
import { v4 as uuidv4 } from 'uuid';
import {Switch, FormControlLabel} from '@mui/material'
const {REACT_APP_API_ENDPOINT}=process.env

const Register = () => {
  const navigate = useNavigate()

    const initialValues={
        userName:'',
        password:'',
        email:'',
        teamID:'',
        role:'',
        continent:'',
        region:'',
        switch:false,
    }
    const required = 'campo obligatorio'
    const validationSchema=Yup.object().shape({
      userName:Yup.string().min(4, '*La cantidad mínima de caracteres es 4').required(required),
      password:Yup.string().required(required),
      email:Yup.string().email('debe ser un email válido').required(required),
      
      role:Yup.string().required(required),
      continent:Yup.string().required(required),
      region:Yup.string().required(required),
     
     
     
     
    })

    const handleChangeContinent = (value)=>{
      formik.setFieldValue('continent', value)

      if(value !== 'America')formik.setFieldValue('region', 'Otro')
    }

    const onSubmit= ()=>{
       console.log(formik.values)
       const teamID =!formik.values.teamID? uuidv4(): formik.values.teamID
       console.log(teamID)

       fetch(`${REACT_APP_API_ENDPOINT}auth/register`, {
        method: 'POST',
        headers:{
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: {
            userName: formik.values.userName,
            password: formik.values.password,
            email: formik.values.email,
            teamID,
            role: formik.values.role,
            continent: formik.values.continent,
            region: formik.values.region,
          }
        })
       })
       .then(response => response.json())
       .then(data => navigate('/registered/'+ data?.result?.user?.teamID))
    }
    const formik = useFormik({initialValues, validationSchema,onSubmit} )

  return (
    <div className="auth">
      <form onSubmit={formik.handleSubmit}>
        <h1>Registrarse</h1>
        <div>
          <label>Nombre se usuario</label>
          <input
            type="text"
            className={formik.errors.userName ? "error" : ""}
            name="userName"
            value={formik.values.userName}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          ></input>
          {formik.errors.userName && formik.touched.userName && (
            <span className="error-message">{formik.errors.userName}</span>
          )}
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            className={formik.errors.email ? "error" : ""}
            name="email"
            value={formik.values.email}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          ></input>
          {formik.errors.email && formik.touched.email && (
            <span className="error-message">{formik.errors.email}</span>
          )}
        </div>
        <div>
          <label>Contraseña</label>
          <input
            type="password"
            name="password"
            className={formik.errors.password ? "error" : ""}
            value={formik.values.password}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          ></input>

          {formik.errors.password && formik.touched.password && (
            <span className="error-message">{formik.errors.password}</span>
          )}
        </div>

        <div>
          <label>Continente</label>

          <select
            name="continent"
            className={formik.errors.continent ? "error" : ""}
            value={formik.values.continent}
            onBlur={formik.handleBlur}
            onChange={(e) => handleChangeContinent(e.currentTarget.value)}
          >
            <option value="">Selecciona una opción</option>
            <option value="America">América</option>
            <option value="Europa">Europa</option>
            <option value="Otro">Otro</option>
          </select>
          {formik.errors.continent && formik.touched.continent && (
            <span className="error-message">{formik.errors.continent}</span>
          )}
        </div>
        <div>
          {formik.values.continent === "America" && (
            <>
              <label>Región</label>
              <select
                name="region"
                className={formik.errors.region ? "error" : ""}
                value={formik.values.region}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              >
                <option value="">Selecciona una opción</option>
                <option value="Latam">Latam</option>
                <option value="Brasil">Brasil</option>
                <option value="America del Norte">America del Norte</option>
                <option value="Otro">Otro</option>
              </select>
              {formik.errors.region && formik.touched.region && (
                <span className="error-message">{formik.errors.region}</span>
              )}
            </>
          )}
        </div>

        <div>
          <label>Rol</label>
          <select
            name="role"
            className={formik.errors.role ? "error" : ""}
            value={formik.values.role}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          >
            <option value="">Selecciona una opción</option>
            <option value="Team Member">Team Member</option>
            <option value="Team Leader">Team Leader</option>
          </select>
          {formik.errors.role && formik.touched.role && (
            <span className="error-message">{formik.errors.role}</span>
          )}
        </div>
        <FormControlLabel
          control={
            <Switch
              value={formik.values.switch}
              onChange={() =>
                formik.setFieldValue("switch", !formik.values.switch)
              }
              name="switch"
              color="secondary"
            />
          }
          label="Perteneces a un equipo ya creado"
        />

        <div>
          {formik.values.switch && (
            <>
              <label>Identificador de equipo</label>
              <input
                type="text"
                name="teamID"
                className={formik.errors.teamID ? "error" : ""}
                value={formik.values.teamID}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              ></input>
              {formik.errors.teamID && formik.touched.teamID && (
                <span className="error-message">{formik.errors.teamID}</span>
              )}
            </>
          )}
        </div>
        <div>
          <button type="submit">ingresar</button>
        </div>
        <div>
          <Link to="/login">Iniciar Sesión</Link>
        </div>
      </form>
    </div>
  );
}
export default Register