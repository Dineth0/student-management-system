import axiosInstance from "./axios"

interface LoginData{
    email:string
    password:string
    
}
export const login = async(data:LoginData)=>{
    return await axiosInstance.post("/auth/login",data)
}

export const getCurrentUser = async()=>{
    return await axiosInstance.get('/auth/me')
}

export const userlogout = async()=>{
    return await axiosInstance.post('/auth/logout')
}