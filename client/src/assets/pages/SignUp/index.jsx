import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SignUp = () => {
  const [userSignUp, setUserSignUp] = useState({full_name: '', email: '',jenis_kelamin: 'laki-laki',password : '',confirmPassword: ''})
  const navigate = useNavigate()


   const saveData = (payload) => {
    if(payload.password !== payload.confirmPassword){
        alert("Password dan konfirmasi password harus sama")
        return;
    }
    fetch("http://localhost:3000/api/register",{
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then((response)=> response.json())
    .then((res)=> {
      alert(res.message);
      navigate("/auth")
    }).catch((err)=>{
        console.log("Error: " ,err);
        alert("Terjadi kesalahan. Silakan coba lagi nanti.")
    })
  }

  return (
      <div className="h-screen w-screen flex">
        <div className="hidden md:flex w-[55%] justify-center flex-col items-center text-white h-full bg-lime-950 opacity-80 ">
          <p className='text-2xl text-white font-bold'>Sign Up now and explore your world.</p>
          <p className='text-xl text-white italic'>Your profile awaits!</p>
        </div>
        <div className="w-full md:w-[45%] h-full flex flex-col justify-center items-center bg-white">         
              <form className='md:w-1/2 flex flex-col' onSubmit={(e)=> {
                e.preventDefault();
                saveData(userSignUp)
              }}>
                <div className='mb-12 '>
                  <p className='text-3xl text-center font-bold'>Create Account</p>
                  <p className='text-base text-center'>Please enter your details</p>
                </div>
                <label htmlFor="">Nama Lengkap</label>
                <input type="text" required className='border-b border-black outline-none mb-4' onChange={(e)=> setUserSignUp({...userSignUp, full_name: e.target.value})}/>
                <label htmlFor="">Email</label>
                <input type="email" required className='border-b  border-black outline-none mb-4' onChange={(e)=> setUserSignUp({...userSignUp, email: e.target.value})}/>
                <label htmlFor="">Jenis Kelamin</label>
                <select value={userSignUp.jenis_kelamin} onChange={(e)=> setUserSignUp({...userSignUp, jenis_kelamin: e.target.value})} className='border-b border-black outline-none mb-4 p-2 rounded-md'>
                    <option value="laki-laki">Laki-Laki</option>
                    <option value="perempuan">Perempuan</option>
                </select>
                <label htmlFor="">Password</label>
                <input type="password" required className='border-b border-black outline-none mb-4' onChange={(e)=> setUserSignUp({...userSignUp, password: e.target.value})}/>
                <label htmlFor="">Konfirmasi Password</label>
                <input type="password" required  className='border-b  border-black outline-none mb-4' onChange={(e)=> setUserSignUp({...userSignUp, confirmPassword: e.target.value})}/>
                <button className='mt-8 text-white rounded-full bg-lime-950 opacity-80 py-2 hover:opacity-60'>Sign Up</button>
              </form>
                <div className='flex justify-center mt-4'>
                  <p className='me-1'>Have an account?</p>
                  <button type='button' className="text-lime-950" onClick={()=> navigate("/auth")}>Sign In</button>
                </div>
        </div>
    </div>
  )
}

export default SignUp