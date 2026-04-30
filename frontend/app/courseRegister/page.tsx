'use client'
import { useAuth } from '@/context/AuthContext'
import { getAllRegistrations } from '@/services/CourseRegister'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

interface RegisterItem {
    id?: number;
    studentId: number;
    studentName: string
    courseId: number;
    courseName:string
    registrationDate: string;
    paymentStatus: string;
   
}


export default function CourseRegistration() {
    const [registers, setRegisters] = useState<RegisterItem[]>([])
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

    

    useEffect(()=>{
            const fetchCourse = async () =>{
                try{
                    const response = await getAllRegistrations()
                    setRegisters(response.data.data)
                    
                }catch(error){
                  
                    console.error(error)
                }
            }
            fetchCourse()
        },[])


  return (
    <div className='p-8 bg-green-50 min-h-screen'>
        <div className='flex justify-between items-center mb-6'>
            <div>
                <h2 className='text-2xl font-bold text-gray-800'>
                    Courses Registrations 
                </h2>
            </div>

            
        </div>

        <div className='bg-white shadow-md rounded-xl overflow-hidden border border-gray-200'>
            <table className='w-full text-left border-collapse'>
                <thead>
                    <tr className='bg-gray-100 border-b border-gray-200'>
                        <th className='p-4 font-semibold text-gray-700'>Student Name</th>
                        <th className='p-4 font-semibold text-gray-700'>Course Name</th>
                        <th className='p-4 font-semibold text-gray-700'>Payment Status</th>
                        <th className='p-4 font-semibold text-gray-700'>Registered Date</th>
                       
                    </tr>
                </thead>
                <tbody>
                    {registers.length > 0 ? (
                        registers.map((register)=>(
                            <tr key={register.id} className='border-b hover:bg-gray-50 transition'>
                                <td className='className="p-4 text-gray-800 font-medium'>{register.studentName}</td>
                                <td className='className="p-4 text-gray-800 font-medium'>{register.courseName}</td>
                                <td className='className="p-4 text-gray-800 font-medium'>{register.paymentStatus}</td>
                                <td className='className="p-4 text-gray-800 font-medium'>{register.registrationDate}</td>

                                
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
        
    </div>
  )
}
