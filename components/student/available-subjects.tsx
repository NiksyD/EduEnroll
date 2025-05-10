import { BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SubjectCard } from "./subject-card"

interface Subject {
  id: number
  name: string
  description: string
  prerequisiteId: string | null
}

interface AvailableSubjectsProps {
  subjects: Subject[]
  onEnrollClick: (subjectId: number) => void
  getPrerequisiteWarning: (subjectId: number) => string | null
  canEnrollInSubject: (subjectId: number) => boolean
  getSubjectById: (id: number) => Subject | undefined
}

export function AvailableSubjects({
  subjects,
  onEnrollClick,
  getPrerequisiteWarning,
  canEnrollInSubject,
  getSubjectById,
}: AvailableSubjectsProps) {
  const displayedSubjects = subjects.slice(0, 3)
  const hasMoreSubjects = subjects.length > 3

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Available Subjects</CardTitle>
          <CardDescription>Subjects you can enroll in</CardDescription>
        </div>
        <Button onClick={() => onEnrollClick(subjects[0]?.id)}>
          <BookOpen className="mr-2 h-4 w-4" />
          Enroll in Subject
        </Button>
      </CardHeader>
      <CardContent>
        {subjects.length > 0 ? (
          <>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {displayedSubjects.map((subject) => {
                const prerequisiteWarning = getPrerequisiteWarning(subject.id)
                const canEnroll = canEnrollInSubject(subject.id)
                const prerequisiteName = subject.prerequisiteId
                  ? getSubjectById(Number(subject.prerequisiteId))?.name
                  : undefined

                return (
                  <SubjectCard
                    key={subject.id}
                    subject={subject}
                    prerequisiteName={prerequisiteName}
                    prerequisiteWarning={prerequisiteWarning}
                    canEnroll={canEnroll}
                    onEnroll={onEnrollClick}
                  />
                )
              })}
            </div>
            {hasMoreSubjects && (
              <div className="mt-4 text-center">
                <Button variant="outline" onClick={() => onEnrollClick(subjects[0]?.id)}>
                  View All Subjects
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-6 text-muted-foreground">No available subjects to enroll in</div>
        )}
      </CardContent>
    </Card>
  )
} 