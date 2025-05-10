"use client"

import { PageTransition } from "@/components/page-transition"
import { Navbar } from "@/components/navbar"
import { useEnrollment, type Subject } from "@/context/enrollment-context"
import { SubjectManagement } from "@/components/admin/subject-management"
import { EnrollmentManagement } from "@/components/admin/enrollment-management"

export default function AdminPage() {
  const { subjects, enrollments, addSubject, updateSubject, deleteSubject, updateEnrollmentStatus, getSubjectName, deleteEnrollment } =
    useEnrollment()

  const handleAddSubject = async (subject: Omit<Subject, "id">) => {
    await addSubject(subject)
  }

  return (
    <>
      <Navbar />
      <PageTransition>
        <div className="container py-8 mx-auto px-4">
          <div className="flex flex-col gap-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight mb-4">Admin Dashboard</h1>
              <p className="text-muted-foreground mb-8">Manage subjects and student enrollments</p>
            </div>

            <SubjectManagement
              subjects={subjects}
              getSubjectName={getSubjectName}
              onAddSubject={handleAddSubject}
              onUpdateSubject={updateSubject}
              onDeleteSubject={deleteSubject}
            />

            <EnrollmentManagement
              enrollments={enrollments}
              getSubjectName={getSubjectName}
              onApproveEnrollment={(id) => updateEnrollmentStatus(id, "approved")}
              onRejectEnrollment={(id, remarks) => updateEnrollmentStatus(id, "rejected", remarks)}
              onDeleteEnrollment={deleteEnrollment}
            />
          </div>
        </div>
      </PageTransition>
    </>
  )
}
