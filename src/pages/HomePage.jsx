import React, { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

function HomePage() {
      const [logoutVisibility, setLogoutVisibility] = useState(true)
  return (
    <>
  <Header logoutVisibility = {logoutVisibility}/>

    <div className='bg-gray-200'>
      <div className='flex justify-between p-5 md:ps-10 md:pe-10'>
        <div>
          <h1 className='font-bold md:text-3xl'>StudentManagement Dashboard</h1>
          <h2 className='md:text-lg'>Manage Your Students Effectively</h2>
        </div>
        <h1 className='md:text-4xl font-extrabold'>Welcome <span>Alice</span>...!</h1>

      </div>

    </div>

    <Footer/>
    
    </>
  )
}

export default HomePage