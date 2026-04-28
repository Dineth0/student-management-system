'use client'
import CourseModal from '@/components/courseModal'
import { getAllCourses } from '@/services/CourseAPI'
import React, { useEffect, useState } from 'react'
import { FiEdit, FiTrash2 } from 'react-icons/fi'

interface CourseItem{
    id:number
    name:string
    course_code: string
    description:string
    duration:string
    fee: number
}
export default function Courses() {
    const [cousrses, setCourses] = useState<CourseItem[]>([])
    const [isOpenModal, setIsOpenModal] = useState(false)

    const handleSuccess = () =>{
        setIsOpenModal(false)
    }

    useEffect(()=>{
            const fetchCourse = async () =>{
                try{
                    const response = await getAllCourses()
                    setCourses(response.data.data)
                    
                }catch(error){
                  
                    console.error(error)
                }
            }
            fetchCourse()
        },[])


  return (
    <div className='p-8 bg-gray-50 min-h-screen'>
        <div className='flex justify-between items-center mb-6'>
            <div>
                <h2 className='text-2xl font-bold text-gray-800'>
                    Courses Management
                </h2>
            </div>

            <button className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow transition duration-200'
                    onClick={()=> setIsOpenModal(true)}>
                + Add Courses
            </button>
        </div>

        <div className='bg-white shadow-md rounded-xl overflow-hidden border border-gray-200'>
            <table className='w-full text-left border-collapse'>
                <thead>
                    <tr className='bg-gray-100 border-b border-gray-200'>
                        <th className='p-4 font-semibold text-gray-700'>Name</th>
                        <th className='p-4 font-semibold text-gray-700'>Course Code</th>
                        <th className='p-4 font-semibold text-gray-700'>Description</th>
                        <th className='p-4 font-semibold text-gray-700'>Duration</th>
                        <th className='p-4 font-semibold text-gray-700'>Fee</th>
                        <th className='p-4 font-semibold text-gray-700'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {cousrses.length > 0 ? (
                        cousrses.map((course)=>(
                            <tr key={course.id} className='border-b hover:bg-gray-50 transition'>
                                <td className='className="p-4 text-gray-800 font-medium'>{course.name}</td>
                                <td className='className="p-4 text-gray-800 font-medium'>{course.course_code}</td>
                                <td className='className="p-4 text-gray-800 font-medium'>{course.description}</td>
                                <td className='className="p-4 text-gray-800 font-medium'>{course.duration}</td>
                                <td className='className="p-4 text-gray-800 font-medium'>{course.fee}</td>

                                <td className='className="p-4 text-gray-800 font-medium'>
                                    <button className='text-blue-500 hover:text-blue-700 transition-colors p-2 hover:bg-blue-50 rounded-full'><FiEdit size={18}/></button>
                                    <button className='text-red-500 hover:text-red-700 transition-colors p-2 hover:bg-red-50 rounded-full'><FiTrash2 size={18}/></button>
                                </td>
                            </tr>
                        ))
                    ):(
                        <tr>
                            <td colSpan={5} className='p-8 text-center text-gray-500'>
                                No Courses Yet
                            </td>
                        </tr>
                    )}
                    
                </tbody>
            </table>
        </div>
        <CourseModal
        isOpen={isOpenModal}
        onClose={()=> setIsOpenModal(false)}
        onSuccess={handleSuccess}/>
    </div>
  )
}
