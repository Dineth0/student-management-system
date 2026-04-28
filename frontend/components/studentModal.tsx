import React, { useEffect, useState } from 'react'

interface StudentsItem{
    id:number
    name:string
    email:string
    phone:string
    birthday:string
    nic:string
}

interface Props{
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
  student?: StudentsItem | null
}
export default function StudentModal({isOpen, onClose, onSuccess, student}:Props) {

  const [formData, setFormData] = useState({
    id: student?.id || 0,
    name: student?.name || '',
    email: student?.email || '',
    phone: student?.phone || '',
    birthday: student?.birthday || '',
    nic: student?.nic || ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
    const {name, value} = e.target
    setFormData((prev)=>({
      ...prev,
      [name]: value
    }))
  }
  

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
            name='name'
            value={formData.name}
            onChange={handleChange}
            className='w-full text-gray-900 p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500'/>
          </div>

          <div>
            <label className='"block text-sm font-medium text-gray-700 mb-1'>Email</label>
            <input
            type='email'
            required
            name='email'
            value={formData.email}
            onChange={handleChange}
            className='w-full text-gray-900 p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500'/>
          </div>

          <div>
            <label className='"block text-sm font-medium text-gray-700 mb-1'>Phone</label>
            <input
            type='text'
            required
            name='phone'
            value={formData.phone}
            onChange={handleChange}
            className='w-full text-gray-900 p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500'/>
          </div>

          <div>
            <label className='"block text-sm font-medium text-gray-700 mb-1'>Birthday</label>
            <input
            type='date'
            required
            name='birthday'
            value={formData.birthday}
            onChange={handleChange}
            className='w-full text-gray-900 p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500'/>
          </div>

          <div>
            <label className='"block text-sm font-medium text-gray-700 mb-1'>NIC</label>
            <input
            type='text'
            required
            name='nic'
            value={formData.nic}
            onChange={handleChange}
            className='w-full text-gray-900 p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500'/>
          </div>

          <div className='flex gap-3 mt-6'>
            <button type='button' onClick={onClose} className='flex-1  text-gray-900 px-4 py-2 border rounded-lg hover:bg-gray-100'>Cancel</button>
            <button type='submit' className='flex-1  px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"'>Save</button>
          </div>
        </form>
      </div>
    </div>
  )
}
