import React, {useState} from 'react'
import Login from './Login'
import Logout from './Logout'

const App = () => {
  const [name, setName] = useState('')
  const handleChangeName = (event) => {setName(event.target.value)}
  return (
    <>
    <Login name={name} handleChangeName={handleChangeName}></Login>
    <Logout></Logout>
     </>
  )
}

export default App