import { useState } from 'react'
import './style.css'
import Page from './pages/page.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <Page/>
      </div>
    </>
  )
}

export default App
