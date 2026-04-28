'use client'

import CourseCard from '@/components/courseCard'
import { useState } from 'react'

const Courses = [
    { id: 1, name: 'Full Stack Development', course_code: 'FS101', duration: '6 Months', description: 'Master Next.js and Spring Boot from scratch.', fee: "Rs.45000" },
    { id: 2, name: 'UI/UX Design', course_code: 'UX102', duration: '3 Months', description: 'Learn modern design principles using Figma.' , fee: "Rs.65000" },
    { id: 3, name: 'Database Management', course_code: 'DM103', duration: '4 Months', description: 'Deep dive into PostgreSQL and Supabase.', fee: "Rs.65000" },
]
export default function CoursesPage() {
    const [selectedCourse , setSelectedCourse] = useState<number | null>(null)
  return (
    <div className='p-8 bg-gray-50 min-h-screen'>
        <div className='mb-10 text-center md:text-left'>
            <h2 className='text-3xl font-bold text-gray-800'>Available Courses</h2>
            <p className='text-gray-500'>Select and enroll in your favorite courses to start learning</p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {Courses.map((course)=>(
                <CourseCard
                    key={course.id}
                    course={course}
                    isSelected={selectedCourse === course.id}/>
            ))}
        </div>
    </div>
  )
}
