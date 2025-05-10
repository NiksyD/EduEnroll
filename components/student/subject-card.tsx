import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { motion } from "framer-motion"

interface Subject {
  id: number
  name: string
  description: string
  prerequisiteId: string | null
}

interface SubjectCardProps {
  subject: Subject
  prerequisiteName?: string
  prerequisiteWarning?: string | null
  canEnroll: boolean
  onEnroll: (subjectId: number) => void
}

export function SubjectCard({
  subject,
  prerequisiteName,
  prerequisiteWarning,
  canEnroll,
  onEnroll,
}: SubjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className={`h-full ${!canEnroll ? "opacity-60" : ""}`}>
        <CardHeader>
          <CardTitle className="text-lg">{subject.name}</CardTitle>
          {prerequisiteName && (
            <CardDescription>Prerequisite: {prerequisiteName}</CardDescription>
          )}
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm">{subject.description}</p>

          {prerequisiteWarning && (
            <Alert variant="default">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Prerequisite Required</AlertTitle>
              <AlertDescription>{prerequisiteWarning}</AlertDescription>
            </Alert>
          )}

          <Button
            className="w-full"
            disabled={!canEnroll}
            onClick={() => onEnroll(subject.id)}
          >
            Enroll
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  )
} 