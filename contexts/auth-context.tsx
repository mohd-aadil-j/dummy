"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface User {
  id: string
  email: string
  name: string
  aadhaarNumber?: string
  panNumber?: string
  nationality?: string
  mobileNumber?: string
  dateOfBirth?: string
  age?: number
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  signup: (userData: {
    email: string
    password: string
    name: string
    aadhaarNumber: string
    panNumber: string
    nationality: string
    mobileNumber: string
    dateOfBirth: string
  }) => Promise<boolean>
  updateProfile: (userData: Partial<User>) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const calculateAge = (dateOfBirth: string): number => {
    const today = new Date()
    const birthDate = new Date(dateOfBirth)
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }

    return age
  }

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock successful login
      const mockUser = {
        id: "1",
        email,
        name: email.split("@")[0],
      }

      setUser(mockUser)
      localStorage.setItem("user", JSON.stringify(mockUser))
      setIsLoading(false)
      return true
    } catch (error) {
      setIsLoading(false)
      return false
    }
  }

  const signup = async (userData: {
    email: string
    password: string
    name: string
    aadhaarNumber: string
    panNumber: string
    nationality: string
    mobileNumber: string
    dateOfBirth: string
  }): Promise<boolean> => {
    setIsLoading(true)
    try {
      // Calculate age and validate
      const age = calculateAge(userData.dateOfBirth)
      if (age < 15) {
        setIsLoading(false)
        throw new Error("You must be at least 15 years old to create an account")
      }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock successful signup
      const mockUser: User = {
        id: "1",
        email: userData.email,
        name: userData.name,
        aadhaarNumber: userData.aadhaarNumber,
        panNumber: userData.panNumber,
        nationality: userData.nationality,
        mobileNumber: userData.mobileNumber,
        dateOfBirth: userData.dateOfBirth,
        age,
      }

      setUser(mockUser)
      localStorage.setItem("user", JSON.stringify(mockUser))
      setIsLoading(false)
      return true
    } catch (error) {
      setIsLoading(false)
      return false
    }
  }

  const updateProfile = async (userData: Partial<User>): Promise<boolean> => {
    setIsLoading(true)
    try {
      // Recalculate age if date of birth is updated
      if (userData.dateOfBirth) {
        const age = calculateAge(userData.dateOfBirth)
        if (age < 15) {
          setIsLoading(false)
          throw new Error("You must be at least 15 years old")
        }
        userData.age = age
      }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Update user data
      const updatedUser = { ...user, ...userData } as User
      setUser(updatedUser)
      localStorage.setItem("user", JSON.stringify(updatedUser))
      setIsLoading(false)
      return true
    } catch (error) {
      setIsLoading(false)
      return false
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, updateProfile, logout, isLoading }}>
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
