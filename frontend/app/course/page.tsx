'use client'
import CourseModal from '@/components/courseModal'
import { useAuth } from '@/context/AuthContext'
import { deleteCourse, getAllCourses } from '@/services/CourseAPI'
import { showConfirmDialog, showErrorAlert, showSuccessAlert } from '@/utils/SweetAlerts'
import { useRouter } from 'next/navigation'
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
    const [selectedCourse, setSelectedCourse] = useState<CourseItem | null>(null)
    const {user,loading} = useAuth()

    const router = useRouter()
    
    useEffect(()=>{
        if(!loading){
            if(!user){
                router.push("/")
            }else if(user.role != "ADMIN"){
                router.push("/coursesPage")
            }
        }
    },[user, loading,router])

    const handleSuccess = (updateCourse: CourseItem) =>{
        setIsOpenModal(false)
        if(selectedCourse){
            setCourses(prevCourse =>
                prevCourse.map(course =>
                    course.id === updateCourse.id ? updateCourse : course
                )
            )
        }else{
            setCourses(prevCourses => [...prevCourses, updateCourse])
        }
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

        const handleDelete = (courseDelete: CourseItem)=>{
            showConfirmDialog(
                'Are you sure?',
                `Do you want to delete ${courseDelete.name} ? `,
                'Yes, Delete id!'
            ).then(async(result)=>{
                if(result.isConfirmed){
                    try{
                        await deleteCourse(courseDelete.id)
                        setCourses(preCorses =>
                            preCorses.filter(course=> course.id !== courseDelete.id)
                        )
                        showSuccessAlert('Deleted' ,`${courseDelete.name} has been Deleted`)
                    }catch(error){
                        console.error(error)
                        showErrorAlert('error', 'Faild to delete')
                    }
                }
            })
        }

    const handleEdit = (course: CourseItem)=>{
        setSelectedCourse(course)
        setIsOpenModal(true)
    }

    const handleAdd = () =>{
        setSelectedCourse(null)
        setIsOpenModal(true)
    }

  return (
    <div className='p-8 bg-green-50 min-h-screen'>
        <div className='flex justify-between items-center mb-6'>
            <div>
                <h2 className='text-2xl font-bold text-gray-800'>
                    Courses Management
                </h2>
            </div>

            <button className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow transition duration-200'
                    onClick={handleAdd}>
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
                                <td className='p-6 text-gray-800 font-medium'>{course.name}</td>
                                <td className='p-4 text-gray-800 font-medium'>{course.course_code}</td>
                                <td className='p-4 text-gray-800 font-medium'>{course.description}</td>
                                <td className='p-4 text-gray-800 font-medium'>{course.duration}</td>
                                <td className='p-4 text-gray-800 font-medium'>{course.fee}</td>

                                <td className='p-4 text-gray-800 font-medium'>
                                    <button className='text-blue-500 hover:text-blue-700 transition-colors p-2 hover:bg-blue-50 rounded-full' onClick={()=> handleEdit(course)}><FiEdit size={18}/></button>
                                    <button className='text-red-500 hover:text-red-700 transition-colors p-2 hover:bg-red-50 rounded-full' onClick={()=> handleDelete(course)}><FiTrash2 size={18}/></button>
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
        key={selectedCourse?.id}
        isOpen={isOpenModal}
        onClose={()=> setIsOpenModal(false)}
        onSuccess={handleSuccess}
        course={selectedCourse}/>
    </div>
  )
}
