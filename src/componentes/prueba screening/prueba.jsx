import React, { useState } from 'react';
import { Formik, Form, Field} from 'formik';
import * as Yup from 'yup';
import { useEffect } from 'react';
import Swal from 'sweetalert2'





const NotFound = ()=>{
  return(
    <div>ERROR 404</div>
  )
}

/*  const Prueba = () => {
const [data, setData]=useState()
const [loading, setLoading]=useState(true)

useEffect(()=>{
  setTimeout(()=>{
    setLoading(false)
  },5000)
})


  const datan = [{
    id:1, nombre:'tito'
  },
  {id:1, nombre:'chancho'},
  {id:1, nombre:'ñaño'},
  {id:1, nombre:'chincho'},
  {id:1, nombre:'chinchillo'},
  {id:1, nombre:'rata'}

]
if(loading){
  return(
    <>
              <div className="list">
                <h4><Skeleton width={100} height={400} circle={true}/></h4>
                
              </div>
              <div className="list ">
                <h4><Skeleton/></h4>

                
              </div>
              <div className="list ">
                <h4><Skeleton/></h4>
               
              </div>
              </>
  )
}else{
  return (
    <>
              <div className="list">
                <h4>Nuevas</h4>
                
              </div>
              <div className="list ">
                <h4>En proceso</h4>
                
              </div>
              <div className="list ">
                <h4>Finalizado</h4>
               
              </div>
              </>
  )
}}
 */
const Skeleton = () => {
  return (
  <div  style={{ width:'450px', marginTop:'50px', textAlign:'left'}} >
    <h3 className='skeleton-header' style={{backgroundColor:'lightgrey', height:'16px', width:'50%'}}></h3>
    <p className='skeleton-line' style={{backgroundColor:'lightgrey', height:'10px', width:'90%'}}></p>
    <p className='skeleton-line' style={{backgroundColor:'lightgrey', height:'10px', width:'90%'}}></p>
    <p className='skeleton-line' style={{backgroundColor:'lightgrey', height:'10px', width:'70%'}}></p>
      {/* COMPLETAR SKELETON */}
  </div>)
};

const Catalog = () => {
  const [loading, setLoading] = useState(true);
  const [catalogData, setCatalogData] = useState(
    {
    status: 404,
    data: [
      1
    ]
}

  );

  const fetchData = async () => {
      /* COMPLETAR  PETICION API*/
      
     /*  await fetchCatalogData()
    */
   
  };
  const alerta = ()=>{
    Swal.fire({
      icon:'warning',
      title: "Hubo un error",
      text: "Hubo un error inesperado, por favor inténtalo de nuevo",
      
      
    })
  }

  useEffect(() => {
      /* COMPLETAR */
      setLoading(true)
      /* setCatalogData( fetchData)  */
      
      setLoading(false)
      
  }, []);

  return (
    <div>
      {loading ? (
        <>
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </>
      ) : catalogData?.data?.length > 0 ?( 
        <>{/* <Card data={catalogData.data} ></Card> */}
        </>):
          catalogData?.status === 404 ? (
        <NotFound></NotFound>
      ) : (
       alerta()
      )}

      {/* COMPLETAR */}
    </div>
  );
};

export { Catalog, Skeleton, NotFound  };



