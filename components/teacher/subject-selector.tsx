import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { type Subject } from "@/context/enrollment-context"

interface SubjectSelectorProps {
  subjects: Subject[]
  selectedSubject: string | null
  onSubjectChange: (value: string) => void
}

export function SubjectSelector({ subjects, selectedSubject, onSubjectChange }: SubjectSelectorProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>My Subjects</CardTitle>
        <CardDescription>Select a subject to view enrolled students</CardDescription>
      </CardHeader>
      <CardContent>
        <Select value={selectedSubject || ""} onValueChange={onSubjectChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select a subject" />
          </SelectTrigger>
          <SelectContent>
            {subjects.map((subject) => (
              <SelectItem key={subject.id} value={subject.id.toString()}>
                {subject.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardContent>
    </Card>
  )
} 