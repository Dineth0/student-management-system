'use client'

import CourseCard from '@/components/courseCard'
import CourseRegisterModal from '@/components/courseRegisterModal'
import { useAuth } from '@/context/AuthContext'
import { getAllCourses } from '@/services/CourseAPI'
import { getUserRegistrations } from '@/services/CourseRegister'
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
    const [cousrses, setCourses] = useState<CourseItem[]>([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [targetCourse, setTargetCourse] = useState<CourseItem | null>(null)
    const {user,loading} = useAuth()
    const router = useRouter()
    const [enrolledCourseIds, setEnrolledCourseIds] = useState<number[]>([])
    
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

    useEffect(() => {
    const fetchUserEnrollments = async () => {
        if (user) {
            try {
                const response = await getUserRegistrations(user.id); 
                const ids = response.data.data.map((reg: any) => reg.courseId);
                setEnrolledCourseIds(ids);
            } catch (error) {
                console.error("Error fetching enrollments", error);
            }
        }
    }
    fetchUserEnrollments();
}, [user]);

const handleOpen = (course: CourseItem) => {
    setTargetCourse(course)
    setIsModalOpen(true)
}
    
return(
    
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
                            isSelected={enrolledCourseIds.includes(course.id)}                
                            onClick={handleOpen}
                        />
                    ))
                ) : (
                    <p className="text-center col-span-full text-gray-500">No courses found.</p>
                )}
                {isModalOpen && targetCourse && (
                    <CourseRegisterModal 
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    course={targetCourse}
                    />
                )}
            </div>
        </div>
    )
}
