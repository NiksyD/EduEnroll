import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Edit, Trash2 } from "lucide-react"
import { type Subject } from "@/context/enrollment-context"
import { AddSubjectDialog } from "./dialogs/add-subject-dialog"
import { EditSubjectDialog } from "./dialogs/edit-subject-dialog"
import { DeleteSubjectDialog } from "./dialogs/delete-subject-dialog"

interface SubjectManagementProps {
  subjects: Subject[]
  getSubjectName: (id: string) => string
  onAddSubject: (subject: Omit<Subject, "id">) => Promise<void>
  onUpdateSubject: (subject: Subject) => void
  onDeleteSubject: (id: string) => void
}

export function SubjectManagement({
  subjects,
  getSubjectName,
  onAddSubject,
  onUpdateSubject,
  onDeleteSubject,
}: SubjectManagementProps) {
  const [isAddSubjectOpen, setIsAddSubjectOpen] = useState(false)
  const [isEditSubjectOpen, setIsEditSubjectOpen] = useState(false)
  const [isDeleteSubjectOpen, setIsDeleteSubjectOpen] = useState(false)
  const [currentSubject, setCurrentSubject] = useState<Subject | null>(null)

  const openDeleteDialog = (subject: Subject) => {
    setCurrentSubject(subject)
    setIsDeleteSubjectOpen(true)
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Subject Management</CardTitle>
          <CardDescription>Add, edit, or remove subjects from the catalog</CardDescription>
        </div>
        <AddSubjectDialog
          open={isAddSubjectOpen}
          onOpenChange={setIsAddSubjectOpen}
          subjects={subjects}
          onAddSubject={onAddSubject}
        />
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Subject Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Prerequisite</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {subjects.map((subject) => (
              <TableRow key={subject.id}>
                <TableCell className="font-medium">{subject.name}</TableCell>
                <TableCell>{subject.description}</TableCell>
                <TableCell>
                  {subject.prerequisiteId ? getSubjectName(subject.prerequisiteId) : "None"}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setCurrentSubject(subject)
                        setIsEditSubjectOpen(true)
                      }}
                    >
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => openDeleteDialog(subject)}>
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>

      {currentSubject && (
        <>
          <EditSubjectDialog
            open={isEditSubjectOpen}
            onOpenChange={setIsEditSubjectOpen}
            subject={currentSubject}
            subjects={subjects}
            onUpdateSubject={onUpdateSubject}
          />
          <DeleteSubjectDialog
            open={isDeleteSubjectOpen}
            onOpenChange={setIsDeleteSubjectOpen}
            subject={currentSubject}
            onDeleteSubject={onDeleteSubject}
          />
        </>
      )}
    </Card>
  )
} 