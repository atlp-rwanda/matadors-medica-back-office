import Image from 'next/image';
import React from 'react';
import { FaApple, FaFacebook, FaGoogle } from 'react-icons/fa';
import Logo from '../assets/images/log.png'
import Navbar from '../components/navbar';


export default function Login() {
  return (
    <>
    <div className='bg-[#EEF4FF] p-8 '>
        <Navbar/>
 
    <div className=" flex items-center justify-center ">
       
      <div className=" w-full space-y-8 flex justify-center p-7 gap-6 ">
        <div className="text-center w-[50%]">
        <Image src={Logo} alt='logo'/>
         
        </div>
        <div className="flex flex-col  w-[50%] items-center">
        <h2 className="mt-6 text-3xl  font-extrabold text-gray-900 py-8">Let’s you in</h2>
          <button className="group relative w-full flex justify-center py-2 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 mb-4">
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
              <FaFacebook className="h-5 w-5 text-blue-500"  />
            </span>
            Continue with Facebook
          </button>
          <button className="group relative w-full flex justify-center py-2 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 mb-4">
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
              <FaGoogle className="h-5 w-5 text-green-400"  />
            </span>
            Continue with Google
          </button>
          <button className="group relative w-full flex justify-center py-2 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 mb-4">
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
              <FaApple className="h-5 w-5"  />
            </span>
            Continue with Apple
          </button>
          <div className="flex items-center w-full mb-4">
            <div className="w-full border-t border-gray-300"></div>
            <span className="mx-2 text-gray-500">or</span>
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <button className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 mb-4">
            Sign in with password
          </button>
          <div className="text-center text-gray-600">
          <span>Don’t have an account?</span>
          <a href="/loginForm" className="ml-2 text-blue-600 hover:text-blue-500">
            Sign up
          </a>
        </div>
        </div>
      
      </div>
    </div>
    </div>
  
    </>
   
  );
}
