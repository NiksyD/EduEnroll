"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Home } from "lucide-react"

export function Navbar() {
  const pathname = usePathname()

  if (pathname === "/") return null

  const links = [
    { href: "/", label: "Home", icon: Home },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center mx-auto px-4">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block">Enrollment System</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "transition-colors hover:text-foreground/80",
                  pathname === link.href ? "text-foreground" : "text-foreground/60",
                )}
              >
                <div className="flex items-center gap-1">
                  <link.icon className="h-4 w-4" />
                  <span>{link.label}</span>
                  {pathname === link.href && (
                    <motion.div
                      className="absolute -bottom-[21px] left-0 right-0 h-[2px] bg-foreground"
                      layoutId="navbar-indicator"
                    />
                  )}
                </div>
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <div className="md:hidden flex items-center">
              <Link href="/" className="mr-6 flex items-center space-x-2">
                <span className="font-bold">Enrollment System</span>
              </Link>
            </div>
          </div>
          <nav className="flex items-center md:hidden">
            {links.map((link) => (
              <Button
                key={link.href}
                variant="ghost"
                size="icon"
                asChild
                className={cn(pathname === link.href ? "bg-accent text-accent-foreground" : "text-foreground/60")}
              >
                <Link href={link.href}>
                  <link.icon className="h-5 w-5" />
                  <span className="sr-only">{link.label}</span>
                </Link>
              </Button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  )
}
