"use client"

import { useState, useEffect } from "react"
import { Check, ArrowRight, Loader2 } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

type PricingPlan = {
  id: string
  name: string
  description: string
  price: number
  discountedPrice: number | null
  features: string[]
  storage: string
  deployments: string
  mostPopular?: boolean
}

type DiscountTier = 'founding' | 'early' | 'priority';

type WaitlistStats = {
  totalEntries: number
  tierCounts: {
    founding: number
    early: number
    priority: number
    standard: number
  }
  spotsRemaining: {
    founding: number
    early: number
    priority: number
  }
  percentageFilled: {
    founding: number
    early: number
    priority: number
  }
  tierCapacity: {
    founding: number
    early: number
    priority: number
  }
}

const pricingPlans: PricingPlan[] = [
  {
    id: "free",
    name: "Free",
    description: "For individuals, hobbyists, and small side projects.",
    price: 0,
    discountedPrice: null,
    storage: "5GB",
    deployments: "Up to 3",
    features: [
      "5GB combined storage",
      "Up to 3 deployments",
      "Basic monitoring",
      "Community support",
      "Small instance size only",
      "Public GitHub repos only"
    ]
  },
  {
    id: "developer",
    name: "Developer",
    description: "For individual developers and freelancers.",
    price: 29,
    discountedPrice: 17,
    storage: "25GB",
    deployments: "Up to 15",
    features: [
      "25GB combined storage",
      "Up to 15 deployments",
      "Standard monitoring",
      "Email support",
      "Medium instance size",
      "Custom domains",
      "Private GitHub repos",
      "Limited auto-scaling",
      "Advanced analytics"
    ]
  },
  {
    id: "pro",
    name: "Pro",
    description: "For small teams and startups.",
    price: 69,
    discountedPrice: 41,
    storage: "100GB",
    deployments: "Unlimited",
    mostPopular: true,
    features: [
      "100GB combined storage",
      "Unlimited deployments",
      "Advanced monitoring with alerts",
      "Priority email support",
      "All instance sizes",
      "Team collaboration (up to 5)",
      "Custom domains with SSL",
      "CI/CD integration",
      "Full auto-scaling",
      "Database backups",
      "Rollback protection"
    ]
  },
  {
    id: "business",
    name: "Business",
    description: "For medium businesses and growing startups.",
    price: 149,
    discountedPrice: 89,
    storage: "500GB",
    deployments: "Unlimited",
    features: [
      "500GB combined storage",
      "Everything in Pro, plus:",
      "Phone support (business hours)",
      "Team collaboration (up to 15)",
      "Advanced security features",
      "Multi-region deployments",
      "Load balancing",
      "Detailed analytics and reporting",
      "Custom deployment configurations",
      "Role-based access control",
      "Audit logs"
    ]
  }
]

