import React from 'react'
import { FaRegUser, FaUser } from 'react-icons/fa'
import { GrUserNew } from 'react-icons/gr'
import { MdEmail } from 'react-icons/md'
import { RiLockPasswordFill } from 'react-icons/ri'
import { Link } from 'react-router-dom'

function Authentication({ authenticator }) {
    return (
        <>
            <div className='w-full h-screen bg-blue-100 flex justify-center items-center'>
                <div className='rounded-xl bg-white py-10 px-20 border-0 shadow-2xl shadow-blue-900'>
                    {authenticator ?
                        <div>
                            <div className='bg-blue-300 rounded-full p-5 flex justify-center items-center h-20 w-20 ms-22 shadow-lg shadow-gray-900'>
                                <FaRegUser className='text-5xl' />

                            </div>
                            <h1 className='text-3xl font-bold text-center mt-1'>Login</h1>
                            <p className='mt-2 font-medium'>Login to manage your students.</p>

                        </div>

                        :

                        <div>
                            <div className='bg-blue-300 rounded-full p-5 flex justify-center items-center h-20 w-20 ms-25 shadow-lg shadow-gray-900'>
                                <GrUserNew className='text-5xl' />

                            </div>
                            <h1 className='text-3xl font-bold text-center mt-1'>SignUp</h1>
                            <p className='mt-2 font-medium'>Register to manage your students.</p>

                        </div>
                    }

                    {authenticator ||
                        <div className='mt-5'>
                            <label htmlFor="">Username</label>
                            <div className='border-3 border-gray-400 flex justify-center items-center p-3 rounded-lg mt-3 focus-within:border-3 focus-within:border-blue-600 transition'>
                                <FaUser className='me-3' />
                                <input type="text" placeholder='Enter the Username' className='border-none outline-none placeholder-gray-500 font-medium' />
                            </div>
                        </div>
                    }

                    <div className='mt-5'>
                        <label htmlFor="">Email</label>
                        <div className='border-3 border-gray-400 flex justify-center items-center p-3 rounded-lg mt-3 focus-within:border-3 focus-within:border-blue-600 transition'>
                            <MdEmail className='me-3' />
                            <input type="email" placeholder='Enter your Email' className='border-none outline-none placeholder-gray-500 font-medium' />
                        </div>
                    </div>

                    <div className='mt-5'>
                        <label htmlFor="">Password</label>
                        <div className='border-3 border-gray-400 flex justify-center items-center p-3 rounded-lg mt-3 focus-within:border-3 focus-within:border-blue-500'>
                            <RiLockPasswordFill className='me-3' />
                            <input type="password" placeholder='Enter your Password' className='border-none outline-none placeholder-gray-500 font-medium' />
                        </div>

                    </div>

                    {authenticator ?
                        <div className='flex justify-center items-center w-full my-4'>
                            <button className='bg-blue-600 hover:bg-blue-900 p-2 font-semibold w-full rounded-lg text-white cursor-pointer'>Login</button>
                        </div>
                        :

                        <div className='flex justify-center items-center w-full my-4'>
                            <button className='bg-blue-600 hover:bg-blue-900 p-2 font-semibold w-full rounded-lg text-white cursor-pointer'>SignUp</button>
                        </div>
                    }

                    {authenticator &&
                        <div className=''>
                            <p>Alread have an account? <Link to={"/register"} className='text-blue-600 hover:text-blue-900 cursor-pointer font-medium'>Sign Up</Link></p>
                        </div>
                    }

                </div>

            </div>
        </>
    )
}

export default Authentication