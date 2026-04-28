import { addCourse, updateCourse } from '@/services/CourseAPI'
import { showErrorAlert, showSuccessAlert } from '@/utils/SweetAlerts'
import { AxiosError } from 'axios'
import React, { useState } from 'react'

interface CourseItem{
    id:number
    name:string
    course_code: string
    description:string
    duration:string
    fee: number
}
interface Props{
  isOpen: boolean
  onClose: () => void
  onSuccess: (cour:CourseItem) => void
  course?: CourseItem | null
}
interface ApiErrorResponse {
  message: string;
}
export default function CourseModal({isOpen, onClose, onSuccess, course}:Props) {

   const[loading, setLoading] = useState(false)
   const [error, setError] = useState<string | null>(null)

   const [formData, setFormData] = useState({
    id: course?.id ,
    course_code: course?.course_code || '',
    name: course?.name || '',
    description: course?.description || '',
    duration: course?.duration || '',
    fee: course?.fee || 0,
   })

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
       const {name, value} = e.target
       setFormData((prev)=>({
         ...prev,
         [name]: value
       }))
     }

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>)=>{
      e.preventDefault()
      setLoading(true)
     
      try{
        let response;
        if(course){
          response = await updateCourse(formData)
        }else{
          response = await addCourse(formData)
        }
        showSuccessAlert('Success', course ? 'Course Updated' : 'Course Added');
        onSuccess(response.data.data)
        onClose()
      }catch(error){
        setLoading(false)
        const err = error as AxiosError<ApiErrorResponse>;
        const errorMessage = typeof err === 'string' ? err:'Faild to add Student. Please try again.'; 
        setError(errorMessage);
        showErrorAlert('Course Add Failed', errorMessage);
        console.error(' error:', error);
      }finally{
        setLoading(false)
      }
         
      }
  if(!isOpen) return null
  return (
    <div className='fixed inset-0 bg-black/40 backdrop-blur-sm bg-opacity-50 flex justify-center items-center z-50 p-4'>
      <div className='bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden'>
        <div className='flex justify-between items-center p-5 border-b bg-gray-50'>
          <h3 className='text-xl font-bold text-gray-800'>Add New Student</h3>

        </div>

        <form className='p-6 space-y-4' onSubmit={handleSubmit}>
          <div>
            <label className='"block text-sm font-medium text-gray-700 mb-1'>Name</label>
            <input
            type='text'
            required
            name='name'
            value={formData.name}
            onChange={handleChange}
            className='w-full text-gray-900 p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500'/>
          </div>

          <div>
            <label className='"block text-sm font-medium text-gray-700 mb-1'>Course_Code</label>
            <input
            type='text'
            required
            name='course_code'
            value={formData.course_code}
            onChange={handleChange}
            className='w-full text-gray-900 p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500'/>
          </div>

          <div>
            <label className='"block text-sm font-medium text-gray-700 mb-1'>Description</label>
            <input
            type='text'
            required
            name='description'
            value={formData.description}
            onChange={handleChange}
            className='w-full text-gray-900 p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500'/>
          </div>

          <div>
            <label className='"block text-sm font-medium text-gray-700 mb-1'>Duration</label>
            <input
            type='text'
            required
            name='duration'
            value={formData.duration}
            onChange={handleChange}
            className='w-full text-gray-900 p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500'/>
          </div>

          <div>
            <label className='"block text-sm font-medium text-gray-700 mb-1'>Fee</label>
            <input
            type='text'
            required
            name='fee'
            value={formData.fee}
            onChange={handleChange}
            className='w-full text-gray-900 p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500'/>
          </div>

          {error && (
            <div className='mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm text-center animate-pulse'>
              {error}
            </div>
          )}
          <div className='flex gap-3 mt-6'>
            <button type='button' onClick={onClose} className='flex-1 text-gray-900 px-4 py-2 border rounded-lg hover:bg-gray-100'>Cancel</button>
            <button type='submit' className='flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"'>{loading ? 'Saveing...' : 'Save'}</button>
          </div>
        </form>
      </div>
    </div>
  )
}
