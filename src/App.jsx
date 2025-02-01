import { useState } from 'react'
import './App.css'
import { Link } from 'react-router-dom'

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
      <div className="grid">
        <Link className="button" to="/test">test page</Link>
        <Link className="button" to="/signup">sign up</Link>
        <Link className="button" to="/signin">sign in</Link>
        <Link className="button" to="/home">home page</Link>
        <Link className="button" to="/404">404 page</Link>
      </div>
    </>
  )
}

export default App