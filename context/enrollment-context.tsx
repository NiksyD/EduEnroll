"use client"

import { createContext, useContext, useState, type ReactNode, useEffect } from "react"
import { createClient } from "../lib/supabase/client"

// Define types
export type Subject = {
  id: number
  name: string
  prerequisiteId: string | null
  description: string
}

export type EnrollmentStatus = "pending" | "approved" | "rejected"

export type Enrollment = {
  id: string
  studentId: string
  studentName: string
  subjectId: number
  status: EnrollmentStatus
  grade?: string
  remarks?: string
}

// Create context
export type EnrollmentContextType = {
  subjects: Subject[]
  enrollments: Enrollment[]
  addSubject: (subject: Omit<Subject, "id">) => void
  updateSubject: (subject: Subject) => void
  deleteSubject: (id: string) => void
  addEnrollment: (enrollment: Omit<Enrollment, "id">) => void
  updateEnrollmentStatus: (id: string, status: EnrollmentStatus, remarks?: string) => void
  updateEnrollmentGrade: (id: string, grade: string, remarks: string) => void
  deleteEnrollment: (id: string) => void
  getSubjectById: (id: number | string) => Subject | undefined
  getSubjectName: (id: number | string) => string
  hasCompletedPrerequisite: (studentId: string, prerequisiteId: string | null) => boolean
  isLoading: boolean
}

const EnrollmentContext = createContext<EnrollmentContextType | undefined>(undefined)

