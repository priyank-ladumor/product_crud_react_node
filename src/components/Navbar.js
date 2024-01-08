import React, { useEffect, useState, useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { CDropdownMenu, CDropdown, CDropdownToggle, CDropdownDivider } from '@coreui/react'
import { Logout } from '../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { loginContext } from '../App';
import { useDispatch, useSelector } from "react-redux";
import "../style/Navbar.css"
import { FaHeart } from "react-icons/fa";
import { CAvatar, CBadge } from '@coreui/react'
import axios from "axios";


const Navbar = () => {
    const { userdata, setUserData, islogin, setislogin, logindata, settoken, setlogindata } = useContext(loginContext)
    const { iswatchlater, getwatchlater } = useSelector((state) => state.product)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const logout = () => {
        localStorage.clear()
        dispatch(Logout())
        setislogin(false)
        settoken('')
        navigate('/login', { replace: true })
    }
    let auth = JSON.parse(localStorage.getItem("usertoken"))
    const fetchuser = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/user`, { headers: { Authorization: auth } })
            setFindLen(res.data)
        } catch (err) {
            console.log(err);
        }
    }
    const [findLen, setFindLen] = useState();

    useEffect(() => {
        if (auth) {
            fetchuser()
        }
    }, [])

    useEffect(() => {
        if (auth) {
            fetchuser()
        }
    }, [logindata, iswatchlater, getwatchlater])

    return (
        <div>
            <nav
                className="navbar navbar-expand-lg navbar-dark sticky-top border-bottom"
                style={{ background: "#0a2647" }}
            >
                <div className="container-fluid">
                    <NavLink
                        className="navbar-brand d-flex align-items-center nav-txt"
                        id="logotext"
                        to="./"
                    >
                        {/* <img src={logo} style={{ maxWidth: "140px" }} alt="logo" /> */}
                        <h3>Products</h3>
                    </NavLink>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mx-auto mb-2 mb-lg-0 ">
                            <li className="nav-item">
                                <NavLink className="nav-link nav-text" to="/products?page=1" style={({ isActive, isPending, isTransitioning }) => {
                                    return {
                                        fontWeight: isActive ? "bold" : "",
                                        color: isPending ? "red" : "white",
                                        viewTransitionName: isTransitioning ? "slide" : "",
                                    };
                                }}>
                                    <span
                                        data-bs-toggle="collapse"
                                        data-bs-target=".navbar-collapse.show"
                                    >
                                        Products
                                    </span>
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link nav-text" to="/add/product" style={({ isActive, isPending, isTransitioning }) => {
                                    return {
                                        fontWeight: isActive ? "bold" : "",
                                        color: isPending ? "red" : "white",
                                        viewTransitionName: isTransitioning ? "slide" : "",
                                    };
                                }}>
                                    <span
                                        data-bs-toggle="collapse"
                                        data-bs-target=".navbar-collapse.show"
                                    >
                                        Add Product
                                    </span>
                                </NavLink>
                            </li>
                        </ul>
                        {auth ?
                            <>
                                <div className="me-2">
                                    <NavLink to="/user/wishlist">
                                        <CAvatar color="secondary rounded-circle me-4" size="lg" style={{ cursor: "pointer" }}>
                                            <FaHeart style={{ fontSize: "38px", color: "white", position: "relative" }} className='p-2' />
                                            <CBadge color="danger" position="absolute" className='' shape="rounded-pill">
                                                {findLen && findLen.watchlater?.length}
                                            </CBadge>
                                        </CAvatar>
                                    </NavLink>
                                </div>
                                <CDropdown variant="btn-group" >
                                    <CDropdownToggle color={'primary'}>Profile</CDropdownToggle>
                                    <CDropdownMenu>
                                        <ul className='' style={{ listStyle: "none", fontSize: "18px", fontWeight: "600" }}>
                                            <li className='mb-2 d-hover'>
                                                <NavLink className="nav-link nav-text" to="/profile">
                                                    <span
                                                        data-bs-toggle="collapse"
                                                        data-bs-target=".navbar-collapse.show"
                                                    >
                                                        My Profile
                                                    </span>
                                                </NavLink>
                                            </li>
                                            <li className='d-hover'>
                                                <NavLink className="nav-link nav-text" to="/myproduct">
                                                    <span
                                                        data-bs-toggle="collapse"
                                                        data-bs-target=".navbar-collapse.show"
                                                    >
                                                        My Product
                                                    </span>
                                                </NavLink>
                                            </li>
                                        </ul>
                                        <CDropdownDivider />
                                        <div className='d-flex justify-content-center'>
                                            <button className='btn btn-danger' onClick={logout}>logout</button>
                                        </div>
                                    </CDropdownMenu>
                                </CDropdown>
                            </>
                            :
                            <NavLink className="nav-link px-3" to="/login"><button className='btn btn-primary'>Login</button></NavLink>
                        }
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
