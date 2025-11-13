import React, { useState } from 'react'
import { GiTeacher } from 'react-icons/gi'
import { Link } from 'react-router-dom'

function Header({logoutVisibility}) {
  return (
    <>
    <div className='w-full h-18 bg-blue-200 flex justify-between items-center'>
        <Link to={"/"} id='header' className='flex'><GiTeacher  className='text-3xl md:ms-18 ms-5'/><h1 className='font-bold text-xl ms-2'>StudentManager</h1></Link>

        {logoutVisibility&&
            <div className='me-10'>
            <button className='shadow px-3 py-2 bg-red-500 text-white font-medium rounded-lg hover:border-red-500 hover:bg-white hover:text-red-500 cursor-pointer transition'>Logout</button>
        </div>
        }
    </div>
    </>
  )
}

export default Header