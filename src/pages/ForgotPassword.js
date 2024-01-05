import React, { useEffect } from 'react'
import { useNavigate, NavLink, Navigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { ForgotPasswordAction } from '../store/actions/auth';
import { ThreeDots } from "react-loader-spinner"

const schema = yup.object({
    email: yup.string().email().required("please enter your email"),
});

const ForgotPassword = ({ settoggle }) => {
    let auth3 = localStorage.getItem("usertoken") || localStorage.getItem("username")
    useEffect(() => {
        if (auth3) {
            navigate('/products?page=1')
        }
    }, [auth3])

    useEffect(() => {
        settoggle(true)
    }, [])

    const {
        register,
        handleSubmit,
        clearErrors,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(schema),
    });

    const { ForgotPasswordpending } = useSelector((state) => state.auth)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const onsubmit = (data) => {
        dispatch(ForgotPasswordAction(data))
        reset();
    }

    return (
        <div>
            <div class="center">
                <div class="main">
                    <div class="container b-container" id="b-container">
                        <form class="" id="b-form" onSubmit={handleSubmit(onsubmit)} >
                            <h2 class="form form_title title">Forgot Password</h2>
                            <input class="form__input form" type="email" placeholder="Email" {...register("email")} />
                            {errors && <p className="errormsg mt-1" style={{ color: "red" }}>{errors.email?.message}</p>}
                            <span className='form'> <NavLink to="/login">go to login page</NavLink></span>
                            <div className='form'>
                                <button class="form form__button button submit" type='submit'>
                                    {
                                        ForgotPasswordpending ?
                                            <div className='d-flex justify-content-center'>
                                                <ThreeDots
                                                    visible={true}
                                                    height="40"
                                                    width="60"
                                                    color="white"
                                                    radius="9"
                                                    ariaLabel="three-dots-loading"
                                                    wrapperStyle={{}}
                                                    wrapperClass=""
                                                />
                                            </div>
                                            :
                                            "SEND MAIL"
                                    }

                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div >
            <ToastContainer />
        </div >
    )
}

export default ForgotPassword
