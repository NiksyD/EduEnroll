import type React from "react"
import type { Metadata } from "next"
import { poppins } from "./fonts"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { EnrollmentProvider } from "@/context/enrollment-context"
import { ModeToggle } from "@/components/ModeToggle"
import { AuthProvider } from "@/context/auth-context"


export const metadata: Metadata = {
  title: "EduEnroll",
  description: "A simple and intuitive platform for managing course enrollments",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={poppins.className}>
        <AuthProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <EnrollmentProvider>
              {children}
            </EnrollmentProvider>
            <div className="fixed bottom-4 right-4">
              <ModeToggle />
            </div>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
