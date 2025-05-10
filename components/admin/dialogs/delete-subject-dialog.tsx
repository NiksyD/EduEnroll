import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { type Subject } from "@/context/enrollment-context"

interface DeleteSubjectDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  subject: Subject
  onDeleteSubject: (id: string) => void
}

export function DeleteSubjectDialog({
  open,
  onOpenChange,
  subject,
  onDeleteSubject,
}: DeleteSubjectDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Subject</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete {subject.name}? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={() => onDeleteSubject(subject.id.toString())}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
} 