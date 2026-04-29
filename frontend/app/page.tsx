'use client'

import { useAuth } from "@/context/AuthContext";
import { login } from "@/services/AuthAPI";
import { showErrorAlert, showSuccessAlert } from "@/utils/SweetAlerts";
import { AxiosError } from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { HiOutlineLockClosed, HiOutlineMail } from "react-icons/hi";


interface ApiErrorResponse{
    message: string
}
export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const[loading, setLoading] = useState(false)
    const[error, setError] = useState<string | null>(null)

    const {setUser} = useAuth()
    const router = useRouter()

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        setLoading(true)

        try{
            const response = await login({email, password})
            const userData = response.data.data
            setUser(userData)

            showSuccessAlert("Success", "Loging Successfully")
            setEmail('')
            setPassword('')

            if(userData.role === "ADMIN"){
                router.push('/dashboard')
            }else{
                router.push('/coursesPage')
            }
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
        <main className="min-h-screen bg-green-50 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-md rounded-[40px] shadow-xl overflow-hidden flex flex-col min-h-[550px] relative px-8 pt-20">
                <h1 className="text-3xl font-bold text-[#213401] text-center mb-12">Login</h1>

                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div className="relative">
                        <HiOutlineMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                        <input
                            id="email"
                            name="email"
                            required
                            autoComplete="email"
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
                            type="email"
                            placeholder="Email"
                            className="w-full py-4 pl-12 pr-4 text-gray-900 border border-gray-200 rounded-2xl focus:outline-none focus:border-[#A4E671] transition-all"
                        />
                    </div>

                    <div className="relative">
                        <HiOutlineLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                        <input
                            id="password"
                            name="password"
                            required
                            autoComplete="password"
                            value={password}
                            onChange={(e)=>setPassword(e.target.value)}
                            type="password"
                            placeholder="Password"
                            className="w-full py-4 pl-12 pr-12 text-gray-900 border border-gray-200 rounded-2xl focus:outline-none focus:border-[#A4E671] transition-all"
                        />
                    </div>

                    <div className="text-center">
                        <Link href="#" className="text-sm text-[#213401] underline decoration-[#213401] underline-offset-4">
                            Forgot Password?
                        </Link>
                    </div>
                    {error && (
                        <div className='mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm text-center animate-pulse'>
                            {error}
                        </div>
                    )}
                    <button
                        type="submit"
                        className="w-full py-4 bg-[#213400] text-white rounded-full font-bold hover:bg-[#254108] transition-all mt-4">
                            {loading ? 'Login....': 'Login'}
                    </button>
         
                </form>

                <div className="text-center mt-5 pb-10">
                    <p className="text-sm text-[#213400]">
                        Need an account? <Link href="/signup" className="text-black font-bold hover:underline">Sign up</Link>
                    </p>
                </div>
            </div>
        </main>
    );
}
