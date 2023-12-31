import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './components/Home';
import React, { useContext, createContext, useState, useEffect } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import Protected from './Protected';
import Profile from './components/Profile';
import Navbar from "./components/Navbar"



export const loginContext = createContext()

function App() {
  const [userdata, setUserData] = useState("")
  const [islogin, setislogin] = useState(false)
  const [token, settoken] = useState("")
  const [toggle, settoggle] = useState(true)

  let auth = localStorage.getItem("usertoken") || localStorage.getItem("username")
  console.log(auth?.length > 0, "auth?.length > 0");
  return (
    <div className="App">
      <BrowserRouter>
        <loginContext.Provider value={{ userdata, setUserData, setislogin, islogin, token, settoken }}>
          {toggle && <Navbar />}
          <Routes>

            {/* {(auth?.length > 0) && <Route exact path="/login" element={<Navigate to="/" replace />} />}
            {(auth?.length > 0) && <Route exact path="/register" element={<Navigate to="/" replace />} />} */}

            <Route path='/login' element={<Login settoggle={settoggle} />} />
            <Route path='/register' element={<Register settoggle={settoggle} />} />

            <Route path='/' element={<Protected />}>
              <Route index element={<Home settoggle={settoggle} />} />
              <Route path='/profile' element={<Profile settoggle={settoggle} />} />
            </Route>

            <Route path='*' element={<h1>page 404</h1>} />

          </Routes>
        </loginContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App
