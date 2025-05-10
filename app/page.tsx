"use client"

import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { GraduationCap, UserCog, Users } from "lucide-react"
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AuthDialog } from "@/components/student/auth-dialog"

export default function Home() {
  const router = useRouter()
  const [isAdminDialogOpen, setIsAdminDialogOpen] = useState(false)
  const [isTeacherDialogOpen, setIsTeacherDialogOpen] = useState(false)
  const [isStudentDialogOpen, setIsStudentDialogOpen] = useState(false)
  const [adminPassword, setAdminPassword] = useState("")
  const [teacherPassword, setTeacherPassword] = useState("")
  const [error, setError] = useState("")

  const handleAdminSubmit = () => {
    if (adminPassword === "Admin123") {
      router.push("/admin")
    } else {
      setError("Invalid password")
    }
  }

  const handleTeacherSubmit = () => {
    if (teacherPassword === "Teacher123") {
      router.push("/teacher")
    } else {
      setError("Invalid password")
    }
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold tracking-tight mb-2">Enrollment System</h1>
        <p className="text-muted-foreground max-w-md mx-auto">
          A simple and intuitive platform for managing course enrollments
        </p>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl"
      >
        <motion.div variants={item}>
          <Card className="h-full transition-all hover:shadow-md">
            <CardHeader className="text-center">
              <UserCog className="w-12 h-12 mx-auto text-gray-500 dark:text-gray-400" />
              <CardTitle>Admin</CardTitle>
              <CardDescription>Manage subjects and enrollments</CardDescription>
            </CardHeader>
            <CardContent className="text-center text-sm text-muted-foreground">
              Approve student enrollments and manage the course catalog
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={() => setIsAdminDialogOpen(true)} variant="default">
                Continue as Admin
              </Button>
            </CardFooter>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="h-full transition-all hover:shadow-md">
            <CardHeader className="text-center">
              <Users className="w-12 h-12 mx-auto text-gray-500 dark:text-gray-400" />
              <CardTitle>Student</CardTitle>
              <CardDescription>Enroll in courses</CardDescription>
            </CardHeader>
            <CardContent className="text-center text-sm text-muted-foreground">
              Browse available subjects and track your enrollment status
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={() => setIsStudentDialogOpen(true)} variant="default">
                Continue as Student
              </Button>
            </CardFooter>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="h-full transition-all hover:shadow-md">
            <CardHeader className="text-center">
              <GraduationCap className="w-12 h-12 mx-auto text-gray-500 dark:text-gray-400" />
              <CardTitle>Teacher</CardTitle>
              <CardDescription>Manage your classes</CardDescription>
            </CardHeader>
            <CardContent className="text-center text-sm text-muted-foreground">
              View enrolled students and assign grades and remarks
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={() => setIsTeacherDialogOpen(true)} variant="default">
                Continue as Teacher
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </motion.div>

      <Dialog open={isAdminDialogOpen} onOpenChange={setIsAdminDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Admin Access</DialogTitle>
            <DialogDescription>Please enter the admin password to continue</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="admin-password">Password</Label>
              <Input
                id="admin-password"
                type="password"
                value={adminPassword}
                onChange={(e) => {
                  setAdminPassword(e.target.value)
                  setError("")
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleAdminSubmit()
                  }
                }}
              />
              {error && <p className="text-sm text-red-500">{error}</p>}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAdminDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAdminSubmit}>Submit</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isTeacherDialogOpen} onOpenChange={setIsTeacherDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Teacher Access</DialogTitle>
            <DialogDescription>Please enter the teacher password to continue</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="teacher-password">Password</Label>
              <Input
                id="teacher-password"
                type="password"
                value={teacherPassword}
                onChange={(e) => {
                  setTeacherPassword(e.target.value)
                  setError("")
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleTeacherSubmit()
                  }
                }}
              />
              {error && <p className="text-sm text-red-500">{error}</p>}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsTeacherDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleTeacherSubmit}>Submit</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AuthDialog isOpen={isStudentDialogOpen} onOpenChange={setIsStudentDialogOpen} />
    </div>
  )
}
