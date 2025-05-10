"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
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
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface AuthDialogProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

export function AuthDialog({ isOpen, onOpenChange }: AuthDialogProps) {
  const router = useRouter()
  const { login, signup } = useAuth()
  const [username, setUsername] = useState("")
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async () => {
    if (!username || !password) {
      setError("Please fill in all fields")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      const success = await login(username, password)
      if (success) {
        onOpenChange(false)
        router.push("/student")
      } else {
        setError("Invalid credentials")
      }
    } catch {
      setError("An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignup = async () => {
    if (!username || !name || !password) {
      setError("Please fill in all fields")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      const success = await signup(username, name, password)
      if (success) {
        onOpenChange(false)
        router.push("/student")
      } else {
        setError("Username already exists")
      }
    } catch {
      setError("An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Student Access</DialogTitle>
          <DialogDescription>Sign in or create a new account</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value)
                    setError("")
                  }}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    setError("")
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleLogin()
                    }
                  }}
                />
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button onClick={handleLogin} disabled={isLoading}>
                {isLoading ? "Loading..." : "Login"}
              </Button>
            </DialogFooter>
          </TabsContent>

          <TabsContent value="signup">
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="signup-username">Username</Label>
                <Input
                  id="signup-username"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value)
                    setError("")
                  }}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="signup-name">Full Name</Label>
                <Input
                  id="signup-name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value)
                    setError("")
                  }}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="signup-password">Password</Label>
                <Input
                  id="signup-password"
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    setError("")
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSignup()
                    }
                  }}
                />
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button onClick={handleSignup} disabled={isLoading}>
                {isLoading ? "Loading..." : "Sign Up"}
              </Button>
            </DialogFooter>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
} 