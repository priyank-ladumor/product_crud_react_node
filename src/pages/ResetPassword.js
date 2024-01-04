import React, { useEffect } from 'react'
import { useNavigate, NavLink, Navigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { ResetPasswordAction } from '../store/actions/auth';


const schema = yup.object({
    password: yup
        .string()
        .min(6)
        .required("Please enter your password"),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref("password"), null], "password does not match")
        .required(""),
});


const ResetPassword = ({ settoggle }) => {

    useEffect(() => {
        settoggle(false)
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

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { id, token } = useParams()
    console.log(id, token);

    const onsubmit = (data) => {
        const item = {
            password: data.password,
            id,
            token
        }
        dispatch(ResetPasswordAction(item))
        reset();
        console.log(data);
    }

    return (
        <div>
            <div>
                <div class="center">
                    <div class="main">
                        <div class="container b-container" id="b-container">
                            <form class="" id="b-form" onSubmit={handleSubmit(onsubmit)} >
                                <h2 class="form form_title title">Reset Password</h2>
                                <input class="form__input form" type="text" placeholder="password" {...register("password")} />
                                {errors && <p className="errormsg mt-1" style={{ color: "red" }}>{errors.password?.message}</p>}
                                <input class="form__input form" type="text" placeholder="confirmPassword" {...register("confirmPassword")} />
                                {errors && <p className="errormsg mt-1" style={{ color: "red" }}>{errors.confirmPassword?.message}</p>}
                                <span className='form'> <NavLink to="/login">go to login page</NavLink></span>
                                <span className='form'> <NavLink to="/products?page=1">go to home page</NavLink></span>
                                <div className='form'>
                                    <button class="form form__button button submit" type='submit'>Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <ToastContainer />
            </div>
        </div>
    )
}

export default ResetPassword
