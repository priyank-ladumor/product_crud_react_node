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
import { FaHeart } from "react-icons/fa";
import { CAvatar, CBadge } from '@coreui/react'
import axios from 'axios'

const Home = ({ settoggle }) => {
    const location = useLocation()
    const idd = location.search.split("=")[1]
    const [usesearch, setUsesearch] = useSearchParams()
    const [page, setpage] = useState(+idd)
    const [item, setitem] = useState("")

    const { isrefresh, issuccess, isuserToken } = useSelector((state) => state.auth);
    const { product, loading, success, iswatchlater, getwatchlater } = useSelector((state) => state.product);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { userdata, setUserData, islogin, setislogin, logindata, setlogindata } = useContext(loginContext)

    useEffect(() => {
        settoggle(true)
    }, [])

    useEffect(() => {
        if (idd) {
            setpage(+idd)
        }
    }, [idd])

    useEffect(() => {
        dispatch(getProducts(page))
    }, [])

    let token2 = JSON.parse(localStorage.getItem("usertoken"))

    const fetchuser = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/user`, { headers: { Authorization: token2 } })
            setlogindata(res.data)
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        if (token2) {
            fetchuser()
        }
    }, [])

    useEffect(() => {
        if (product) {
            setitem(product)
        }
    }, [product])

    useEffect(() => {
        dispatch(getProducts(page))
    }, [page])

    const watchLaterCall = async (id) => {
        const item = {
            pid: id
        }
        await dispatch(watchlaterAction(item))
        await fetchuser()
    }

    return (
        <div>
            <div className='d-flex justify-content-center mt-5'>
                <CPagination aria-label="Page navigation example">
                    <CPaginationItem aria-label="Previous" onClick={() => [setpage(page - 1), setUsesearch({ page: page - 1 })]} disabled={page === 1}>
                        <span aria-hidden="true">&laquo;</span>
                    </CPaginationItem>
                    {page === 1 ? "" : <CPaginationItem onClick={() => [setpage(page - 1), setUsesearch({ page: page - 1 })]}>{page - 1}</CPaginationItem>}
                    <CPaginationItem active={page}>{page}</CPaginationItem>
                    <CPaginationItem onClick={() => [setpage(page + 1), setUsesearch({ page: page + 1 })]} disabled={item.length === 0}>{page + 1}</CPaginationItem>                  <CPaginationItem aria-label="Next" onClick={() => [setpage(page + 1), setUsesearch({ page: page + 1 })]} disabled={item.length === 0}>
                        <span aria-hidden="true">&raquo;</span>
                    </CPaginationItem>
                </CPagination>
            </div>
            {loading ?
                <div className='d-flex justify-content-center'>
                    <ColorRing
                        visible={true}
                        height="80"
                        width="80"
                        ariaLabel="color-ring-loading"
                        wrapperStyle={{}}
                        wrapperClass="color-ring-wrapper"
                        colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                    />
                </div>

                :
                <div className="row d-flex justify-content-evenly gy-3 m-5" >
                    {logindata ? item && Array.from(item).map((val, i) => {
                        const iswishlist = Array.from(logindata?.watchlater)?.includes(val._id);
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
                                                {token2 && logindata?.watchlater &&
                                                    <CAvatar color="secondary rounded-circle" size="lg" style={{ position: "absolute", float: "left", top: "5px", left: "5px" }}>
                                                        <FaHeart onClick={() => watchLaterCall(val._id)} style={{ fontSize: "38px", color: iswishlist ? "red" : "white" }} className='p-2' />
                                                    </CAvatar>
                                                }

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
                        : item && Array.from(item).map((val, i) => {
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
                        item?.length === 0 && <h1 className='d-flex justify-content-center mt-5' style={{ color: "red" }}>sorry, there is no more products!</h1>
                    }
                </div>
            }
            <ToastContainer />
        </div>
    )
}

export default Home



