import "./App.css"
import { Link } from "react-router-dom"

function App() {
// alow ?r=home for re-directing on extension open possibly
  return (
    <>
      <h1>Olly NEA</h1>

      <div className="grid">
        <Link className="button" to="/test">test page</Link>
        <Link className="button" to="/signup">sign up</Link>
        <Link className="button" to="/signin">sign in</Link>
        <Link className="button" to="/">home page</Link>
        <Link className="button" to="/404">404 page</Link>
        <Link className="button" to="/addpassword">add password</Link>
        <Link className="button" to="/import">import passwords</Link>
        <Link className="button" to="/export">export passwords</Link>
      </div>
    </>
  )
}

export default App