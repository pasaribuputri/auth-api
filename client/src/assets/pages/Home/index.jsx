import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [profile, setProfile] = useState([]);
  const [isLogged, setIsLogged] = useState(false)
  const navigate = useNavigate()
  
  useEffect(() => {
    fetch("http://localhost:3000/api/profile", {
      method: "GET",
      credentials: "include"
    })
      .then((response) => response.json())
      .then((data) => {
        setProfile(data);
        setIsLogged(!!data.data)
    })
  }, []);

  return (
    <div className=" h-screen flex flex-col justify-center items-center">
      <div className="bg-white rounded-lg shadow-xl p-10 max-w-md w-full text-center">
        {profile.data ? (
            <div>
              <h1 className="text-3xl font-bold text-lime-950 mb-4">Welcome Back, it's your profile!</h1>
            <p className="text-xl font-semibold">{`Hello, ${profile.data.full_name}!`}</p>
            <div className='pt-4 pb-4'>
                <p className='italic'>{`Your email: ${profile.data.email}`}</p>
                <p className='italic'>{`Your gender: ${profile.data.jenis_kelamin}`}</p>
            </div>
            <p className="">{`Get ready for your next journey, ${profile.data.full_name}!`}</p>
            <div className='flex items-center justify-center'>
                <button type='button' className='mt-8 h-10 w-20 text-white rounded-full flex justify-center items-center bg-lime-950 opacity-80 py-2 hover:opacity-60' onClick={()=>{
                    if(window.confirm("Apakah anda yakin ingin keluar?")){
                        fetch("http://localhost:3000/api/logout",{
                            method: "GET",
                            credentials: "include"
                        })
                        .then((response)=> response.json())
                        .then((res)=> {
                            alert(res.message);
                            navigate("/")
                        })
                    }
                }}>Logout</button>
            </div>
          </div>
        ) : (
          <div>
            <h1 className="text-3xl font-bold text-lime-950 mb-4">Welcome to Your Profile!</h1>
            <p className='text-xl'>You need to <button onClick={()=> navigate("/")} className='font-bold text-lime-950'>LOGIN</button> to acces your profile.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
