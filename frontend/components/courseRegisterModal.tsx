'use client'

import { useAuth } from '@/context/AuthContext' // Context එකෙන් කෙලින්ම ගන්න පුළුවන්
import { registration } from '@/services/CourseRegister'
import { showErrorAlert, showSuccessAlert } from '@/utils/SweetAlerts'
import { AxiosError } from 'axios'
import React, { useState } from 'react'

// Backend DTO එකට ගැළපෙන Interface එක
interface RegisterItem {
    id?: number;
    studentId: number;
    courseId: number;
    registrationDate: string;
    paymentStatus: string;
   
}

interface Course {
    id: number;
    name: string;
    course_code: string;
    fee: number;
}

interface Props {
    isOpen: boolean;
    onClose: () => void;
    course: Course; // User ව Props වලින් එවන්නත් පුළුවන්, Context එකෙන් ගන්නත් පුළුවන්
}
interface ApiErrorResponse {
  message: string;
}

export default function CourseRegisterModal({ isOpen, onClose, course }: Props) {
    const { user } = useAuth(); // මෙතනදී Context එකෙන් User ව ගන්නවා
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null)
    

    if (!isOpen) return null;

    const handleEnroll = async () => {
        if (!user) {
            showErrorAlert('Error', 'Please login to enroll');
            return;
        }

        setLoading(true);
        try {
            // අද දිනය YYYY-MM-DD format එකට ගැනීම
            const today = new Date().toISOString().split('T')[0];

            const enrollmentData: RegisterItem = {
                studentId: user.id, 
                courseId: course.id,
                registrationDate: today,
                paymentStatus: "PENDING",
            };

            await registration(enrollmentData);
            showSuccessAlert('Success', `You have successfully enrolled in ${course.name}`);
            onClose();
        } catch (error) {
            setLoading(false)
            const err = error as AxiosError<ApiErrorResponse>;
            const errorMessage = typeof err === 'string' ? err:'Faild to add Student. Please try again.'; 
            setError(errorMessage);
            showErrorAlert('Course Add Failed', errorMessage);
            console.error(' error:', error);
            showErrorAlert('Enrollment Failed Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 p-4'>
            <div className='bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200'>
                <div className='p-6 border-b bg-blue-50'>
                    <h3 className='text-xl font-bold text-gray-800'>Confirm Enrollment</h3>
                </div>

                <div className='p-6 space-y-4 text-gray-700'>
                    {/* Student Info */}
                    <div className='bg-gray-50 p-4 rounded-lg border border-gray-200'>
                        <p className='text-xs text-gray-500 uppercase font-bold mb-1'>Student Details</p>
                        <p className='font-semibold'>{user?.name}</p>
                        <p className='text-sm text-gray-600'>{user?.email}</p>
                    </div>

                    {/* Course Info */}
                    <div className='bg-gray-50 p-4 rounded-lg border border-gray-200'>
                        <p className='text-xs text-gray-500 uppercase font-bold mb-1'>Course Details</p>
                        <p className='font-semibold text-blue-600'>{course?.name}</p>
                        <p className='text-sm'>Code: {course?.course_code}</p>
                    </div>

                    {/* Price Info */}
                    <div className='flex justify-between items-center py-2 px-1'>
                        <span className='text-gray-500 font-medium'>Total Fee:</span>
                        <span className='text-xl font-bold text-green-600'>Rs. {course?.fee.toLocaleString()}</span>
                    </div>

                    {error && (
                        <div className='mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm text-center animate-pulse'>
                        {error}
                        </div>
                    )}

                    <div className='flex gap-3 pt-4'>
                        <button 
                            disabled={loading}
                            onClick={onClose} 
                            className='flex-1 py-2.5 border border-gray-300 rounded-xl hover:bg-gray-100 transition font-medium'>
                            Cancel
                        </button>
                        <button 
                            onClick={handleEnroll} 
                            disabled={loading}
                            className='flex-1 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition font-bold shadow-lg shadow-blue-200 disabled:opacity-50'>
                            {loading ? 'Processing...' : 'Confirm & Enroll'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}