import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { type Subject } from "@/context/enrollment-context"

interface EditSubjectDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  subject: Subject
  subjects: Subject[]
  onUpdateSubject: (subject: Subject) => void
}

export function EditSubjectDialog({
  open,
  onOpenChange,
  subject,
  subjects,
  onUpdateSubject,
}: EditSubjectDialogProps) {
  const [editedSubject, setEditedSubject] = useState<Subject>(subject)

  const handleEditSubject = () => {
    onUpdateSubject(editedSubject)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Subject</DialogTitle>
          <DialogDescription>Update the subject details</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="edit-name">Subject Name</Label>
            <Input
              id="edit-name"
              value={editedSubject.name}
              onChange={(e) => setEditedSubject({ ...editedSubject, name: e.target.value })}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="edit-description">Description</Label>
            <Textarea
              id="edit-description"
              value={editedSubject.description}
              onChange={(e) => setEditedSubject({ ...editedSubject, description: e.target.value })}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="edit-prerequisite">Prerequisite (Optional)</Label>
            <Select
              value={editedSubject.prerequisiteId || ""}
              onValueChange={(value) =>
                setEditedSubject({ ...editedSubject, prerequisiteId: value || null })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="None" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                {subjects
                  .filter((s) => s.id !== editedSubject.id)
                  .map((subject) => (
                    <SelectItem key={subject.id} value={subject.id.toString()}>
                      {subject.name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleEditSubject}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
} 