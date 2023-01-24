import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'

const Logout = () => {
  const [backendData, setBackendData] = useState([{}])

  useEffect(() =>{
     fetch("/logout")
    .then(response => response.json())
    .then(data => {setBackendData(data)})
    .catch(err => {console.log(err)})

  }, [])

  return (
    <div style={{display: 'none'}}>
        {(typeof backendData.messages === 'undefined'? (
          <p>Cargando...</p>
        ) : (
          backendData.messages.map((user, i) => (
            <div className='container_user'>
              <div className='container_inner'>
              <p className='user' key={i}>{user}</p>
              <Link key={i} to="/login" className='buttonUser'>Volver a inicio</Link>
              </div>
            </div>
          )))
        )}
    </div>
  )
}
export default Logout