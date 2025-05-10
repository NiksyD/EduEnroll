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
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface RejectEnrollmentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  enrollmentId: string
  onRejectEnrollment: (id: string, remarks: string) => void
}

export function RejectEnrollmentDialog({
  open,
  onOpenChange,
  enrollmentId,
  onRejectEnrollment,
}: RejectEnrollmentDialogProps) {
  const [rejectionRemarks, setRejectionRemarks] = useState("")

  const handleRejectEnrollment = () => {
    onRejectEnrollment(enrollmentId, rejectionRemarks)
    setRejectionRemarks("")
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reject Enrollment</DialogTitle>
          <DialogDescription>Please provide a reason for rejecting this enrollment</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="remarks">Remarks</Label>
            <Textarea
              id="remarks"
              placeholder="Reason for rejection"
              value={rejectionRemarks}
              onChange={(e) => setRejectionRemarks(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleRejectEnrollment}>
            Reject Enrollment
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
} 