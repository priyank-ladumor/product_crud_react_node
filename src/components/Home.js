import React, { useEffect, useState, useContext } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import { Logout } from '../store/slices/authSlice';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { loginContext } from '../App';
import { getProducts } from '../store/actions/product';
import { CPaginationItem, CPagination } from '@coreui/react'
import { NavLink, useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { ColorRing } from "react-loader-spinner"



const Home = ({ settoggle }) => {
    const location = useLocation()
    const idd = location.search.split("=")[1]
    const [usesearch, setUsesearch] = useSearchParams()
    const [page, setpage] = useState(+idd)
    const [item, setitem] = useState("")

    const { isrefresh, issuccess, isuserToken } = useSelector((state) => state.auth);
    const { product, loading, success } = useSelector((state) => state.product);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { userdata, setUserData, islogin, setislogin, token, settoken } = useContext(loginContext)


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

    useEffect(() => {
        if (product) {
            setitem(product)
        }
    }, [product])

    useEffect(() => {
        dispatch(getProducts(page))
    }, [page])

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
                <div className="row d-flex justify-content-evenly gy-3 m-5">
                    {item && Array.from(item).map((val, i) => {
                        return (
                            <>
                                <div className='col-md-5 col-lg-4 my-4 mx-md-2 mx-lg-0 d-flex justify-content-center' style={{ cursor: "pointer" }}>
                                    <NavLink to={`/productsdetails/${val._id}`} style={{ textDecoration: "none", color: "black" }}>
                                        <div className="container-fluid m-4">
                                            <div className="card border-0 rounded-0 shadow" style={{ width: "18rem" }}>
                                                {
                                                    val?.images[0] && <img src={`${val.images[0]}`} className="card-img-top rounded-0 img-fluid" style={{ height: "200px" }} alt="..." />
                                                }
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
                                            </div>
                                        </div>
                                    </NavLink>
                                </div>
                            </>
                        )
                    })}
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


// useEffect(() => {
//     if (isrefresh && !islogin) {
//         navigate('/login')
//     }
// }, [isrefresh])

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

//  val?.images[0] && <img src={require(`../images/${val.images[0]}`)} className="card-img-top rounded-0 img-fluid" style={{ height: "200px" }} alt="..." /> 
