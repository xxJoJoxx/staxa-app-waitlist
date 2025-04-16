"use client";

import WaitlistForm from "@/components/waitlist-form"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle, Cpu, Layers, Loader2, Zap, Database, Code, Server, Globe, ChevronLeft, ChevronRight, Github, GitBranch, Box } from "lucide-react"
import Link from "next/link"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { useState, useEffect, useRef } from "react"
import { Amplify } from "aws-amplify"
import outputs from "../../amplify_outputs.json"

// Initialize Amplify
Amplify.configure(outputs, { ssr: true });

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === 3 ? 0 : prev + 1));
  };
  
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? 3 : prev - 1));
  };

  const pauseCarousel = () => {
    setIsPaused(true);
  };

  const resumeCarousel = () => {
    setIsPaused(false);
  };

  // Setup auto-advance interval
  useEffect(() => {
    // Clear existing interval when component mounts or isPaused changes
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Only set interval if not paused
    if (!isPaused) {
      intervalRef.current = setInterval(() => {
        nextSlide();
      }, 3000);
    }

    // Cleanup interval on component unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPaused]);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col md:grid md:grid-cols-[1fr_400px] md:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Deploy to the Cloud with One Click
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                    Staxa simplifies cloud deployments for everyone. Choose from predefined stacks or customize your
                    own, all powered by AI recommendations.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="#waitlist">
                    <Button className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
                      Join the Waitlist
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-start md:justify-end mt-8 md:mt-0">
                <div className="flex flex-col w-full max-w-[400px] md:max-w-[450px] xl:max-w-[500px] gap-4">
                  {/* Deployment Card */}
                  <div className="relative w-full rounded-xl bg-white dark:bg-gray-900 shadow-lg overflow-hidden">
                    <div className="p-5 sm:p-6">
                      <div className="space-y-4 sm:space-y-5">
                        {/* Header */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Layers className="h-5 w-5 text-primary" />
                            <span className="font-medium text-sm sm:text-base">New Deployment</span>
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">ID: stx_d7f3a2</div>
                        </div>

                        {/* Stack Selection */}
                        <div className="space-y-2">
                          <div className="text-xs sm:text-sm font-medium">Selected Stack</div>
                          <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
                            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-gray-200 dark:bg-gray-700">
                              <Layers className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                            </div>
                            <div>
                              <div className="text-sm font-medium">MERN Stack</div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">
                                MongoDB, Express, React, Node.js
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Deployment Progress */}
                        <div className="space-y-3">
                          <div className="text-sm font-medium">Deployment Progress</div>

                          {/* Progress Steps */}
                          <div className="space-y-4">
                            {/* Step 1 - Complete */}
                            <div className="flex items-center gap-3">
                              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                                <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                              </div>
                              <div className="flex-1">
                                <div className="text-sm">Initializing</div>
                                <div className="h-2 w-full bg-green-100 dark:bg-green-900/30 rounded-full mt-1">
                                  <div className="h-2 w-full bg-green-500 rounded-full"></div>
                                </div>
                              </div>
                            </div>

                            {/* Step 2 - Complete */}
                            <div className="flex items-center gap-3">
                              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                                <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                              </div>
                              <div className="flex-1">
                                <div className="text-sm">Provisioning Resources</div>
                                <div className="h-2 w-full bg-green-100 dark:bg-green-900/30 rounded-full mt-1">
                                  <div className="h-2 w-full bg-green-500 rounded-full"></div>
                                </div>
                              </div>
                            </div>

                            {/* Step 3 - In Progress */}
                            <div className="flex items-center gap-3">
                              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
                                <Loader2 className="h-4 w-4 text-blue-600 dark:text-blue-400 animate-spin" />
                              </div>
                              <div className="flex-1">
                                <div className="text-sm">Deploying Application</div>
                                <div className="h-2 w-full bg-gray-100 dark:bg-gray-800 rounded-full mt-1">
                                  <div className="h-2 w-3/4 bg-blue-500 rounded-full"></div>
                                </div>
                              </div>
                            </div>

                            {/* Step 4 - Pending */}
                            <div className="flex items-center gap-3">
                              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
                                <div className="h-2 w-2 bg-gray-400 dark:bg-gray-600 rounded-full"></div>
                              </div>
                              <div className="flex-1">
                                <div className="text-sm text-gray-500 dark:text-gray-400">Finalizing</div>
                                <div className="h-2 w-full bg-gray-100 dark:bg-gray-800 rounded-full mt-1"></div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Estimated Time */}
                        <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
                          <div>Started 2 minutes ago</div>
                          <div>~1 minute remaining</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Light Blue Card */}
                  <div className="w-full rounded-xl bg-blue-50 dark:bg-blue-950/20 p-5 sm:p-6 shadow">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
                        <Cpu className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <span className="font-medium">AI-Optimized Resources</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                      Our AI analyzes your application and configures the optimal cloud resources for performance and cost efficiency.
                    </p>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <div className="font-medium text-gray-800 dark:text-gray-200">CPU</div>
                        <div className="text-gray-500">2 vCPUs</div>
                      </div>
                      <div>
                        <div className="font-medium text-gray-800 dark:text-gray-200">Memory</div>
                        <div className="text-gray-500">4 GB</div>
                      </div>
                      <div>
                        <div className="font-medium text-gray-800 dark:text-gray-200">Storage</div>
                        <div className="text-gray-500">50 GB SSD</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

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
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
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
              <div className="flex flex-col justify-center space-y-4">
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
              <div className="flex flex-col justify-center space-y-4">
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
              <div className="flex flex-col justify-center space-y-4">
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

        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-sm font-semibold">
                  How It Works
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Simple Process, Powerful Results</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Our platform makes cloud deployments accessible to everyone, from beginners to experts.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4">
                <ol className="space-y-8">
                  <li className="flex items-start">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-full ${currentSlide === 0 ? "bg-primary text-primary-foreground" : "bg-gray-200 text-gray-500 dark:bg-gray-800"} shrink-0 mr-4`}>
                      1
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">Choose Your Application</h3>
                      <p className="text-gray-500 dark:text-gray-400 mt-2">
                        Select the type of application you want to deploy, from web apps to APIs.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-full ${currentSlide === 1 ? "bg-primary text-primary-foreground" : "bg-gray-200 text-gray-500 dark:bg-gray-800"} shrink-0 mr-4`}>
                      2
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">Connect Your Code</h3>
                      <p className="text-gray-500 dark:text-gray-400 mt-2">
                        Connect your GitHub repository or upload your source code directly.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-full ${currentSlide === 2 ? "bg-primary text-primary-foreground" : "bg-gray-200 text-gray-500 dark:bg-gray-800"} shrink-0 mr-4`}>
                      3
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">Select Your Stack</h3>
                      <p className="text-gray-500 dark:text-gray-400 mt-2">
                        Choose from our predefined tech stacks or build your own custom architecture.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-full ${currentSlide === 3 ? "bg-primary text-primary-foreground" : "bg-gray-200 text-gray-500 dark:bg-gray-800"} shrink-0 mr-4`}>
                      4
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">One-Click Deploy</h3>
                      <p className="text-gray-500 dark:text-gray-400 mt-2">
                        Deploy to your chosen cloud provider with a single click. We handle the complexity for you.
                      </p>
                    </div>
                  </li>
                </ol>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative w-full h-full min-h-[550px] rounded-lg bg-gradient-to-br from-indigo-50 to-blue-100 dark:from-indigo-950/50 dark:to-blue-950/50 p-6 shadow-lg">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-full max-w-[360px]"
                         onMouseEnter={pauseCarousel}
                         onMouseLeave={resumeCarousel}
                         onTouchStart={pauseCarousel}
                         onTouchEnd={resumeCarousel}>
                      {/* Carousel Navigation Buttons */}
                      <div className="absolute -left-5 top-1/2 transform -translate-y-1/2 z-10">
                        <button 
                          onClick={prevSlide}
                          className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700"
                          aria-label="Previous slide"
                        >
                          <ChevronLeft className="h-5 w-5" />
                        </button>
                      </div>
                      <div className="absolute -right-5 top-1/2 transform -translate-y-1/2 z-10">
                        <button 
                          onClick={nextSlide}
                          className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700"
                          aria-label="Next slide"
                        >
                          <ChevronRight className="h-5 w-5" />
                        </button>
                      </div>
                      
                      {/* Carousel Content */}
                      <div className="carousel-container overflow-hidden">
                        <div 
                          className="carousel-track flex transition-transform duration-300 ease-in-out"
                          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                        >
                          {/* Step 1: Application Selection */}
                          <div className="carousel-item flex-shrink-0 w-full">
                            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6">
                              <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                  <h3 className="font-medium">Step 1: Select Application Type</h3>
                                </div>
                                
                                {/* App Type Options */}
                                <div className="space-y-3">
                                  <div className="rounded-lg border-2 border-primary p-3 bg-primary/5 dark:bg-primary/10">
                                    <div className="flex items-center gap-3">
                                      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 dark:bg-primary/20">
                                        <Layers className="h-4 w-4 text-primary" />
                                      </div>
                                      <div>
                                        <div className="text-sm font-medium">Web Application</div>
                                        <div className="text-xs text-gray-500 dark:text-gray-400">
                                          Full-stack web app with frontend and backend
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  
                                  <div className="rounded-lg border border-transparent p-3 bg-gray-50 dark:bg-gray-800">
                                    <div className="flex items-center gap-3">
                                      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gray-200 dark:bg-gray-700">
                                        <Server className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                                      </div>
                                      <div>
                                        <div className="text-sm font-medium">API Service</div>
                                        <div className="text-xs text-gray-500 dark:text-gray-400">
                                          Backend API service with database
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  
                                  <div className="rounded-lg border border-transparent p-3 bg-gray-50 dark:bg-gray-800">
                                    <div className="flex items-center gap-3">
                                      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gray-200 dark:bg-gray-700">
                                        <Globe className="h-4 w-4 text-gray-500 dark:text-gray-400" />
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
                                <div className="py-8"></div>
                                
                                {/* Continue Button */}
                                <Button className="w-full" onClick={nextSlide}>
                                  Continue
                                  <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                          
                          {/* Step 2: Source Code Selection */}
                          <div className="carousel-item flex-shrink-0 w-full">
                            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6">
                              <div className="space-y-6">
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
                                  <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
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
                                <div className="py-4"></div>
                                
                                {/* Continue Button */}
                                <Button className="w-full" onClick={nextSlide}>
                                  Continue
                                  <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                          
                          {/* Step 3: Stack Selection */}
                          <div className="carousel-item flex-shrink-0 w-full">
                            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6">
                              <div className="space-y-4">
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
                                <Button className="w-full" onClick={nextSlide}>
                                  Deploy Now
                                  <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                          
                          {/* Step 4: Deployment in Progress */}
                          <div className="carousel-item flex-shrink-0 w-full">
                            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6">
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
                                      <div className="text-xs text-gray-500 dark:text-gray-400">
                                        MERN Stack
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                {/* Deployment Progress */}
                                <div className="space-y-3">
                                  <div className="text-sm font-medium">Progress</div>

                                  {/* Progress Steps */}
                                  <div className="space-y-2">
                                    {/* Step 1 - Complete */}
                                    <div className="flex items-center gap-2 sm:gap-3">
                                      <div className="flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                                        <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-600 dark:text-green-400" />
                                      </div>
                                      <div className="flex-1">
                                        <div className="text-xs sm:text-sm">Initializing</div>
                                        <div className="h-1 w-full bg-green-100 dark:bg-green-900/30 rounded-full">
                                          <div className="h-1 w-full bg-green-500 rounded-full"></div>
                                        </div>
                                      </div>
                                    </div>

                                    {/* Step 2 - Complete */}
                                    <div className="flex items-center gap-2 sm:gap-3">
                                      <div className="flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                                        <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-600 dark:text-green-400" />
                                      </div>
                                      <div className="flex-1">
                                        <div className="text-xs sm:text-sm">Provisioning Resources</div>
                                        <div className="h-1 w-full bg-green-100 dark:bg-green-900/30 rounded-full">
                                          <div className="h-1 w-full bg-green-500 rounded-full"></div>
                                        </div>
                                      </div>
                                    </div>

                                    {/* Step 3 - In Progress */}
                                    <div className="flex items-center gap-2 sm:gap-3">
                                      <div className="flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
                                        <Loader2 className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600 dark:text-blue-400 animate-spin" />
                                      </div>
                                      <div className="flex-1">
                                        <div className="text-xs sm:text-sm">Deploying Application</div>
                                        <div className="h-1 w-full bg-gray-100 dark:bg-gray-800 rounded-full">
                                          <div className="h-1 w-3/4 bg-blue-500 rounded-full"></div>
                                        </div>
                                      </div>
                                    </div>

                                    {/* Step 4 - Pending */}
                                    <div className="flex items-center gap-2 sm:gap-3">
                                      <div className="flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
                                        <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 bg-gray-400 dark:bg-gray-600 rounded-full"></div>
                                      </div>
                                      <div className="flex-1">
                                        <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Finalizing</div>
                                        <div className="h-1 w-full bg-gray-100 dark:bg-gray-800 rounded-full"></div>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                {/* Spacer to match height with other cards */}
                                <div className="py-3"></div>

                                {/* Estimated Time */}
                                <div className="flex justify-between items-center text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">
                                  <div>Started 2 minutes ago</div>
                                  <div>~1 minute remaining</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Carousel Indicators */}
                      <div className="flex justify-center space-x-2 mt-4">
                        {[0, 1, 2, 3].map((index) => (
                          <button
                            key={index}
                            className={`h-2 rounded-full transition-all ${
                              currentSlide === index ? "w-8 bg-primary" : "w-2 bg-gray-300 dark:bg-gray-600"
                            }`}
                            onClick={() => setCurrentSlide(index)}
                            aria-label={`Go to slide ${index + 1}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="waitlist" className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-950">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Join Our Waitlist</h2>
                <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Be the first to experience simplified cloud deployments. Sign up for early access.
                </p>
              </div>
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
