'use client'
import React, { useEffect, useState } from 'react'
import { FiEdit, FiTrash2 } from 'react-icons/fi'
import StudentModal from '../../components/studentModal';
import { deleteStudent, getAllStudents } from '@/services/UserAPI';
import { showConfirmDialog, showErrorAlert, showSuccessAlert } from '@/utils/SweetAlerts';

interface StudentsItem{
    id:number
    name:string
    email:string
    phone:string
    birthday:string
    nic:string
}
export default function Students() {
    const [students, setStudent] = useState<StudentsItem[]>([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isSelectedStudent, setIsSelectedStudent] = useState<StudentsItem | null>(null)

    const handleSuccess = () =>{
        setIsModalOpen(false)
    }

    useEffect(()=>{
        const fetchStudents = async () =>{
            try{
                const response = await getAllStudents()
                setStudent(response.data.data)
                
            }catch(error){
              
                console.error(error)
            }
        }
        fetchStudents()
    },[])

    const handleDelete = (studentDelete: StudentsItem)=>{
        showConfirmDialog(
            'Are you sure?',
            `Do you want to delete ${studentDelete.name} ? `,
            'Yes, Delete id!'
        ).then(async(result)=>{
            if(result.isConfirmed){
                try{
                    await deleteStudent(studentDelete.id)
                    setStudent(preStudents =>
                        preStudents.filter(student=> student.id !== studentDelete.id)
                    )
                    showSuccessAlert('Deleted' ,`${studentDelete.name} has been Deleted`)
                }catch(error){
                    console.error(error)
                    showErrorAlert('error', 'Faild to delete')
                }
            }
        })
    }

    const handleEdit = (student: StudentsItem)=>{
        setIsSelectedStudent(student)
        setIsModalOpen(true)
    }
  return (
    <div className='p-8 bg-gray-50 min-h-screen'>
        <div className='flex justify-between items-center mb-6'>
            <div>
                <h2 className='text-2xl font-bold text-gray-800'>
                    Student Management
                </h2>
            </div>

            <button className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow transition duration-200'
                    onClick={()=> setIsModalOpen(true)}>
                + Add Students
            </button>
        </div>

        <div className='bg-white shadow-md rounded-xl overflow-hidden border border-gray-200'>
            <table className='w-full text-left border-collapse'>
                <thead>
                    <tr className='bg-gray-100 border-b border-gray-200'>
                        <th className='p-4 font-semibold text-gray-700'>Name</th>
                        <th className='p-4 font-semibold text-gray-700'>Email</th>
                        <th className='p-4 font-semibold text-gray-700'>Phone</th>
                        <th className='p-4 font-semibold text-gray-700'>Date of Birth</th>
                        <th className='p-4 font-semibold text-gray-700'>NIC</th>
                        <th className='p-4 font-semibold text-gray-700'>Action</th>

                    </tr>
                </thead>
                <tbody>
                    {students.length > 0 ? (
                        students.map((student)=>(
                            <tr key={student.id} className='border-b hover:bg-gray-50 transition'>
                                <td className='p-4 text-gray-800 font-medium'>{student.name}</td>
                                <td className='p-4 text-gray-800 font-medium'>{student.email}</td>
                                <td className='p-4 text-gray-800 font-medium'>{student.phone}</td>
                                <td className='p-4 text-gray-800 font-medium'>{student.birthday}</td>
                                <td className='p-4 text-gray-800 font-medium'>{student.nic}</td>
                                <td className='p-4 text-gray-800 font-medium'>
                                    <button className='text-blue-500 hover:text-blue-700 transition-colors p-2 hover:bg-blue-50 rounded-full' onClick={()=> handleEdit(student)} ><FiEdit size={18}/></button>
                                    <button className='text-red-500 hover:text-red-700 transition-colors p-2 hover:bg-red-50 rounded-full' onClick={()=> handleDelete(student)}><FiTrash2 size={18}/></button>
                                </td>
                            </tr>
                        ))
                    ):(
                        <tr>
                            <td colSpan={5} className='p-8 text-center text-gray-500'>
                                No Students Yet
                            </td>
                        </tr>
                    )}
                    
                </tbody>
            </table>
        </div>

        <StudentModal
        isOpen={isModalOpen}
        onClose={()=> setIsModalOpen(false)}
        onSuccess={handleSuccess}/>
    </div>
  )
}
