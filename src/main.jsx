import React from "react"
import ReactDOM from "react-dom/client"

import Router from "./Router"

import "./Index.css"

ReactDOM.createRoot(document.getElementById("root")).render(
  <>{/*removed strict mode*/}
    <Router />
  </>
)