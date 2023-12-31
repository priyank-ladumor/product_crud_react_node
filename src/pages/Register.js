import React, { useEffect, useState, useContext } from 'react'
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from '../store/actions/auth';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate, NavLink } from 'react-router-dom';
import { loginContext } from '../App';



const schema = yup.object({
    email: yup.string().email().required("please enter your email"),
    password: yup.string().min(6, "password must be above 6 digits").required("please enter your password"),
    firstname: yup.string().min(2, "firstname must be above 2 characters").max(16, "firstname must be within 16 characters").required("please enter your firstname"),
    // lastname: yup.string().min(2, "lastname must be above 2 characters").max(16,"lastname must be within 16 characters"),
});

const Register = ({ settoggle }) => {
    useEffect(() => {
        settoggle(false)
    }, [])

    let auth3 = localStorage.getItem("usertoken") || localStorage.getItem("username")
    useEffect(() => {
        if (auth3) {
            navigate('/')
        }
    }, [auth3])

    const { loading, success, error, issuccess, isrefresh } = useSelector((state) => state.auth);
    const { userdata, setUserData, setislogin, islogin } = useContext(loginContext)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    console.log(process.env.REACT_APP_API_KEY);
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

    const onsubmit = (data) => {
        console.log(data);
        reset();
        const item = {
            firstname: data.firstname,
            lastname: data.lastname,
            email: data.email,
            password: data.password
        }
        dispatch(registerUser(item))
    }

    useEffect(() => {
        if (error && !islogin) {
            toast.error('email is already registered', {
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
    }, [error])

    useEffect(() => {
        if (success && !islogin && !issuccess) {
            navigate('/login')
        }
    }, [success, islogin, issuccess])

    return (
        <div>
            <div>
                <div class="center">
                    <div class="main">
                        <div class="container b-container" id="b-container">
                            <form class="" id="b-form" onSubmit={handleSubmit(onsubmit)} >
                                <h2 class="form form_title title mb-2">Register to Website</h2>

                                <input class="form form__input" type="email" placeholder="Email" {...register("email")} />
                                {errors && <p className="errormsg" style={errormsg}>{errors.email?.message}</p>}

                                <input class="form form__input" type="text" placeholder="Firstname" {...register("firstname")} />
                                {errors && <p className="errormsg" style={errormsg}>{errors.firstname?.message}</p>}

                                <input class="form form__input mb-3" type="text" placeholder="Lastname" {...register("lastname")} />
                                {/* {errors && <p className="errormsg" style={errormsg}>{errors.lastname?.message}</p>} */}

                                <input class="form form__input" type="password" placeholder="Password" {...register("password")} />
                                {errors && <p className="errormsg" style={errormsg}>{errors.password?.message}</p>}

                                <span className='form'> <NavLink to="/login">go to login page</NavLink></span>

                                <div className='form'>
                                    <button class="form form__button button submit" type='submit'>Register</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default Register
