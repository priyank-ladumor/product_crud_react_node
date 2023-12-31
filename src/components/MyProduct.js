import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { getUserProducts } from '../store/actions/product';
import { NavLink } from 'react-router-dom';
import { MdDelete } from "react-icons/md";
import { deleteProducts } from '../store/actions/product';
import EditProduct from './EditProduct';
import { updateProductContext } from '../App';
import { ColorRing } from "react-loader-spinner"
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';


const MyProduct = ({ settoggle }) => {
    useEffect(() => {
        settoggle(true)
    }, [])

    const { userproduct, updatesuccess, isloader } = useSelector((state) => state.product);
    const { getId, setGetId } = useContext(updateProductContext)
    const dispatch = useDispatch()
    const [useritem, setUseritem] = useState();

    useEffect(() => {
        dispatch(getUserProducts())
    }, [])

    useEffect(() => {
        if (userproduct || !getId) {
            dispatch(getUserProducts())
        }
    }, [updatesuccess])

    useEffect(() => {
        if (userproduct) {
            setUseritem(userproduct)
        }
    }, [userproduct])

    const deleteItem = (id) => {
        const deleteFilter = Array.from(useritem).filter((e, i) => e._id !== id)
        dispatch(deleteProducts(id))
        if (deleteFilter) {
            setUseritem(deleteFilter)
        }
    }

    return (
        <div>
            <div className='container-fluid'>

                <div className='row d-flex justify-content-evenly align-items-center mt-5'>
                    {isloader ?
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

                        useritem && Array.from(useritem).map((val, i) => {

                            const setid = () => {
                                if (!getId) {
                                    setGetId(val._id)
                                }
                            }
                            return (
                                <>
                                    <div className='col-md-5 col-lg-4 my-4 mx-md-2 mx-lg-0 d-flex justify-content-center' style={{ cursor: "pointer" }}>
                                        <div className="card border-0 rounded-0 shadow" onClick={() => setid()} style={{ width: "18rem" }}>
                                            <div className='d-flex align-items-center' style={{ fontSize: "18px" }}>
                                                <div type="button" data-bs-toggle="button" className="d-flex justify-content-center" style={{ width: "50%", fontWeight: "bold", color: "red", borderRight: "1px solid black" }} onClick={() => deleteItem(val?._id)}>Delete</div>
                                                <EditProduct className="d-flex justify-content-center" style={{ width: "50%" }} />
                                            </div>
                                            <NavLink to={`/productsdetails/${val._id}`} style={{ textDecoration: "none", color: "black" }}>
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
                                            </NavLink>
                                        </div>
                                    </div>
                                </>
                            )
                        })
                    }

                    {
                        isloader ? "" :
                            useritem?.length === 0 && <h1 className='d-flex justify-content-center mt-5' style={{ color: "red" }}> there is no more user products!</h1>
                    }
                </div>
            </div>
        </div>

    )
}

export default MyProduct

