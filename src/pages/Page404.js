import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'

const Page404 = ({ settoggle }) => {
    useEffect(() => {
        settoggle(false)
    }, [])
    return (
        <div>
            <div style={{ color: "red", display: "flex", justifyContent: "center", alignItems: "center", height: "450px" }}>
                <h1 style={{ color: "red", display: "flex", justifyContent: "center", alignItems: "center", height: "" }}>Page 404</h1>
            </div>
            <div style={{ color: "red", display: "flex", justifyContent: "center", alignItems: "center", height: "" }}>
            <NavLink to="/products?page=1">go back to home </NavLink>
            </div>

        </div>
    )
}

export default Page404
