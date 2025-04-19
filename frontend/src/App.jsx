import { useState } from 'react'
import './style.css'
import LoginPopup from './components/LoginPopup.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <LoginPopup/>
    </>
  )
}

export default App
