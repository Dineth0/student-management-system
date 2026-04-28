import React from 'react'

interface Props{
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}
export default function StudentModal({isOpen, onClose, onSuccess}:Props) {
  if(!isOpen) return null
  return (
    <div className='fixed inset-0 bg-black/40 backdrop-blur-sm bg-opacity-50 flex justify-center items-center z-50 p-4'>
      <div className='bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden'>
        <div className='flex justify-between items-center p-5 border-b bg-gray-50'>
          <h3 className='text-xl font-bold text-gray-800'>Add New Student</h3>

        </div>

        <form className='p-6 space-y-4'>
          <div>
            <label className='"block text-sm font-medium text-gray-700 mb-1'>Name</label>
            <input
            type='text'
            required
            className='w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500'/>
          </div>

          <div>
            <label className='"block text-sm font-medium text-gray-700 mb-1'>Email</label>
            <input
            type='email'
            required
            className='w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500'/>
          </div>

          <div>
            <label className='"block text-sm font-medium text-gray-700 mb-1'>Course</label>
            <input
            type='text'
            required
            className='w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500'/>
          </div>

          <div>
            <label className='"block text-sm font-medium text-gray-700 mb-1'>Birthday</label>
            <input
            type='date'
            required
            className='w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500'/>
          </div>

          <div className='flex gap-3 mt-6'>
            <button type='button' onClick={onClose} className='flex-1 px-4 py-2 border rounded-lg hover:bg-gray-100'>Cancel</button>
            <button type='submit' className='flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"'>Save</button>
          </div>
        </form>
      </div>
    </div>
  )
}
