"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, CheckCircle } from "lucide-react"
import { isValidEmail } from "@/lib/utils"

type ApiError = {
  message: string;
}

export default function WaitlistForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: ""
  })
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const { email } = formData

    if (!email) {
      setErrorMessage("Please enter your email address")
      return
    }

    if (!isValidEmail(email)) {
      setErrorMessage("Please enter a valid email address")
      return
    }

    setStatus("loading")
    setErrorMessage("")

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to join waitlist')
      }

      setStatus("success")
    } catch (error: ApiError | unknown) {
      setStatus("error")
      const errorMessage = error instanceof Error ? error.message : "Something went wrong. Please try again."
      setErrorMessage(errorMessage)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      {status === "success" ? (
        <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm border">
          <div className="flex flex-col items-center justify-center space-y-3 text-center">
            <CheckCircle className="h-12 w-12 text-green-500" />
            <h3 className="text-xl font-bold">You&apos;re on the list!</h3>
            <p className="text-gray-500 dark:text-gray-400">
              Thank you for joining our waitlist. We&apos;ll notify you when we launch.
            </p>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm border space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name (optional)</Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Your name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email address</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              className={errorMessage ? "border-red-500" : ""}
              required
            />
            {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}
          </div>
          <Button type="submit" className="w-full" disabled={status === "loading"}>
            {status === "loading" ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Joining...
              </>
            ) : (
              "Join Waitlist"
            )}
          </Button>
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
            We&apos;ll never share your email with anyone else.
          </p>
        </form>
      )}
    </div>
  )
}
