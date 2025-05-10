import { Badge } from "@/components/ui/badge"
import type { EnrollmentStatus } from "@/context/enrollment-context"

interface StatusBadgeProps {
  status: EnrollmentStatus
}

export function StatusBadge({ status }: StatusBadgeProps) {
  switch (status) {
    case "pending":
      return (
        <Badge
          variant="outline"
          className="bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-950 dark:text-yellow-300 dark:border-yellow-800"
        >
          Pending
        </Badge>
      )
    case "approved":
      return (
        <Badge
          variant="outline"
          className="bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-300 dark:border-green-800"
        >
          Approved
        </Badge>
      )
    case "rejected":
      return (
        <Badge
          variant="outline"
          className="bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-300 dark:border-red-800"
        >
          Rejected
        </Badge>
      )
    default:
      return <Badge variant="outline">Unknown</Badge>
  }
}
