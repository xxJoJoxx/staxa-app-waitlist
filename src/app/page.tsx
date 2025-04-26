"use client";

import WaitlistForm from "@/components/waitlist-form"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle, Cpu, Layers, Loader2, Zap, Database, Code, Server, Globe, ChevronLeft, ChevronRight, Github, GitBranch, Box, Network, Activity, Shield, LineChart, BarChart, Settings, LayoutGrid, Container, Package, Terminal, TestTube, GitMerge, X, AlertTriangle, BrainCircuit, FileCode, Sparkles, Play, Share2 } from "lucide-react"
import Link from "next/link"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { useState, useEffect, useRef } from "react"
import { Amplify } from "aws-amplify"
import outputs from "../../amplify_outputs.json"
import AnimatedTextCycle from "@/components/ui/animated-text-cycle"
import Image from "next/image"
import { PricingSection } from "@/components/pricing-section"

// Initialize Amplify
Amplify.configure(outputs, { ssr: true });

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [featureSlide, setFeatureSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isFeaturePaused, setIsFeaturePaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const featureIntervalRef = useRef<NodeJS.Timeout | null>(null);
  
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === 3 ? 0 : prev + 1));
  };
  
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? 3 : prev - 1));
  };

  const nextFeatureSlide = () => {
    setFeatureSlide((prev) => (prev === 6 ? 0 : prev + 1));
  };
  
  const prevFeatureSlide = () => {
    setFeatureSlide((prev) => (prev === 0 ? 6 : prev - 1));
  };

  const pauseCarousel = () => {
    setIsPaused(true);
  };

  const resumeCarousel = () => {
    setIsPaused(false);
  };
  
  const pauseFeatureCarousel = () => {
    setIsFeaturePaused(true);
  };

  const resumeFeatureCarousel = () => {
    setIsFeaturePaused(false);
  };

  // Setup auto-advance interval for the main carousel
  useEffect(() => {
    // Clear existing interval when component mounts or isPaused changes
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Only set interval if not paused
    if (!isPaused) {
      // Set up interval for the main carousel
      intervalRef.current = setInterval(() => {
        nextSlide();
      }, 3000);
      
      // Cleanup interval on component unmount
      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    } else {
      // Just cleanup on unmount when paused
      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }
  }, [isPaused]);
  
  // Setup auto-advance interval for the feature carousel
  useEffect(() => {
    // Clear existing interval when component mounts or isFeaturePaused changes
    if (featureIntervalRef.current) {
      clearInterval(featureIntervalRef.current);
    }

    // Only set interval if not paused
    if (!isFeaturePaused) {
      // Set up interval for the feature carousel
      featureIntervalRef.current = setInterval(() => {
        nextFeatureSlide();
      }, 4000); // Using different interval to avoid synchronized rotation
      
      // Cleanup interval on component unmount
      return () => {
        if (featureIntervalRef.current) {
          clearInterval(featureIntervalRef.current);
        }
      };
    } else {
      // Just cleanup on unmount when paused
      return () => {
        if (featureIntervalRef.current) {
          clearInterval(featureIntervalRef.current);
        }
      };
    }
  }, [isFeaturePaused]);

  return (
    <div className="flex min-h-screen flex-col">
      <style jsx global>{`
        .gradient-btn {
          background: linear-gradient(90deg, #3b82f6 0%, #2563eb 100%);
          background-size: 200% auto;
          transition: all 0.5s ease;
        }
        .gradient-btn:hover {
          background-position: right center;
          box-shadow: 0 10px 15px -3px rgba(59, 130, 246, 0.2), 0 4px 6px -2px rgba(59, 130, 246, 0.1);
        }
      `}</style>
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-6 sm:py-12 md:py-16 lg:py-24 xl:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col md:grid md:grid-cols-[1fr_400px] md:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-6xl/none">
                  One Click Deploy to {" "}
                    <AnimatedTextCycle 
                      words={["the cloud.", "AWS.", "GCP.", "Azure."] }
                      colors={[
                        ["#3b82f6", "#2563eb"], // Match the button gradient
                        ["#FF9900", "#e67700"], // AWS orange gradient
                        ["#4285F4", "#174ea6"], // GCP blue gradient
                        ["#0078D4", "#004578"]  // Azure blue gradient
                      ]}
                      interval={2000}
                      className="" 
                    />
                    {" "}
                  </h1>
                  <p className="max-w-[600px] text-gray-500 text-sm sm:text-base md:text-xl dark:text-gray-400">
                  Your next unicorn is a click away. No more stressing over the ideal stack and figuring out how to deploy it.
                  With{" "}
                  <span className="bg-gradient-to-r from-[#3b82f6] to-[#2563eb] bg-clip-text text-transparent font-semibold">
                    Staxa
                  </span>{" "}
                  you supply your code, set your env, deploy.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="#waitlist">
                    <Button 
                      className="inline-flex h-12 px-6 sm:h-10 sm:px-8 items-center justify-center rounded-md text-sm font-medium text-white shadow hover:shadow-lg focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 gradient-btn pulse-halo"
                    >
                      Join the Waitlist
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-start md:justify-end mt-8 md:mt-0">
                <div className="flex flex-col w-full max-w-[550px] md:max-w-[650px] xl:max-w-[700px] gap-4">
                  {/* Cloud Deployment Image */}
                  <div className="relative w-full overflow-visible flex justify-center">
                    <Image
                      src="/images/cloud-deployment.png" 
                      alt="Cloud Deployment Illustration"
                      width={1000}
                      height={1000}
                      className="w-auto h-auto max-w-full object-contain"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section - Moved above Features */}
        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-900">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-sm font-semibold">
                  How It Works
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Simple Deployment Process</h2>
                <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Deploy your applications to the cloud in four simple steps. No complex configuration required.
                </p>
              </div>
            </div>
            
            {/* Interactive Deployment Steps */}
            <div className="mt-12 relative max-w-2xl mx-auto bg-white dark:bg-gray-950 rounded-xl border border-gray-200 dark:border-gray-800" style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)' }}>
              {/* Step Navigation */}
              <div className="flex justify-between p-4 relative z-10 border-b border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-4">
                  {[0, 1, 2, 3].map((step) => (
                    <button
                      key={step}
                      className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-medium ${
                        currentSlide === step
                          ? 'bg-primary text-white'
                          : 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400'
                      }`}
                      onClick={() => setCurrentSlide(step)}
                    >
                      {step + 1}
                    </button>
                  ))}
                </div>
                <div className="flex gap-2">
                  <button 
                    className="p-1 rounded-md bg-gray-100 dark:bg-gray-800"
                    onClick={prevSlide}
                    onMouseEnter={pauseCarousel}
                    onMouseLeave={resumeCarousel}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button 
                    className="p-1 rounded-md bg-primary text-white"
                    onClick={nextSlide}
                    onMouseEnter={pauseCarousel}
                    onMouseLeave={resumeCarousel}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
              
              {/* Step Content */}
              <div className="relative w-full h-[450px]"
                onMouseEnter={pauseCarousel}
                onMouseLeave={resumeCarousel}
                onTouchStart={pauseCarousel}
                onTouchEnd={resumeCarousel}
              >
                {/* Step Progress Bar */}
                <div className="absolute top-0 left-0 h-1 bg-gray-100 dark:bg-gray-800 w-full overflow-hidden z-0">
                  <div 
                    className="h-full bg-primary transition-all duration-300 ease-in-out rounded-full"
                    style={{ width: `${(currentSlide + 1) / 4 * 100}%` }}  
                  />
                </div>
                
                {/* Step Cards */}
                <div className="mt-2 h-full">
                  {/* Code element with carousel */}
                  <div className="carousel-container overflow-hidden h-full">
                    <div 
                      className="carousel-track flex h-full transition-transform duration-300 ease-in-out"
                      style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                    >
                      {/* Step 1: Application Selection */}
                      <div className="carousel-item flex-shrink-0 w-full px-4 py-2">
                        <div className="bg-white dark:bg-gray-900 rounded-lg p-4">
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <h3 className="font-medium">Step 1: Select Application Type</h3>
                            </div>
                            
                            {/* App Type Options */}
                            <div className="space-y-2">
                              <div className="rounded-lg border-2 border-primary p-2 bg-primary/5 dark:bg-primary/10">
                                <div className="flex items-center gap-2">
                                  <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/10 dark:bg-primary/20">
                                    <Layers className="h-3.5 w-3.5 text-primary" />
                                  </div>
                                  <div>
                                    <div className="text-sm font-medium">Web Application</div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400">
                                      Full-stack web app with frontend and backend
                                    </div>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="rounded-lg border border-transparent p-2 bg-gray-50 dark:bg-gray-800">
                                <div className="flex items-center gap-2">
                                  <div className="flex h-7 w-7 items-center justify-center rounded-md bg-gray-200 dark:bg-gray-700">
                                    <Server className="h-3.5 w-3.5 text-gray-500 dark:text-gray-400" />
                                  </div>
                                  <div>
                                    <div className="text-sm font-medium">API Service</div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400">
                                      Backend API service with database
                                    </div>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="rounded-lg border border-transparent p-2 bg-gray-50 dark:bg-gray-800">
                                <div className="flex items-center gap-2">
                                  <div className="flex h-7 w-7 items-center justify-center rounded-md bg-gray-200 dark:bg-gray-700">
                                    <Globe className="h-3.5 w-3.5 text-gray-500 dark:text-gray-400" />
                                  </div>
                                  <div>
                                    <div className="text-sm font-medium">Static Website</div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400">
                                      Frontend-only static website
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            {/* Spacer to match height with other cards */}
                            <div className="py-5"></div>
                            
                            {/* Continue Button */}
                            <Button className="w-full" variant="outline" onClick={nextSlide}>
                              Continue
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                      
                      {/* Step 2: Source Code Selection */}
                      <div className="carousel-item flex-shrink-0 w-full px-4 py-2">
                        <div className="bg-white dark:bg-gray-900 rounded-lg p-4">
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <h3 className="font-medium">Step 2: Connect Your Code</h3>
                            </div>
                            
                            {/* Repository Preview */}
                            <div className="space-y-3">
                              <div className="rounded-lg border-2 border-primary p-3 bg-primary/5 dark:bg-primary/10">
                                <div className="flex items-center gap-3">
                                  <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 dark:bg-primary/20">
                                    <Github className="h-4 w-4 text-primary" />
                                  </div>
                                  <div className="flex-1">
                                    <div className="text-sm font-medium">My Demo Web App</div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400">
                                      github.com/username/demo-web-app
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Branch Selection */}
                              <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-md border border-gray-100 dark:border-gray-700">
                                <div className="flex items-center justify-between mb-2">
                                  <div className="text-xs font-medium">Branch</div>
                                  <div className="flex items-center gap-1 text-xs text-gray-500">
                                    <GitBranch className="h-3 w-3" />
                                    <span>main</span>
                                  </div>
                                </div>
                                
                                {/* Files Preview */}
                                <div className="space-y-1.5 mt-3">
                                  <div className="flex items-center gap-2 text-xs">
                                    <Code className="h-3 w-3 text-gray-400" />
                                    <span>src/App.jsx</span>
                                  </div>
                                  <div className="flex items-center gap-2 text-xs">
                                    <Code className="h-3 w-3 text-gray-400" />
                                    <span>src/components/Header.jsx</span>
                                  </div>
                                  <div className="flex items-center gap-2 text-xs">
                                    <Box className="h-3 w-3 text-gray-400" />
                                    <span>public/</span>
                                  </div>
                                  <div className="flex items-center gap-2 text-xs">
                                    <Code className="h-3 w-3 text-gray-400" />
                                    <span>package.json</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            {/* Spacer to match height with other cards */}
                            <div className="py-2"></div>
                            
                            {/* Continue Button */}
                            <Button className="w-full" variant="outline" onClick={nextSlide}>
                              Continue
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                      
                      {/* Step 3: Stack Selection */}
                      <div className="carousel-item flex-shrink-0 w-full px-4 py-2">
                        <div className="bg-white dark:bg-gray-900 rounded-lg p-4">
                          <div className="space-y-3">
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium">Step 3: Select a Stack Template</h3>
                              <div className="rounded-full bg-primary/10 px-1.5 py-0.5 text-[10px] font-medium text-primary flex items-center gap-1">
                                <Cpu className="h-3 w-3" />
                                <span>AI Powered</span>
                              </div>
                            </div>
                            
                            {/* Stack Options */}
                            <div className="space-y-2">
                              <div className="rounded-lg border border-transparent p-2.5 bg-gray-50 dark:bg-gray-800">
                                <div className="flex items-center gap-2.5">
                                  <div className="flex h-7 w-7 items-center justify-center rounded-md bg-gray-200 dark:bg-gray-700">
                                    <Database className="h-3.5 w-3.5 text-gray-500 dark:text-gray-400" />
                                  </div>
                                  <div>
                                    <div className="text-sm font-medium">Django + PostgreSQL</div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400">
                                      Python web framework + SQL database
                                    </div>
                                  </div>
                                </div>
                              </div>
                              
                              {/* Highlighted Stack */}
                              <div className="rounded-lg border-2 border-primary p-2.5 bg-primary/5 dark:bg-primary/10">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2.5">
                                    <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/10 dark:bg-primary/20">
                                      <Layers className="h-3.5 w-3.5 text-primary" />
                                    </div>
                                    <div>
                                      <div className="flex items-center gap-1.5">
                                        <span className="text-sm font-medium">MERN Stack</span>
                                        <div className="rounded-full bg-primary/10 px-1.5 py-0.5 text-[10px] font-medium text-primary">Best Match</div>
                                      </div>
                                      <div className="text-xs text-gray-500 dark:text-gray-400">
                                        MongoDB, Express, React, Node.js
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="rounded-lg border border-transparent p-2.5 bg-gray-50 dark:bg-gray-800">
                                <div className="flex items-center gap-2.5">
                                  <div className="flex h-7 w-7 items-center justify-center rounded-md bg-gray-200 dark:bg-gray-700">
                                    <Code className="h-3.5 w-3.5 text-gray-500 dark:text-gray-400" />
                                  </div>
                                  <div>
                                    <div className="text-sm font-medium">Next.js + FastAPI</div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400">
                                      React framework + Python API backend
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            {/* AI Recommendation Summary - Condensed */}
                            <div className="text-xs text-gray-600 dark:text-gray-300">
                              <span className="font-medium">Why MERN?</span> AI analyzed your app and determined MERN offers optimal performance for your specific needs.
                            </div>
                            
                            {/* Configuration Preview */}
                            <div className="grid grid-cols-3 gap-2 text-xs">
                              <div>
                                <div className="font-medium">Tier</div>
                                <div className="text-gray-500">Standard</div>
                              </div>
                              <div>
                                <div className="font-medium">Region</div>
                                <div className="text-gray-500">US East</div>
                              </div>
                              <div>
                                <div className="font-medium">Memory</div>
                                <div className="text-gray-500">2 GB</div>
                              </div>
                            </div>
                            
                            {/* Deploy Button */}
                            <Button className="w-full" variant="default" onClick={nextSlide}>
                              Deploy Now
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                      
                      {/* Step 4: Deployment in Progress */}
                      <div className="carousel-item flex-shrink-0 w-full px-4 py-2">
                        <div className="bg-white dark:bg-gray-900 rounded-lg p-4">
                          <div className="space-y-6">
                            {/* Header */}
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Layers className="h-5 w-5 text-primary" />
                                <span className="font-medium">Deployment in Progress</span>
                              </div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">ID: stx_d7f3a2</div>
                            </div>

                            {/* App Info */}
                            <div className="rounded-lg border border-transparent p-3 bg-gray-50 dark:bg-gray-800">
                              <div className="flex items-center gap-3">
                                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 dark:bg-primary/20">
                                  <Github className="h-4 w-4 text-primary" />
                                </div>
                                <div>
                                  <div className="text-sm font-medium">My Demo Web App</div>
                                  <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
                                    <span>github.com/username/demo-web-app</span>
                                    <div className="h-1 w-1 rounded-full bg-gray-300"></div>
                                    <div className="flex items-center gap-1">
                                      <GitBranch className="h-3 w-3" />
                                      <span>main</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            {/* Deployment Progress */}
                            <div className="space-y-4">
                              <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                  <span>Deploying MERN Stack</span>
                                  <span>75%</span>
                                </div>
                                <div className="h-2 w-full bg-gray-100 dark:bg-gray-800 rounded-full">
                                  <div className="h-2 w-[75%] bg-primary rounded-full"></div>
                                </div>
                              </div>
                              
                              {/* Deployment Steps */}
                              <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                                    <CheckCircle className="h-3 w-3 text-green-600 dark:text-green-400" />
                                  </div>
                                  <div className="flex-1">
                                    <div className="text-sm">Provisioning infrastructure</div>
                                    <div className="text-xs text-gray-500">Completed in 45s</div>
                                  </div>
                                </div>
                                <div className="flex items-center gap-3">
                                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                                    <CheckCircle className="h-3 w-3 text-green-600 dark:text-green-400" />
                                  </div>
                                  <div className="flex-1">
                                    <div className="text-sm">Setting up MongoDB database</div>
                                    <div className="text-xs text-gray-500">Completed in 32s</div>
                                  </div>
                                </div>
                                <div className="flex items-center gap-3">
                                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
                                    <Loader2 className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600 dark:text-blue-400 animate-spin" />
                                  </div>
                                  <div className="flex-1">
                                    <div className="text-sm">Building and deploying application</div>
                                    <div className="flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400">
                                      <span>In progress</span>
                                      <span className="text-gray-400 dark:text-gray-500">~2 min remaining</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex items-center gap-3">
                                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
                                    <div className="h-3 w-3 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                                  </div>
                                  <div className="flex-1">
                                    <div className="text-sm text-gray-400 dark:text-gray-500">Configuring networking</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            {/* Bottom Actions */}
                            <div className="flex justify-between items-center">
                              <div className="text-xs text-gray-500 dark:text-gray-400">Estimated time: 3-5 minutes</div>
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm" className="border-gray-200 dark:border-gray-700">
                                  <Share2 className="h-3.5 w-3.5 mr-1" />
                                  Share
                                </Button>
                                <Button size="sm" variant="default">
                                  View Details
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-950">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-sm font-semibold">
                  Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Simplified Cloud Deployments</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Deploy your applications and infrastructure with ease, regardless of your technical expertise.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
              <div className="flex flex-col items-center text-center justify-center space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 dark:bg-primary/20">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">One-Click Deployments</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Deploy complex infrastructure stacks to AWS, GCP, or Azure with a single click.
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center text-center justify-center space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 dark:bg-primary/20">
                  <Layers className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Predefined & Custom Stacks</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Choose from optimized templates or build your own custom architecture.
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center text-center justify-center space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 dark:bg-primary/20">
                  <Cpu className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">AI-Powered Recommendations</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Get intelligent suggestions for your infrastructure based on your specific needs.
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center text-center justify-center space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 dark:bg-primary/20">
                  <Code className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">API Integration</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Seamlessly integrate Staxa with your own applications through our robust API.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Advanced Features Section */}
        <section id="advanced-features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-sm font-semibold">
                  Advanced Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Powerful Tools for Modern DevOps</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Staxa provides comprehensive tools that empower developers and DevOps teams to build, deploy, and manage cloud infrastructure.
                </p>
              </div>
            </div>
            
            {/* Advanced Features Carousel */}
            <div className="mt-12 relative">
              <div className="mx-auto max-w-6xl rounded-xl overflow-hidden shadow-lg">
                <div className="bg-gradient-to-br from-indigo-50 to-blue-100 dark:from-indigo-950/50 dark:to-blue-950/50 p-8"
                     onMouseEnter={pauseFeatureCarousel}
                     onMouseLeave={resumeFeatureCarousel}
                     onTouchStart={pauseFeatureCarousel}
                     onTouchEnd={resumeFeatureCarousel}>
                  <div className="flex items-center justify-between mb-8">
                    {/* Feature Navigation */}
                    <div className="flex flex-wrap gap-2 justify-center">
                      <button 
                        className={`rounded-full px-3 py-1 text-xs font-medium ${featureSlide === 0 ? 'bg-primary text-white' : 'bg-white/80 dark:bg-gray-800/80'}`}
                        onClick={() => {
                          setFeatureSlide(0);
                          pauseFeatureCarousel();
                        }}
                      >
                        Overview
                      </button>
                      <button 
                        className={`rounded-full px-3 py-1 text-xs font-medium ${featureSlide === 1 ? 'bg-primary text-white' : 'bg-white/80 dark:bg-gray-800/80'}`}
                        onClick={() => {
                          setFeatureSlide(1);
                          pauseFeatureCarousel();
                        }}
                      >
                        Visualization
                      </button>
                      <button 
                        className={`rounded-full px-3 py-1 text-xs font-medium ${featureSlide === 2 ? 'bg-primary text-white' : 'bg-white/80 dark:bg-gray-800/80'}`}
                        onClick={() => {
                          setFeatureSlide(2);
                          pauseFeatureCarousel();
                        }}
                      >
                        AI Tools
                      </button>
                      <button 
                        className={`rounded-full px-3 py-1 text-xs font-medium ${featureSlide === 3 ? 'bg-primary text-white' : 'bg-white/80 dark:bg-gray-800/80'}`}
                        onClick={() => {
                          setFeatureSlide(3);
                          pauseFeatureCarousel();
                        }}
                      >
                        Templates
                      </button>
                      <button 
                        className={`rounded-full px-3 py-1 text-xs font-medium ${featureSlide === 4 ? 'bg-primary text-white' : 'bg-white/80 dark:bg-gray-800/80'}`}
                        onClick={() => {
                          setFeatureSlide(4);
                          pauseFeatureCarousel();
                        }}
                      >
                        DevOps
                      </button>
                      <button 
                        className={`rounded-full px-3 py-1 text-xs font-medium ${featureSlide === 5 ? 'bg-primary text-white' : 'bg-white/80 dark:bg-gray-800/80'}`}
                        onClick={() => {
                          setFeatureSlide(5);
                          pauseFeatureCarousel();
                        }}
                      >
                        Testing
                      </button>
                      <button 
                        className={`rounded-full px-3 py-1 text-xs font-medium ${featureSlide === 6 ? 'bg-primary text-white' : 'bg-white/80 dark:bg-gray-800/80'}`}
                        onClick={() => {
                          setFeatureSlide(6);
                          pauseFeatureCarousel();
                        }}
                      >
                        AI-Powered Code Editor
                      </button>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        className="p-1 rounded-md bg-white/80 dark:bg-gray-800/80"
                        onClick={() => {
                          prevFeatureSlide();
                          pauseFeatureCarousel();
                        }}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </button>
                      <button 
                        className="p-1 rounded-md bg-primary text-white"
                        onClick={() => {
                          nextFeatureSlide();
                          pauseFeatureCarousel();
                        }}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  
                  {/* Infrastructure Visualization */}
                  <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 ${featureSlide === 0 ? 'block' : 'hidden'}`}>
                    <div className="space-y-4 flex flex-col items-center text-center justify-center lg:items-start lg:text-left">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 dark:bg-primary/20">
                        <Network className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-2xl font-bold">Infrastructure Visualization</h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        Get a clear view of your entire cloud infrastructure with our interactive visualization dashboard. Monitor resources, analyze costs, and identify optimization opportunities at a glance.
                      </p>
                      <ul className="space-y-2 w-fit mx-auto lg:mx-0 text-left">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                          <span>Real-time resource monitoring</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                          <span>Interactive dependency mapping</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                          <span>Cost analysis and optimization</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                          <span>Multi-cloud environment support</span>
                        </li>
                      </ul>
                    </div>
                    
                    {/* Infrastructure Dashboard Preview */}
                    <div className="relative h-[550px] rounded-xl bg-white dark:bg-gray-900 shadow-lg overflow-hidden border">
                      <div className="absolute inset-0 p-4">
                        {/* Dashboard Header */}
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <Network className="h-5 w-5 text-primary" />
                            <h4 className="font-medium">Infrastructure Dashboard</h4>
                          </div>
                          <div className="flex items-center gap-2">
                            <button className="rounded-md bg-gray-100 p-1 dark:bg-gray-800">
                              <Settings className="h-4 w-4 text-gray-500" />
                            </button>
                          </div>
                        </div>
                        
                        {/* Infrastructure Visualization */}
                        <div className="relative h-[450px] bg-gray-50 dark:bg-gray-800 rounded-lg p-3 overflow-y-auto">
                          {/* Resource Map */}
                          <div className="p-2 mb-3">
                            <div className="text-sm font-medium mb-2">Resource Map</div>
                            <div className="bg-white dark:bg-gray-900 rounded-md p-2 border border-gray-200 dark:border-gray-700">
                              <div className="flex flex-col items-center">
                                {/* Network Graph Visualization */}
                                <div className="w-full h-[180px] rounded-md bg-gray-50 dark:bg-gray-800 p-2 relative">
                                  {/* VPC */}
                                  <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg w-[85%] h-[85%] flex items-center justify-center">
                                    <div className="absolute top-[-12px] left-4 bg-white dark:bg-gray-900 px-2 text-xs font-medium">VPC</div>
                                    
                                    {/* Web Tier */}
                                    <div className="absolute top-[15%] left-[20%] flex flex-col items-center">
                                      <div className="h-10 w-10 bg-blue-100 dark:bg-blue-900/30 rounded-md flex items-center justify-center">
                                        <Globe className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                      </div>
                                      <div className="text-xs mt-1">Web Tier</div>
                                      <div className="text-[10px] text-gray-500">2 instances</div>
                                    </div>
                                    
                                    {/* App Tier */}
                                    <div className="absolute top-[30%] left-[50%] transform -translate-x-1/2 flex flex-col items-center">
                                      <div className="h-10 w-10 bg-green-100 dark:bg-green-900/30 rounded-md flex items-center justify-center">
                                        <Server className="h-5 w-5 text-green-600 dark:text-green-400" />
                                      </div>
                                      <div className="text-xs mt-1">App Tier</div>
                                      <div className="text-[10px] text-gray-500">3 instances</div>
                                    </div>
                                    
                                    {/* Database */}
                                    <div className="absolute top-[60%] right-[20%] flex flex-col items-center">
                                      <div className="h-10 w-10 bg-purple-100 dark:bg-purple-900/30 rounded-md flex items-center justify-center">
                                        <Database className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                                      </div>
                                      <div className="text-xs mt-1">Database</div>
                                      <div className="text-[10px] text-gray-500">Primary + Replica</div>
                                    </div>
                                    
                                    {/* Connection Lines */}
                                    <svg className="absolute inset-0 w-full h-full" style={{ zIndex: -1 }}>
                                      <line x1="28%" y1="20%" x2="45%" y2="32%" stroke="#94a3b8" strokeWidth="1" strokeDasharray="4" />
                                      <line x1="50%" y1="38%" x2="72%" y2="60%" stroke="#94a3b8" strokeWidth="1" strokeDasharray="4" />
                                    </svg>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          {/* Resource Stats */}
                          <div className="p-2">
                            <div className="text-sm font-medium mb-2">Resource Usage</div>
                            <div className="grid grid-cols-2 gap-2">
                              <div className="bg-white dark:bg-gray-900 rounded-md p-2 border border-gray-200 dark:border-gray-700">
                                <div className="text-xs font-medium mb-1">CPU Usage</div>
                                <div className="h-1.5 w-full bg-gray-100 dark:bg-gray-800 rounded-full">
                                  <div className="h-1.5 w-[65%] bg-blue-500 rounded-full"></div>
                                </div>
                                <div className="flex justify-between mt-1 text-[10px] text-gray-500">
                                  <span>65%</span>
                                  <span>12 vCPUs</span>
                                </div>
                              </div>
                              <div className="bg-white dark:bg-gray-900 rounded-md p-2 border border-gray-200 dark:border-gray-700">
                                <div className="text-xs font-medium mb-1">Memory Usage</div>
                                <div className="h-1.5 w-full bg-gray-100 dark:bg-gray-800 rounded-full">
                                  <div className="h-1.5 w-[48%] bg-green-500 rounded-full"></div>
                                </div>
                                <div className="flex justify-between mt-1 text-[10px] text-gray-500">
                                  <span>48%</span>
                                  <span>32 GB</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          {/* Cost Analysis */}
                          <div className="p-2 mt-2">
                            <div className="text-sm font-medium mb-2">Cost Analysis</div>
                            <div className="bg-white dark:bg-gray-900 rounded-md p-2 border border-gray-200 dark:border-gray-700">
                              <div className="flex justify-between mb-2">
                                <div className="text-xs">Current Month</div>
                                <div className="text-xs font-medium">$247.50</div>
                              </div>
                              <div className="flex items-end h-[50px] gap-1">
                                <div className="flex-1 bg-blue-100 dark:bg-blue-900/30 rounded-sm h-[70%]"></div>
                                <div className="flex-1 bg-blue-100 dark:bg-blue-900/30 rounded-sm h-[50%]"></div>
                                <div className="flex-1 bg-blue-100 dark:bg-blue-900/30 rounded-sm h-[65%]"></div>
                                <div className="flex-1 bg-blue-100 dark:bg-blue-900/30 rounded-sm h-[80%]"></div>
                                <div className="flex-1 bg-primary/20 rounded-sm h-[60%]"></div>
                                <div className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-sm h-[40%]"></div>
                                <div className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-sm h-[30%]"></div>
                              </div>
                              <div className="flex justify-between mt-1 text-[10px] text-gray-500">
                                <span>Week 1</span>
                                <span>Week 2</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Bottom Actions */}
                        <div className="flex justify-between items-center mt-4 p-1">
                          <div className="text-xs text-gray-500">Last updated: 2 minutes ago</div>
                          <div className="flex gap-2">
                            <button className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">Refresh</button>
                            <button className="text-xs bg-primary/10 text-primary px-2 py-1 rounded flex items-center gap-1">
                              <ArrowRight className="h-3 w-3" />
                              <span>View Details</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Development Environment */}
                  <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 ${featureSlide === 1 ? 'block' : 'hidden'}`}>
                    <div className="space-y-4 flex flex-col items-center text-center justify-center lg:items-start lg:text-left">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 dark:bg-primary/20">
                        <Terminal className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-2xl font-bold">Local Development Environment</h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        Replicate your production infrastructure locally with our development environment tools. Test and iterate quickly with all the services your application needs.
                      </p>
                      <ul className="space-y-2 w-fit mx-auto lg:mx-0 text-left">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                          <span>One-click local development setup</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                          <span>Container-based service orchestration</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                          <span>Hot reloading and live debugging</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                          <span>Production parity environment</span>
                        </li>
                      </ul>
                    </div>
                    
                    {/* Development Environment Dashboard */}
                    <div className="relative h-[550px] rounded-xl bg-white dark:bg-gray-900 shadow-lg overflow-hidden border">
                      <div className="absolute inset-0 p-4">
                        {/* Dashboard Header */}
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <Terminal className="h-5 w-5 text-primary" />
                            <h4 className="font-medium">Local Development Console</h4>
                          </div>
                          <div className="flex items-center gap-2">
                            <button className="rounded-md bg-gray-100 p-1 dark:bg-gray-800">
                              <Settings className="h-4 w-4 text-gray-500" />
                            </button>
                          </div>
                        </div>
                        
                        {/* Dev Environment UI */}
                        <div className="relative h-[450px] bg-gray-50 dark:bg-gray-800 rounded-lg overflow-hidden">
                          {/* Left Panel - Service List */}
                          <div className="absolute left-0 top-0 h-full w-[120px] bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 p-2">
                            <div className="text-xs font-medium mb-2">Services</div>
                            <div className="space-y-1.5">
                              <div className="rounded-md bg-primary/10 p-1.5">
                                <div className="flex items-center gap-1.5">
                                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                                  <div className="text-xs">web-app</div>
                                </div>
                              </div>
                              <div className="rounded-md bg-white dark:bg-gray-800 p-1.5">
                                <div className="flex items-center gap-1.5">
                                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                                  <div className="text-xs">api</div>
                                </div>
                              </div>
                              <div className="rounded-md bg-white dark:bg-gray-800 p-1.5">
                                <div className="flex items-center gap-1.5">
                                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                                  <div className="text-xs">database</div>
                                </div>
                              </div>
                              <div className="rounded-md bg-white dark:bg-gray-800 p-1.5">
                                <div className="flex items-center gap-1.5">
                                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                                  <div className="text-xs">cache</div>
                                </div>
                              </div>
                              <div className="rounded-md bg-white dark:bg-gray-800 p-1.5">
                                <div className="flex items-center gap-1.5">
                                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                                  <div className="text-xs">storage</div>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          {/* Right Panel - Terminal Output */}
                          <div className="absolute right-0 top-0 h-full w-[calc(100%-120px)] bg-gray-900 p-3 overflow-y-auto text-xs font-mono text-green-400">
                            <div className="mb-2">
                              <span className="text-blue-400">$</span> staxa dev start
                            </div>
                            <div className="mb-0.5 text-gray-400">
                              Starting development environment for my-project...
                            </div>
                            <div className="mb-0.5">
                              <span className="text-gray-400">[info]</span> Pulling latest images
                            </div>
                            <div className="mb-0.5">
                              <span className="text-gray-400">[info]</span> Starting database service
                            </div>
                            <div className="mb-0.5">
                              <span className="text-purple-400">[mongodb]</span> MongoDB starting on port 27017
                            </div>
                            <div className="mb-0.5">
                              <span className="text-gray-400">[info]</span> Starting cache service
                            </div>
                            <div className="mb-0.5">
                              <span className="text-red-400">[redis]</span> Redis server started on port 6379
                            </div>
                            <div className="mb-0.5">
                              <span className="text-gray-400">[info]</span> Starting API service
                            </div>
                            <div className="mb-0.5">
                              <span className="text-yellow-400">[api]</span> Starting Node.js server
                            </div>
                            <div className="mb-0.5">
                              <span className="text-yellow-400">[api]</span> Connected to MongoDB
                            </div>
                            <div className="mb-0.5">
                              <span className="text-yellow-400">[api]</span> API server running on http://localhost:3001
                            </div>
                            <div className="mb-0.5">
                              <span className="text-gray-400">[info]</span> Starting web application
                            </div>
                            <div className="mb-0.5">
                              <span className="text-blue-400">[web]</span> Compiling...
                            </div>
                            <div className="mb-0.5">
                              <span className="text-blue-400">[web]</span> Compiled successfully!
                            </div>
                            <div className="mb-0.5">
                              <span className="text-blue-400">[web]</span> Web app running on http://localhost:3000
                            </div>
                            <div className="mb-2">
                              <span className="text-gray-400">[info]</span> All services started successfully
                            </div>
                            <div className="mb-0.5">
                              <span className="text-yellow-400">[api]</span> GET /api/users 200 - 15ms
                            </div>
                            <div className="mb-0.5">
                              <span className="text-yellow-400">[api]</span> GET /api/products 200 - 24ms
                            </div>
                            <div className="mb-0.5">
                              <span className="text-blue-400">[web]</span> Hot Module Replacement enabled
                            </div>
                            <div className="mb-0.5 animate-pulse">
                              <span className="text-blue-400">$</span> <span className="animate-pulse">|</span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Bottom Actions */}
                        <div className="flex justify-between items-center mt-4 p-1">
                          <div className="text-xs text-gray-500">Development environment: Running</div>
                          <div className="flex gap-2">
                            <button className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">Restart</button>
                            <button className="text-xs bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400 px-2 py-1 rounded">Stop</button>
                            <button className="text-xs bg-primary/10 text-primary px-2 py-1 rounded flex items-center gap-1">
                              <ArrowRight className="h-3 w-3" />
                              <span>Open App</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* AI Tools */}
                  <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 ${featureSlide === 2 ? 'block' : 'hidden'}`}>
                    <div className="space-y-4 flex flex-col items-center text-center justify-center lg:items-start lg:text-left">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 dark:bg-primary/20">
                        <Cpu className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-2xl font-bold">AI-Powered Optimization</h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        Our intelligent AI analyzes your applications and infrastructure to provide tailored recommendations for performance, cost efficiency, and security.
                      </p>
                      <ul className="space-y-2 w-fit mx-auto lg:mx-0 text-left">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                          <span>Intelligent resource sizing</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                          <span>Cost optimization recommendations</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                          <span>Automated security scanning</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                          <span>Performance bottleneck detection</span>
                        </li>
                      </ul>
                    </div>
                    
                    {/* AI Recommendation Dashboard */}
                    <div className="relative h-[550px] rounded-xl bg-white dark:bg-gray-900 shadow-lg overflow-hidden border">
                      <div className="absolute inset-0 p-4">
                        {/* Dashboard Header */}
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <Cpu className="h-5 w-5 text-primary" />
                            <h4 className="font-medium">AI Recommendations</h4>
                          </div>
                          <div className="flex items-center gap-2">
                            <button className="rounded-md bg-gray-100 p-1 dark:bg-gray-800">
                              <Settings className="h-4 w-4 text-gray-500" />
                            </button>
                          </div>
                        </div>
                        
                        {/* AI Recommendation UI */}
                        <div className="relative h-[450px] bg-gray-50 dark:bg-gray-800 rounded-lg p-3 overflow-y-auto">
                          {/* Optimization Score */}
                          <div className="bg-white dark:bg-gray-900 rounded-md p-3 border border-gray-200 dark:border-gray-700 mb-3">
                            <div className="flex items-center justify-between mb-2">
                              <div className="text-sm font-medium">Infrastructure Score</div>
                              <div className="text-sm font-bold text-primary">78/100</div>
                            </div>
                            <div className="h-2 w-full bg-gray-100 dark:bg-gray-800 rounded-full">
                              <div className="h-2 w-[78%] bg-primary rounded-full"></div>
                            </div>
                            <div className="flex justify-between mt-2 text-xs text-gray-500">
                              <span>Cost</span>
                              <span>Performance</span>
                              <span>Security</span>
                            </div>
                          </div>
                          
                          {/* Recommendations List */}
                          <div className="space-y-3">
                            <div className="text-sm font-medium">Top Recommendations</div>
                            
                            {/* Recommendation 1 */}
                            <div className="bg-white dark:bg-gray-900 rounded-md p-3 border border-yellow-200 dark:border-yellow-900">
                              <div className="flex items-start gap-2">
                                <div className="h-5 w-5 flex-shrink-0 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center mt-0.5">
                                  <Activity className="h-3 w-3 text-yellow-600 dark:text-yellow-400" />
                                </div>
                                <div>
                                  <div className="text-sm font-medium mb-1">Resize Web Service Resources</div>
                                  <p className="text-xs text-gray-500 dark:text-gray-400">
                                    Your web service is currently overprovisioned. We recommend reducing from 4 vCPUs to 2 vCPUs
                                    to save ~$45/month with minimal performance impact.
                                  </p>
                                  <div className="flex items-center gap-2 mt-2">
                                    <button className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">Apply</button>
                                    <button className="text-xs text-gray-500 px-2 py-1">Dismiss</button>
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            {/* Recommendation 2 */}
                            <div className="bg-white dark:bg-gray-900 rounded-md p-3 border border-red-200 dark:border-red-900">
                              <div className="flex items-start gap-2">
                                <div className="h-5 w-5 flex-shrink-0 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mt-0.5">
                                  <X className="h-3 w-3 text-red-600 dark:text-red-400" />
                                </div>
                                <div>
                                  <div className="text-sm font-medium mb-1">Security Update Required</div>
                                  <p className="text-xs text-gray-500 dark:text-gray-400">
                                    Your Node.js API service is using an outdated package with known vulnerabilities.
                                    We recommend updating lodash from v4.17.15 to v4.17.21.
                                  </p>
                                  <div className="flex items-center gap-2 mt-2">
                                    <button className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">Apply</button>
                                    <button className="text-xs text-gray-500 px-2 py-1">Dismiss</button>
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            {/* Recommendation 3 */}
                            <div className="bg-white dark:bg-gray-900 rounded-md p-3 border border-green-200 dark:border-green-900">
                              <div className="flex items-start gap-2">
                                <div className="h-5 w-5 flex-shrink-0 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mt-0.5">
                                  <BarChart className="h-3 w-3 text-green-600 dark:text-green-400" />
                                </div>
                                <div>
                                  <div className="text-sm font-medium mb-1">Enable Database Caching</div>
                                  <p className="text-xs text-gray-500 dark:text-gray-400">
                                    Adding Redis caching for your most frequent database queries could improve 
                                    response times by up to 65% and reduce database load.
                                  </p>
                                  <div className="flex items-center gap-2 mt-2">
                                    <button className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">Apply</button>
                                    <button className="text-xs text-gray-500 px-2 py-1">Dismiss</button>
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            {/* Recommendation 4 - Code Improvement */}
                            <div className="bg-white dark:bg-gray-900 rounded-md p-3 border border-blue-200 dark:border-blue-900">
                              <div className="flex items-start gap-2">
                                <div className="h-5 w-5 flex-shrink-0 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mt-0.5">
                                  <Code className="h-3 w-3 text-blue-600 dark:text-blue-400" />
                                </div>
                                <div>
                                  <div className="text-sm font-medium mb-1">Code Performance Optimization</div>
                                  <p className="text-xs text-gray-500 dark:text-gray-400">
                                    We detected inefficient database queries in your API controllers. 
                                  </p>
                                  
                                  {/* Code Comparison */}
                                  <div className="mt-1 mb-2 bg-gray-50 dark:bg-gray-800 rounded-md overflow-hidden text-[10px] font-mono">
                                    <div className="bg-red-50 dark:bg-red-900/10 p-1.5 border-l-2 border-red-300 dark:border-red-700">
                                      <div className="text-red-600 dark:text-red-400">{"- const users = await User.find({});"}</div>
                                      <div className="text-red-600 dark:text-red-400">{"- const result = users.filter(u => u.status === 'active');"}</div>
                                    </div>
                                    <div className="bg-green-50 dark:bg-green-900/10 p-1.5 border-l-2 border-green-300 dark:border-green-700">
                                      <div className="text-green-600 dark:text-green-400">{"+ const result = await User.find({ status: 'active' });"}</div>
                                    </div>
                                  </div>
                                  
                                  <p className="text-xs text-gray-500 dark:text-gray-400">
                                    This change improves query performance by filtering at the database level instead of in memory.
                                  </p>
                                  
                                  <div className="flex items-center gap-2 mt-2">
                                    <button className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">Apply</button>
                                    <button className="text-xs text-gray-500 px-2 py-1">Review Changes</button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Bottom Actions */}
                        <div className="flex justify-between items-center mt-4 p-1">
                          <div className="text-xs text-gray-500">Last analyzed: 30 minutes ago</div>
                          <div className="flex gap-2">
                            <button className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">Re-analyze</button>
                            <button className="text-xs bg-primary/10 text-primary px-2 py-1 rounded flex items-center gap-1">
                              <ArrowRight className="h-3 w-3" />
                              <span>View All</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Application Templates */}
                  <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 ${featureSlide === 3 ? 'block' : 'hidden'}`}>
                    <div className="space-y-4 flex flex-col items-center text-center justify-center lg:items-start lg:text-left">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 dark:bg-primary/20">
                        <LayoutGrid className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-2xl font-bold">Pre-built Application Templates</h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        Jumpstart your projects with our collection of pre-built, production-ready application templates for common use cases and tech stacks.
                      </p>
                      <ul className="space-y-2 w-fit mx-auto lg:mx-0 text-left">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                          <span>Modern web application starters</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                          <span>API and microservice templates</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                          <span>E-commerce and CMS solutions</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                          <span>Customizable and extendable</span>
                        </li>
                      </ul>
                    </div>
                    
                    {/* Application Templates Dashboard */}
                    <div className="relative h-[550px] rounded-xl bg-white dark:bg-gray-900 shadow-lg overflow-hidden border">
                      <div className="absolute inset-0 p-4">
                        {/* Dashboard Header */}
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <LayoutGrid className="h-5 w-5 text-primary" />
                            <h4 className="font-medium">Application Templates</h4>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="relative">
                              <input
                                type="text"
                                placeholder="Search templates..."
                                className="text-xs rounded-md border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 py-1 px-2 w-32"
                              />
                            </div>
                          </div>
                        </div>
                        
                        {/* Templates UI */}
                        <div className="relative h-[450px] bg-gray-50 dark:bg-gray-800 rounded-lg p-3 overflow-y-auto">
                          {/* Categories */}
                          <div className="flex gap-2 mb-3 flex-wrap">
                            <button className="text-xs rounded-full bg-primary/10 text-primary px-2.5 py-1">
                              All Templates
                            </button>
                            <button className="text-xs rounded-full bg-white dark:bg-gray-900 px-2.5 py-1">
                              Web Apps
                            </button>
                            <button className="text-xs rounded-full bg-white dark:bg-gray-900 px-2.5 py-1">
                              APIs
                            </button>
                            <button className="text-xs rounded-full bg-white dark:bg-gray-900 px-2.5 py-1">
                              E-commerce
                            </button>
                            <button className="text-xs rounded-full bg-white dark:bg-gray-900 px-2.5 py-1">
                              Blogs
                            </button>
                          </div>
                          
                          {/* Templates Grid */}
                          <div className="grid grid-cols-2 gap-3">
                            {/* Template 1 */}
                            <div className="bg-white dark:bg-gray-900 rounded-md border border-gray-200 dark:border-gray-700 overflow-hidden">
                              <div className="h-24 bg-gradient-to-r from-blue-500 to-indigo-600 relative">
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <Globe className="h-8 w-8 text-white" />
                                </div>
                                <div className="absolute top-2 right-2 bg-black/40 text-white text-[10px] rounded px-1.5 py-0.5">
                                  Popular
                                </div>
                              </div>
                              <div className="p-2">
                                <div className="text-sm font-medium mb-1">Next.js Frontend</div>
                                <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                                  Modern React web application with SSR and API routes
                                </div>
                                <div className="flex gap-1 flex-wrap mb-2">
                                  <span className="bg-gray-100 dark:bg-gray-800 rounded-sm text-[10px] px-1.5 py-0.5">React</span>
                                  <span className="bg-gray-100 dark:bg-gray-800 rounded-sm text-[10px] px-1.5 py-0.5">Next.js</span>
                                  <span className="bg-gray-100 dark:bg-gray-800 rounded-sm text-[10px] px-1.5 py-0.5">Tailwind</span>
                                </div>
                                <button className="w-full text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                                  Use Template
                                </button>
                              </div>
                            </div>
                            
                            {/* Template 2 */}
                            <div className="bg-white dark:bg-gray-900 rounded-md border border-gray-200 dark:border-gray-700 overflow-hidden">
                              <div className="h-24 bg-gradient-to-r from-green-500 to-emerald-600 relative">
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <Server className="h-8 w-8 text-white" />
                                </div>
                              </div>
                              <div className="p-2">
                                <div className="text-sm font-medium mb-1">Express API</div>
                                <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                                  RESTful API with authentication and database
                                </div>
                                <div className="flex gap-1 flex-wrap mb-2">
                                  <span className="bg-gray-100 dark:bg-gray-800 rounded-sm text-[10px] px-1.5 py-0.5">Node.js</span>
                                  <span className="bg-gray-100 dark:bg-gray-800 rounded-sm text-[10px] px-1.5 py-0.5">Express</span>
                                  <span className="bg-gray-100 dark:bg-gray-800 rounded-sm text-[10px] px-1.5 py-0.5">MongoDB</span>
                                </div>
                                <button className="w-full text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                                  Use Template
                                </button>
                              </div>
                            </div>
                            
                            {/* Template 3 */}
                            <div className="bg-white dark:bg-gray-900 rounded-md border border-gray-200 dark:border-gray-700 overflow-hidden">
                              <div className="h-24 bg-gradient-to-r from-purple-500 to-violet-600 relative">
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <Package className="h-8 w-8 text-white" />
                                </div>
                              </div>
                              <div className="p-2">
                                <div className="text-sm font-medium mb-1">E-commerce Store</div>
                                <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                                  Complete online store with product catalog
                                </div>
                                <div className="flex gap-1 flex-wrap mb-2">
                                  <span className="bg-gray-100 dark:bg-gray-800 rounded-sm text-[10px] px-1.5 py-0.5">Next.js</span>
                                  <span className="bg-gray-100 dark:bg-gray-800 rounded-sm text-[10px] px-1.5 py-0.5">Stripe</span>
                                  <span className="bg-gray-100 dark:bg-gray-800 rounded-sm text-[10px] px-1.5 py-0.5">PostgreSQL</span>
                                </div>
                                <button className="w-full text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                                  Use Template
                                </button>
                              </div>
                            </div>
                            
                            {/* Template 4 */}
                            <div className="bg-white dark:bg-gray-900 rounded-md border border-gray-200 dark:border-gray-700 overflow-hidden">
                              <div className="h-24 bg-gradient-to-r from-amber-500 to-orange-600 relative">
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <Activity className="h-8 w-8 text-white" />
                                </div>
                              </div>
                              <div className="p-2">
                                <div className="text-sm font-medium mb-1">Admin Dashboard</div>
                                <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                                  User management and analytics panel
                                </div>
                                <div className="flex gap-1 flex-wrap mb-2">
                                  <span className="bg-gray-100 dark:bg-gray-800 rounded-sm text-[10px] px-1.5 py-0.5">React</span>
                                  <span className="bg-gray-100 dark:bg-gray-800 rounded-sm text-[10px] px-1.5 py-0.5">GraphQL</span>
                                  <span className="bg-gray-100 dark:bg-gray-800 rounded-sm text-[10px] px-1.5 py-0.5">Charts</span>
                                </div>
                                <button className="w-full text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                                  Use Template
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Bottom Actions */}
                        <div className="flex justify-between items-center mt-4 p-1">
                          <div className="text-xs text-gray-500">42 templates available</div>
                          <div className="flex gap-2">
                            <button className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">Filter</button>
                            <button className="text-xs bg-primary/10 text-primary px-2 py-1 rounded flex items-center gap-1">
                              <ArrowRight className="h-3 w-3" />
                              <span>Browse All</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* DevOps Tools and CI/CD Pipeline */}
                  <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 ${featureSlide === 4 ? 'block' : 'hidden'}`}>
                    <div className="space-y-4 flex flex-col items-center text-center justify-center lg:items-start lg:text-left">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 dark:bg-primary/20">
                        <GitMerge className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-2xl font-bold">Serverless Functions & CI/CD</h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        Automate your deployment workflow with our seamless CI/CD integration and access pre-built serverless 
                        functions for common development needs.
                      </p>
                      <ul className="space-y-2 w-fit mx-auto lg:mx-0 text-left">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                          <span>Pre-built functions for common tasks</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                          <span>Branch-based preview environments</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                          <span>Drift detection & infrastructure testing</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                          <span>Automated rollbacks & canary deployments</span>
                        </li>
                      </ul>
                    </div>
                    
                    {/* DevOps Dashboard Preview */}
                    <div className="relative h-[550px] rounded-xl bg-white dark:bg-gray-900 shadow-lg overflow-hidden border">
                      <div className="absolute inset-0 p-4">
                        {/* Dashboard Header */}
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <GitMerge className="h-5 w-5 text-primary" />
                            <h4 className="font-medium">CI/CD Pipeline</h4>
                          </div>
                          <div className="flex items-center gap-2">
                            <button className="rounded-md bg-gray-100 p-1 dark:bg-gray-800">
                              <Settings className="h-4 w-4 text-gray-500" />
                            </button>
                          </div>
                        </div>
                        
                        {/* CI/CD UI */}
                        <div className="relative h-[450px] bg-gray-50 dark:bg-gray-800 rounded-lg p-3 overflow-y-auto">
                          {/* Repository Header */}
                          <div className="flex items-center justify-between mb-3 p-2 bg-white dark:bg-gray-900 rounded-md shadow-sm border border-gray-200 dark:border-gray-700">
                            <div className="flex items-center gap-2">
                              <Github className="h-4 w-4 text-gray-700 dark:text-gray-300" />
                              <div className="text-sm font-medium">my-project</div>
                            </div>
                            <div className="flex items-center gap-1 text-xs text-gray-500">
                              <GitBranch className="h-3 w-3" />
                              <span>main</span>
                            </div>
                          </div>
                          
                          {/* Pipeline Stages */}
                          <div className="space-y-4 p-2">
                            {/* Build Stage - Success */}
                            <div className="rounded-md border border-green-200 dark:border-green-900 p-3 bg-white dark:bg-gray-900">
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                                    <CheckCircle className="h-3 w-3 text-green-600 dark:text-green-400" />
                                  </div>
                                  <div className="text-sm font-medium">Build</div>
                                </div>
                                <div className="text-xs text-gray-500">Completed 4m ago</div>
                              </div>
                              <div className="text-xs ml-8">
                                <div className="flex items-center text-green-600 dark:text-green-400">
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                  <span>Tests: 128 passed</span>
                                </div>
                                <div className="flex items-center text-green-600 dark:text-green-400">
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                  <span>Build successful</span>
                                </div>
                              </div>
                            </div>
                            
                            {/* Test Stage - Success */}
                            <div className="rounded-md border border-green-200 dark:border-green-900 p-3 bg-white dark:bg-gray-900">
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                                    <CheckCircle className="h-3 w-3 text-green-600 dark:text-green-400" />
                                  </div>
                                  <div className="text-sm font-medium">Test</div>
                                </div>
                                <div className="text-xs text-gray-500">Completed 3m ago</div>
                              </div>
                              <div className="text-xs ml-8">
                                <div className="flex items-center text-green-600 dark:text-green-400">
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                  <span>Integration tests: Passed</span>
                                </div>
                                <div className="flex items-center text-green-600 dark:text-green-400">
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                  <span>Security scan: No vulnerabilities</span>
                                </div>
                              </div>
                            </div>
                            
                            {/* Deploy Stage - In Progress */}
                            <div className="rounded-md border border-blue-200 dark:border-blue-900 p-3 bg-white dark:bg-gray-900">
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
                                    <Loader2 className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600 dark:text-blue-400 animate-spin" />
                                  </div>
                                  <div className="text-sm font-medium">Deploy</div>
                                </div>
                                <div className="text-xs text-gray-500">In progress</div>
                              </div>
                              <div className="text-xs ml-8">
                                <div className="flex items-center text-blue-600 dark:text-blue-400">
                                  <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                                  <span>Deploying to staging environment</span>
                                </div>
                                <div className="h-1.5 w-full bg-gray-100 dark:bg-gray-800 rounded-full mt-1.5">
                                  <div className="h-1.5 w-3/4 bg-blue-500 rounded-full"></div>
                                </div>
                              </div>
                            </div>
                            
                            {/* Serverless Functions */}
                            <div className="rounded-md border border-gray-200 dark:border-gray-700 p-3 bg-white dark:bg-gray-900">
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
                                    <Package className="h-3 w-3 text-gray-500 dark:text-gray-400" />
                                  </div>
                                  <div className="text-sm font-medium">Serverless Functions</div>
                                </div>
                                <div className="text-xs text-gray-500">Ready</div>
                              </div>
                              <div className="text-xs ml-8 space-y-1">
                                <div className="flex items-center justify-between">
                                  <span>image-processing</span>
                                  <span className="text-green-600 dark:text-green-400">Active</span>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span>auth-handler</span>
                                  <span className="text-green-600 dark:text-green-400">Active</span>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span>payment-gateway</span>
                                  <span className="text-green-600 dark:text-green-400">Active</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Bottom Actions */}
                        <div className="flex justify-between items-center mt-4 p-1">
                          <div className="text-xs text-gray-500">Last updated: 45 seconds ago</div>
                          <div className="flex gap-2">
                            <button className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">Re-run Pipeline</button>
                            <button className="text-xs bg-primary/10 text-primary px-2 py-1 rounded flex items-center gap-1">
                              <ArrowRight className="h-3 w-3" />
                              <span>View Details</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Infrastructure Testing Framework */}
                  <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 ${featureSlide === 5 ? 'block' : 'hidden'}`}>
                    <div className="space-y-4 flex flex-col items-center text-center justify-center lg:items-start lg:text-left">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 dark:bg-primary/20">
                        <TestTube className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-2xl font-bold">Infrastructure Testing Framework</h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        Ensure your infrastructure is reliable, secure, and performant with our comprehensive testing framework designed for cloud environments.
                      </p>
                      <ul className="space-y-2 w-fit mx-auto lg:mx-0 text-left">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                          <span>Integration tests for deployed infrastructure</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                          <span>Chaos engineering tools for resilience testing</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                          <span>Load testing utilities</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                          <span>Security and compliance scans</span>
                        </li>
                      </ul>
                    </div>
                    
                    {/* Testing Dashboard Preview */}
                    <div className="relative h-[550px] rounded-xl bg-white dark:bg-gray-900 shadow-lg overflow-hidden border">
                      <div className="absolute inset-0 p-4">
                        {/* Dashboard Header */}
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <TestTube className="h-5 w-5 text-primary" />
                            <h4 className="font-medium">Infrastructure Testing Dashboard</h4>
                          </div>
                          <div className="flex items-center gap-2">
                            <button className="rounded-md bg-gray-100 p-1 dark:bg-gray-800">
                              <Settings className="h-4 w-4 text-gray-500" />
                            </button>
                          </div>
                        </div>
                        
                        {/* Testing Dashboard UI */}
                        <div className="relative h-[450px] bg-gray-50 dark:bg-gray-800 rounded-lg p-3 overflow-y-auto">
                          {/* Test Suites Tabs */}
                          <div className="flex border-b border-gray-200 dark:border-gray-700 mb-3">
                            <button className="px-3 py-2 text-xs font-medium border-b-2 border-primary text-primary">
                              All Tests
                            </button>
                            <button className="px-3 py-2 text-xs font-medium text-gray-500">
                              Integration
                            </button>
                            <button className="px-3 py-2 text-xs font-medium text-gray-500">
                              Chaos
                            </button>
                            <button className="px-3 py-2 text-xs font-medium text-gray-500">
                              Performance
                            </button>
                            <button className="px-3 py-2 text-xs font-medium text-gray-500">
                              Security
                            </button>
                          </div>
                          
                          {/* Test Results */}
                          <div className="space-y-3">
                            {/* Test Summary */}
                            <div className="bg-white dark:bg-gray-900 rounded-md p-3 border border-gray-200 dark:border-gray-700">
                              <div className="grid grid-cols-4 gap-2">
                                <div className="text-center">
                                  <div className="text-2xl font-bold text-green-500">42</div>
                                  <div className="text-xs text-gray-500">Passed</div>
                                </div>
                                <div className="text-center">
                                  <div className="text-2xl font-bold text-red-500">3</div>
                                  <div className="text-xs text-gray-500">Failed</div>
                                </div>
                                <div className="text-center">
                                  <div className="text-2xl font-bold text-amber-500">1</div>
                                  <div className="text-xs text-gray-500">Warning</div>
                                </div>
                                <div className="text-center">
                                  <div className="text-2xl font-bold text-blue-500">91%</div>
                                  <div className="text-xs text-gray-500">Coverage</div>
                                </div>
                              </div>
                            </div>
                            
                            {/* Integration Test */}
                            <div className="bg-white dark:bg-gray-900 rounded-md p-3 border border-green-200 dark:border-green-900">
                              <div className="flex justify-between items-start">
                                <div className="flex items-center gap-2">
                                  <div className="h-5 w-5 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                                    <CheckCircle className="h-3 w-3 text-green-600 dark:text-green-400" />
                                  </div>
                                  <div>
                                    <div className="text-sm font-medium">Database Connectivity Test</div>
                                    <div className="text-xs text-gray-500">Verified connections to all database instances</div>
                                  </div>
                                </div>
                                <div className="text-xs text-gray-500">2m ago</div>
                              </div>
                              <div className="mt-2 text-xs">
                                <div className="flex justify-between">
                                  <span>4/4 tests passed</span>
                                  <span>243ms</span>
                                </div>
                              </div>
                            </div>
                            
                            {/* Chaos Test */}
                            <div className="bg-white dark:bg-gray-900 rounded-md p-3 border border-red-200 dark:border-red-900">
                              <div className="flex justify-between items-start">
                                <div className="flex items-center gap-2">
                                  <div className="h-5 w-5 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                                    <X className="h-3 w-3 text-red-600 dark:text-red-400" />
                                  </div>
                                  <div>
                                    <div className="text-sm font-medium">Instance Termination Resilience</div>
                                    <div className="text-xs text-gray-500">Testing recovery from unexpected instance failures</div>
                                  </div>
                                </div>
                                <div className="text-xs text-gray-500">15m ago</div>
                              </div>
                              <div className="mt-2 text-xs">
                                <div className="flex justify-between text-red-500">
                                  <span>2/3 tests failed</span>
                                  <span>1.2s</span>
                                </div>
                                <div className="mt-1 text-red-500">
                                  Database backup recovery exceeded threshold (5.2s {'>'} 3s)
                                </div>
                              </div>
                              <div className="mt-2">
                                <button className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                                  View Details
                                </button>
                              </div>
                            </div>
                            
                            {/* Load Test */}
                            <div className="bg-white dark:bg-gray-900 rounded-md p-3 border border-amber-200 dark:border-amber-900">
                              <div className="flex justify-between items-start">
                                <div className="flex items-center gap-2">
                                  <div className="h-5 w-5 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                                    <AlertTriangle className="h-3 w-3 text-amber-600 dark:text-amber-400" />
                                  </div>
                                  <div>
                                    <div className="text-sm font-medium">API Load Testing</div>
                                    <div className="text-xs text-gray-500">Performance under high traffic conditions</div>
                                  </div>
                                </div>
                                <div className="text-xs text-gray-500">30m ago</div>
                              </div>
                              <div className="mt-2 text-xs">
                                <div className="flex justify-between text-amber-500">
                                  <span>Warning: P95 response time</span>
                                  <span>480ms</span>
                                </div>
                                <div className="mt-1 flex items-center gap-1">
                                  <span>10,000 requests/min</span>
                                  <span className="text-amber-500">(95% success)</span>
                                </div>
                              </div>
                              <div className="mt-2">
                                <div className="h-1.5 w-full bg-gray-100 dark:bg-gray-800 rounded-full">
                                  <div className="h-1.5 w-[95%] bg-amber-500 rounded-full"></div>
                                </div>
                              </div>
                            </div>
                            
                            {/* Security Test */}
                            <div className="bg-white dark:bg-gray-900 rounded-md p-3 border border-green-200 dark:border-green-900">
                              <div className="flex justify-between items-start">
                                <div className="flex items-center gap-2">
                                  <div className="h-5 w-5 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                                    <Shield className="h-3 w-3 text-green-600 dark:text-green-400" />
                                  </div>
                                  <div>
                                    <div className="text-sm font-medium">Security Compliance Check</div>
                                    <div className="text-xs text-gray-500">GDPR and SOC2 compliance verification</div>
                                  </div>
                                </div>
                                <div className="text-xs text-gray-500">1h ago</div>
                              </div>
                              <div className="mt-2 text-xs">
                                <div className="flex justify-between">
                                  <span>All checks passed</span>
                                  <span>12 rules verified</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Bottom Actions */}
                        <div className="flex justify-between items-center mt-4 p-1">
                          <div className="text-xs text-gray-500">Last test run: 2 minutes ago</div>
                          <div className="flex gap-2">
                            <button className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">Run All Tests</button>
                            <button className="text-xs bg-primary/10 text-primary px-2 py-1 rounded flex items-center gap-1">
                              <ArrowRight className="h-3 w-3" />
                              <span>Test History</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* AI-Powered Code Editor */}
                  <div className={`grid grid-cols-1 gap-8 ${featureSlide === 6 ? 'block' : 'hidden'}`}>
                    <div className="space-y-4 flex flex-col items-center text-center mb-6">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 dark:bg-primary/20">
                        <BrainCircuit className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-2xl font-bold">AI-Powered Code Editor</h3>
                      <p className="text-gray-600 dark:text-gray-300 max-w-3xl">
                        Write, debug, and deploy your code directly from the browser with our integrated code editor 
                        featuring real-time AI suggestions, code optimization, and error checking.
                      </p>
                    </div>
                    
                    {/* Code Editor UI */}
                    <div className="rounded-lg border border-gray-200 dark:border-gray-800 shadow-lg overflow-hidden bg-white dark:bg-gray-900">
                      {/* Editor Header */}
                      <div className="border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-850 px-4 py-3 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex space-x-1.5">
                            <div className="h-3 w-3 rounded-full bg-red-500"></div>
                            <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                            <div className="h-3 w-3 rounded-full bg-green-500"></div>
                          </div>
                          <div className="text-sm font-medium">server.js</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button className="p-1.5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                            <FileCode className="h-4 w-4" />
                          </button>
                          <button className="p-1.5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                            <Settings className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                      
                      {/* Editor Layout */}
                      <div className="flex h-[500px]">
                        {/* File Explorer */}
                        <div className="w-48 border-r border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-850 p-3 hidden sm:block">
                          <div className="font-medium text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">Project Files</div>
                          <ul className="text-sm space-y-1">
                            <li className="flex items-center gap-1.5 text-primary font-medium">
                              <FileCode className="h-3.5 w-3.5" />
                              <span>server.js</span>
                            </li>
                            <li className="flex items-center gap-1.5 text-gray-700 dark:text-gray-300">
                              <FileCode className="h-3.5 w-3.5 text-gray-500" />
                              <span>package.json</span>
                            </li>
                            <li className="flex items-center gap-1.5 text-gray-700 dark:text-gray-300">
                              <FileCode className="h-3.5 w-3.5 text-gray-500" />
                              <span>database.js</span>
                            </li>
                            <li className="flex items-center gap-1.5 text-gray-700 dark:text-gray-300">
                              <FileCode className="h-3.5 w-3.5 text-gray-500" />
                              <span>routes.js</span>
                            </li>
                          </ul>
                        </div>
                        
                        {/* Editor Area */}
                        <div className="flex-1 overflow-auto">
                          <div className="h-full">
                            {/* Code Area */}
                            <div className="relative bg-gray-50 dark:bg-gray-800 h-full p-4">                              
                              {/* AI Insights Badge */}
                              <div className="absolute right-4 top-3 flex items-center gap-1.5 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 px-3 py-1.5 rounded-md text-xs border border-indigo-200 dark:border-indigo-800 shadow-sm">
                                <Sparkles className="h-3.5 w-3.5 text-indigo-500" />
                                <span className="font-medium">1 AI insight available</span>
                              </div>
                              
                              {/* AI Insights Badge */}
                              <div className="absolute right-4 top-3 flex items-center gap-1.5 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 px-3 py-1.5 rounded-md text-xs border border-indigo-200 dark:border-indigo-800 shadow-sm">
                                <Sparkles className="h-3.5 w-3.5 text-indigo-500" />
                                <span className="font-medium">1 AI insight available</span>
                              </div>
                              
                              {/* Code with Line Numbers */}
                              <div className="font-mono text-sm leading-relaxed mt-6">
                                <div className="flex">
                                  <div className="text-gray-400 dark:text-gray-500 select-none pr-4 text-right">
                                    <div>1</div>
                                    <div>2</div>
                                    <div>3</div>
                                    <div>4</div>
                                    <div>5</div>
                                    <div>6</div>
                                    <div>7</div>
                                    <div>8</div>
                                    <div>9</div>
                                    <div>10</div>
                                    <div>11</div>
                                    <div>12</div>
                                    <div>13</div>
                                    <div>14</div>
                                    <div>15</div>
                                    <div>16</div>
                                    <div>17</div>
                                    <div>18</div>
                                  </div>
                                  <div className="text-gray-800 dark:text-gray-200 flex-1 relative">
                                    <pre className="m-0 overflow-x-auto">
                                      <span className="block text-gray-500">{"// Express server setup"}</span>
                                      <span className="block">
                                        <span className="text-indigo-600 dark:text-indigo-400">{"const"}</span>
                                        <span>{" "}</span>
                                        <span className="text-green-600 dark:text-green-400">{"express"}</span>
                                        <span>{" = "}</span>
                                        <span className="text-blue-600 dark:text-blue-400">{"require"}</span>
                                        <span>{"("}</span>
                                        <span className="text-amber-600 dark:text-amber-400">{"'express'"}</span>
                                        <span>{");"}</span>
                                      </span>
                                      <span className="block">
                                        <span className="text-indigo-600 dark:text-indigo-400">{"const"}</span>
                                        <span>{" "}</span>
                                        <span className="text-green-600 dark:text-green-400">{"app"}</span>
                                        <span>{" = "}</span>
                                        <span className="text-green-600 dark:text-green-400">{"express"}</span>
                                        <span>{"();"}</span>
                                      </span>
                                      <span className="block">
                                        <span className="text-indigo-600 dark:text-indigo-400">{"const"}</span>
                                        <span>{" "}</span>
                                        <span className="text-green-600 dark:text-green-400">{"port"}</span>
                                        <span>{" = "}</span>
                                        <span className="text-purple-600 dark:text-purple-400">{"process"}</span>
                                        <span>{"."}</span>
                                        <span className="text-blue-600 dark:text-blue-400">{"env"}</span>
                                        <span>{"."}</span>
                                        <span className="text-blue-600 dark:text-blue-400">{"PORT"}</span>
                                        <span>{" || "}</span>
                                        <span className="text-orange-600 dark:text-orange-400">{"3000"}</span>
                                        <span>{";"}</span>
                                      </span>
                                      <span className="block">&nbsp;</span>
                                      <span className="block text-gray-500">{"// Middlewares"}</span>
                                      <span className="block">
                                        <span className="text-green-600 dark:text-green-400">{"app"}</span>
                                        <span>{"."}</span>
                                        <span className="text-blue-600 dark:text-blue-400">{"use"}</span>
                                        <span>{"("}</span>
                                        <span className="text-green-600 dark:text-green-400">{"express"}</span>
                                        <span>{"."}</span>
                                        <span className="text-blue-600 dark:text-blue-400">{"json"}</span>
                                        <span>{"());"}</span>
                                      </span>
                                      <span className="block">
                                        <span className="text-green-600 dark:text-green-400">{"app"}</span>
                                        <span>{"."}</span>
                                        <span className="text-blue-600 dark:text-blue-400">{"use"}</span>
                                        <span>{"("}</span>
                                        <span className="text-green-600 dark:text-green-400">{"express"}</span>
                                        <span>{"."}</span>
                                        <span className="text-blue-600 dark:text-blue-400">{"urlencoded"}</span>
                                        <span>{"("}</span>
                                        <span className="text-gray-800 dark:text-gray-200">{"{\"{ extended: true }\""}</span>
                                        <span>{");"}</span>
                                      </span>
                                      <span className="block">&nbsp;</span>
                                      <span className="block text-gray-500">{"// Routes"}</span>
                                      <span className="block">
                                        <span className="text-indigo-600 dark:text-indigo-400">{"const"}</span>
                                        <span>{" "}</span>
                                        <span className="text-green-600 dark:text-green-400">{"routes"}</span>
                                        <span>{" = "}</span>
                                        <span className="text-blue-600 dark:text-blue-400">{"require"}</span>
                                        <span>{"("}</span>
                                        <span className="text-amber-600 dark:text-amber-400">{"'./src/routes'"}</span>
                                        <span>{");"}</span>
                                      </span>
                                      <span className="block">
                                        <span className="text-green-600 dark:text-green-400">{"app"}</span>
                                        <span>{"."}</span>
                                        <span className="text-blue-600 dark:text-blue-400">{"use"}</span>
                                        <span>{"("}</span>
                                        <span className="text-amber-600 dark:text-amber-400">{"'/api'"}</span>
                                        <span>{", "}</span>
                                        <span className="text-green-600 dark:text-green-400">{"routes"}</span>
                                        <span>{");"}</span>
                                      </span>
                                      <span className="block">&nbsp;</span>
                                      <span className="block text-gray-500">{"// Database connection"}</span>
                                      <span className="block">
                                        <span className="text-indigo-600 dark:text-indigo-400">{"const"}</span>
                                        <span>{" "}</span>
                                        <span className="text-green-600 dark:text-green-400">{"db"}</span>
                                        <span>{" = "}</span>
                                        <span className="text-blue-600 dark:text-blue-400">{"require"}</span>
                                        <span>{"("}</span>
                                        <span className="text-amber-600 dark:text-amber-400">{"'./src/database'"}</span>
                                        <span>{");"}</span>
                                      </span>
                                      <span className="block">
                                        <span className="bg-indigo-50 dark:bg-indigo-900/20 rounded px-1 py-0.5">
                                          <span className="text-green-600 dark:text-green-400">{"db"}</span>
                                          <span>{"."}</span>
                                          <span className="text-blue-600 dark:text-blue-400">{"connect"}</span>
                                          <span>{"();"}</span>
                                        </span>
                                      </span>
                                      <span className="block">&nbsp;</span>
                                      <span className="block">
                                        <span className="text-green-600 dark:text-green-400">{"app"}</span>
                                        <span>{"."}</span>
                                        <span className="text-blue-600 dark:text-blue-400">{"listen"}</span>
                                        <span>{"("}</span>
                                        <span className="text-green-600 dark:text-green-400">{"port"}</span>
                                        <span>{", () => {"}</span>
                                      </span>
                                      <span className="block pl-4">
                                        <span className="text-purple-600 dark:text-purple-400">{"console"}</span>
                                        <span>{"."}</span>
                                        <span className="text-blue-600 dark:text-blue-400">{"log"}</span>
                                        <span>{"("}</span>
                                        <span className="text-amber-600 dark:text-amber-400">{"`Server running on port ${port}`"}</span>
                                        <span>{");"}</span>
                                      </span>
                                      <span className="block">{"})"}</span>
                                    </pre>
                                    
                                    {/* db.connect() tooltip */}
                                    <div className="absolute left-1/2 transform -translate-x-1/2 top-[260px] w-64 bg-white dark:bg-gray-900 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 z-10 overflow-hidden">
                                      <div className="p-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                                        <div className="flex items-center justify-between">
                                          <div className="flex items-center gap-1.5">
                                            <Database className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                                            <span className="font-medium text-xs">MongoDB Connection</span>
                                          </div>
                                          <div className="flex items-center gap-1">
                                            <button className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                                              <X className="h-3.5 w-3.5" />
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="p-3 text-xs">
                                        <p className="text-gray-700 dark:text-gray-300 mb-2">
                                          Establishes connection to MongoDB database defined in <span className="font-mono bg-gray-100 dark:bg-gray-800 px-1 rounded">{`./src/database.js`}</span>
                                        </p>
                                        <div className="mb-3 pt-2 border-t border-gray-200 dark:border-gray-700">
                                          <div className="flex items-center gap-1.5 mb-1.5">
                                            <Sparkles className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
                                            <span className="font-medium text-gray-900 dark:text-gray-100">AI Suggestion</span>
                                          </div>
                                          <p className="text-gray-700 dark:text-gray-300">
                                            Add error handling to prevent application crashes if the database connection fails.
                                          </p>
                                        </div>
                                        <div className="flex gap-2 mt-2">
                                          <button className="flex-1 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 px-2 py-1 rounded text-xs font-medium hover:bg-indigo-100 dark:hover:bg-indigo-900/30">
                                            Apply Suggestion
                                          </button>
                                          <button className="flex items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 w-6 h-6 rounded text-xs hover:bg-gray-200 dark:hover:bg-gray-700">
                                            <ChevronRight className="h-3.5 w-3.5" />
                                          </button>
                                        </div>
                                      </div>
                                    </div>

                                    {/* Code Performance Optimization */}
                                    <div className="absolute left-1/2 transform -translate-x-1/2 top-[260px] w-[400px] bg-white dark:bg-gray-900 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 z-10 overflow-hidden">
                                      <div className="p-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 flex items-center gap-2">
                                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
                                          <BrainCircuit className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                                        </div>
                                        <span className="font-medium text-sm">Code Performance Optimization</span>
                                        <button className="ml-auto text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                                          <X className="h-3.5 w-3.5" />
                                        </button>
                                      </div>
                                      <div className="p-4 text-sm">
                                        <p className="text-gray-600 dark:text-gray-300 mb-3">
                                          We detected a potential issue with the database connection.
                                        </p>
                                        <div className="bg-red-50 dark:bg-red-900/10 px-4 py-2 rounded-t-md font-mono text-xs">
                                          <div className="text-red-600 dark:text-red-400">{"- db.connect();"}</div>
                                        </div>
                                        <div className="bg-green-50 dark:bg-green-900/10 px-4 py-2 rounded-b-md font-mono text-xs mb-3">
                                          <div className="text-green-600 dark:text-green-400">{"+ try {"}</div>
                                          <div className="text-green-600 dark:text-green-400 pl-4">{"db.connect();"}</div>
                                          <div className="text-green-600 dark:text-green-400">{"+ } catch (error) {"}</div>
                                          <div className="text-green-600 dark:text-green-400 pl-4">{"console.error('Database connection failed:', error);"}</div>
                                          <div className="text-green-600 dark:text-green-400 pl-4">{"// Implement fallback strategy or graceful exit"}</div>
                                          <div className="text-green-600 dark:text-green-400">{"+ }"}</div>
                                        </div>
                                        <p className="text-gray-600 dark:text-gray-300 mb-4">
                                          This change prevents application crashes if the database connection fails.
                                        </p>
                                        <div className="flex gap-3">
                                          <button className="bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                                            Review Changes
                                          </button>
                                          <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-sm font-medium text-white transition-colors">
                                            Apply
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            {/* Code Editor Bottom Bar */}
                            <div className="flex items-center justify-between bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 px-4 py-3">
                              <div className="flex items-center gap-3">
                                <div className="flex items-center gap-1.5 text-green-600 dark:text-green-400 text-xs">
                                  <CheckCircle className="h-3.5 w-3.5" />
                                  <span>No errors</span>
                                </div>
                                <div className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-1.5">
                                  <div className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/50">
                                    <Sparkles className="h-2.5 w-2.5 text-indigo-600 dark:text-indigo-400" />
                                  </div>
                                  <span>AI optimized</span>
                                </div>
                              </div>
                              <div className="flex items-center gap-3">
                                <button className="text-xs px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                                  Format
                                </button>
                                <button className="text-xs px-3 py-1.5 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 rounded-md hover:bg-indigo-100 dark:hover:bg-indigo-900/30 transition-colors flex items-center gap-1">
                                  <Sparkles className="h-3 w-3" />
                                  <span>Optimize</span>
                                </button>
                                <button className="text-xs px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors flex items-center gap-1">
                                  <Play className="h-3 w-3" />
                                  <span>Run & Deploy</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Feature highlights */}
            <div className="mt-16 text-center">
              <p className="max-w-[800px] mx-auto text-gray-500 dark:text-gray-400 mb-6">
                Each feature is designed for maximum productivity. Our visual examples above showcase the powerful 
                capabilities of Staxa. Use the tabs to explore different features and see how they can transform your cloud workflow.
              </p>
              <div className="inline-flex">
                <Link href="#waitlist">
                  <Button 
                    className="inline-flex h-10 items-center justify-center rounded-md px-8 text-sm font-medium text-white shadow hover:shadow-lg focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 gradient-btn pulse-halo"
                  >
                    Join the Waitlist
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-900">
          <PricingSection />
        </section>

        {/* Waitlist Section - Moved here to be after pricing and before how-it-works */}
        <section id="waitlist" className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-flex items-center rounded-full border bg-gradient-to-r from-blue-100 via-white to-orange-100 dark:from-blue-950/40 dark:via-gray-900 dark:to-orange-950/40 px-2.5 py-0.5 text-sm font-semibold">
                  Early Access
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Join Our Waitlist</h2>
                <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Be the first to experience simplified cloud deployments with our powerful platform. 
                  Get early access to all our advanced features and lock in <span className="font-semibold text-primary">exclusive lifetime discounts</span>.
                </p>
              </div>
              
              {/* Benefits */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 max-w-4xl">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
                      <CheckCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="font-semibold text-lg">Lifetime Discount</h3>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Early adopters receive up to 40% off regular pricing that never expires as long as your subscription remains active.
                  </p>
                </div>
                
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/30">
                      <Share2 className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <h3 className="font-semibold text-lg">Referral Rewards</h3>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Move up the waitlist by referring friends. Each successful referral bumps you up 5 spots closer to early access.
                  </p>
                </div>
                
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                      <Sparkles className="h-5 w-5 text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="font-semibold text-lg">Priority Support</h3>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Waitlist members get fast-track support and early access to new features before they&apos;re released to the public.
                  </p>
                </div>
              </div>
              
              {/* Feature Badges */}
              <div className="flex flex-wrap justify-center gap-2 my-6 max-w-2xl">
                <div className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary flex items-center gap-1">
                  <Network className="h-3 w-3" />
                  <span>Infrastructure Dashboard</span>
                </div>
                <div className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary flex items-center gap-1">
                  <Container className="h-3 w-3" />
                  <span>Local Dev Environment</span>
                </div>
                <div className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary flex items-center gap-1">
                  <LineChart className="h-3 w-3" />
                  <span>AI Optimization</span>
                </div>
                <div className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary flex items-center gap-1">
                  <LayoutGrid className="h-3 w-3" />
                  <span>App Templates</span>
                </div>
                <div className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary flex items-center gap-1">
                  <GitMerge className="h-3 w-3" />
                  <span>CI/CD Pipeline</span>
                </div>
                <div className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary flex items-center gap-1">
                  <TestTube className="h-3 w-3" />
                  <span>Testing Framework</span>
                </div>
              </div>
              
              {/* Waitlist Form */}
              <div className="w-full max-w-md">
                <WaitlistForm />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
