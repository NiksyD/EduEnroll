import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface GradeDialogProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  grade: string
  onGradeChange: (value: string) => void
  remarks: string
  onRemarksChange: (value: string) => void
  onSubmit: () => void
  onDelete?: () => void
}

export function GradeDialog({
  isOpen,
  onOpenChange,
  grade,
  onGradeChange,
  remarks,
  onRemarksChange,
  onSubmit,
  onDelete,
}: GradeDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Assign Grade</DialogTitle>
          <DialogDescription>Provide a grade and feedback for the student</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="grade">Grade</Label>
            <Select value={grade} onValueChange={onGradeChange}>
              <SelectTrigger id="grade">
                <SelectValue placeholder="Select a grade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="A+">A+</SelectItem>
                <SelectItem value="A">A</SelectItem>
                <SelectItem value="A-">A-</SelectItem>
                <SelectItem value="B+">B+</SelectItem>
                <SelectItem value="B">B</SelectItem>
                <SelectItem value="B-">B-</SelectItem>
                <SelectItem value="C+">C+</SelectItem>
                <SelectItem value="C">C</SelectItem>
                <SelectItem value="C-">C-</SelectItem>
                <SelectItem value="D">D</SelectItem>
                <SelectItem value="F">F</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="remarks">Remarks</Label>
            <Textarea
              id="remarks"
              placeholder="Provide feedback to the student"
              value={remarks}
              onChange={(e) => onRemarksChange(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={onSubmit} disabled={!grade}>
            Save Grade
          </Button>
          {onDelete && grade && (
            <Button variant="destructive" onClick={onDelete} type="button">
              Delete Grade
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
} 