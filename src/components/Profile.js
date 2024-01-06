import React, { useEffect, useState, useContext } from 'react'
import "../style/profile.css"
import profilepic from "../images/profile_un.jpg"
import { loginContext } from '../App'
import axios from 'axios'
import { NavLink } from 'react-router-dom'
import UpdateProfile from './UpdateProfile'
import { useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';

const Profile = ({ settoggle }) => {
  const [loginuser, setloginuser] = useState("")
  let token = JSON.parse(localStorage.getItem("usertoken"))

  const fetchuser = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/user`, { headers: { Authorization: token } })
      setloginuser(res.data)
    } catch (err) {
      console.log(err);
    }
  }
  // const { userdata, setUserData, islogin, setislogin, logindata, setlogindata } = useContext(loginContext)

  useEffect(() => {
    fetchuser()
  }, [])

  useEffect(() => {
    settoggle(true)
  }, [])

  const { userupdated } = useSelector((state) => state.auth)

  useEffect(() => {
    if (userupdated) {
      fetchuser()
    }
  }, [userupdated])

  const user = localStorage.getItem('username')
  const email = localStorage.getItem('email')
  return (
    <div>
      <div className="container-fluid">
        <section className='row'>
          <div className='col-12 d-flex justify-content-center align-items-center' style={{ height: "91vh" }} >
            <div className="col col-lg-9 col-xl-8">
              <div className="" style={{ boxShadow: "rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px" }}>
                <div className=" text-white d-flex flex-row black-layer">
                  <div className="ms-3 ms-md-5 mt-5 d-flex flex-column page-1" style={{ width: "180px", height: "180px" }}>
                    {
                      loginuser?.user_pic?.length > 0 ?
                        <img src={loginuser?.user_pic[0]} alt="profile image" id='img-profile' className="img-thumbnail img-fluid mt-4 mb-2 img-size" />
                        :
                        <img src={profilepic} alt="profile image" id='img-profile' className="img-thumbnail img-fluid mt-4 mb-2 img-size" />
                    }
                  </div>
                  <div className="ms-3 text-locate">
                    <h5>Username:</h5>
                    <h5>{user || (loginuser?.firstname + loginuser?.lastname)}</h5>
                  </div>
                </div>
                <div className="d-flex mt-5 ms-3 ms-md-5">
                  <button type="button" className="btn btn-outline-dark mt-3" data-mdb-ripple-color="dark" data-bs-toggle="modal" data-bs-target="#exampleModal" style={{ zIndex: "1" }}>
                    Edit profile
                  </button>

                  <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Profile</h1>
                          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                          <UpdateProfile />
                        </div>
                      </div>
                    </div>
                  </div>

                  <NavLink to={`/user/reset-password/${loginuser?.id}/${token}`} className="btn btn-outline-dark ms-3 mt-3" style={{ zIndex: "1" }}>
                    Reset Password
                  </NavLink>

                </div>

                <div className="card-body px-3 px-md-5 text-black">
                  <div>
                    <p className="lead fw-normal mb-2 mt-3"><strong>Contact Details</strong></p>
                    <div className="p-3">
                      {
                        loginuser?.mobile &&
                        <p className="font-italic mb-1"><strong>Phone No :</strong> {loginuser?.mobile}</p>
                      }
                      <p className="font-italic mb-0"><strong>Email Id : </strong>{email || loginuser?.email}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <ToastContainer />
    </div>
  )
}

export default Profile
