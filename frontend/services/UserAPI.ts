import axiosInstance from "./axios"

interface userData{
    name:string
    email:string
    phone:string
    birthday: string
    nic: string
    password?: string
}
export const addUser = (data:userData)=>{
    return axiosInstance.post('/user/register', data)
}
export const getAllStudents = () =>{
    return axiosInstance.get('/student/getAllStudents')
}

export const deleteStudent = (id: number)=>{
    return axiosInstance.delete(`/student/deleteStudent/${id}`)
}
export const updateStudent = ( data:userData)=>{
    return axiosInstance.put('/student/updateStudent', data)
}

export const getStudentCount = ()=>{
    return axiosInstance.get('/student/count')
}