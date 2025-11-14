import React, { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { FaFilter, FaSearch, FaSort } from 'react-icons/fa'
import { PiStudentBold } from 'react-icons/pi'
import { MdPersonAddAlt1 } from 'react-icons/md'

function HomePage() {
  const [logoutVisibility, setLogoutVisibility] = useState(true)
  return (
    <>
      <Header logoutVisibility={logoutVisibility} />

      <div className='bg-white'>
        <div className='flex justify-between p-5 md:ps-10 md:pe-10'>
          <div>
            <h1 className='font-bold md:text-3xl'>StudentManagement Dashboard</h1>
            <h2 className='md:text-lg'>Manage Your Students Effectively</h2>
          </div>
          <h1 className='md:text-4xl font-extrabold'>Welcome <span>Alice</span>...!</h1>

        </div>

        {/* Search and filter navbar */}
        <div className='md:px-10 p-5 '>
          <div className='grid md:grid-cols-4 grid-cols-1 md:gap-10 px-4 py-5 rounded shadow-lg'>
            <div className=' p-4 shadow rounded bg-gray-20 hover:scale-102 hover:shadow-blue-500 hover:shadow-lg transition'>
              <div className='flex items-center gap-2'>
                <FaSearch />
                <p className='font-semibold text-gray-700'>Search Students</p>

              </div>
              <div className='flex items-center'>
                <div className='flex justify-between items-center rounded border-2 border-gray-500 p-1 focus-within: focus-within:shadow focus-within:border-blue-600 mt-1'>
                  <input type="text" placeholder='Search by student name...' className='border-none outline-none w-full focus:border' />

                </div>
                <div className='flex justify-center items-center border h-9 rounded w-9 mt-1 bg-blue-300 cursor-pointer'><FaSearch /></div>
              </div>

            </div>
            <div className=' p-4 shadow rounded bg-gray-20 hover:scale-102 hover:shadow-blue-500 hover:shadow-lg transition'>
              <div className='flex items-center gap-2'>
                <FaFilter />
                <p className='font-semibold text-gray-700'>Filter</p>

              </div>
              <div className='flex justify-between items-center rounded border-2 border-gray-500 p-1 focus-within: focus-within:shadow focus-within:border-blue-600 mt-1'>

                <select className='border-none outline-none w-full focus:border' name="" id="">
                  <option aria-readonly value="">Filter students by</option>
                  <option value="">Class</option>
                  <option value="">Gender</option>
                  <option value="">EHS Students</option>
                  <option value="">Non-EHS Students</option>
                </select>
              </div>

            </div>
            <div className=' p-4 shadow rounded bg-gray-20 hover:scale-102 hover:shadow-blue-500 hover:shadow-lg transition'>
              <div className='flex items-center gap-2'>
                <FaSort />
                <p className='font-semibold text-gray-700'>Sort</p>

              </div>
              <div className='flex justify-between items-center rounded border-2 border-gray-500 p-1 focus-within: focus-within:shadow focus-within:border-blue-600 mt-1'>

                <select className='border-none outline-none w-full focus:border' name="" id="">
                  <option aria-readonly value="">Sort students by</option>
                  <option value="">Name : A → Z</option>
                  <option value="">Name : Z → A</option>
                  <option value="">CGPA : High → Low</option>
                  <option value="">CGPA : Low → High</option>
                  <option value="">Attendace Percentage : High → Low</option>
                  <option value="">Attendace Percentage : Low → High</option>
                </select>
              </div>

            </div>
            <div className=' p-4 shadow rounded bg-gray-20 hover:scale-102 hover:shadow-blue-500 hover:shadow-lg transition'>
              <div className='flex items-center gap-1'>
                <PiStudentBold />
                <p className='font-semibold text-gray-700'>Total Students</p>

              </div>
              <div className='flex justify-between items-center mt-1'>
                <p className='font-bold text-2xl ms-5 text-blue-900'>100</p>

              </div>

            </div>
          </div>


        </div >

        {/* add student */}
        <div className='md:px-10 p-5 gap-10'>
          <div className='grid md:grid-cols-4 grid-cols-1'>
            <div className='flex justify-center items-center text-center shadow-2xl hover:scale-102 hover:shadow-blue-700 hover:shadow-lg px-5 py-10 rounded bg-linear-to-tl from-blue-400 to-green-200 transition cursor-pointer'>
              <div className=''>
                <div className='bg-linear-to-tl from-blue-600 to-blue-100 rounded-full w-23 p-2 ms-25 mb-2'>
                  <MdPersonAddAlt1 className='text-[75px] ms-1.5 p-1' />
                </div>
                <p className='font-semibold'>Add New Student</p>
                <p>Manage student details after adding</p>
              </div>
            </div>


          </div>
        </div>


        {/* list of students */}
        <div className='md:px-10 p-5 gap-10'>
          <div className='grid md:grid-cols-2 grid-cols-1 gap-10'>
            {/* student card */}
            <div className='md:mt-0 mt-2 bg-blue-200 rounded-lg shadow hover:shadow-lg hover:shadow-blue-700 hover:scale-102 transition'>
              {/* outer */}
              <div className=''>
                <div className='flex justify-between items-center gap-2 md:mt-15'>
                  <div className='bg-blue-400 w-[150px] md:w-[100px] h-[100px] rounded-full flex justify-center items-center p-1 md:ms-20 md:mt-5'>
                    <img className='w-full h-full object-cover' width={"100px"} height={"100px"} style={{ borderRadius: "50%" }} src="https://www.corporatephotographerslondon.com/wp-content/uploads/2022/02/FRA-1699dark-sq.jpg" alt="" />
                  </div>
                  <div className='grid md:gap-1 gap-1 md:me-20'>
                    <div className='bg-gray-200 p-2'>
                      <p className='font-semibold'>Student Name : <span className='font-normal'>Antoine Green</span></p>

                    </div>
                    <div className='grid md:grid grid-cols-2 md:gap-2 gap-1 '>
                      <div className='bg-gray-200 md:mt-1 text-center p-2'>
                        <p className='font-semibold'>Date of Birth : <span className='font-normal'>22/09/1997</span></p>
                      </div>
                      <div className='bg-gray-200 md:mt-1 flex justify-center items-center p-2'>
                        <p className='font-semibold'>Gender : <span className='font-normal'>Male</span></p>
                      </div>

                    </div>
                  </div>

                </div>
                {/* second div */}
                <div className='flex justify-between items-center md:gap-2 gap-1 mt-1'>
                  <div className='bg-gray-200 md:mt-1 flex justify-center items-center p-2 md:ms-20 md:w-full w-1/2'>
                    <p className='font-semibold'>Attendence Percentage : <span className='font-normal'>98</span></p>
                  </div>
                  <div className='bg-gray-200 md:mt-1 flex justify-center items-center md:p-2 py-5  w-1/3'>
                    <p className='font-semibold'>Class : <span className='font-normal'>10 B</span></p>
                  </div>
                  <div className='bg-gray-200 md:mt-1 flex justify-center items-center md:p-2 py-5 md:me-20  w-1/3'>
                    <p className='font-semibold'>GPA : <span className='font-normal'>9</span></p>
                  </div>

                </div>

                {/* third div (table) */}
                <div className='flex justify-between items-center md:gap-2 gap-1 md:mt-5 mt-2 md:mx-20'>
                  <table className="min-w-full bg-white rounded-lg shadow-lg overflow-hidden border border-gray-300">
                    <thead>
                      <tr className="bg-linear-to-r from-blue-400 to-blue-50 border-b">
                        <th className="py-4 px-6 text-left font-bold text-gray-700 uppercase tracking-wide">
                          Subject Name
                        </th>
                        <th className="py-4 px-6 text-left font-bold text-gray-700 uppercase tracking-wide">
                          Marks Obtained
                        </th>
                        <th className="py-4 px-6 text-left font-bold text-gray-700 uppercase tracking-wide">
                          Maximum Marks
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr className="border-b hover:bg-blue-50 transition">
                        <td className="py-3 px-6 font-medium text-gray-800">English</td>
                        <td className="py-3 px-6">
                          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-semibold text-sm">95</span>
                        </td>
                        <td className="py-3 px-6 text-gray-700">100</td>
                      </tr>

                      <tr className="border-b hover:bg-blue-50 transition">
                        <td className="py-3 px-6 font-medium text-gray-800">Physics</td>
                        <td className="py-3 px-6">
                          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-semibold text-sm">75</span>
                        </td>
                        <td className="py-3 px-6 text-gray-700">100</td>
                      </tr>

                      <tr className="border-b hover:bg-blue-50 transition">
                        <td className="py-3 px-6 font-medium text-gray-800">Maths</td>
                        <td className="py-3 px-6">
                          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-semibold text-sm">70</span>
                        </td>
                        <td className="py-3 px-6 text-gray-700">100</td>
                      </tr>

                      <tr className="border-b hover:bg-blue-50 transition">
                        <td className="py-3 px-6 font-medium text-gray-800">Hindi</td>
                        <td className="py-3 px-6">
                          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-semibold text-sm">100</span>
                        </td>
                        <td className="py-3 px-6 text-gray-700">100</td>
                      </tr>

                      <tr className="border-b hover:bg-blue-50 transition">
                        <td className="py-3 px-6 font-medium text-gray-800">General Knowledge</td>
                        <td className="py-3 px-6">
                          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-semibold text-sm">95</span>
                        </td>
                        <td className="py-3 px-6 text-gray-700">100</td>
                      </tr>

                      <tr className="border-b hover:bg-blue-50 transition">
                        <td className="py-3 px-6 font-medium text-gray-800">Chemistry</td>
                        <td className="py-3 px-6">
                          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-semibold text-sm">85</span>
                        </td>
                        <td className="py-3 px-6 text-gray-700">100</td>
                      </tr>

                      <tr className="border-b hover:bg-blue-50 transition">
                        <td className="py-3 px-6 font-medium text-gray-800">Biology</td>
                        <td className="py-3 px-6">
                          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-semibold text-sm">89</span>
                        </td>
                        <td className="py-3 px-6 text-gray-700">100</td>
                      </tr>

                      <tr className="hover:bg-blue-50 transition">
                        <td className="py-3 px-6 font-medium text-gray-800">Social Science</td>
                        <td className="py-3 px-6">
                          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-semibold text-sm">92</span>
                        </td>
                        <td className="py-3 px-6 text-gray-700">100</td>
                      </tr>
                    </tbody>
                  </table>


                </div>

                {/* fourth div */}
                <div className='flex justify-between items-center md:gap-2 gap-1 md:mt-5 mt-2 md:mx-20 '>
                  <div className='bg-gray-200 md:mt-1 flex justify-center items-center md:p-2 py-5 w-full'>
                    <p className='font-semibold'>Remarks : <span className='font-normal'>EHS</span></p>
                  </div>
                  <div className='bg-gray-200 md:mt-1 flex justify-center items-center md:p-2 py-5 w-full'>
                    <p className='font-semibold'>Status : <span className='font-normal'>Passed</span></p>
                  </div>

                </div>

                {/* buttons */}
                <div className='flex justify-end md:me-20 gap-5 mb-15 mt-5'>
                  <button className='bg-yellow-300 font-semibold px-4 py-1 text-white rounded hover:bg-yellow-500 transition cursor-pointer'>Edit</button>
                  <button className='bg-red-500 font-semibold px-4 py-1 text-white rounded hover:bg-red-700 transition cursor-pointer'>Delete</button>
                </div>


              </div>

            </div>
            

          </div>

        </div>




      </div >

      <Footer />

    </>
  )
}

export default HomePage