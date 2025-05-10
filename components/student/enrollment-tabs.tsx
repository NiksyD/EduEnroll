import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { StatusBadge } from "@/components/status-badge"

interface Enrollment {
  id: string
  studentId: string
  subjectId: number
  status: "pending" | "approved" | "rejected"
  grade?: string
  remarks?: string
}

interface Subject {
  id: number
  name: string
  description: string
  prerequisiteId: string | null
}

interface EnrollmentTabsProps {
  enrollments: Enrollment[]
  getSubjectById: (id: number) => Subject | undefined
}

export function EnrollmentTabs({ enrollments, getSubjectById }: EnrollmentTabsProps) {
  return (
    <Tabs defaultValue="all">
      <TabsList className="mb-4">
        <TabsTrigger value="all">All</TabsTrigger>
        <TabsTrigger value="pending">Pending</TabsTrigger>
        <TabsTrigger value="approved">Approved</TabsTrigger>
        <TabsTrigger value="rejected">Rejected</TabsTrigger>
      </TabsList>

      <TabsContent value="all">
        {enrollments.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Subject</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Grade</TableHead>
                <TableHead>Remarks</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {enrollments.map((enrollment) => (
                <TableRow key={enrollment.id}>
                  <TableCell className="font-medium">
                    {getSubjectById(enrollment.subjectId)?.name}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={enrollment.status} />
                  </TableCell>
                  <TableCell>{enrollment.grade || "-"}</TableCell>
                  <TableCell>{enrollment.remarks || "-"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-6 text-muted-foreground">You are not enrolled in any subjects</div>
        )}
      </TabsContent>

      <TabsContent value="pending">
        {enrollments.filter((e) => e.status === "pending").length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Subject</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {enrollments
                .filter((e) => e.status === "pending")
                .map((enrollment) => (
                  <TableRow key={enrollment.id}>
                    <TableCell className="font-medium">
                      {getSubjectById(enrollment.subjectId)?.name}
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={enrollment.status} />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-6 text-muted-foreground">No pending enrollments</div>
        )}
      </TabsContent>

      <TabsContent value="approved">
        {enrollments.filter((e) => e.status === "approved").length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Subject</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Grade</TableHead>
                <TableHead>Remarks</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {enrollments
                .filter((e) => e.status === "approved")
                .map((enrollment) => (
                  <TableRow key={enrollment.id}>
                    <TableCell className="font-medium">
                      {getSubjectById(enrollment.subjectId)?.name}
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={enrollment.status} />
                    </TableCell>
                    <TableCell>{enrollment.grade || "Not graded"}</TableCell>
                    <TableCell>{enrollment.remarks || "-"}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-6 text-muted-foreground">No approved enrollments</div>
        )}
      </TabsContent>

      <TabsContent value="rejected">
        {enrollments.filter((e) => e.status === "rejected").length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Subject</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Remarks</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {enrollments
                .filter((e) => e.status === "rejected")
                .map((enrollment) => (
                  <TableRow key={enrollment.id}>
                    <TableCell className="font-medium">
                      {getSubjectById(enrollment.subjectId)?.name}
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={enrollment.status} />
                    </TableCell>
                    <TableCell>{enrollment.remarks || "-"}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-6 text-muted-foreground">No rejected enrollments</div>
        )}
      </TabsContent>
    </Tabs>
  )
} 