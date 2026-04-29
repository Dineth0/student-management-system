'use client'

import { getCurrentUser, userlogout } from "@/services/AuthAPI"
import { usePathname } from "next/navigation"
import { createContext, ReactNode, useContext, useEffect, useState } from "react"


interface User{
    id:number
    email:string
    name:string
    role:string
}

interface AuthContextType{
    user: User | null
    loading: boolean
    setUser:(user:User | null) => void
    logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({children,}:{children:ReactNode})=>{
    const[user, setUser] = useState<User | null>(null)
    const[loading, setLoading] = useState(true)
    const pathname = usePathname()


    useEffect(()=>{
        const fetchCurrentUser = async()=>{
            if(pathname === "/" || pathname==="/signup"){
                setLoading(false)
                return
            }

            try{
                const response = await getCurrentUser()
                 
                setUser(response.data.data)
            }catch(error){
            console.error("User not loged", error)
            setUser(null) 
            }finally{
                setLoading(false)
            }
        }
        fetchCurrentUser()
    },[pathname])

    const logout = async()=>{
        try{
            await userlogout()
            setUser(null)
        }catch(error){
            console.error(error)
        }
        // setUser(null)
        // window.location.href = '/'
    }

    return (
        <AuthContext.Provider value={{user, setUser, loading, logout}}>
            {children}
        </AuthContext.Provider>
    )


}
 export const useAuth = ()=>{
    const context = useContext(AuthContext)
    if(!context){
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}