import { type EnrollmentStatus } from "@/context/enrollment-context"

export interface Enrollment {
  id: string;
  studentName: string;
  status: EnrollmentStatus;
  grade: string | null;
  remarks: string | null;
} 