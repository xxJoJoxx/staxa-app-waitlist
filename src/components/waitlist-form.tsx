"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, CheckCircle, Share2 } from "lucide-react"
import { isValidEmail } from "@/lib/utils"
import { Checkbox } from "@/components/ui/checkbox"

export default function WaitlistForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    referralCode: "",
    marketingOptIn: true
  })
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")
  const [referralLink, setReferralLink] = useState<string | null>(null)

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

      // Use the referral code returned from the API
      const referralCode = data.referralCode
      
      // Set the referral link for sharing
      if (referralCode) {
        setReferralLink(`${window.location.origin}?ref=${referralCode}`)
      }
      
      setStatus("success")
    } catch (error: unknown) {
      setStatus("error")
      const errorMessage = error instanceof Error ? error.message : "Something went wrong. Please try again."
      setErrorMessage(errorMessage)
    }
  }

  const copyReferralLink = () => {
    if (referralLink) {
      navigator.clipboard.writeText(referralLink)
        .then(() => {
          alert("Referral link copied to clipboard!")
        })
        .catch(err => {
          console.error("Could not copy text: ", err)
        })
    }
  }

  // Check if URL has a referral code
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      const ref = params.get('ref')
      if (ref) {
        setFormData(prev => ({ ...prev, referralCode: ref }))
      }
    }
  }, [])

  return (
    <div className="w-full max-w-md mx-auto">
      {status === "success" ? (
        <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm border">
          <div className="flex flex-col items-center justify-center space-y-3 text-center">
            <CheckCircle className="h-12 w-12 text-green-500" />
            <h3 className="text-xl font-bold">You&apos;re on the list!</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              Thank you for joining our waitlist. We&apos;ll notify you when we launch.
            </p>
            
            {referralLink && (
              <div className="w-full mt-4 space-y-4">
                <div className="text-center">
                  <h4 className="font-medium mb-2">Want to move up the waitlist?</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                    Share your referral link and get bumped up 5 spots for each friend who joins!
                  </p>
                </div>
                
                <div className="flex">
                  <Input 
                    value={referralLink}
                    readOnly
                    className="rounded-r-none"
                  />
                  <Button 
                    type="button" 
                    className="rounded-l-none" 
                    onClick={copyReferralLink}
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                </div>
                
                <div className="flex gap-2 justify-center mt-4">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(`https://twitter.com/intent/tweet?text=I just joined the Staxa waitlist to get early access to simple cloud deployments! Join me: ${encodeURIComponent(referralLink || '')}`, '_blank')}
                  >
                    Share on Twitter
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(referralLink || '')}`, '_blank')}
                  >
                    Share on LinkedIn
                  </Button>
                </div>
              </div>
            )}
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
          
          {formData.referralCode && (
            <div className="space-y-2">
              <Label htmlFor="referralCode">Referral Code</Label>
              <Input
                id="referralCode"
                name="referralCode"
                type="text"
                value={formData.referralCode}
                onChange={handleChange}
                disabled
                className="bg-gray-50 dark:bg-gray-800"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400">
                You were referred by a friend
              </p>
            </div>
          )}
          
          <div className="flex items-start space-x-2 pt-2">
            <Checkbox 
              id="marketingOptIn" 
              name="marketingOptIn"
              checked={formData.marketingOptIn}
              onCheckedChange={(checked) => {
                setFormData(prev => ({ ...prev, marketingOptIn: checked === true }))
              }}
            />
            <label
              htmlFor="marketingOptIn"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Email me about product updates and feature releases
            </label>
          </div>
          
          <Button type="submit" className="w-full gradient-btn" disabled={status === "loading"}>
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
