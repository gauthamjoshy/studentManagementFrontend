import React from 'react'
import Footer from '../components/Footer'
import { GiTeacher } from 'react-icons/gi'
import Counter from '../components/Counter'
import { useNavigate } from 'react-router-dom'

function LandingPage() {

  const navigate = useNavigate()

  return (
    <>

      <div className='grid lg:grid-cols-2 sm:grid-cols-1 px-30 p-25 bg-gray-200'>
        <div className='flex justify-center items-center'>
          <div className=''>
            <h1 className='text-5xl text-wrap font-extrabold '>Welcome to <span className='text-blue-900 text-6xl mask-t-from-neutral-950'>StudentManager</span></h1>
            <p className='my-10 '>This web application efficiently manages student information with ease. Faculties can add, view, edit, and delete student records and search or filter them based on various criteria, making student data management faster and more organized.</p>
            <button onClick={()=>navigate("/login")} className='border rounded-3xl py-3 px-4 font-bold bg-blue-600 text-white hover:bg-blue-800 hover:scale-110 transition cursor-pointer'>Get Started</button>

          </div>
        </div>
        <div className='flex justify-center items-center'>
          <GiTeacher className='text-[250px] rounded-4xl shadow-2xl hover:shadow-blue-900 hover:scale-110 transition p-11 sm-xs:mt-10' />

        </div>

      </div>

      <Counter/>

      <Footer />
    </>
  )
}

export default LandingPage