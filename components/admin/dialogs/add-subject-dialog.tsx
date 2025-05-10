import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { PlusCircle } from "lucide-react"
import { type Subject } from "@/context/enrollment-context"

interface AddSubjectDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  subjects: Subject[]
  onAddSubject: (subject: Omit<Subject, "id">) => Promise<void>
}

export function AddSubjectDialog({ open, onOpenChange, subjects, onAddSubject }: AddSubjectDialogProps) {
  const [newSubject, setNewSubject] = useState<Omit<Subject, "id">>({
    name: "",
    description: "",
    prerequisiteId: null,
  })

  const handleAddSubject = async () => {
    try {
      if (!newSubject.name.trim()) {
        alert("Subject name is required")
        return
      }

      await onAddSubject(newSubject)
      
      setNewSubject({
        name: "",
        description: "",
        prerequisiteId: null,
      })
      onOpenChange(false)
    } catch (error) {
      console.error("Error adding subject:", error)
      alert("Failed to add subject. Please try again.")
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Subject
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Subject</DialogTitle>
          <DialogDescription>Create a new subject for the course catalog</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Subject Name</Label>
            <Input
              id="name"
              value={newSubject.name}
              onChange={(e) => setNewSubject({ ...newSubject, name: e.target.value })}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={newSubject.description}
              onChange={(e) => setNewSubject({ ...newSubject, description: e.target.value })}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="prerequisite">Prerequisite (Optional)</Label>
            <Select
              value={newSubject.prerequisiteId || ""}
              onValueChange={(value) => setNewSubject({ ...newSubject, prerequisiteId: value || null })}
            >
              <SelectTrigger>
                <SelectValue placeholder="None" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                {subjects.map((subject) => (
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
          <Button onClick={handleAddSubject}>Add Subject</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
} 