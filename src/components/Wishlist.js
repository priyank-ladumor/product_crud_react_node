import React, { useEffect, useState, useContext } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import { Logout } from '../store/slices/authSlice';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { loginContext } from '../App';
import { getProducts, watchlaterAction } from '../store/actions/product';
import { CPaginationItem, CPagination } from '@coreui/react'
import { NavLink, useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { ColorRing } from "react-loader-spinner"
import { FaHeart, FaTrash } from "react-icons/fa";
import { CAvatar } from '@coreui/react'
import { getwatchlaterAction } from '../store/actions/product'

const Wishlist = ({ settoggle }) => {
    useEffect(() => {
        settoggle(true)
    })
    const dispatch = useDispatch()
    const { product, loading, success, getwatchlater } = useSelector((state) => state.product);

    const [wislistData, setwislistData] = useState()
    useEffect(() => {
        dispatch(getwatchlaterAction())
    }, [])

    useEffect(() => {
        setwislistData(getwatchlater)
    }, [])

    useEffect(() => {
        setwislistData(getwatchlater)
    }, [getwatchlater])

    const watchLaterCall = async (id) => {
        const item = {
            pid: id
        }
        await dispatch(watchlaterAction(item))
        await dispatch(getwatchlaterAction())
    }
    console.log(getProducts,"getProducts");
    return (
        <div>
            <div className="row d-flex justify-content-evenly gy-3 m-5" >
                {wislistData && Array.from(wislistData).map((val, i) => {
                    return (
                        <>
                            <div className='col-md-5 col-lg-4 my-4 mx-md-2 mx-lg-0 d-flex justify-content-center' style={{ cursor: "pointer", position: "relative" }}
                            >
                                <div>
                                    <div className="container-fluid m-4">
                                        <div className="card border-0 rounded-0 shadow" style={{ width: "18rem" }}>
                                            <NavLink to={`/productsdetails/${val._id}`} style={{ textDecoration: "none", color: "black" }}>
                                                {
                                                    val?.images[0] && <img src={`${val.images[0]}`} className="card-img-top rounded-0 img-fluid" style={{ height: "200px", position: "relative" }} alt="..." />
                                                }
                                            </NavLink>
                                            <CAvatar color="white rounded-circle" size="lg" style={{ position: "absolute", float: "left", top: "5px", left: "5px" }}>
                                                <FaTrash onClick={() => watchLaterCall(val._id)} style={{ fontSize: "38px", color: "red" }} className='p-2' />
                                            </CAvatar>

                                            <NavLink to={`/productsdetails/${val._id}`} style={{ textDecoration: "none", color: "black" }}>

                                                <div className="card-body mt-3 mb-3">
                                                    <div className="row">
                                                        <div className="col-12">
                                                            <h4 className="card-title" style={{ minHeight: "80px" }}>{val.title}</h4>
                                                            <div className='col-12 d-flex' style={{ fontSize: "18px", fontWeight: "700", textTransform: "capitalize" }}>
                                                                <span className='col-6'>rating: {val?.rating}</span>
                                                                <span className='col-6' >{val.category}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div>
                                                    </div>
                                                </div>
                                                <div className="row align-items-center text-center g-0">
                                                    <div className="col-4">
                                                        ${val.price}
                                                    </div>
                                                    <div className="col-8">
                                                        <a href="#" className="btn btn-dark w-100 p-3 rounded-0 text-warning">ADD TO CART</a>
                                                    </div>
                                                </div>
                                            </NavLink>
                                        </div>
                                    </div>
                                </div>
                                <div style={{ background: "" }}>
                                </div>
                            </div>
                        </>
                    )
                })
                }
                {(loading) ? "" :
                    wislistData?.length === 0 && <h1 className='d-flex justify-content-center mt-5' style={{ color: "red" }}>There is no more wishlist products!</h1>
                }
            </div>
            <ToastContainer />
        </div>
    )
}

export default Wishlist
