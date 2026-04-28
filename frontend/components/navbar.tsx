'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const pathname = usePathname()
  const path = ["/", "/signup", '/coursesPage']

  if(path.includes(pathname)){
    return null
  }
  return (
    <nav className='flex justify-between p-4 bg-green-700 text-white shadow-lg'>
        <div className='font-bold text-xl'>Student Management System</div>
        <div className='space-x-6'>
            <Link href="/dashboard" className='hover:underline'>Dashboard</Link>
            <Link href="/students" className='hover:underline'>Students</Link>
            <Link href="/course" className='hover:underline'>Courses</Link>
            <button className='bg-red-500 px-3 py-1 rounded'>Logout</button>
        </div>
    </nav>
  )
}
