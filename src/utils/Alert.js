import React from 'react'
import Swal from 'sweetalert2'

const swal = () => {
    Swal.fire({
        title:'Credenciales inválidas',
        text:'Introduzca credenciales correctas',
        confirmButtonText:'Aceptar',
        width:'400px',
        timer:'10000',
        timerProgressBar:true
      })
}
export default swal