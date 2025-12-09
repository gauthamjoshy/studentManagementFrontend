import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { FaFilter, FaSearch, FaSort, FaWindowClose } from 'react-icons/fa'
import { PiStudentBold } from 'react-icons/pi'
import { MdPersonAddAlt1 } from 'react-icons/md'
import { CiImageOn } from 'react-icons/ci'
import { addStudentAPI, deleteStudentAPI, editStudentAPI, getAllStudentsAPI } from '../../service/allAPI'
import Swal from 'sweetalert2'

function HomePage() {
  const [logoutVisibility, setLogoutVisibility] = useState(true)

  const [addStudent, setAddStudent] = useState(false)

  const [editStudent, setEditStudent] = useState(false)

  // logic part

  // state for storing fetched students data
  const [viewAllStudents, setViewAllStudents] = useState([])

  // for searching
  // const [searchStudent, setSearchStudent] = useState([])
  const [userInput, setUserInput] = useState("")

  // for remarks
  // const [studentRemarks, setStudentRemarks] = useState("")
  // const [filteredStudents, setFilteredStudents] = useState({})

  const [displayStudent, setDisplayStudent] = useState([])


  //add student
  const [addNewStudent, setAddNewStudent] = useState({
    image: "",
    name: "",
    dob: "",
    gender: "",
    attendance: "",
    class: "",
    gpa: "",
    remarks: "",
    status: "",
    marks: {
      english: "",
      physics: "",
      maths: "",
      hindi: "",
      gk: "",
      chemistry: "",
      biology: "",
      ss: ""
    }
  })

  console.log(addNewStudent);

  //  handle image
  const handleImage = (e) => {
    const file = e.target.files[0]
    const validTypes = ['image/png', 'image/jpg', 'image/jpeg']
    if (file) {
      if (!validTypes.includes(file.type)) {
        Swal.fire({
          title: "Please Select an image of file type png/jpg/jpeg ...!",
          icon: "warning"
        });
      } else {
        const reader = new FileReader()
        reader.onloadend = () => {
          // console.log(reader.result);

          setAddNewStudent({ ...addNewStudent, image: reader.result })

        }
        reader.readAsDataURL(file)
      }
    }
  }

  //  handle add student
  const handleSubmit = async () => {
    if (!addNewStudent.name || !addNewStudent.class || !addNewStudent.dob || !addNewStudent.gender) {
      Swal.fire({
        title: "Please Fill The Required Fields",
        icon: "warning"
      });
    } else {
      try {
        const result = await addStudentAPI(addNewStudent)
        if (result.status >= 200 && result.status < 300) {
          Swal.fire({
            title: "Student added successfully",
            icon: "success"
          });
          setAddNewStudent({
            image: "",
    name: "",
    dob: "",
    gender: "",
    attendance: "",
    class: "",
    gpa: "",
    remarks: "",
    status: "",
    marks: {
      english: "",
      physics: "",
      maths: "",
      hindi: "",
      gk: "",
      chemistry: "",
      biology: "",
      ss: ""
          }})
          getAllStudents()
          setAddStudent(false)
        } else {
          Swal.fire({
            title: "Adding student failed",
            icon: "error"
          });
        }
      } catch (error) {
        Swal.fire({
          title: "Adding student failed",
          icon: "error"
        });
      }
    }
  }

  // get students

  const getAllStudents = async () => {
    try {
      const result = await getAllStudentsAPI()
      console.log(result);
      setViewAllStudents(result.data)

    } catch (error) {
      Swal.fire({
        title: "Error fetching student data",
        icon: "error"
      });
    }
  }



  // edit student

  // state for storing getdata for editing
  const [currentEditStudent, setCurrentEditStudent] = useState({})

  const studentEditNow = (studentData) => {
    setCurrentEditStudent(studentData)
    // open modal
    setEditStudent(true)
    console.log(studentData);


  }
  // saving updated data
  const saveEditedStudent = async () => {
    try {
      const result = await editStudentAPI(currentEditStudent, currentEditStudent.id)
      setCurrentEditStudent(result.data)
      getAllStudents()
      Swal.fire({
        title: "Student updated successfully",
        icon: "success"
      });


      setEditStudent(false)
    } catch (error) {
      Swal.fire({
        title: "Error saving data",
        icon: "error"
      });
    }
  }


  // delete student
  // const deleteStudent = async (id) => {
  //   try {
  //     const result = await deleteStudentAPI(id)
  //     alert(`Student deleted successfully`)

  //     console.log(result);
  //     getAllStudents()

  //   } catch (error) {
  //     alert(`Error deleting student`)
  //   }
  // }
  const deleteStudent = async (id) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Delete"
      }).then(async (result) => {
        if (result.isConfirmed) {

          const response = await deleteStudentAPI(id);

          Swal.fire({
            title: "Deleted!",
            text: "The student has been removed.",
            icon: "success"
          });

          console.log(response);
          getAllStudents();
        }
      });

    } catch (error) {
      alert("Error deleting student");
    }
  };



  // SEARCH

  useEffect(() => {
    if (userInput) {
      const result = viewAllStudents.filter((stud) => (
        stud.name.toLowerCase().includes(userInput.toLowerCase())

      ))
      console.log(result);
      // setViewAllStudents(result.data)
      setDisplayStudent(result)
    } else {
      // setViewAllStudents(viewAllStudents)
      setDisplayStudent(viewAllStudents)
    }
  }, [userInput, viewAllStudents])


  // filter
  const checkEHS = (event) => {
    if (event == "EHS") {
      const result = viewAllStudents.filter((stud) => (
        stud.remarks == "EHS"
      ))
      setDisplayStudent(result)
    } else if (event == "NON-EHS") {
      const result = viewAllStudents.filter((stud) => (
        stud.remarks == "NON-EHS"
      ))
      setDisplayStudent(result)
    } else {
      setDisplayStudent(viewAllStudents)
    }


  }

  // sort
  const handleSort = (event) => {
    if (event == 'A → Z') {
      const result1 = [...viewAllStudents].sort((stud1, stud2) => (stud1.name.localeCompare(stud2.name)))
      console.log(result1);
      setDisplayStudent(result1)

    } else if (event == 'Z → A') {
      const result = [...viewAllStudents].sort((stud1, stud2) => (stud2.name.localeCompare(stud1.name)))
      console.log(result);
      setDisplayStudent(result)

    } else if (event == 'High → Low') {
      const result = [...viewAllStudents].sort((stud1, stud2) => (stud2.gpa - stud1.gpa))
      console.log(result);
      setDisplayStudent(result)

    } else {
      const result = [...viewAllStudents].sort((stud1, stud2) => (stud1.gpa - stud2.gpa))
      console.log(result);
      setDisplayStudent(result)

    }
  }



  // sort
  // useEffect(() => {
  //   if (studentRemarks) {
  //     const result = viewAllStudents.sort((stud1, stud1) => stud1 - stud1)
  //     setDisplayStudent(result)
  //   } else {
  //     setDisplayStudent(viewAllStudents)
  //   }
  // }, [studentRemarks, viewAllStudents])



  useEffect(() => {
    getAllStudents()
  }, [])


  // const [loggedInUser, setLoggedInUser] = useState()
  // useEffect(()=>{
  //   const user = JSON.parse(localStorage.getItem("currentUser"))
  //   setLoggedInUser(user)
  // },[])


  return (
    <>
      <Header logoutVisibility={logoutVisibility} />

      <div className='bg-white mb-20'>
        <div className='flex justify-between p-5 md:ps-10 md:pe-10'>
          <div>
            <h1 className='font-bold md:text-3xl'>StudentManagement Dashboard</h1>
            <h2 className='md:text-lg'>Manage Your Students Effectively</h2>
          </div>
          <h1 className='md:text-4xl font-extrabold'>Welcome</h1>

        </div>

        {/* Search and filter navbar */}
        <div className='md:px-10 p-5 '>
          <div className=' grid md:grid-cols-4 grid-cols-1 md:gap-10 p-8 rounded shadow-lg shadow-blue-500'>
            <div className=' p-4 rounded bg-gray-20 hover:scale-101 shadow-blue-500 shadow-lg transition'>
              <div className='flex items-center gap-2'>
                <FaSearch />
                <p className='font-semibold text-gray-700'>Search Students</p>

              </div>
              {/* <div className='flex items-center'> */}
              <div className='flex justify-between items-center rounded border-2 border-gray-500 p-1 focus-within: focus-within:shadow focus-within:border-blue-600 mt-1'>
                <input type="text" value={userInput} onChange={(e) => setUserInput(e.target.value)} placeholder='Search by student name...' className='border-none outline-none w-full focus:border' />

              </div>
              {/* <div className='flex justify-center items-center border h-9 rounded w-9 mt-1 bg-blue-300 cursor-pointer'><FaSearch /></div> */}
              {/* </div> */}

            </div>
            <div className=' p-4 rounded bg-gray-20 hover:scale-101 shadow-blue-500 shadow-lg transition'>              <div className='flex items-center gap-2'>
              <FaFilter />
              <p className='font-semibold text-gray-700'>Filter</p>

            </div>
              <div className='flex justify-between items-center rounded border-2 border-gray-500 p-1 focus-within: focus-within:shadow focus-within:border-blue-600 mt-1'>

                <select onChange={(e) => checkEHS(e.target.value)} className='border-none outline-none w-full focus:border' name="" id="">
                  <option aria-readonly value="">Filter students by</option>
                  <option value="EHS" >EHS Students</option>
                  <option value="NON-EHS">Non-EHS Students</option>
                </select>
              </div>

            </div>
            <div className=' p-4 rounded bg-gray-20 hover:scale-101 shadow-blue-500 shadow-lg transition'>              <div className='flex items-center gap-2'>
              <FaSort />
              <p className='font-semibold text-gray-700'>Sort</p>

            </div>
              <div className='flex justify-between items-center rounded border-2 border-gray-500 p-1 focus-within: focus-within:shadow focus-within:border-blue-600 mt-1'>

                <select onChange={(e) => handleSort(e.target.value)} className='border-none outline-none w-full focus:border' name="" id="">
                  <option aria-readonly value="">Sort students by</option>
                  <option value="A → Z">Name : A → Z</option>
                  <option value="Z → A">Name : Z → A</option>
                  <option value="High → Low">CGPA : High → Low</option>
                  <option value="Low → High">CGPA : Low → High</option>
                  {/* <option value="High → Low">Attendace Percentage : High → Low</option>
                  <option value="Low → High">Attendace Percentage : Low → High</option> */}
                </select>
              </div>

            </div>
            <div className=' p-4 shadow rounded bg-gray-20 hover:scale-102 hover:shadow-blue-500 hover:shadow-lg transition'>
              <div className='flex items-center gap-1'>
                <PiStudentBold />
                <p className='font-semibold text-gray-700'>Total Students</p>

              </div>
              <div className='flex justify-between items-center mt-1'>
                <p className='font-bold text-2xl ms-5 text-blue-900'>{viewAllStudents.length}</p>

              </div>

            </div>
          </div>


        </div >

        {/* add student */}
        <div className='md:px-10 p-5 gap-10'>
          <div className='grid md:grid-cols-4 grid-cols-1'>
            <div className='flex justify-center items-center text-center shadow-2xl hover:scale-102 hover:shadow-blue-700 hover:shadow-lg px-5 py-10 rounded bg-linear-to-tl from-blue-400 to-green-200 transition cursor-pointer'>
              <div onClick={() => setAddStudent(true)} className=''>
                <div className='bg-linear-to-tl from-blue-600 to-blue-100 rounded-full w-23 p-2 ms-25 mb-2'>
                  <MdPersonAddAlt1 className='text-[75px] ms-1.5 p-1' />
                </div>
                <p className='font-semibold'>Add New Student</p>
                <p>Manage student details after adding</p>
              </div>
            </div>


          </div>
        </div>

        {/* add student modal */}
        {addStudent &&
          <div className='relative z-10 '>
            <div className='bg-gray-200/75 fixed inset-0 overflow-y-auto'>
              <div className='flex justify-center items-center min-h-screen '>
                <div className='flex justify-center items-center'>
                  <div className='w-150 h-150 bg-blue-100 rounded-lg shadow-2xl px-20 pt-10 pb-20 overflow-y-auto'>

                    <div className='flex justify-between items-center my-5'>
                      <h1 className='ms-25 text-2xl font-semibold '>Add a New Student</h1>
                      <FaWindowClose onClick={() => setAddStudent(!addStudent)} className='text-2xl text-red-500 cursor-pointer' />
                    </div>

                    <div className='my-2'>
                      <label htmlFor="" className='text-lg font-medium'>Student Name</label>
                      <div>
                        <input value={addNewStudent.name} onChange={(e) => setAddNewStudent({ ...addNewStudent, name: e.target.value })} type="text" className='mt-2 bg-gray-100 rounded-lg p-1 border-3 border-violet-200 focus:ring-blue-700 focus:border-blue-700 transition outline-none w-full ' />
                      </div>
                    </div>

                    <div className='flex justify-between gap-10 my-2'>
                      <div>
                        <div>
                          <label htmlFor="" className='text-lg font-medium' >Date of Birth</label>
                          <div>
                            <input value={addNewStudent.dob} onChange={(e) => setAddNewStudent({ ...addNewStudent, dob: e.target.value })} type="date" className='mt-2 bg-gray-100 rounded-lg p-1 border-3 border-violet-200 focus:ring-blue-700 focus:border-blue-700 transition outline-none w-50 ' />
                          </div>

                        </div>

                        <div className='mt-6'>
                          <label htmlFor="gender" className='text-lg font-medium' >Gender</label>
                          <div className='flex gap-3 mt-2'>
                            <div>
                              <input value="male" checked={addNewStudent.gender == "male"} onChange={(e) => setAddNewStudent({ ...addNewStudent, gender: e.target.value })} name="gender" id='male' type="radio" />
                              <label htmlFor="male">Male</label>
                            </div>
                            <div>
                              <input value="female" checked={addNewStudent.gender == "female"} onChange={(e) => setAddNewStudent({ ...addNewStudent, gender: e.target.value })} name="gender" id='female' type="radio" />
                              <label htmlFor="female">Female</label>
                            </div>
                          </div>
                        </div>
                      </div>


                      <label htmlFor="studImg" className='text-lg font-medium' >Image
                        <div className='mt-2 me bg-gray-200 rounded-lg w-40 py-10 px-5  border border-dashed cursor-pointer'>
                          <CiImageOn className='text-2xl ms-12' />
                          <input onChange={handleImage} accept='image/*' id='studImg' type="file" className='w-27 cursor-pointer' />
                        </div>
                      </label>


                    </div>

                    <div className='my-2'>
                      <label htmlFor="" className='text-lg font-medium' >Class</label>
                      <input value={addNewStudent.class} onChange={(e) => setAddNewStudent({ ...addNewStudent, class: e.target.value })} type="text" className='mt-2 bg-gray-100 rounded-lg p-1 border-3 border-violet-200 focus:ring-blue-700 focus:border-blue-700 transition outline-none w-full ' />
                    </div>

                    <div className='my-2'>
                      <label htmlFor="" className='text-lg font-medium' >GPA</label>
                      <input value={addNewStudent.gpa} onChange={(e) => setAddNewStudent({ ...addNewStudent, gpa: e.target.value })} type="number" className='mt-2 bg-gray-100 rounded-lg p-1 border-3 border-violet-200 focus:ring-blue-700 focus:border-blue-700 transition outline-none w-full [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none ' />
                    </div>

                    <div className='my-2'>
                      <label htmlFor="" className='text-lg font-medium' >Attendance Petrcentage</label>
                      <input value={addNewStudent.attendance} onChange={(e) => setAddNewStudent({ ...addNewStudent, attendance: e.target.value })} type="number" className='mt-2 bg-gray-100 rounded-lg p-1 border-3 border-violet-200 focus:ring-blue-700 focus:border-blue-700 transition outline-none w-full [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none ' />
                    </div>

                    <div className='my-4'>
                      <h1 className='text-lg font-medium'>Marks Obtained For Each Subject</h1>

                      <div className='my-2 flex gap-10'>
                        <div >
                          <label htmlFor="" className='text-lg font-medium' >English</label>
                          <input onChange={(e) => setAddNewStudent({ ...addNewStudent, marks: { ...addNewStudent.marks, english: e.target.value } })} type="number" className='mt-2 bg-gray-100 rounded-lg p-1 border-3 border-violet-200 focus:ring-blue-700 focus:border-blue-700 transition outline-none w-full [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none ' />
                        </div>
                        <div >
                          <label htmlFor="" className='text-lg font-medium' >Physics</label>
                          <input onChange={(e) => setAddNewStudent({ ...addNewStudent, marks: { ...addNewStudent.marks, physics: e.target.value } })} type="number" className='mt-2 bg-gray-100 rounded-lg p-1 border-3 border-violet-200 focus:ring-blue-700 focus:border-blue-700 transition outline-none w-full [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none ' />
                        </div>
                      </div>

                      <div className='my-2 flex gap-10'>
                        <div >
                          <label htmlFor="" className='text-lg font-medium' >Maths</label>
                          <input onChange={(e) => setAddNewStudent({ ...addNewStudent, marks: { ...addNewStudent.marks, maths: e.target.value } })} type="number" className='mt-2 bg-gray-100 rounded-lg p-1 border-3 border-violet-200 focus:ring-blue-700 focus:border-blue-700 transition outline-none w-full [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none ' />
                        </div>
                        <div >
                          <label htmlFor="" className='text-lg font-medium' >Hindi</label>
                          <input onChange={(e) => setAddNewStudent({ ...addNewStudent, marks: { ...addNewStudent.marks, hindi: e.target.value } })} type="number" className='mt-2 bg-gray-100 rounded-lg p-1 border-3 border-violet-200 focus:ring-blue-700 focus:border-blue-700 transition outline-none w-full [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none ' />
                        </div>
                      </div>

                      <div className='my-2 flex gap-10'>
                        <div >
                          <label htmlFor="" className='text-lg font-medium' >General Knowledge</label>
                          <input onChange={(e) => setAddNewStudent({ ...addNewStudent, marks: { ...addNewStudent.marks, gk: e.target.value } })} type="number" className='mt-2 bg-gray-100 rounded-lg p-1 border-3 border-violet-200 focus:ring-blue-700 focus:border-blue-700 transition outline-none w-full [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none ' />
                        </div>
                        <div >
                          <label htmlFor="" className='text-lg font-medium' >Chemistry</label>
                          <input onChange={(e) => setAddNewStudent({ ...addNewStudent, marks: { ...addNewStudent.marks, chemistry: e.target.value } })} type="number" className='mt-2 bg-gray-100 rounded-lg p-1 border-3 border-violet-200 focus:ring-blue-700 focus:border-blue-700 transition outline-none w-full [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none ' />
                        </div>
                      </div>

                      <div className='my-2 flex gap-10'>
                        <div >
                          <label htmlFor="" className='text-lg font-medium' >Biology</label>
                          <input onChange={(e) => setAddNewStudent({ ...addNewStudent, marks: { ...addNewStudent.marks, biology: e.target.value } })} type="number" className='mt-2 bg-gray-100 rounded-lg p-1 border-3 border-violet-200 focus:ring-blue-700 focus:border-blue-700 transition outline-none w-full [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none ' />
                        </div>
                        <div >
                          <label htmlFor="" className='text-lg font-medium' >Social Science</label>
                          <input onChange={(e) => setAddNewStudent({ ...addNewStudent, marks: { ...addNewStudent.marks, ss: e.target.value } })} type="number" className='mt-2 bg-gray-100 rounded-lg p-1 border-3 border-violet-200 focus:ring-blue-700 focus:border-blue-700 transition outline-none w-full [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none ' />
                        </div>
                      </div>

                    </div>

                    <div className='my-2'>
                      <label htmlFor="" className='text-lg font-medium' >Remarks</label>
                      <select onChange={(e) => setAddNewStudent({ ...addNewStudent, remarks: e.target.value })} className='mt-2 bg-gray-100 rounded-lg p-2 border-3 border-violet-200 focus:ring-blue-700 focus:border-blue-700 transition outline-none w-full' >
                        <option value="">Select</option>
                        <option value="EHS" >EHS</option>
                        <option value="NON-EHS" >NON-EHS</option>
                      </select>
                    </div>

                    <div className='my-2'>
                      <label htmlFor="" className='text-lg font-medium' >Status</label>
                      <select onChange={(e) => setAddNewStudent({ ...addNewStudent, status: e.target.value })} className='mt-2 bg-gray-100 rounded-lg p-2 border-3 border-violet-200 focus:ring-blue-700 focus:border-blue-700 transition outline-none w-full' >
                        <option value="">Select</option>
                        <option value="Passed">Passed</option>
                        <option value="Failed">Failed</option>
                      </select>
                    </div>

                    <div className='mt-10 flex justify-center items-center'>
                      <button type='button' onClick={handleSubmit} className='bg-blue-700 border py-3 w-full rounded-lg text-white font-semibold hover:bg-white hover:text-blue-500 hover:border-blue-500 transition cursor-pointer'>Add Student</button>
                    </div>

                  </div>

                </div>
              </div>
            </div>
          </div>}


        {/* list of students */}
        <div className='md:px-10 p-5 gap-10'>
          <div className='grid md:grid-cols-2 grid-cols-1 gap-10'>
            {/* student card */}
            {displayStudent.length > 0 ? (
              displayStudent.map((student, index) => (
                <div key={index} className='md:mt-0 mt-2 bg-linear-to-br from-red-200 to-blue-400 rounded-lg shadow hover:shadow-lg hover:shadow-blue-700 hover:scale-102 transition'>
                  {/* outer */}
                  <div className=''>
                    <div className='flex justify-between items-center gap-2 md:mt-15'>
                      <div className='bg-blue-400 w-[150px] md:w-[100px] h-[100px] rounded-full flex justify-center items-center p-1 md:ms-20 md:mt-5'>
                        <img className='w-full h-full object-cover' width={"100px"} height={"100px"} style={{ borderRadius: "50%" }} src={student?.image || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} alt="image" />
                      </div>
                      <div className='grid md:gap-1 gap-1 md:me-20'>
                        <div className='bg-white p-2'>
                          <p className='font-semibold'>Student Name : <span className='font-normal'>{student?.name}</span></p>

                        </div>
                        <div className='grid md:grid grid-cols-2 md:gap-2 gap-1 '>
                          <div className='bg-white md:mt-1 text-center p-2'>
                            <p className='font-semibold'>Date of Birth : <span className='font-normal'>{student?.dob}</span></p>
                          </div>
                          <div className='bg-white md:mt-1 flex justify-center items-center p-2'>
                            <p className='font-semibold'>Gender : <span className='font-normal'>{student?.gender}</span></p>
                          </div>

                        </div>
                      </div>

                    </div>
                    {/* second div */}
                    <div className='flex justify-between items-center md:gap-2 gap-1 mt-1'>
                      <div className='bg-white md:mt-1 flex justify-center items-center p-2 md:ms-20 md:w-full w-1/2'>
                        <p className='font-semibold'>Attendence Percentage : <span className='font-normal'>{student?.attendance}</span></p>
                      </div>
                      <div className='bg-white md:mt-1 flex justify-center items-center md:p-2 py-5  w-1/3'>
                        <p className='font-semibold'>Class : <span className='font-normal'>{student?.class}</span></p>
                      </div>
                      <div className='bg-white md:mt-1 flex justify-center items-center md:p-2 py-5 md:me-20  w-1/3'>
                        <p className='font-semibold'>GPA : <span className='font-normal'>{student?.gpa}</span></p>
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
                              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-semibold text-sm">{student?.marks.english}</span>
                            </td>
                            <td className="py-3 px-6 text-gray-700">100</td>
                          </tr>

                          <tr className="border-b hover:bg-blue-50 transition">
                            <td className="py-3 px-6 font-medium text-gray-800">Physics</td>
                            <td className="py-3 px-6">
                              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-semibold text-sm">{student?.marks.physics}</span>
                            </td>
                            <td className="py-3 px-6 text-gray-700">100</td>
                          </tr>

                          <tr className="border-b hover:bg-blue-50 transition">
                            <td className="py-3 px-6 font-medium text-gray-800">Maths</td>
                            <td className="py-3 px-6">
                              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-semibold text-sm">{student?.marks.maths}</span>
                            </td>
                            <td className="py-3 px-6 text-gray-700">100</td>
                          </tr>

                          <tr className="border-b hover:bg-blue-50 transition">
                            <td className="py-3 px-6 font-medium text-gray-800">Hindi</td>
                            <td className="py-3 px-6">
                              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-semibold text-sm">{student?.marks.hindi}</span>
                            </td>
                            <td className="py-3 px-6 text-gray-700">100</td>
                          </tr>

                          <tr className="border-b hover:bg-blue-50 transition">
                            <td className="py-3 px-6 font-medium text-gray-800">General Knowledge</td>
                            <td className="py-3 px-6">
                              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-semibold text-sm">{student?.marks.gk}</span>
                            </td>
                            <td className="py-3 px-6 text-gray-700">100</td>
                          </tr>

                          <tr className="border-b hover:bg-blue-50 transition">
                            <td className="py-3 px-6 font-medium text-gray-800">Chemistry</td>
                            <td className="py-3 px-6">
                              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-semibold text-sm">{student?.marks.chemistry}</span>
                            </td>
                            <td className="py-3 px-6 text-gray-700">100</td>
                          </tr>

                          <tr className="border-b hover:bg-blue-50 transition">
                            <td className="py-3 px-6 font-medium text-gray-800">Biology</td>
                            <td className="py-3 px-6">
                              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-semibold text-sm">{student?.marks.biology}</span>
                            </td>
                            <td className="py-3 px-6 text-gray-700">100</td>
                          </tr>

                          <tr className="hover:bg-blue-50 transition">
                            <td className="py-3 px-6 font-medium text-gray-800">Social Science</td>
                            <td className="py-3 px-6">
                              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-semibold text-sm">{student?.marks.ss}</span>
                            </td>
                            <td className="py-3 px-6 text-gray-700">100</td>
                          </tr>
                        </tbody>
                      </table>


                    </div>

                    {/* fourth div */}
                    <div className='flex justify-between items-center md:gap-2 gap-1 md:mt-5 mt-2 md:mx-20 '>
                      <div className='bg-white md:mt-1 flex justify-center items-center md:p-2 py-5 w-full'>
                        <p className='font-semibold'>Remarks : <span className='font-normal'>{student?.remarks}</span></p>
                      </div>
                      <div className='bg-white md:mt-1 flex justify-center items-center md:p-2 py-5 w-full'>
                        <p className='font-semibold'>Status : <span className='font-normal'>{student?.status}</span></p>
                      </div>

                    </div>

                    {/* buttons */}
                    <div className='flex justify-end md:me-20 gap-5 mb-15 mt-5'>
                      <button onClick={() => studentEditNow(student)} className='bg-yellow-300 font-semibold px-4 py-1 text-white rounded hover:bg-yellow-500 transition cursor-pointer shadow'>Edit</button>
                      <button onClick={() => deleteStudent(student.id)} className='bg-red-500 font-semibold px-4 py-1 text-white rounded hover:bg-red-700 transition cursor-pointer shadow'>Delete</button>
                    </div>


                  </div>

                </div>
              ))

            )
              :
              (
                <h1 className='text-center text-5xl text-red-500 font-semibold'>No Such Student Added Yet...!</h1>
                // <div>
                //   <img className='w-full h-screen' src="https://cdn.dribbble.com/userupload/27696693/file/original-df45e78c4cda3558beb279c9239988d3.gif" alt="" />
                // </div>
              )

            }


          </div>

        </div>



        {/* edit student modal */}
        {editStudent &&
          <div className='relative z-10 '>
            <div className='bg-gray-200/75 fixed inset-0 overflow-y-auto'>
              <div className='flex justify-center items-center min-h-screen '>
                <div className='flex justify-center items-center'>
                  <div className='w-150 h-150 bg-red-100 rounded-lg shadow-2xl px-20 pt-10 pb-20 overflow-y-auto'>

                    <div className='flex justify-between items-center my-5'>
                      <h1 className='ms-15 text-2xl font-semibold '>Update Student Detils</h1>
                      <FaWindowClose onClick={() => setEditStudent(!editStudent)} className='text-2xl text-red-500 cursor-pointer' />
                    </div>

                    <div className='my-2'>
                      <label htmlFor="" className='text-lg font-medium'>Student Name</label>
                      <div>
                        <input value={currentEditStudent.name} onChange={(e) => setCurrentEditStudent({ ...currentEditStudent, name: e.target.value })} type="text" className='mt-2 bg-gray-100 rounded-lg p-1 border-3 border-violet-200 focus:ring-blue-700 focus:border-blue-700 transition outline-none w-full ' />
                      </div>
                    </div>

                    <div className='flex justify-between gap-10 my-2'>
                      <div>
                        <div>
                          <label htmlFor="" className='text-lg font-medium' >Date of Birth</label>
                          <div>
                            <input value={currentEditStudent.dob} onChange={(e) => setCurrentEditStudent({ ...currentEditStudent, dob: e.target.value })} type="date" className='mt-2 bg-gray-100 rounded-lg p-1 border-3 border-violet-200 focus:ring-blue-700 focus:border-blue-700 transition outline-none w-50 ' />
                          </div>

                        </div>

                        <div className='mt-6'>
                          <label htmlFor="gender" className='text-lg font-medium' >Gender</label>
                          <div className='flex gap-3 mt-2'>
                            <div>
                              <input value="Male" checked={currentEditStudent.gender == "Male"} onChange={(e) => setCurrentEditStudent({ ...currentEditStudent, gender: e.target.value })} name="gender" id='male' type="radio" />
                              <label htmlFor="male">Male</label>
                            </div>
                            <div>
                              <input value="Female" checked={currentEditStudent.gender == "Female"} onChange={(e) => setCurrentEditStudent({ ...currentEditStudent, gender: e.target.value })} name="gender" id='female' type="radio" />
                              <label htmlFor="female">Female</label>
                            </div>
                          </div>
                        </div>
                      </div>


                      <label htmlFor="studImg" className='text-lg font-medium' >Image
                        <div className='mt-2 me bg-gray-200 rounded-lg w-40 py-10 px-5  border border-dashed cursor-pointer'>
                          <CiImageOn className='text-2xl ms-12' />
                          <input id='studImg' type="file" className='w-27 cursor-pointer' />
                        </div>
                      </label>


                    </div>

                    <div className='my-2'>
                      <label htmlFor="" className='text-lg font-medium' >Class</label>
                      <input value={currentEditStudent.class} onChange={(e) => setCurrentEditStudent({ ...currentEditStudent, class: e.target.value })} type="text" className='mt-2 bg-gray-100 rounded-lg p-1 border-3 border-violet-200 focus:ring-blue-700 focus:border-blue-700 transition outline-none w-full ' />
                    </div>

                    <div className='my-2'>
                      <label htmlFor="" className='text-lg font-medium' >GPA</label>
                      <input value={currentEditStudent.gpa} onChange={(e) => setCurrentEditStudent({ ...currentEditStudent, gpa: e.target.value })} type="number" className='mt-2 bg-gray-100 rounded-lg p-1 border-3 border-violet-200 focus:ring-blue-700 focus:border-blue-700 transition outline-none w-full [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none ' />
                    </div>

                    <div className='my-2'>
                      <label htmlFor="" className='text-lg font-medium' >Attendance Percentage</label>
                      <input value={currentEditStudent.attendance} onChange={(e) => setCurrentEditStudent({ ...currentEditStudent, attendance: e.target.value })} type="number" className='mt-2 bg-gray-100 rounded-lg p-1 border-3 border-violet-200 focus:ring-blue-700 focus:border-blue-700 transition outline-none w-full [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none ' />
                    </div>

                    <div className='my-4'>
                      <h1 className='text-lg font-medium'>Marks Obtained For Each Subject</h1>

                      <div className='my-2 flex gap-10'>
                        <div >
                          <label htmlFor="" className='text-lg font-medium' >English</label>
                          <input value={currentEditStudent.marks.english} onChange={(e) => setCurrentEditStudent({ ...currentEditStudent, marks:{...currentEditStudent.marks, english:e.target.value} })} type="number" className='mt-2 bg-gray-100 rounded-lg p-1 border-3 border-violet-200 focus:ring-blue-700 focus:border-blue-700 transition outline-none w-full [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none ' />
                        </div>
                        <div >
                          <label htmlFor="" className='text-lg font-medium' >Physics</label>
                          <input value={currentEditStudent.marks.physics} onChange={(e) => setCurrentEditStudent({ ...currentEditStudent, marks: { ...currentEditStudent.marks, physics: e.target.value } })} type="number" className='mt-2 bg-gray-100 rounded-lg p-1 border-3 border-violet-200 focus:ring-blue-700 focus:border-blue-700 transition outline-none w-full [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none ' />
                        </div>
                      </div>

                      <div className='my-2 flex gap-10'>
                        <div >
                          <label htmlFor="" className='text-lg font-medium' >Maths</label>
                          <input value={currentEditStudent.marks.maths} onChange={(e) => setCurrentEditStudent({ ...currentEditStudent, marks: { ...currentEditStudent.marks, maths: e.target.value } })} type="number" className='mt-2 bg-gray-100 rounded-lg p-1 border-3 border-violet-200 focus:ring-blue-700 focus:border-blue-700 transition outline-none w-full [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none ' />
                        </div>
                        <div >
                          <label htmlFor="" className='text-lg font-medium' >Hindi</label>
                          <input value={currentEditStudent.marks.hindi} onChange={(e) => setCurrentEditStudent({ ...currentEditStudent, marks: { ...marks, hindi: e.target.value } })} type="number" className='mt-2 bg-gray-100 rounded-lg p-1 border-3 border-violet-200 focus:ring-blue-700 focus:border-blue-700 transition outline-none w-full [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none ' />
                        </div>
                      </div>

                      <div className='my-2 flex gap-10'>
                        <div >
                          <label htmlFor="" className='text-lg font-medium' >General Knowledge</label>
                          <input value={currentEditStudent.marks.gk} onChange={(e) => setCurrentEditStudent({ ...currentEditStudent, marks: { ...currentEditStudent.marks, gk: e.target.value } })} type="number" className='mt-2 bg-gray-100 rounded-lg p-1 border-3 border-violet-200 focus:ring-blue-700 focus:border-blue-700 transition outline-none w-full [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none ' />
                        </div>
                        <div >
                          <label htmlFor="" className='text-lg font-medium' >Chemistry</label>
                          <input value={currentEditStudent.marks.chemistry} onChange={(e) => setCurrentEditStudent({ ...currentEditStudent, marks: { ...currentEditStudent.marks, chemistry: e.target.value } })} type="number" className='mt-2 bg-gray-100 rounded-lg p-1 border-3 border-violet-200 focus:ring-blue-700 focus:border-blue-700 transition outline-none w-full [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none ' />
                        </div>
                      </div>

                      <div className='my-2 flex gap-10'>
                        <div >
                          <label htmlFor="" className='text-lg font-medium' >Biology</label>
                          <input value={currentEditStudent.marks.biology} onChange={(e) => setCurrentEditStudent({ ...currentEditStudent, marks: { ...currentEditStudent.marks, biology: e.target.value } })} type="number" className='mt-2 bg-gray-100 rounded-lg p-1 border-3 border-violet-200 focus:ring-blue-700 focus:border-blue-700 transition outline-none w-full [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none ' />
                        </div>
                        <div >
                          <label htmlFor="" className='text-lg font-medium' >Social Science</label>
                          <input value={currentEditStudent.marks.ss} onChange={(e) => setCurrentEditStudent({ ...currentEditStudent, marks: { ...currentEditStudent.marks, ss: e.target.value } })} type="number" className='mt-2 bg-gray-100 rounded-lg p-1 border-3 border-violet-200 focus:ring-blue-700 focus:border-blue-700 transition outline-none w-full [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none ' />
                        </div>
                      </div>

                    </div>

                    <div className='my-2'>
                      <label htmlFor="" className='text-lg font-medium' >Remarks</label>
                      <select value={currentEditStudent.remarks} onChange={(e) => setCurrentEditStudent({ ...currentEditStudent, remarks: e.target.value })} className='mt-2 bg-gray-100 rounded-lg p-2 border-3 border-violet-200 focus:ring-blue-700 focus:border-blue-700 transition outline-none w-full' >
                        <option value="">Select</option>
                        <option value="EHS">EHS</option>
                        <option value="NON-EHS">NON-EHS</option>
                      </select>
                    </div>

                    <div className='my-2'>
                      <label htmlFor="" className='text-lg font-medium' >Status</label>
                      <select value={currentEditStudent.status} onChange={(e) => setCurrentEditStudent({ ...currentEditStudent, status: e.target.value })} className='mt-2 bg-gray-100 rounded-lg p-2 border-3 border-violet-200 focus:ring-blue-700 focus:border-blue-700 transition outline-none w-full' >
                        <option value="">Select</option>
                        <option value="Passed">Passed</option>
                        <option value="Failed">Failed</option>
                      </select>
                    </div>

                    <div className='mt-10 flex justify-center items-center'>
                      <button onClick={() => saveEditedStudent(currentEditStudent)} className='bg-orange-700 border py-3 w-full rounded-lg text-white font-semibold hover:bg-white hover:orange-blue-500 hover:text-orange-500 transition cursor-pointer'>Update Details</button>
                    </div>

                  </div>

                </div>
              </div>
            </div>
          </div>}




      </div >

      <Footer />

    </>
  )
}

export default HomePage