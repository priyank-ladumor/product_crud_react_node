import { Outlet, Navigate } from 'react-router-dom'

const Protected = () => {

    let auth = localStorage.getItem("usertoken") || localStorage.getItem("username")

    return (
        <div>
            {auth?.length > 0  ? <Outlet /> : <Navigate to="/login" replace />}
        </div>
    )
}

export default Protected
