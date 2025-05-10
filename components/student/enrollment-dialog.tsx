import { AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface Subject {
  id: number
  name: string
  description: string
  prerequisiteId: string | null
}

interface EnrollmentDialogProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  availableSubjects: Subject[]
  selectedSubjectId: number | null
  onSubjectSelect: (subjectId: number) => void
  onEnroll: () => void
  getPrerequisiteWarning: (subjectId: number) => string | null
  canEnrollInSubject: (subjectId: number) => boolean
}

export function EnrollmentDialog({
  isOpen,
  onOpenChange,
  availableSubjects,
  selectedSubjectId,
  onSubjectSelect,
  onEnroll,
  getPrerequisiteWarning,
  canEnrollInSubject,
}: EnrollmentDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Enroll in Subject</DialogTitle>
          <DialogDescription>Select a subject to enroll in</DialogDescription>
        </DialogHeader>
        <div className="max-h-[60vh] overflow-y-auto pr-2">
          <div className="grid gap-4 py-4">
            {availableSubjects.length > 0 ? (
              availableSubjects.map((subject) => {
                const prerequisiteWarning = getPrerequisiteWarning(subject.id)
                const canEnroll = canEnrollInSubject(subject.id)

                return (
                  <div key={subject.id} className="space-y-2">
                    <div
                      className={`p-4 border rounded-md cursor-pointer transition-colors ${
                        selectedSubjectId === subject.id ? "border-primary bg-primary/5" : "hover:bg-accent"
                      } ${!canEnroll ? "opacity-60" : ""}`}
                      onClick={() => canEnroll && onSubjectSelect(subject.id)}
                    >
                      <div className="font-medium">{subject.name}</div>
                      <div className="text-sm text-muted-foreground">{subject.description}</div>

                      {prerequisiteWarning && (
                        <div className="mt-2 text-sm text-amber-600 dark:text-amber-400 flex items-center gap-1">
                          <AlertCircle className="h-4 w-4" />
                          {prerequisiteWarning}
                        </div>
                      )}
                    </div>
                  </div>
                )
              })
            ) : (
              <div className="text-center py-6 text-muted-foreground">No available subjects to enroll in</div>
            )}
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={onEnroll}
            disabled={!selectedSubjectId || !canEnrollInSubject(selectedSubjectId)}
          >
            Enroll
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
} 