export function PricingSection() {
  const [showDiscounted, setShowDiscounted] = useState(true)
  const [activeDiscount, setActiveDiscount] = useState<DiscountTier>("founding")
  const [waitlistStats, setWaitlistStats] = useState<WaitlistStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  const discountRates: Record<DiscountTier, number> = {
    founding: 0.4, // 40% off for founding members
    early: 0.3,    // 30% off for early adopters
    priority: 0.2  // 20% off for priority access
  }
  
  // Get real-time waitlist stats
  useEffect(() => {
    const fetchWaitlistStats = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/waitlist-stats');
        
        if (!response.ok) {
          throw new Error('Failed to fetch waitlist statistics');
        }
        
        const data = await response.json();
        
        if (data.success) {
          setWaitlistStats(data.stats);
          
          // Automatically set active discount to the earliest available tier
          if (data.stats.spotsRemaining.founding <= 0 && data.stats.spotsRemaining.early > 0) {
            setActiveDiscount("early");
          } else if (data.stats.spotsRemaining.founding <= 0 && data.stats.spotsRemaining.early <= 0 && data.stats.spotsRemaining.priority > 0) {
            setActiveDiscount("priority");
          } else {
            setActiveDiscount("founding");
          }
        } else {
          throw new Error(data.error || 'Unknown error');
        }
      } catch (err) {
        console.error('Error fetching waitlist stats:', err);
        setError(err instanceof Error ? err.message : 'Failed to load waitlist data');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchWaitlistStats();
    
    // Refresh stats every 60 seconds
    const intervalId = setInterval(fetchWaitlistStats, 60000);
    
    return () => clearInterval(intervalId);
  }, []);
  
  // Calculate spots remaining and percentages filled
  const spotsRemaining = waitlistStats?.spotsRemaining || {
    founding: 37,  // Fallback values if API not available
    early: 328,
    priority: 500
  };
  
  const percentageFilled = waitlistStats?.percentageFilled || {
    founding: 63,  // Fallback values (100 - 37)%
    early: 18,     // (100 - 328/400 * 100)%
    priority: 0    // (100 - 500/500 * 100)%
  };
  
  // Determine which tiers to show based on availability
  const showFoundingTier = spotsRemaining.founding > 0;
  const showEarlyTier = !showFoundingTier && spotsRemaining.early > 0;
  const showPriorityTier = !showFoundingTier && !showEarlyTier && spotsRemaining.priority > 0;
  
  // Show the relevant tier or all if none are available (fallback)
  const visibleTier = showFoundingTier ? "founding" : (showEarlyTier ? "early" : (showPriorityTier ? "priority" : null));

  return (
    <div className="container px-4 md:px-6 py-8">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
        <div className="space-y-2">
          <div className="inline-flex items-center rounded-full border bg-gradient-to-r from-blue-100 via-white to-orange-100 dark:from-blue-950/40 dark:via-gray-900 dark:to-orange-950/40 px-2.5 py-0.5 text-sm font-semibold">
            Exclusive Waitlist Offer
          </div>
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Lock in Lifetime Discounts</h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Join our waitlist today to secure special founder pricing that never increases.
          </p>
        </div>
      </div>
      
      {/* Discount Tier Selection - Now Progressive */}
      <div className="max-w-3xl mx-auto mb-10">
        <div className="bg-muted/30 p-4 rounded-lg">
          <div className="flex flex-col gap-4 mb-5">
            {/* Founding Members Tier - Only show if spots are available */}
            {showFoundingTier && (
              <div 
                className="flex-1 p-4 rounded-lg border-2 border-blue-500 bg-blue-50/50 dark:bg-blue-900/20 transform transition-all duration-300"
                onClick={() => setActiveDiscount("founding")}
              >
                <h3 className="font-bold text-lg mb-1">Founding Members</h3>
                <p className="text-muted-foreground text-sm mb-2">First 100 users</p>
                <div className="flex items-center justify-between mb-1 text-sm">
                  <span>40% Lifetime Discount</span>
                  {isLoading ? (
                    <span className="font-bold text-blue-600 flex items-center">
                      <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                      Loading...
                    </span>
                  ) : (
                    <span className="font-bold text-blue-600">{spotsRemaining.founding} spots left</span>
                  )}
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full bg-blue-500" 
                    style={{ width: `${percentageFilled.founding}%` }}
                  ></div>
                </div>
              </div>
            )}
            
            {/* Early Adopters Tier - Only show if founding is full and spots are available */}
            {showEarlyTier && (
              <div 
                className="flex-1 p-4 rounded-lg border-2 border-blue-500 bg-blue-50/50 dark:bg-blue-900/20 transform transition-all duration-300"
                onClick={() => setActiveDiscount("early")}
              >
                <h3 className="font-bold text-lg mb-1">Early Adopters</h3>
                <p className="text-muted-foreground text-sm mb-2">Next 400 users</p>
                <div className="flex items-center justify-between mb-1 text-sm">
                  <span>30% Lifetime Discount</span>
                  {isLoading ? (
                    <span className="font-bold text-blue-600 flex items-center">
                      <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                      Loading...
                    </span>
                  ) : (
                    <span className="font-bold text-blue-600">{spotsRemaining.early} spots left</span>
                  )}
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full bg-blue-500" 
                    style={{ width: `${percentageFilled.early}%` }}
                  ></div>
                </div>
              </div>
            )}
            
            {/* Priority Access Tier - Only show if founding and early are full and spots are available */}
            {showPriorityTier && (
              <div 
                className="flex-1 p-4 rounded-lg border-2 border-blue-500 bg-blue-50/50 dark:bg-blue-900/20 transform transition-all duration-300"
                onClick={() => setActiveDiscount("priority")}
              >
                <h3 className="font-bold text-lg mb-1">Priority Access</h3>
                <p className="text-muted-foreground text-sm mb-2">Next 500 users</p>
                <div className="flex items-center justify-between mb-1 text-sm">
                  <span>20% Lifetime Discount</span>
                  {isLoading ? (
                    <span className="font-bold text-blue-600 flex items-center">
                      <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                      Loading...
                    </span>
                  ) : (
                    <span className="font-bold text-blue-600">{spotsRemaining.priority} spots left</span>
                  )}
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full bg-blue-500" 
                    style={{ width: `${percentageFilled.priority}%` }}
                  ></div>
                </div>
              </div>
            )}
            
            {/* Show a message if all tiers are full */}
            {!visibleTier && (
              <div className="flex-1 p-4 rounded-lg border-2 border-gray-300 bg-gray-50 dark:bg-gray-800/50 dark:border-gray-700">
                <h3 className="font-bold text-lg mb-1">Join Standard Waitlist</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  All special discount tiers are currently full. Join our standard waitlist to get access when we launch.
                </p>
                <Button asChild size="sm" className="w-full mb-2">
                  <Link href="#waitlist">
                    Join Standard Waitlist
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            )}
          </div>
          
          {/* Error Message */}
          {error && (
            <div className="text-red-500 text-sm text-center mb-3">
              {error}
            </div>
          )}
          
          {/* Pricing Toggle - Only show if a tier is available */}
          {visibleTier && (
            <>
              <div className="flex items-center justify-center gap-3 mb-2">
                <button 
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                    !showDiscounted 
                      ? "bg-primary text-white" 
                      : "hover:bg-gray-200 dark:hover:bg-gray-800"
                  )}
                  onClick={() => setShowDiscounted(false)}
                >
                  Regular Pricing
                </button>
                <button 
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                    showDiscounted 
                      ? "bg-primary text-white" 
                      : "hover:bg-gray-200 dark:hover:bg-gray-800"
                  )}
                  onClick={() => setShowDiscounted(true)}
                >
                  {visibleTier === "founding" ? "Founder Pricing" : 
                   visibleTier === "early" ? "Early Adopter Pricing" : 
                   "Priority Access Pricing"}
                </button>
              </div>
              
              <p className="text-center text-sm text-muted-foreground">
                {showDiscounted 
                  ? `Secure a ${discountRates[activeDiscount] * 100}% lifetime discount by joining our waitlist today` 
                  : "Regular pricing after launch"
                }
              </p>
            </>
          )}
        </div>
      </div>
      
      {/* Pricing Cards */}
      <div className="mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-4 max-w-6xl">
        {pricingPlans.map((plan) => {
          const discountMultiplier = showDiscounted ? (1 - discountRates[activeDiscount]) : 1;
          const finalPrice = plan.price > 0 ? Math.floor(plan.price * discountMultiplier) : 0;
          
          return (
            <Card 
              key={plan.id} 
              className={cn(
                "relative overflow-hidden", 
                plan.mostPopular && "border-primary"
              )}
            >
              {plan.mostPopular && (
                <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-4 py-1 text-xs font-medium">
                  MOST POPULAR
                </div>
              )}
              
              {showDiscounted && plan.price > 0 && (
                <div className="absolute top-6 right-6">
                  <Badge variant="outline" className="bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400">
                    {Math.round(discountRates[activeDiscount] * 100)}% OFF
                  </Badge>
                </div>
              )}
              
              <CardHeader className="pb-8 pt-6">
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <div className="flex items-baseline gap-1 mt-1">
                  {showDiscounted && plan.price > 0 ? (
                    <>
                      <span className="text-4xl font-bold">${finalPrice}</span>
                      <span className="text-muted-foreground">/month</span>
                      <span className="text-sm text-muted-foreground line-through ml-2">${plan.price}</span>
                    </>
                  ) : (
                    <>
                      <span className="text-4xl font-bold">${plan.price}</span>
                      <span className="text-muted-foreground">/month</span>
                    </>
                  )}
                </div>
                <CardDescription className="pt-1.5">
                  {plan.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="pb-8">
                <ul className="grid gap-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-primary shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              
              <CardFooter className="pb-8">
                <Button asChild size={plan.mostPopular ? "lg" : "lg"} variant={plan.mostPopular ? "default" : "outline"} className="w-full">
                  <Link href="#waitlist">
                    {plan.price === 0 ? "Join Waitlist" : "Lock in Discount"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          )
        })}
      </div>
      
      {/* Additional Benefits */}
      <div className="max-w-3xl mx-auto mt-12">
        <div className="bg-muted/30 p-6 rounded-lg">
          <h3 className="text-lg font-bold mb-4 text-center">Additional Waitlist Benefits</h3>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="p-4 rounded-lg bg-white dark:bg-gray-800 border">
              <h4 className="font-medium mb-2">Grandfathered Pricing</h4>
              <p className="text-sm text-muted-foreground">Your founder&apos;s rate never increases as long as your subscription remains active</p>
            </div>
            <div className="p-4 rounded-lg bg-white dark:bg-gray-800 border">
              <h4 className="font-medium mb-2">Early Feature Access</h4>
              <p className="text-sm text-muted-foreground">Vote on and test new features before they&apos;re released to the public</p>
            </div>
            <div className="p-4 rounded-lg bg-white dark:bg-gray-800 border">
              <h4 className="font-medium mb-2">Priority Support</h4>
              <p className="text-sm text-muted-foreground">Fast-track support queue for founding members when we launch</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA */}
      <div className="text-center mt-12">
        <Button asChild size="lg" className="gradient-btn">
          <Link href="#waitlist">
            Join the Waitlist
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
        <p className="mt-3 text-sm text-muted-foreground">
          No commitment required. Lock in your discount for when we launch.
        </p>
      </div>
    </div>
  )
} 