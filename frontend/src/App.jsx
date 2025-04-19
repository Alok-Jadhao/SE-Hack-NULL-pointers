import { useState } from 'react'
import './style.css'
import LoginPopup from './components/LoginPopup.jsx'
import SignupPopup from './components/SignupPopup.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <SignupPopup/>
    </>
  )
}

export default App