// Provider component
export function EnrollmentProvider({ children }: { children: ReactNode }) {
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [enrollments, setEnrollments] = useState<Enrollment[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const supabase = createClient()

  // Fetch subjects and enrollments from Supabase on component mount
  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true)
        
        // Fetch subjects
        const { data: subjectsData, error: subjectsError } = await supabase
          .from('subjects')
          .select('*')
        
        if (subjectsError) {
          console.error('Error fetching subjects:', subjectsError)
          return
        }
        
        if (subjectsData) {
          // Convert snake_case to camelCase
          const formattedSubjects = subjectsData.map(subject => ({
            id: subject.id,
            name: subject.name,
            description: subject.description,
            prerequisiteId: subject.prerequisite_id
          }))
          setSubjects(formattedSubjects)
        }

        // Fetch enrollments
        const { data: enrollmentsData, error: enrollmentsError } = await supabase
          .from('enrollments')
          .select('*')
        
        if (enrollmentsError) {
          console.error('Error fetching enrollments:', enrollmentsError)
          return
        }
        
        if (enrollmentsData) {
          // Convert snake_case to camelCase
          const formattedEnrollments = enrollmentsData.map(enrollment => ({
            id: enrollment.id,
            studentId: enrollment.student_id,
            studentName: enrollment.student_name,
            subjectId: enrollment.subject_id,
            status: enrollment.status,
            grade: enrollment.grade,
            remarks: enrollment.remarks
          }))
          setEnrollments(formattedEnrollments)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const addSubject = async (subject: Omit<Subject, "id">) => {
    try {
      // Convert camelCase to snake_case for Supabase
      const supabaseSubject = {
        name: subject.name,
        description: subject.description,
        prerequisite_id: subject.prerequisiteId
      }
      
      const { data, error } = await supabase
        .from('subjects')
        .insert([supabaseSubject])
        .select()
      
      if (error) {
        console.error('Error adding subject:', {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code
        })
        return
      }
      
      if (data && data.length > 0) {
        // Convert snake_case back to camelCase
        const newSubject: Subject = {
          id: data[0].id,
          name: data[0].name,
          description: data[0].description,
          prerequisiteId: data[0].prerequisite_id
        }
        setSubjects([...subjects, newSubject])
      }
    } catch (error) {
      console.error('Error adding subject:', {
        error,
        subjectData: subject
      })
    }
  }

  const updateSubject = async (updatedSubject: Subject) => {
    try {
      const { error } = await supabase
        .from('subjects')
        .update(updatedSubject)
        .eq('id', updatedSubject.id)
      
      if (error) {
        console.error('Error updating subject:', error)
        return
      }
      
      setSubjects(subjects.map((subject) => 
        subject.id === updatedSubject.id ? updatedSubject : subject
      ))
    } catch (error) {
      console.error('Error updating subject:', error)
    }
  }

  const deleteSubject = async (id: string) => {
    try {
      const { error } = await supabase
        .from('subjects')
        .delete()
        .eq('id', id)
      
      if (error) {
        console.error('Error deleting subject:', error)
        return
      }
      
      setSubjects(subjects.filter((subject) => subject.id !== parseInt(id)))
    } catch (error) {
      console.error('Error deleting subject:', error)
    }
  }

  const addEnrollment = async (enrollment: Omit<Enrollment, "id">) => {
    try {
      // Convert camelCase to snake_case for Supabase
      const supabaseEnrollment = {
        student_id: enrollment.studentId,
        student_name: enrollment.studentName,
        subject_id: enrollment.subjectId,
        status: enrollment.status,
        grade: enrollment.grade,
        remarks: enrollment.remarks
      }
      
      const { data, error } = await supabase
        .from('enrollments')
        .insert([supabaseEnrollment])
        .select()
      
      if (error) {
        console.error('Error adding enrollment:', error)
        return
      }
      
      if (data && data.length > 0) {
        // Convert snake_case back to camelCase
        const newEnrollment: Enrollment = {
          id: data[0].id,
          studentId: data[0].student_id,
          studentName: data[0].student_name,
          subjectId: data[0].subject_id,
          status: data[0].status,
          grade: data[0].grade,
          remarks: data[0].remarks
        }
        setEnrollments([...enrollments, newEnrollment])
      }
    } catch (error) {
      console.error('Error adding enrollment:', error)
    }
  }

  const updateEnrollmentStatus = async (id: string, status: EnrollmentStatus, remarks?: string) => {
    try {
      const { error } = await supabase
        .from('enrollments')
        .update({ status, remarks })
        .eq('id', id)
      
      if (error) {
        console.error('Error updating enrollment status:', error)
        return
      }
      
      setEnrollments(
        enrollments.map((enrollment) =>
          enrollment.id === id ? { ...enrollment, status, remarks: remarks || enrollment.remarks } : enrollment,
        ),
      )
    } catch (error) {
      console.error('Error updating enrollment status:', error)
    }
  }

  const updateEnrollmentGrade = async (id: string, grade: string, remarks: string) => {
    try {
      const { error } = await supabase
        .from('enrollments')
        .update({ grade, remarks })
        .eq('id', id)
      
      if (error) {
        console.error('Error updating enrollment grade:', error)
        return
      }
      
      setEnrollments(
        enrollments.map((enrollment) => 
          enrollment.id === id ? { ...enrollment, grade, remarks } : enrollment
        ),
      )
    } catch (error) {
      console.error('Error updating enrollment grade:', error)
    }
  }

  const deleteEnrollment = async (id: string) => {
    try {
      const { error } = await supabase
        .from('enrollments')
        .delete()
        .eq('id', id)
      
      if (error) {
        console.error('Error deleting enrollment:', error)
        return
      }
      
      setEnrollments(enrollments.filter((enrollment) => enrollment.id !== id))
    } catch (error) {
      console.error('Error deleting enrollment:', error)
    }
  }

  const getSubjectById = (id: number | string) => {
    const numericId = typeof id === 'string' ? parseInt(id) : id
    return subjects.find((subject) => subject.id === numericId)
  }

  const getSubjectName = (id: number | string) => {
    const numericId = typeof id === 'string' ? parseInt(id) : id
    const subject = subjects.find((subject) => subject.id === numericId)
    return subject ? subject.name : "Unknown Subject"
  }

  const hasCompletedPrerequisite = (studentId: string, prerequisiteId: string | null) => {
    if (!prerequisiteId) return true

    const prerequisiteEnrollment = enrollments.find(
      (enrollment) =>
        enrollment.studentId === studentId &&
        enrollment.subjectId === parseInt(prerequisiteId) &&
        enrollment.status === "approved",
    )

    return !!prerequisiteEnrollment
  }

  return (
    <EnrollmentContext.Provider
      value={{
        subjects,
        enrollments,
        addSubject,
        updateSubject,
        deleteSubject,
        addEnrollment,
        updateEnrollmentStatus,
        updateEnrollmentGrade,
        deleteEnrollment,
        getSubjectById,
        getSubjectName,
        hasCompletedPrerequisite,
        isLoading
      }}
    >
      {children}
    </EnrollmentContext.Provider>
  )
}

// Custom hook
export function useEnrollment() {
  const context = useContext(EnrollmentContext)
  if (context === undefined) {
    throw new Error("useEnrollment must be used within an EnrollmentProvider")
  }
  return context
}
