import React from 'react'
import { GiTeacher } from 'react-icons/gi'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <>
    <div className='w-full h-18 bg-blue-200 flex justify-start items-center'>
        <Link to={"/"} id='header' className='flex'><GiTeacher  className='text-3xl md:ms-18 ms-5'/><h1 className='font-bold text-xl ms-2'>StudentManager</h1></Link>
    </div>
    </>
  )
}

export default Header