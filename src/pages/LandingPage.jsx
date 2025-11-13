import React from 'react'
import Footer from '../components/Footer'
import { GiTeacher } from 'react-icons/gi'
import Counter from '../components/Counter'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'

function LandingPage() {

  const navigate = useNavigate()

  return (
    <>
    <Header/>
      <div className="grid lg:grid-cols-2 sm:grid-cols-1 py-8 pt-10 bg-gray-200 w-full">
        <div id="motiondiv1" className="flex justify-center items-center">
          <div className="max-w-md text-center sm:text-left">

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold ">
              Welcome to <span className="text-blue-900 text-4xl sm:text-5xl md:text-6xl mask-b-from-neutral-900">StudentManager</span>
            </h1>

            <p className="my-6 text-sm sm:text-sm md:text-lg text-gray-700">
              This web application efficiently manages student information with ease. Faculties can add, view, edit, and delete student records and search or filter them based on various criteria, making student data management faster and more organized.
            </p>

            <div className="flex justify-center lg:justify-start">
              <button
                onClick={() => navigate("/login")}
                className="border rounded-3xl py-3 px-6 font-bold bg-blue-600 text-white hover:bg-blue-800 hover:scale-105 transition cursor-pointer"
              >
                Get Started
              </button>
            </div>

          </div>
        </div>
        <div id="motiondiv2" className="flex justify-center items-center md:pt-0 pt-5">
          <GiTeacher className="text-[150px] sm:text-[180px] md:text-[220px] lg:text-[250px] rounded-4xl shadow-2xl hover:shadow-blue-900 hover:scale-105 transition p-6" />
        </div>


      </div>

      <Counter />

      <Footer />

    </>
  )
}

export default LandingPage