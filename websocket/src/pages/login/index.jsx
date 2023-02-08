import React, { useState } from 'react'
import { useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import { LoginUser } from '../../apicalls/users'

const Login = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        email: '',
        password: ''
    })
    async function login(){
        console.log(user)
        try {
            const response = await LoginUser(user);
            if(response.success){
                toast.success(response.message);
                localStorage.setItem("token", response.data)
                window.location.href = "/"
            } else {
                toast.error(response.message);
            }
        } catch(error){
            toast.error(error.message);
        }
    }
    useEffect(()=>{
        if(localStorage.getItem("token")){
            navigate('/')
        }
    },[])
    return (
        <div className='h-screen bg-primary flex items-center justify-center'>
            <div className='bg-white shadow-md p-5 flex flex-col gap-5 w-96'>
                <h1 className='text-2xl uppercase font-semibold text-primary'>Login </h1> <hr />
                <input type='email' placeholder='Enter your email' value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
                <input type='password' placeholder='Enter your password' value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} />
                <button className='contained-btn' onClick={login}>Login</button>
                <Link to='/register'>
                    Don't have an account ? Register 
                </Link>
            </div>
        </div>
    )
}

export default Login;

