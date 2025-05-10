import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CheckCircle, XCircle, Trash2 } from "lucide-react"
import { motion } from "framer-motion"
import { StatusBadge } from "@/components/status-badge"
import { type Enrollment } from "@/context/enrollment-context"
import { RejectEnrollmentDialog } from "./dialogs/reject-enrollment-dialog"
import { DeleteEnrollmentDialog } from "./dialogs/delete-enrollment-dialog"

interface EnrollmentManagementProps {
  enrollments: Enrollment[]
  getSubjectName: (id: string) => string
  onApproveEnrollment: (id: string) => void
  onRejectEnrollment: (id: string, remarks: string) => void
  onDeleteEnrollment: (id: string) => void
}

export function EnrollmentManagement({
  enrollments,
  getSubjectName,
  onApproveEnrollment,
  onRejectEnrollment,
  onDeleteEnrollment,
}: EnrollmentManagementProps) {
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false)
  const [isDeleteEnrollmentOpen, setIsDeleteEnrollmentOpen] = useState(false)
  const [currentEnrollment, setCurrentEnrollment] = useState<Enrollment | null>(null)
  const [currentEnrollmentId, setCurrentEnrollmentId] = useState("")

  const pendingEnrollments = enrollments.filter((enrollment) => enrollment.status === "pending")
  const approvedEnrollments = enrollments.filter((enrollment) => enrollment.status === "approved")
  const rejectedEnrollments = enrollments.filter((enrollment) => enrollment.status === "rejected")

  const openRejectDialog = (id: string) => {
    setCurrentEnrollmentId(id)
    setIsRejectDialogOpen(true)
  }

  const openDeleteEnrollmentDialog = (enrollment: Enrollment) => {
    setCurrentEnrollment(enrollment)
    setIsDeleteEnrollmentOpen(true)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Enrollment Management</CardTitle>
        <CardDescription>Review and manage student enrollment requests</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="pending">
          <TabsList className="mb-4">
            <TabsTrigger value="pending">
              Pending
              {pendingEnrollments.length > 0 && (
                <span className="ml-2 rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                  {pendingEnrollments.length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="approved">
              Approved
              {approvedEnrollments.length > 0 && (
                <span className="ml-2 rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-200">
                  {approvedEnrollments.length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="rejected">
              Rejected
              {rejectedEnrollments.length > 0 && (
                <span className="ml-2 rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800 dark:bg-red-900 dark:text-red-200">
                  {rejectedEnrollments.length}
                </span>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pending">
            {pendingEnrollments.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingEnrollments.map((enrollment) => (
                    <motion.tr
                      key={enrollment.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                    >
                      <TableCell className="font-medium">{enrollment.studentName}</TableCell>
                      <TableCell>{getSubjectName(enrollment.subjectId.toString())}</TableCell>
                      <TableCell>
                        <StatusBadge status={enrollment.status} />
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => onApproveEnrollment(enrollment.id)}
                          >
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span className="sr-only">Approve</span>
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => openRejectDialog(enrollment.id)}>
                            <XCircle className="h-4 w-4 text-red-500" />
                            <span className="sr-only">Reject</span>
                          </Button>
                        </div>
                      </TableCell>
                    </motion.tr>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-6 text-muted-foreground">No pending enrollments</div>
            )}
          </TabsContent>

          <TabsContent value="approved">
            {approvedEnrollments.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Grade</TableHead>
                    <TableHead>Remarks</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {approvedEnrollments.map((enrollment) => (
                    <TableRow key={enrollment.id}>
                      <TableCell className="font-medium">{enrollment.studentName}</TableCell>
                      <TableCell>{getSubjectName(enrollment.subjectId.toString())}</TableCell>
                      <TableCell>
                        <StatusBadge status={enrollment.status} />
                      </TableCell>
                      <TableCell>{enrollment.grade || "Not graded"}</TableCell>
                      <TableCell>{enrollment.remarks || "-"}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openDeleteEnrollmentDialog(enrollment)}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-6 text-muted-foreground">No approved enrollments</div>
            )}
          </TabsContent>

          <TabsContent value="rejected">
            {rejectedEnrollments.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Remarks</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rejectedEnrollments.map((enrollment) => (
                    <TableRow key={enrollment.id}>
                      <TableCell className="font-medium">{enrollment.studentName}</TableCell>
                      <TableCell>{getSubjectName(enrollment.subjectId.toString())}</TableCell>
                      <TableCell>
                        <StatusBadge status={enrollment.status} />
                      </TableCell>
                      <TableCell>{enrollment.remarks || "-"}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openDeleteEnrollmentDialog(enrollment)}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-6 text-muted-foreground">No rejected enrollments</div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>

      <RejectEnrollmentDialog
        open={isRejectDialogOpen}
        onOpenChange={setIsRejectDialogOpen}
        enrollmentId={currentEnrollmentId}
        onRejectEnrollment={onRejectEnrollment}
      />

      {currentEnrollment && (
        <DeleteEnrollmentDialog
          open={isDeleteEnrollmentOpen}
          onOpenChange={setIsDeleteEnrollmentOpen}
          enrollment={currentEnrollment}
          onDeleteEnrollment={onDeleteEnrollment}
        />
      )}
    </Card>
  )
} 