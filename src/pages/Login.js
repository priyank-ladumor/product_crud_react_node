import React, { useEffect, useState, useContext } from 'react'
import "../style/login.css"
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, NavLink, Navigate } from 'react-router-dom';
import { loginUser } from '../store/actions/auth';
import { auth } from "../firebase/firebaseConfig"
import { Logout } from '../store/slices/authSlice';
import { loginContext } from '../App';
import axios from 'axios';
import ReCAPTCHA from "react-google-recaptcha";


const schema = yup.object({
    email: yup.string().email().required("please enter your email"),
    password: yup.string().min(6, "password must be above 6 digits").required("please enter your password")
});


const Login = ({ settoggle }) => {

  
    useEffect(() => {
        settoggle(true)
    }, [])

    let auth3 = localStorage.getItem("usertoken") || localStorage.getItem("username")
    useEffect(() => {
        if (auth3) {
            navigate('/products?page=1')
        }
    }, [auth3])

    const { success, issuccess, isrefresh } = useSelector((state) => state.auth);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        clearErrors,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(schema),
    });

    const errormsg = {
        color: "red",
    }

    const [Captcha , setCaptcha] = useState(false)


    const { userdata, setUserData, setislogin, islogin } = useContext(loginContext)

    const SignUpUsingGoogle = () => {
        const provider = new GoogleAuthProvider()
        signInWithPopup(auth, provider)
            .then((result) => {
                const { displayName, email, photoUrl, emailVerified, idToken } = result.user;
                setUserData({ displayName, email, photoUrl, emailVerified, idToken })
                setislogin(true)
            }).catch((error) => {
                console.log({ error });
            });
    }

    useEffect(() => {
        if (islogin) {
            localStorage.setItem('username', userdata.displayName)
            localStorage.setItem('email', userdata.email)
        }
        let auth2 = localStorage.getItem("username")
        if (islogin && userdata && auth2) {
            setTimeout(() => {
                navigate('/products?page=1')
            }, 200);
        }
    }, [islogin])

    const logout = () => {
        localStorage.clear()
        signOut(auth).then(() => {
            setUserData("")
            setislogin(false)
        }).catch((error) => {
            console.log({ error });
        });
    }
    console.log({ islogin, userdata }, "google");


    //for logout
    let auth2 = localStorage.getItem("usertoken") || localStorage.getItem("username")
    useEffect(() => {
        if (isrefresh && !auth2) {
            dispatch(Logout())
            logout()
            // setUserData('')
            // setislogin('')
        }
    }, [isrefresh])

    const onsubmit = (data) => {
        const item = {
            email: data.email,
            password: data.password
        }
        dispatch(loginUser(item))
        reset();
        setUserData("")
        setislogin(false)
    }

    useEffect(() => {
        if (success && !islogin) {
            toast.success('user successfully registered', {
                position: "top-right",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }, [success])

    //email login navigate
    useEffect(() => {
        if (issuccess && auth2) {
            navigate('/products?page=1')
        }
    }, [issuccess])

    return (
        <div>
            <div class="center">
                <div class="main">
                    <div class="container b-container" id="b-container">
                        <form class="" id="b-form" onSubmit={handleSubmit(onsubmit)} >
                            <h2 class="form form_title title">Sign in to Website</h2>
                            <div class="form">
                                <button onClick={SignUpUsingGoogle} type="button" class="login-with-google-btn " >
                                    Sign in with Google
                                </button>
                            </div>
                            <span class="form__span form">or use your email account</span>
                            <input class="form__input form" type="email" placeholder="Email" {...register("email")} />
                            {errors && <p className="errormsg mt-1" style={errormsg}>{errors.email?.message}</p>}
                            <input class="form__input" type="password" placeholder="Password" {...register("password")} />
                            {errors && <p className="errormsg mt-1" style={errormsg}>{errors.password?.message}</p>}
                            {/* <ReCAPTCHA
                                sitekey="6LcC4UcpAAAAAPBVLobEHfIBvhddk0iMz9SjQ8Xc"
                                // sitekey="6LdlpkYpAAAAAFcMBO5RBdntbO06TPUizNTuKHks"
                                onChange={() => setCaptcha(true)}
                            /> */}
                            <div className='form'>
                                <NavLink class="form form_link form d-flex justify-content-center" to="/login/forgot-password">Forgot your password?</NavLink>
                            </div>
                            <span className='form'> <NavLink to="/register">go to register page</NavLink></span>
                            <div className='form'>
                                <button class="form form__button button submit" type='submit'>SIGN IN</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default Login
