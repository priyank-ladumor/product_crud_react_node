import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './components/Home';
import React, { useContext, createContext, useState, useEffect } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import Protected from './Protected';
import Profile from './components/Profile';
import Navbar from "./components/Navbar"
import Page404 from './pages/Page404';
import SingleProduct from './components/SingleProduct';
import MyProduct from './components/MyProduct';
import AddProduct from './components/AddProduct';
import EditProduct from './components/EditProduct';



export const loginContext = createContext()
export const updateProductContext = createContext()

function App() {
  const [userdata, setUserData] = useState("")
  const [islogin, setislogin] = useState(false)
  const [token, settoken] = useState("")
  const [toggle, settoggle] = useState(true)
  const [getId, setGetId] = useState(null)

  let auth = localStorage.getItem("usertoken") || localStorage.getItem("username")

  return (
    <div className="App">
      <BrowserRouter>
        <loginContext.Provider value={{ userdata, setUserData, setislogin, islogin, token, settoken }}>
          <updateProductContext.Provider value={{ getId, setGetId }}>

            {toggle && <Navbar />}
            <Routes>

              {/* {(auth?.length > 0) && <Route exact path="/login" element={<Navigate to="/" replace />} />}
            {(auth?.length > 0) && <Route exact path="/register" element={<Navigate to="/" replace />} />} */}

              {
                auth?.length > 0 && <Route exact path='/' element={<Navigate to="/products?page=1" replace />} />
              }

              <Route path='/login' element={<Login settoggle={settoggle} />} />
              <Route path='/register' element={<Register settoggle={settoggle} />} />
              <Route path='/products' element={<Home settoggle={settoggle} />} />
              <Route path='/productsdetails/:id' element={<SingleProduct settoggle={settoggle} />} />

              <Route path='/' element={<Protected />}>
                <Route path='/profile' element={<Profile settoggle={settoggle} />} />
                <Route path='/add/product' element={<AddProduct settoggle={settoggle} />} />
                <Route path='/myproduct' element={<MyProduct settoggle={settoggle} />} />
                <Route path='/edit/product' element={<EditProduct settoggle={settoggle} />} />
              </Route>

              <Route path='*' element={<Page404 settoggle={settoggle} />} />

            </Routes>
          </updateProductContext.Provider>
        </loginContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App
