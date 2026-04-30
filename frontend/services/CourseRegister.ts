import axiosInstance from "./axios"


interface RegisterData{
    studentId: number
    courseId: number
    registrationDate: string
    paymentStatus: string
}
export const registration = (data:RegisterData)=>{
    return axiosInstance.post('/registration/courseRegister', data)
}

export const getAllRegistrations = () =>{
    return axiosInstance.get('/registration/getAllRegistrations')
}
export const getUserRegistrations = (studentId: number) => {
    return axiosInstance.get(`/registration/user/${studentId}`);
}
export const getRegisterCount = ()=>{
    return axiosInstance.get('/registration/count')
}