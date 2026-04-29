'use client'

import { useAuth } from '@/context/AuthContext'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

export default function CoursePageNavbar() {
  const pathname = usePathname()
  const path = ["/", "/signup","/dashboard","/course","/students"]
  const {logout} = useAuth()
  const router = useRouter()

  if(path.includes(pathname)){
    return null
  }

  const handleLogout = async()=>{
    try{
      await logout()
      router.push('/')
    }catch(error){
      console.error("Logout field", error)
    }
  }
  return (
    <nav className='flex justify-between p-4 bg-green-700 text-white shadow-lg'>
        <div className='font-bold text-xl'>Student Management System</div>
        <div className='space-x-6'>
            <Link href="/coursesPage" className='hover:underline'>Courses</Link>
            <Link href="/myCourses" className='hover:underline'>My Courses</Link>
            <button className='bg-red-500 px-3 py-1 rounded' onClick={handleLogout}>Logout</button>
        </div>
    </nav>
  )
}
