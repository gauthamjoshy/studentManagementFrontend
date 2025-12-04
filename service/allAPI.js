import commonAPI from "./commonAPI"
import BASEURL from "./serviceURL"


//  add student
export const addStudentAPI = async (studentData) => {
    return await commonAPI("POST", `${BASEURL}/students`, studentData)
}

// get one student
export const getStudentAPI = async (id) => {
    return await commonAPI("GET", `${BASEURL}/students/${id}`, {})
}

// get all students
export const getAllStudentsAPI = async () => {
    return await commonAPI("GET", `${BASEURL}/students`)
}

// edit student
export const editStudentAPI = async (studentData, id) => {
    return await commonAPI("PUT", `${BASEURL}/students/${id}`, studentData)
}

// delete student
export const deleteStudentAPI = async (id) => {
    return await commonAPI("DELETE", `${BASEURL}/students/${id}`)
}

// register
export const regesterAPI = async (userData) => {
    return await commonAPI("POST", `${BASEURL}/users`, userData)
}