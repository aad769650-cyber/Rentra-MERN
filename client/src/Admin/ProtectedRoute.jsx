import React, { useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';

const ProtectedRoute = ({children}) => {


    const isAuth=localStorage.getItem("isAuthenticate")
const navigate=useNavigate()
    console.log("isAuth",isAuth);



// useEffect(()=>{
        if(!isAuth){
        return <Navigate to={"/adminLogin"}></Navigate>
    // }})

        }else{
            return children
        }
}

export default ProtectedRoute