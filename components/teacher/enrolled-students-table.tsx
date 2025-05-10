import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { StatusBadge } from "@/components/status-badge"
import { Pencil } from "lucide-react"
import { type Enrollment } from "@/context/enrollment-context"

interface EnrolledStudentsTableProps {
  subjectName: string
  enrollments: Enrollment[]
  onGradeClick: (enrollmentId: string) => void
}

export function EnrolledStudentsTable({ subjectName, enrollments, onGradeClick }: EnrolledStudentsTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{subjectName} - Enrolled Students</CardTitle>
        <CardDescription>Assign grades and provide feedback to students</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Grade</TableHead>
              <TableHead>Remarks</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {enrollments.map((enrollment) => (
              <TableRow key={enrollment.id}>
                <TableCell className="font-medium">{enrollment.studentName}</TableCell>
                <TableCell>
                  <StatusBadge status={enrollment.status} />
                </TableCell>
                <TableCell>{enrollment.grade || "Not graded"}</TableCell>
                <TableCell>{enrollment.remarks || "-"}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" onClick={() => onGradeClick(enrollment.id)}>
                    <Pencil className="h-4 w-4" />
                    <span className="sr-only">Grade</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
} 