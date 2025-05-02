"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, CheckCircle, Share2 } from "lucide-react"
import { isValidEmail } from "@/lib/utils"
import { Checkbox } from "@/components/ui/checkbox"

// Define tier types and constants
type WaitlistTier = 'founding' | 'early' | 'priority' | 'standard';

interface WaitlistStats {
  totalEntries: number;
  tierCounts: Record<string, number>;
  spotsRemaining: Record<string, number>;
  percentageFilled: Record<string, number>;
  tierCapacity: Record<string, number>;
}

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
  const [waitlistStats, setWaitlistStats] = useState<WaitlistStats | null>(null)
  const [currentTier, setCurrentTier] = useState<WaitlistTier>("founding")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  // Fetch waitlist stats to determine current tier
  useEffect(() => {
    const fetchWaitlistStats = async () => {
      try {
        const response = await fetch('/api/waitlist-stats');
        
        if (!response.ok) {
          throw new Error('Failed to fetch waitlist statistics');
        }
        
        const data = await response.json();
        
        if (data.success) {
          setWaitlistStats(data.stats);
          
          // Determine current tier based on availability
          if (data.stats.spotsRemaining.founding > 0) {
            setCurrentTier("founding");
          } else if (data.stats.spotsRemaining.early > 0) {
            setCurrentTier("early");
          } else if (data.stats.spotsRemaining.priority > 0) {
            setCurrentTier("priority");
          } else {
            setCurrentTier("standard");
          }
        }
      } catch (error) {
        console.error('Error fetching waitlist stats:', error);
      }
    };
    
    fetchWaitlistStats();
  }, []);

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

  // Get tier-specific messaging
  const getTierMessage = () => {
    switch (currentTier) {
      case "founding":
        return {
          title: "Founding Member Tier",
          discount: "40%",
          urgency: `Only ${waitlistStats?.spotsRemaining.founding || 'limited'} spots left!`,
          description: "Join as a Founding Member to lock in 40% lifetime discount that never expires as long as your subscription remains active."
        };
      case "early":
        return {
          title: "Early Adopter Tier",
          discount: "30%",
          urgency: `Only ${waitlistStats?.spotsRemaining.early || 'limited'} spots left!`,
          description: "Join as an Early Adopter to lock in 30% lifetime discount that never expires as long as your subscription remains active."
        };
      case "priority":
        return {
          title: "Priority Access Tier",
          discount: "20%",
          urgency: `Only ${waitlistStats?.spotsRemaining.priority || 'limited'} spots left!`,
          description: "Join with Priority Access to lock in 20% lifetime discount that never expires as long as your subscription remains active."
        };
      default:
        return {
          title: "Standard Waitlist",
          discount: "",
          urgency: "",
          description: "Join our waitlist to get access when we launch."
        };
    }
  };

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

  const tierMessage = getTierMessage();

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
          {currentTier !== "standard" && (
            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-md border border-blue-100 dark:border-blue-800 mb-4">
              <h3 className="font-medium text-blue-800 dark:text-blue-300 mb-1">{tierMessage.title}</h3>
              {tierMessage.discount && (
                <div className="text-sm text-blue-700 dark:text-blue-400 mb-1">
                  <span className="font-bold">{tierMessage.discount} lifetime discount</span>
                </div>
              )}
              {tierMessage.urgency && (
                <div className="text-sm text-red-600 dark:text-red-400 font-medium mb-1">
                  {tierMessage.urgency}
                </div>
              )}
              <p className="text-xs text-blue-600 dark:text-blue-400">
                {tierMessage.description}
              </p>
            </div>
          )}
          
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
          
          <div className="flex items-center space-x-2 pt-2">
            <Checkbox
              id="marketingOptIn"
              checked={formData.marketingOptIn}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, marketingOptIn: checked === true }))}
            />
            <label
              htmlFor="marketingOptIn"
              className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Send me product updates and news
            </label>
          </div>
          
          <Button type="submit" className="w-full gradient-btn" disabled={status === "loading"}>
            {status === "loading" ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                {currentTier === "founding" && "Join as Founding Member"}
                {currentTier === "early" && "Join as Early Adopter"}
                {currentTier === "priority" && "Get Priority Access"}
                {currentTier === "standard" && "Join Waitlist"}
              </>
            )}
          </Button>
          
          {currentTier !== "standard" && (
            <p className="text-xs text-gray-500 dark:text-gray-400 pt-2 text-center">
              Once this tier is full, only the next tier will be available. Your place in line is based on when you join.
            </p>
          )}
        </form>
      )}
    </div>
  )
}
