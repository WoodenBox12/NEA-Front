import { useState } from 'react'
import axios from 'axios'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Link, Outlet } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Olly NEA</h1>
      <div className="card">
        <button className="button" onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
      <Link className="button" to="/test">test page</Link>
    </>
  )
}

export default App