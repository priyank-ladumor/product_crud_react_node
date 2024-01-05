import React, { useState, useEffect } from 'react'
import { FaTrash } from "react-icons/fa"
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userUpdate } from '../store/actions/auth';
import axios from "axios"


const schema = yup.object({
    email: yup.string().email().required("please enter your email"),
    firstname: yup.string().min(2, "firstname must be above 2 characters").max(16, "firstname must be within 16 characters").required("please enter your firstname"),
});


const UpdateProfile = () => {
    const [logindata, setlogindata] = useState("")
    let token = JSON.parse(localStorage.getItem("usertoken"))

    const fetchuser = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/user`, { headers: { Authorization: token } })
            setlogindata(res.data)
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchuser()
    }, [])

    const {
        register,
        handleSubmit,
        clearErrors,
        formState: { errors },
        reset,
        setValue
    } = useForm({
        resolver: yupResolver(schema),
    });

    const newData = (e) => {
        setlogindata({ ...logindata, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        if (logindata) {
            setValue("firstname", logindata?.firstname);
            setValue("lastname", logindata?.lastname);
            setValue("email", logindata?.email);
            setValue("mobile", logindata?.mobile);
            // setValue("user_pic", logindata?.user_pic);
        }
    }, [logindata])

    useEffect(() => {
        if (!imgprv) {
            if (logindata?.user_pic?.length > 0) {
                setimg(logindata?.user_pic)
                setimgprv(logindata?.user_pic)
            }
        }
    }, [logindata])

    const fd = new FormData()
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [img, setimg] = useState()
    const [imgprv, setimgprv] = useState()
    const uploadimages = (e) => {
        const files = e.target.files;
        const imagePromises = [];

        setimg(e.target.files)
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            if (file) {
                const reader = new FileReader();
                imagePromises.push(
                    new Promise((resolve) => {
                        reader.onload = (e) => {
                            resolve(e.target.result);
                        };
                        reader.readAsDataURL(file);
                    })
                );
            }
        }

        Promise.all(imagePromises).then((results) => {
            setimgprv(results);
        });
    }

    const onSubmit = (data) => {
        for (let i = 0; i < img?.length; i++) {
            fd.append("images", img[i])
        }
        fd.append("firstname", data.firstname)
        fd.append("mobile", data.mobile)
        fd.append("lastname", data.lastname)
        fd.append("email", data.email)

        dispatch(userUpdate(fd))
    }

    return (
        <div>
            <form
                className="row g-3 justify-content-center"
                onSubmit={handleSubmit(onSubmit)}
                encType="multipart/form-data"
            >
                <div className="col-md-12">
                    <div className="row d-flex align-items-center">
                        <div className="">
                            <div className="">
                                <label htmlFor="uploadimg" className="d-flex-align-items-center justify-content-center btn btn-outline-secondary col-12">Upload User image</label>
                            </div>

                            <input
                                accept=".jpg"
                                type="file"
                                className="form-control"
                                id="uploadimg"
                                name="photoo"
                                onChange={(e) => [uploadimages(e)]}
                                style={{ display: "none" }}
                            />
                        </div>
                    </div>
                    {imgprv &&
                        <div className="col-md-12  ">
                            <div className="row mt-3 d-flex align-items-center justify-content-center rounded" style={{ backgroundColor: "whitesmoke", marginLeft: "1px" }}>
                                <div
                                    className="col-md-6 col-sm-12 col-lg-4 position-relative mb-4 " >
                                    {img &&
                                        <img
                                            src={imgprv}
                                            alt="img-preview"
                                            className="img-fluid mt-4"
                                            style={{ width: "250px", height: "170px" }}
                                        />}
                                    <FaTrash
                                        className="text-danger btn-trash trash"
                                        style={{ cursor: "pointer", right: "18px", top: "32px" }}
                                        onClick={() => [setimg(null), setimgprv(null)]}
                                    />
                                </div>
                            </div>
                        </div>}

                    <div className="col-md-12 mt-3">
                        <div className="row d-flex align-items-center">
                            <div className="col-md-12">
                                <div className="form-floating">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="floatingInput"
                                        placeholder="brand"
                                        {...register("firstname")}
                                        onChange={logindata && newData}
                                    />
                                    <label htmlFor="floatingInput">
                                        firstname
                                    </label>
                                </div>
                                {/* <p className="">Note: Category range must be within 2 to 24.</p> */}
                                {errors && <p className="errormsg mt-1">{errors.firstname?.message}</p>}
                            </div>
                        </div>
                    </div>

                    <div className="col-md-12 mt-3">
                        <div className="row d-flex align-items-center">
                            <div className="col-md-12">
                                <div className="form-floating">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="floatingInput"
                                        placeholder="brand"
                                        {...register("lastname")}
                                        onChange={logindata && newData}
                                    />
                                    <label htmlFor="floatingInput">
                                        lastname
                                    </label>
                                </div>
                                {/* {errors && <p className="errormsg mt-1">{errors.lastname?.message}</p>} */}
                            </div>
                        </div>
                    </div>

                    <div className="col-md-12 mt-4">
                        <div className="row d-flex align-items-center">
                            <div className="col-md-12">
                                <div className="form-floating">
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="floatingInput"
                                        placeholder="brand"
                                        {...register("email")}
                                        onChange={logindata && newData}
                                    />
                                    <label htmlFor="email">
                                        email
                                    </label>
                                </div>
                                {errors && <p className="errormsg mt-1">{errors.email?.message}</p>}
                            </div>
                        </div>
                    </div>

                    <div className="col-md-12 mt-3">
                        <div className="row d-flex align-items-center">
                            <div className="col-md-12">
                                <div className="form-floating">
                                    <input
                                        type="int"
                                        className="form-control"
                                        id="floatingInput"
                                        placeholder="brand"
                                        min={0}
                                        maxLength={10}
                                        minLength={10}
                                        {...register("mobile")}
                                        onChange={logindata && newData}
                                    />
                                    <label htmlFor="floatingInput">
                                        mobile no
                                    </label>
                                </div>
                                {/* {errors && <p className="errormsg mt-1">{errors.mobile?.message}</p>} */}
                            </div>
                        </div>
                    </div>
                    <div className="col-12 mt-4">
                        <div className="d-flex justify-content-between">
                            <input
                                type="submit"
                                value="Update"
                                className="btn btn-lg btn-success"
                                data-bs-dismiss="modal" aria-label="Close"
                            >
                            </input>
                            <input
                                className="btn btn-danger"
                                type="reset"
                                onClick={() => [
                                    clearErrors(),
                                ]}
                                value="Cancel"
                            />
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default UpdateProfile
