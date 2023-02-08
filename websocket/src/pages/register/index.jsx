import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import { RegisterUser } from '../../apicalls/users'

const Register = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        name: "",
        email: '',
        password: ''
    })
    async function register(){
        console.log(user)
        try {
            const response = await RegisterUser(user);
            if(response.success){
                toast.success(response.message);
            } else {
                toast.error(response.message);
            }
        } catch(error){
            toast.error(error.message);
        }
    }
    useEffect(()=>{
        if(localStorage.getItem("token")){
            navigate('/');
        }
    },[])
    return (
        <div className='h-screen bg-primary flex items-center justify-center'>
            <div className='bg-white shadow-md p-5 flex flex-col gap-5 w-96'>
                <h1 className='text-2xl uppercase font-semibold text-primary'>Register  </h1> <hr />
                <input type='text' placeholder='Enter your name' value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} />
                <input type='email' placeholder='Enter your email' value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
                <input type='password' placeholder='Enter your password' value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} />
                <button className='contained-btn' onClick={register}>Register</button>
                <Link to='/login'>
                    Already have an account ? Login
                </Link>
            </div>

        </div>
    )
}

export default Register

