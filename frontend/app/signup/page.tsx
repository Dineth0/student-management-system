'use client'

import { addUser } from '@/services/UserAPI';
import Link from 'next/link'
import React, { useState } from 'react'
import { HiCalendar, HiIdentification, HiLockClosed, HiMail, HiPhone, HiUser } from 'react-icons/hi';
import {showErrorAlert, showSuccessAlert} from "../../utils/SweetAlerts"
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';


interface ApiErrorResponse{
    message: string
}
export default function UserRegister() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [birthday, setBirthday] = useState('');
    const [nic, setNic] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        setLoading(true)
        setError(null)

        const payload = {name, email, phone, birthday, nic, password}

        try{
            const response = await addUser(payload)
            showSuccessAlert('success',"Created Account")

            setName('')
            setEmail('')
            setPhone('')
            setBirthday('')
            setNic('')
            setPassword('')

            setTimeout(()=>{
                router.push('/')
            },2000)
            return response.data

            

        }catch(error){
            setLoading(false)
            const err = error as AxiosError<ApiErrorResponse>
            const errorMessage = err.response?.data?.message || "Registration failed. Please try again"
            setError(errorMessage)
            showErrorAlert("Registration Field", errorMessage)
            console.error(error)
        }finally{
            setLoading(false)
        }
        
    }

  return (
    <main className="min-h-screen bg-[#F1F1F1] flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-md rounded-[40px] shadow-xl overflow-hidden flex flex-col min-h-[550px] relative px-8 pt-20">
                <h1 className="text-3xl font-bold text-[#213401] text-center mb-5">Create Your Account</h1>

                
                <form className='p-6 space-y-4' onSubmit={handleSubmit}>
                    <div className='relative'>
                        <HiUser className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400'/>
                        <input
                        id="name"
                        name='name'
                        type='text'
                        required
                        autoComplete='name'
                        placeholder='User Name'
                        value={name}
                        onChange={(e)=>setName(e.target.value)}
                        className='w-full py-4 pl-12 pr-4 text-gray-900 border border-gray-200 rounded-2xl focus:outline-none focus:border-[#A4E671] transition-all'/>
                    </div>

                    <div className='relative'>
                        <HiMail className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400'/>
                        <input
                        id="email"
                        name='email'
                        type='email'
                        required
                        autoComplete='email'
                        placeholder='Enter Your Email'
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        className='w-full py-4 pl-12 pr-4 text-gray-900 border border-gray-200 rounded-2xl focus:outline-none focus:border-[#A4E671] transition-all'/>
                    </div>

                    <div className='relative'>
                        <HiPhone className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400'/>
                        <input
                        id="phone"
                        name='phone'
                        type='text'
                        required
                        autoComplete='phone'
                        placeholder='Enter Your phone Number'
                        value={phone}
                        onChange={(e)=>setPhone(e.target.value)}
                        className='w-full py-4 pl-12 pr-4 text-gray-900 border border-gray-200 rounded-2xl focus:outline-none focus:border-[#A4E671] transition-all'/>
                    </div>

                    <div className='relative'>
                        <HiCalendar className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400'/>
                        <input
                        id="birthday"
                        name='birthday'
                        type='date'
                        required
                        autoComplete='birthday'
                        placeholder='Your Birthday'
                        value={birthday}
                        onChange={(e)=>setBirthday(e.target.value)}
                        className='w-full py-4 pl-12 pr-4 text-gray-900 border border-gray-200 rounded-2xl focus:outline-none focus:border-[#A4E671] transition-all'/>
                    </div>

                    <div className='relative'>
                        <HiIdentification className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400'/>
                        <input
                        id="nic"
                        name='nic'
                        type='text'
                        required
                        autoComplete='nic'
                        placeholder='Your NIC'
                        value={nic}
                        onChange={(e)=>setNic(e.target.value)}
                        className='w-full py-4 pl-12 pr-4 text-gray-900 border border-gray-200 rounded-2xl focus:outline-none focus:border-[#A4E671] transition-all'/>
                    </div>

                    <div className='relative'>
                        <HiLockClosed className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400'/>
                        <input
                        id="password"
                        name='password'
                        type='password'
                        required
                        autoComplete='password'
                        placeholder='Create a Password'
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        className='w-full py-4 pl-12 pr-4 text-gray-900 border border-gray-200 rounded-2xl focus:outline-none focus:border-[#A4E671] transition-all'/>
                    </div>

                    {error && (
                        <div className='mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm text-center animate-pulse'>
                            {error}
                        </div>
                    )}

                    <button 
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 bg-[#213400] text-white rounded-full font-bold hover:bg-[#254108] transition-all mt-4">
                            {loading ? "Creating Account..." : "Create Account"}
                    </button>
                </form>    
                <div className="text-center  pb-10">
                    <p className="text-sm text-[#213400]">
                        Already have an account? <Link href="/" className="text-black font-bold hover:underline">Login</Link>
                    </p>
                </div>
            </div>
        </main>
  )
}
