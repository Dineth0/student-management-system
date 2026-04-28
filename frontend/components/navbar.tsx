'use client'

import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className='flex justify-between p-4 bg-blue-700 text-white shadow-lg'>
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
