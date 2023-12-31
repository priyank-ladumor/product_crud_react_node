import React, { useEffect, useState, useContext } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import { Logout } from '../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { loginContext } from '../App';

const Home = ({ settoggle }) => {
    useEffect(() => {
        settoggle(true)
    }, [])
    const { isrefresh, issuccess, isuserToken } = useSelector((state) => state.auth);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { userdata, setUserData, islogin, setislogin, token, settoken } = useContext(loginContext)


    useEffect(() => {
        if (isrefresh && !islogin) {
            navigate('/login')
        }
    }, [isrefresh])

    // let auth2 = localStorage.getItem("username")
    // useEffect(() => {
    //     if ((issuccess && !islogin)) {
    //         toast.success('user login successfully', {
    //             position: "top-right",
    //             autoClose: 4000,
    //             hideProgressBar: false,
    //             closeOnClick: true,
    //             pauseOnHover: true,
    //             draggable: true,
    //             progress: undefined,
    //             theme: "light",
    //         });
    //     }
    // }, [issuccess, islogin])

    return (
        <div>
        {/* <h1 style={{color:"red", display:"flex",justifyContent:"center",alignItems:"center",height:"250px"}}>kalubhai</h1> */}
            <ToastContainer />
        </div>
    )
}

export default Home
