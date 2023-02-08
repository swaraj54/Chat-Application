import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'
import { GetCurrentUser } from '../apicalls/users'

const ProtectedRoutes = ({children}) => {
    const [user, setUser] = useState();
    const navigate = useNavigate();
    const getCurrentUser = async () =>{
        try{
            const response = await GetCurrentUser();
            if(response.success){
                setUser(response.data) 
            } else {
                toast.error(response.message)
                navigate("/login")
            }

        }catch(error){
            toast.error(error.message)
            navigate("/login")
        }
    }

    useEffect(()=>{
        if(localStorage.getItem("token")){
            getCurrentUser();
        }
    },[])
  return (
    <div>{children}</div>
  )
}

export default ProtectedRoutes