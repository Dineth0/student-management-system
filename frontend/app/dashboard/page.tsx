import Link from 'next/link'
import React from 'react'

export default function page() {
  return (
    <div className='p-8 bg-green-50 min-h-screen'>
        <div className='flex justify-center items-center mb-10'>
            <div>
                <h1 className='text-3xl font-bold text-gray-800'>Admin Dashboard</h1>
            </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6'>
            <Link href="/students">
                <div className='p-6 bg-white border-l-4 border-blue-500 rounded-xl shadow-sm hover:shadow-md transition cursor-pointer group'>
                    <div className='text-gray-500 text-sm font-medium uppercase tracking-wider'>
                        Total Students
                    </div>

                    <div className='flex justify-between items-end mt-4'>
                        <span className='text-4xl font-bold text-gray-800 group-hover:text-blue-600 transition'>
                            40
                        </span>
                        <span className='text-blue-500 text-sm font-semibold'>
                            View All
                        </span>
                    </div>
                </div>
            </Link>


            <Link href="/course">
                <div className='p-6 bg-white border-l-4 border-green-500 rounded-xl shadow-sm hover:shadow-md transition cursor-pointer group'>
                    <div className='text-gray-500 text-sm font-medium uppercase tracking-wider'>
                        Total Courses
                    </div>

                    <div className='flex justify-between items-end mt-4'>
                        <span className='text-4xl font-bold text-gray-800 group-hover:text-blue-600 transition'>
                            40
                        </span>
                        <span className='text-green-500 text-sm font-semibold'>
                            View All
                        </span>
                    </div>
                </div>
            </Link>
        </div>
    </div>
  )
}
