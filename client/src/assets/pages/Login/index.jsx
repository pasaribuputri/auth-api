import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [userSignIn, setUserSignIn] = useState({email : '',password: ''})
  const navigate = useNavigate()

  return (
      <div className="h-screen w-screen flex">
        <div className="hidden md:flex w-[55%] justify-center flex-col items-center text-white h-full bg-lime-950 opacity-80 ">
            <p className='text-2xl text-white font-bold'>Log in now and explore your world.</p>
            <p className='text-xl text-white italic'>Your profile awaits!</p>
        </div>
        <div className="w-full md:w-[45%] h-full flex flex-col justify-center items-center bg-white">
              <form className='md:w-1/2 flex flex-col' onSubmit={async(e)=> {
                e.preventDefault();
                try{
                  const response = await fetch("http://localhost:3000/api/login",{
                    method: "POST",
                    credentials: 'include',
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(userSignIn)
                  })
                  if(response.ok){
                    const data = await response.json();
                    alert(data.message)
                    setUserSignIn(data)
                    navigate("/")
                  }else{
                    const errorData = await response.json();
                    alert(errorData.message);
                  }
                }catch(error){
                  console.error("Error:", error);
                  alert("An error occurred. Please try again later.");
                }
                }}>
              <div className='mb-12 '>
                <p className='text-3xl text-center font-bold'>Welcome back!</p>
                <p className='text-base text-center'>Please enter your details</p>
              </div>
              <label >Email</label>
              <input type="email" required className='border-b border-black outline-none mb-4' onChange={(e)=> setUserSignIn({...userSignIn, email: e.target.value})}/>
              <label >Password</label>
              <input type="password" required  className='border-b  border-black outline-none ' onChange={(e)=> setUserSignIn({...userSignIn, password: e.target.value})}/>
              <button type='submit' className='mt-8 text-white rounded-full bg-lime-950 opacity-80 py-2 hover:opacity-60'>Sign In</button>
            </form>
              <div className='flex justify-center mt-4'>
                <p className='me-1'>Don't have an account?</p>
                <button type='button' className="text-lime-950i" onClick={()=> navigate("/register")}>Sign Up</button>
              </div>
        </div>
    </div>
  )
}

export default Login