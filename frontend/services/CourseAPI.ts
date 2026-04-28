import axiosInstance from "./axios"

interface CourseData{
    id:number
    name:string
    course_code: string
    description:string
    duration:string
    fee: number
}

export const getAllCourses = () =>{
    return axiosInstance.get('/course/getAllCourses')
}

export const deleteCourse = (id: number)=>{
    return axiosInstance.delete(`/course/deleteCourse/${id}`)
}