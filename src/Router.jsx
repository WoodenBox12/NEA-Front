import { BrowserRouter, Routes, Route } from "react-router-dom"

import SignUp from "./components/SignUp"
import NoPage from "./components/NoPage"
import SignIn from "./components/SignIn"

import Privileged from "./components/privileged/Privileged"
import Home from "./components/privileged/Home"
import AddPassword from "./components/privileged/AddPassword"
import Import from "./components/privileged/Import"
import Export from "./components/privileged/Export"
import Settings from "./components/privileged/Settings.jsx"

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Privileged />}>
          <Route index element={<Home />} />
          <Route path="index.html" element={<Home />} />
          <Route path="addpassword" element={<AddPassword />} />
          <Route path="settings" element={<Settings />} />
          <Route path="import" element={<Import />} />
          <Route path="export" element={<Export />} />
        </Route>

        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router