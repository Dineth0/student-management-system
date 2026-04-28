'use client'
import { FiBook, FiCheckCircle, FiClock, FiCreditCard } from "react-icons/fi"

 

interface Course{
    id: number
    name: string
    course_code: string
    description: string
    duration: string
    fee: number
}
interface CourseProps{
    course: Course
    isSelected: boolean
}
export default function CourseCard({course, isSelected}: CourseProps) {
  return (
    <div 
      className={`bg-white rounded-2xl shadow-sm border-2 transition-all duration-300 p-6 flex flex-col justify-between
        ${isSelected ? 'border-blue-500 ring-2 ring-blue-100 scale-105' : 'border-transparent hover:shadow-lg'}`}>

        <div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-4">
                <FiBook size={24}/>
            </div>

            <h3 className="text-xl font-bold text-gray-800 mb-2">{course.name}</h3>
            
            <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-3">
                {course.description}
            </p>

            <div className="space-y-2 mb-6 border-t pt-4">
                <div className="flex items-center text-sm text-gray-500">
                    <FiClock className="mr-2"/> <span>{course.duration}</span>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                    <FiCreditCard className="mr-2"/> <span>{course.fee}</span>
                </div>
                
            </div>
        </div>

        <button
            className={`w-full py-3 rounded-xl font-semibold flex items-center justify-center transition
          ${isSelected 
            ? 'bg-green-500 text-white cursor-default' 
            : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md active:scale-95'}`}>

                {isSelected ? (
                    <>
                        <FiCheckCircle className="mr-2"/>Enrolled
                    </>
                ):(
                    'Enroll Now'
                )}
        </button>
    </div>
  )
}
