import React, {useEffect, useState} from 'react'

const App = () => {
  const [backendData, setBackendData] = useState([{}])

  useEffect(() =>{
     fetch("/login")
    .then(response => response.json())
    .then(data => {setBackendData(data)})
    .catch(err => {console.log(err)})

  }, [])

  return (
    <div>
        {(typeof backendData.messages === 'undefined'? (
          <p>Cargando...</p>
        ) : (
          backendData.messages.map((user, i) => (
            <div className='container_user'>
              <div className='container_inner'>
              <p className='user' key={i}>{user}</p>
              <button className='buttonUser'>Desloguear</button>
              </div>
            </div>
          )))
        )}
    </div>
  )
}

export default App