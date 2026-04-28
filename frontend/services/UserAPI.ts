import axiosInstance from "./axios"

interface userData{
    name:string
    email:string
    phone:string
    birthday: string
    nic: string
    password: string
}
export const addUser = (data:userData)=>{
    return axiosInstance.post('/user/register', data)
}
