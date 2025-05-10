"use client"

import { createContext, useContext, useState, ReactNode } from "react"
import { createClient } from '@supabase/supabase-js'

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseAnonKey)

interface Student {
  id: string
  username: string
  name: string
}

interface AuthContextType {
  student: Student | null
  login: (username: string, password: string) => Promise<boolean>
  signup: (username: string, name: string, password: string) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [student, setStudent] = useState<Student | null>(null)

  const login = async (username: string, password: string) => {
    try {
      const { data, error } = await supabase
        .from('students')
        .select('id, username, name')
        .eq('username', username)
        .eq('password', password)
        .single()

      if (error) throw error

      if (data) {
        setStudent(data)
        return true
      }
      return false
    } catch (error) {
      console.error('Login error:', error)
      return false
    }
  }

  const signup = async (username: string, name: string, password: string) => {
    try {
      // First check if username already exists
      const { data: existingStudent } = await supabase
        .from('students')
        .select('id')
        .eq('username', username)
        .single()

      if (existingStudent) {
        return false // Username already exists
      }

      // Create new student
      const { data, error } = await supabase
        .from('students')
        .insert([{ username, name, password }])
        .select('id, username, name')
        .single()

      if (error) throw error

      if (data) {
        setStudent(data)
        return true
      }
      return false
    } catch (error) {
      console.error('Signup error:', error)
      return false
    }
  }

  const logout = () => {
    setStudent(null)
  }

  return (
    <AuthContext.Provider value={{ student, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
} 