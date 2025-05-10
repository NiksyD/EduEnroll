import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { type Enrollment } from "@/context/enrollment-context"

interface DeleteEnrollmentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  enrollment: Enrollment
  onDeleteEnrollment: (id: string) => void
}

export function DeleteEnrollmentDialog({
  open,
  onOpenChange,
  enrollment,
  onDeleteEnrollment,
}: DeleteEnrollmentDialogProps) {
  const handleDelete = () => {
    onDeleteEnrollment(enrollment.id)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Enrollment</DialogTitle>
          <DialogDescription>
            Are you sure you want to remove this enrollment? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
} 