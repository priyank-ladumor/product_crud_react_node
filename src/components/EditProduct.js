import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom"; import { FaEdit } from "react-icons/fa"
import { FaTrash } from "react-icons/fa"
import { updateProductContext } from "../App";
import { updateProductAction } from "../store/actions/product";

const schema = yup.object({
    title: yup
        .string()
        .min(2, "title must be above 2 characters")
        .max(20, "title must be with in 20 characters")
        // .matches(/^\S*$/, "No whitespaces allowed")
        .required("please enter title"),
    price: yup.number().min(50, "price must be above 50").typeError("please enter price").required(),
    stock: yup.number().min(10, "stock must be above 10").max(500, "stock must be within 500").typeError("please enter product stock").required(),
    brand: yup.string().min(2).max(24).required("Please enter product brand"),
    // category: yup.string().min(2).max(24),
    description: yup.string().min(5).max(120).required("Please enter product description"),
    // rating: yup.number().min(1, "Rating must be above 1").max(5, "Rating must be within 5").typeError("please enter rating"),
    // discountPercentage: yup.number().max(50, "discountPercentage must be within 50").typeError("please enter product discountPercentage"),
});

const EditProduct = () => {

    const {
        register,
        handleSubmit,
        clearErrors,
        formState: { errors },
        reset,
        setValue,
    } = useForm({
        resolver: yupResolver(schema),
    });

    const { userproduct, updatesuccess } = useSelector((state) => state.product);
    const { getId, setGetId } = useContext(updateProductContext)

    const fd = new FormData()

    var empty = [];
    const [images, setimages] = useState([]);
    // const [photos, setphotos] = useState([]);
    const [imgerr, setimgerr] = useState();
    const [imglenerr, setimglenerr] = useState();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [userproductmodal, setuserproductmodal] = useState()

    useEffect(() => {
        setGetId(null)
    }, [])

    useEffect(() => {
        if (userproduct && getId) {
            const modeluser = Array.from(userproduct).filter((e, i) => e._id === getId)
            setuserproductmodal(modeluser)
        }
    }, [getId])

    const [updateproduct, setupdateproduct] = useState()
    const newData = (e) => {
        // const items = {
        //     title: updateproduct.title,
        //     price: updateproduct.price,
        //     rating: updateproduct.rating,
        //     description: updateproduct.description,
        //     category: updateproduct.category,
        //     brand: updateproduct.brand,
        //     stock: updateproduct.stock,
        //     discountPercentage: updateproduct.discountPercentage,
        // }
        setupdateproduct({ ...updateproduct, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        if (userproductmodal) {
            let modeldata = userproductmodal[0]
            if (modeldata && getId) {
                setupdateproduct(modeldata)
                setprvimg(modeldata.images)
            }
            setValue("title", modeldata?.title);
            setValue("price", modeldata?.price);
            setValue("rating", modeldata?.rating);
            setValue("description", modeldata?.description);
            setValue("category", modeldata?.category);
            setValue("brand", modeldata?.brand);
            setValue("stock", modeldata?.stock);
            setValue("discountPercentage", modeldata?.discountPercentage);
        }
    }, [userproductmodal])
    
    const [prvimg, setprvimg] = useState([])
    useEffect(() => {
        if (updateproduct) {
            if (images?.length === 0 && getId) {
                // setprvimg(updateproduct.images)
                // setimages(updateproduct.images)
            }
        }
    }, [updateproduct])

    // useEffect(() => {
    //     setupdateproduct({ ...updateproduct, images: images });
    // }, [images])

    const onReset = () => {
        setimages(empty);
        setimgerr("")
        setimglenerr("")
    };

    useEffect(() => {
        if (images?.length > 0 || prvimg?.length > 0) {
            const rmv = "";
            setimgerr(rmv);
            setimglenerr(rmv);
        }
    }, [images, prvimg]);

    const uploadimages = (e) => {
        const files = e.target.files;
        const imagePromises = [];

        if (files.length > 5) {
            setimglenerr('Maximum images allowed is five')
            setimgerr("")
        } else {
            setimages(e.target.files)
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
                setprvimg(results);
            });
        }
    }

    const onSubmit = (data) => {

        fd.append("title", data.title)
        fd.append("description", data.description)
        fd.append("price", data.price)
        if (data.discountPercentage) {
            fd.append("discountPercentage", data.discountPercentage)
        }
        if (data.rating) {
            fd.append("rating", data.rating)
        }
        if (data.category) {
            fd.append("category", data.category)
        }
        fd.append("stock", data.stock)
        fd.append("brand", data.brand)

        const item = {
            fd,
            getId
        }

        if (images?.length > 0) {
            for (let i = 0; i < images.length; i++) {
                fd.append("images", images[i])
            }
        }

        dispatch(updateProductAction(item));
        if (images?.length > 0 || prvimg?.length > 0) {
            // setGetId(null)
            setupdateproduct(null)
            // onReset();
            // setimages(empty);
        }

    };

    const validation = () => {
        if (images?.length === 0) {
            const err2 = "You need to provide an image";
            setimgerr(err2);
        }
    };

    // delete img from preview
    const deleteimgs = (delitem, index) => {
        const handleDelete = prvimg.filter((item, id) => item !== delitem);
        setprvimg(handleDelete);
        const img = Array.from(images).filter((ele, i) => i !== index)
        setimages(img)
    };
    console.log(prvimg, "prvimg");
    console.log(images, "images");
    console.log(getId, "gid");
    return (
        <div>
            <div type="button" className="d-flex justify-content-center ms-5" style={{ fontWeight: "bold", color: "blue" }} data-bs-toggle="modal" data-bs-target="#staticBackdrop" >Edit</div>

            <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-scrollable modal-xl">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="staticBackdropLabel">Edit Product</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" onClick={() => setGetId(null)} aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div
                                className="bgcolor"
                            >
                                <div className="container-fluid py-4" style={{ width: "70%" }}>
                                    <div className="row block" style={{ backgroundColor: "rgba(243, 243, 244, 1)" }}>
                                        <div className="col-10 mx-auto">
                                            <form
                                                className="row g-3 justify-content-center"
                                                onSubmit={handleSubmit(onSubmit)}
                                            >

                                                <div className="col-md-5">
                                                    <div className="form-floating mb-3">
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="floatingInput"
                                                            placeholder="name@example.com"
                                                            {...register("title")}
                                                            onChange={updateproduct && newData}
                                                        />
                                                        <label htmlFor="floatingInput">Title</label>
                                                    </div>
                                                    {errors && <p className="errormsg">{errors.title?.message}</p>}
                                                </div>

                                                <div className="col-md-5">
                                                    <div className="form-floating mb-3">
                                                        <input
                                                            type="number"
                                                            className="form-control"
                                                            id="floatingInput"
                                                            placeholder="name@example.com"
                                                            maxLength={10}
                                                            {...register("price")}
                                                            onChange={updateproduct && newData}
                                                        />
                                                        <label htmlFor="floatingInput">Price</label>
                                                    </div>
                                                    {errors && <p className="errormsg">{errors.price?.message}</p>}
                                                </div>
                                                <div className="col-md-10">
                                                    <div className="form-floating mb-">
                                                        <input
                                                            type="number"
                                                            className="form-control"
                                                            id="floatingInput"
                                                            placeholder="1234 Main St"
                                                            {...register("discountPercentage")}
                                                            onChange={updateproduct && newData}
                                                        />
                                                        <label htmlFor="floatingInput">
                                                            Discount Percentage
                                                        </label>
                                                    </div>
                                                    <p className="">Note: discount Percentage range must be within 0 to 50.</p>
                                                    {/* {errors && <p className="errormsg">{errors.discountPercentage?.message}</p>} */}
                                                </div>
                                                <div className="col-md-10">
                                                    <div className="form-floating">
                                                        <input
                                                            type="number"
                                                            className="form-control"
                                                            id="floatingInput"
                                                            placeholder="Apartment, studio, or floor"
                                                            {...register("rating")}
                                                            onChange={updateproduct && newData}
                                                            minLength={1}
                                                            maxLength={5}
                                                        />
                                                        <label htmlFor="floatingInput">Rating</label>
                                                    </div>
                                                    <p className="">Note: rating range must be within 1 to 5.</p>
                                                    {/* {errors && <p className="errormsg">{errors.rating?.message}</p>} */}
                                                </div>

                                                <div className="col-md-10">
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <div className="form-floating mb-3">
                                                                <input
                                                                    type="number"
                                                                    className="form-control"
                                                                    id="floatingInput"
                                                                    placeholder="name@example.com"
                                                                    {...register("stock")}
                                                                    onChange={updateproduct && newData}
                                                                />
                                                                <label htmlFor="floatingInput">Stock</label>
                                                            </div>
                                                            {errors && <p className="errormsg">{errors.stock?.message}</p>}
                                                        </div>

                                                        <div className="col-md-6">
                                                            <div className="form-floating mb-3">
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    id="floatingInput"
                                                                    placeholder="brand"
                                                                    {...register("brand")}
                                                                    onChange={updateproduct && newData}
                                                                />
                                                                <label htmlFor="floatingInput">
                                                                    Brand
                                                                </label>
                                                            </div>
                                                            {errors && <p className="errormsg">{errors.brand?.message}</p>}
                                                        </div>


                                                    </div>
                                                </div>

                                                <div className="col-md-10 ">
                                                    <div className="row d-flex align-items-center">
                                                        <div className="col-md-12">
                                                            <div className="form-floating">
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    id="floatingInput"
                                                                    placeholder="category"
                                                                    {...register("category")}
                                                                    onChange={updateproduct && newData}
                                                                />
                                                                <label htmlFor="floatingInput">
                                                                    Category
                                                                </label>
                                                            </div>
                                                            <p className="">Note: Category range must be within 2 to 24.</p>
                                                            {/* {errors && <p className="errormsg mt-1">{errors.category?.message}</p>} */}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="col-md-10">
                                                    <p>Product Images</p>
                                                    <div className="row d-flex align-items-center">
                                                        <div className="">
                                                            <div className="">
                                                                <label htmlFor="uploadimg" className="d-flex-align-items-center justify-content-center btn btn-outline-secondary col-12">Upload Property images</label>
                                                            </div>

                                                            <input
                                                                accept=".jpg"
                                                                multiple
                                                                type="file"
                                                                className="form-control"
                                                                id="uploadimg"
                                                                name="photoo"
                                                                onChange={(e) => [uploadimages(e)]}
                                                                style={{ display: "none" }}
                                                            />
                                                            {(imglenerr || imgerr) && (
                                                                <p style={{ color: "red" }}>
                                                                    {imgerr || imglenerr}
                                                                </p>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                                {prvimg?.length > 0 &&
                                                    <div className="col-md-10">
                                                        <div className="row col-12 p-4 rounded" style={{ backgroundColor: "whitesmoke", marginLeft: "1px" }}>
                                                            {prvimg &&
                                                                Array.from(prvimg)?.map((item, index) => {
                                                                    return (
                                                                        <>
                                                                            <div
                                                                                className="col-md-6 col-sm-12 col-lg-4 position-relative mb-4"
                                                                                key={index}
                                                                            >
                                                                                {(images?.length > 0 && prvimg?.length > 0) &&
                                                                                    <>
                                                                                        <img
                                                                                            src={item}
                                                                                            // src={require(`../images/${item}`)}
                                                                                            alt="img-preview"
                                                                                            className="img-fluid"
                                                                                            style={{ width: "250px", height: "200px" }}
                                                                                        />


                                                                                        <FaTrash
                                                                                            className="text-danger btn-trash trash"
                                                                                            style={{ cursor: "pointer", right: "35px" }}
                                                                                            // onClick={() => deleteimg(item.id)}
                                                                                            onClick={() => deleteimgs(item, index)}
                                                                                        />
                                                                                    </>
                                                                                }

                                                                                {(images?.length === 0 && getId) &&
                                                                                    <>
                                                                                        <img
                                                                                            // src={item}                                                                                    
                                                                                            src={item}
                                                                                            alt="img-preview"
                                                                                            className="img-fluid"
                                                                                            style={{ width: "250px", height: "200px" }}
                                                                                        />
                                                                                    </>
                                                                                }
                                                                            </div>
                                                                        </>
                                                                    );
                                                                })

                                                            }
                                                        </div>
                                                    </div>}

                                                <div className="col-md-10">
                                                    <div className="align-items-center">
                                                        <div className="form-floating">
                                                            <textarea
                                                                className="form-control"
                                                                id="floatingTextarea2"
                                                                {...register("description")}
                                                                placeholder="description"
                                                            ></textarea>
                                                            <label htmlFor="floatingTextarea2">Discription</label>
                                                        </div>
                                                    </div>
                                                    {errors && <p className="errormsg mt-1">{errors.description?.message}</p>}
                                                </div>

                                                <div className="col-10">
                                                    <div className="d-flex justify-content-between">
                                                        <input
                                                            type="submit"
                                                            value="Add Product"
                                                            className="btn btn-lg btn-success"
                                                            onClick={() => [validation]}
                                                            data-bs-dismiss="modal"
                                                            aria-label="Close"
                                                        >
                                                        </input>
                                                        <input
                                                            className="btn btn-danger"
                                                            type="reset"
                                                            onClick={() => [
                                                                clearErrors(),
                                                                onReset(),
                                                                setGetId(null)
                                                            ]}
                                                            value="Cancel"
                                                        />
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditProduct
