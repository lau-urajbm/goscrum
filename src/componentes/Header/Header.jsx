import './Header.css'
import React from 'react'
import logo from '../../imgs/goscrum.png'
import { useNavigate } from 'react-router-dom'
import {useSelector} from 'react-redux'

 const Header = () => {

  const navigate = useNavigate()
  const {task} = useSelector(state=>{
    return state.taskReducer
  })
  const handleLogout=()=>{
    localStorage.removeItem('token')
    localStorage.removeItem('userName')
        navigate('/login', {replace:true})
  }
  return (
    <header>
        <img src={logo}></img>
        <div className='wrapper_right_header'>
        <div className='black'>{task?.length}</div>
        <div className='black'>{localStorage.getItem('userName')}</div>
        <div onClick={handleLogout}>X</div>
        </div>
        
    </header>
  )
}
export default Header