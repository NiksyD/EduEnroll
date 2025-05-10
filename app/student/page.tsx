"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { PageTransition } from "@/components/page-transition"
import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useEnrollment } from "@/context/enrollment-context"
import { useAuth } from "@/context/auth-context"
import { AvailableSubjects } from "@/components/student/available-subjects"
import { EnrollmentDialog } from "@/components/student/enrollment-dialog"
import { EnrollmentTabs } from "@/components/student/enrollment-tabs"
import { Button } from "@/components/ui/button"

export default function StudentPage() {
  const router = useRouter()
  const { student, logout } = useAuth()
  const { subjects, enrollments, addEnrollment, getSubjectById, hasCompletedPrerequisite } = useEnrollment()

  const [isEnrollDialogOpen, setIsEnrollDialogOpen] = useState(false)
  const [selectedSubjectId, setSelectedSubjectId] = useState<number | null>(null)

  useEffect(() => {
    if (!student) {
      router.push("/")
    }
  }, [student, router])

  if (!student) {
    return null
  }

  const studentEnrollments = enrollments.filter((enrollment) => enrollment.studentId === student.name)
  const enrolledSubjectIds = studentEnrollments.map((enrollment) => enrollment.subjectId)

  const availableSubjects = subjects.filter((subject) => !enrolledSubjectIds.includes(subject.id))

  const handleEnroll = () => {
    if (selectedSubjectId) {
      addEnrollment({
        studentId: student.name,
        studentName: student.name,
        subjectId: selectedSubjectId,
        status: "pending",
      })
      setSelectedSubjectId(null)
      setIsEnrollDialogOpen(false)
    }
  }

  const canEnrollInSubject = (subjectId: number) => {
    const subject = getSubjectById(subjectId)
    if (!subject) return false
    return hasCompletedPrerequisite(student.name, subject.prerequisiteId)
  }

  const getPrerequisiteWarning = (subjectId: number) => {
    const subject = getSubjectById(subjectId)
    if (!subject || !subject.prerequisiteId) return null

    const prerequisite = getSubjectById(subject.prerequisiteId)
    if (!prerequisite) return null

    const hasCompleted = hasCompletedPrerequisite(student.name, subject.prerequisiteId)

    if (!hasCompleted) {
      return `You need to complete ${prerequisite.name} first`
    }

    return null
  }

  return (
    <>
      <Navbar />
      <PageTransition>
        <div className="container py-8 mx-auto px-4">
          <div className="flex flex-col gap-8">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold tracking-tight mb-4">Student Dashboard</h1>
                <p className="text-muted-foreground mb-8">Browse and enroll in available subjects</p>
              </div>
              <Button variant="outline" onClick={logout}>
                Logout
              </Button>
            </div>

            <Card className="mb-0">
              <CardHeader>
                <CardTitle>Welcome, {student.name}!</CardTitle>
                <CardDescription>You are successfully logged in to your student account.</CardDescription>
              </CardHeader>
            </Card>

            <AvailableSubjects
              subjects={availableSubjects}
              onEnrollClick={(subjectId) => {
                setSelectedSubjectId(subjectId)
                setIsEnrollDialogOpen(true)
              }}
              getPrerequisiteWarning={getPrerequisiteWarning}
              canEnrollInSubject={canEnrollInSubject}
              getSubjectById={getSubjectById}
            />

            <Card>
              <CardHeader>
                <CardTitle>My Enrollments</CardTitle>
                <CardDescription>Track your enrollment status and grades</CardDescription>
              </CardHeader>
              <CardContent>
                <EnrollmentTabs enrollments={studentEnrollments} getSubjectById={getSubjectById} />
              </CardContent>
            </Card>
          </div>
        </div>

        <EnrollmentDialog
          isOpen={isEnrollDialogOpen}
          onOpenChange={setIsEnrollDialogOpen}
          availableSubjects={availableSubjects}
          selectedSubjectId={selectedSubjectId}
          onSubjectSelect={setSelectedSubjectId}
          onEnroll={handleEnroll}
          getPrerequisiteWarning={getPrerequisiteWarning}
          canEnrollInSubject={canEnrollInSubject}
        />
      </PageTransition>
    </>
  )
}
