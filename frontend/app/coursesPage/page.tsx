'use client'

import CourseCard from '@/components/courseCard'
import CoursePageNavbar from '@/components/coursePageNavbar'
import { useAuth } from '@/context/AuthContext'
import { getAllCourses } from '@/services/CourseAPI'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'



interface CourseItem{
    id:number
    name:string
    course_code: string
    description:string
    duration:string
    fee: number
}

export default function CoursesPage() {
    const [selectedCourse , setSelectedCourse] = useState<number | null>(null)
    const [cousrses, setCourses] = useState<CourseItem[]>([])

     const {user,loading} = useAuth()
        const router = useRouter()
    
        useEffect(()=>{
            if(!loading){
                if(!user){
                    router.push("/")
                }
            }
        },[user,loading,router])

    useEffect(()=>{
        const fetchCoures = async ()=>{
            try{
                const response = await getAllCourses()
                setCourses(response.data.data)
                console.log(response.data.data)
            }catch(error){
                console.error(error)
            }
        }
        fetchCoures()
    },[])
    
  return (
    
    <div className='p-8 bg-green-50 min-h-screen'>
        <div className='mb-10 text-center md:text-left'>
            <h2 className='text-3xl font-bold text-gray-800'>Available Courses</h2>
            <p className='text-gray-500'>Select and enroll in your favorite courses to start learning</p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
    {cousrses.length > 0 ? (
        cousrses.map((course) => (
            <CourseCard
                key={course.id}
                course={course}
                isSelected={selectedCourse === course.id} 
            />
        ))
    ) : (
        <p className="text-center col-span-full text-gray-500">No courses found.</p>
    )}
</div>
    </div>
  )
}
