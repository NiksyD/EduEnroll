"use client"

import { useState } from "react"
import { PageTransition } from "@/components/page-transition"
import { Navbar } from "@/components/navbar"
import { useEnrollment } from "@/context/enrollment-context"
import { SubjectSelector } from "@/components/teacher/subject-selector"
import { EnrolledStudentsTable } from "@/components/teacher/enrolled-students-table"
import { GradeDialog } from "@/components/teacher/grade-dialog"

export default function TeacherPage() {
  const { subjects, enrollments, updateEnrollmentGrade, getSubjectById } = useEnrollment()

  const [isGradeDialogOpen, setIsGradeDialogOpen] = useState(false)
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null)
  const [selectedEnrollment, setSelectedEnrollment] = useState<string | null>(null)
  const [grade, setGrade] = useState("")
  const [remarks, setRemarks] = useState("")

  const approvedEnrollments = enrollments.filter((enrollment) => enrollment.status === "approved")

  const handleGradeSubmit = () => {
    if (selectedEnrollment) {
      if (grade) {
        updateEnrollmentGrade(selectedEnrollment, grade, remarks)
      } else {
        // If grade is empty, delete the grade
        updateEnrollmentGrade(selectedEnrollment, "", "")
      }
      setSelectedEnrollment(null)
      setGrade("")
      setRemarks("")
      setIsGradeDialogOpen(false)
    }
  }

  const handleDeleteGrade = () => {
    if (selectedEnrollment) {
      updateEnrollmentGrade(selectedEnrollment, "", "")
      setSelectedEnrollment(null)
      setGrade("")
      setRemarks("")
      setIsGradeDialogOpen(false)
    }
  }

  const openGradeDialog = (enrollmentId: string) => {
    const enrollment = approvedEnrollments.find((e) => e.id === enrollmentId)
    if (enrollment) {
      setSelectedEnrollment(enrollmentId)
      setGrade(enrollment.grade || "")
      setRemarks(enrollment.remarks || "")
      setIsGradeDialogOpen(true)
    }
  }

  const subjectsWithEnrollments = subjects.filter((subject) =>
    approvedEnrollments.some((enrollment) => enrollment.subjectId === subject.id),
  )

  const selectedSubjectEnrollments = selectedSubject
    ? approvedEnrollments.filter((enrollment) => enrollment.subjectId === parseInt(selectedSubject))
    : []

  return (
    <>
      <Navbar />
      <PageTransition>
        <div className="container py-8 mx-auto px-4">
          <div className="flex flex-col gap-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight mb-4">Teacher Dashboard</h1>
              <p className="text-muted-foreground mb-8">Manage your classes and grade students</p>
            </div>

            <SubjectSelector
              subjects={subjectsWithEnrollments}
              selectedSubject={selectedSubject}
              onSubjectChange={setSelectedSubject}
            />

            {selectedSubject && (
              <EnrolledStudentsTable
                subjectName={getSubjectById(selectedSubject)?.name || ""}
                enrollments={selectedSubjectEnrollments}
                onGradeClick={openGradeDialog}
              />
            )}

            <GradeDialog
              isOpen={isGradeDialogOpen}
              onOpenChange={setIsGradeDialogOpen}
              grade={grade}
              onGradeChange={setGrade}
              remarks={remarks}
              onRemarksChange={setRemarks}
              onSubmit={handleGradeSubmit}
              onDelete={grade ? handleDeleteGrade : undefined}
            />
          </div>
        </div>
      </PageTransition>
    </>
  )
}
