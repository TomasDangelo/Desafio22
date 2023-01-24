import {Route, Link, Routes} from 'react-router-dom'
import React, {useEffect, useState} from 'react'
import Logout from './Logout.jsx'


const Login = ({name, handleChangeName}) => {
  const [backendData, setBackendData] = useState([{}])
  const handleSubmit = (event) => {
  event.preventDefault()
  }

  useEffect(() =>{
     fetch("/login")
    .then(response => response.json())
    .then(data => {setBackendData(data)})
    .catch(err => {console.log(err)})

  }, [])

  return (
    <>
        {(typeof backendData.messages === 'undefined'? (
          <p>Cargando...</p>
        ) : (
          <>

         {backendData.messages.map((user, i) => (
          <div key={i}>
              <form  onSubmit={handleSubmit} className="form-usuario">
              <div className="container-form">
              <p>Ingresá tu nombre...</p>
              <input type="text" required onChange={handleChangeName} value={name}/>
               </div>
               <button className='btn-input'>Enviar</button>
              </form>
              <div style={name? ({display: 'block'}) : ({display: 'none'})} >
              <div className='container_user'>
              <p className={name? 'user' : 'dontshow'} key={i}>{ name? `Bienvenido, ${name}!` : "Bienvenido!" }</p>
              <Link  to="/logout" className={name? 'buttonUser' : 'dontshow'}>Desloguear</Link>
              </div>
              </div>
          </div>
          ))}
          </>
          )
        )}
          <Routes>
           <Route path="/logout" element={<Logout />} />
          </Routes>
      </>
  )
}

export default Login