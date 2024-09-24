"use client"

import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from 'next/link'
import { Github, Mail, Lock, Zap, Sparkles, FileText, HelpCircle, Calendar } from 'lucide-react'

const testimonials = [
  {
    quote: "EduClipsAI transformed my learning journey. It's like having a genius mentor available 24/7!",
    author: "Dr. Emily Chen",
    role: "AI Researcher"
  },
  {
    quote: "The personalized learning paths are mind-blowing. I've achieved in weeks what used to take months!",
    author: "Mark Johnson",
    role: "Software Engineer"
  },
  {
    quote: "As an educator, EduClipsAI has revolutionized how I create and deliver content. It's a game-changer!",
    author: "Prof. Sarah Thompson",
    role: "Computer Science Professor"
  },
  {
    quote: "The AI-powered explanations make complex topics crystal clear. It's like having a superpower!",
    author: "Alex Rodriguez",
    role: "Data Scientist"
  }
]

export default function AuthPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [mounted, setMounted] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [isUKLocale, setIsUKLocale] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = useCallback(() => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % testimonials.length)
  }, [])

  useEffect(() => {
    setMounted(true)
    const userLocale = navigator.language || navigator.languages[0]
    setIsUKLocale(userLocale.startsWith('en-GB'))

    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    const slideTimer = setInterval(nextSlide, 8000)

    return () => {
      clearInterval(timer)
      clearInterval(slideTimer)
    }
  }, [nextSlide])

  const formatDate = useMemo(() => {
    const timeOptions: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    }
    const dateOptions: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric'
    }
    return {
      time: (date: Date) => {
        if (!(date instanceof Date) || isNaN(date.getTime())) {
          return 'Invalid Date'
        }
        return new Intl.DateTimeFormat('en-GB', timeOptions).format(date)
      },
      date: (date: Date, isUK: boolean) => {
        if (!(date instanceof Date) || isNaN(date.getTime())) {
          return 'Invalid Date'
        }
        if (isUK) {
          return new Intl.DateTimeFormat('en-GB', dateOptions).format(date).replace(',', '')
        } else {
          return new Intl.DateTimeFormat(undefined, { dateStyle: 'full' }).format(date)
        }
      }
    }
  }, [])

  const handleSubmit = (e: React.FormEvent, action: 'login' | 'register') => {
    e.preventDefault()
    console.log(`${action} submitted:`, { email, password })
  }

  const renderCalendar = () => {
    const today = new Date()
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)
    const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0)
    const daysInMonth = lastDayOfMonth.getDate()
    const startingDay = firstDayOfMonth.getDay()

    const calendarDays = []
    for (let i = 0; i < startingDay; i++) {
      calendarDays.push(<div key={`empty-${i}`} className="text-center text-gray-400"></div>)
    }
    for (let i = 1; i <= daysInMonth; i++) {
      calendarDays.push(
        <div key={i} className={`text-center ${i === today.getDate() ? 'bg-white text-purple-900 rounded-full' : ''}`}>
          {i}
        </div>
      )
    }

    return (
      <div className="grid grid-cols-7 gap-1 text-[0.5rem]">
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
          <div key={day} className="text-center font-bold">{day}</div>
        ))}
        {calendarDays}
      </div>
    )
  }

  return (
    <div className="flex min-h-screen">
      {/* Left side with enhanced animation */}
      <div className="hidden lg:flex flex-col w-1/2 bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-900 p-12 text-white relative overflow-hidden">
        <div className="z-10 flex flex-col h-full">
          {/* Top content and separator */}
          <div className="mb-8">
            <div className="flex justify-between items-center w-full mb-4">
              <div className="flex items-center space-x-4">
                <h1 className="text-4xl font-bold">EduClipsAI</h1>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="text-white border-white hover:bg-white/20">
                    <FileText className="mr-2 h-4 w-4" />
                    Docs
                  </Button>
                  <Button variant="outline" size="sm" className="text-white border-white hover:bg-white/20">
                    <HelpCircle className="mr-2 h-4 w-4" />
                    Support
                  </Button>
                </div>
              </div>
              <div className="text-right">
                <span className="text-sm uppercase tracking-wide block mb-1">TIME</span>
                <div className="text-2xl font-light font-mono">
                  {mounted ? formatDate.time(currentTime) : "Time"}
                </div>
              </div>
            </div>
            <div className="w-full h-px bg-gradient-to-r from-transparent via-white/30 to-transparent my-6"></div>
          </div>

          {/* Middle content (Custom Carousel) */}
          <div className="flex-grow flex items-center justify-center">
            <div className="w-full max-w-md relative carousel-container">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className={`absolute top-0 left-0 w-full transition-all duration-500 ${
                    index === currentSlide ? 'opacity-100 z-10 scale-100' : 'opacity-0 z-0 scale-95'
                  }`}
                >
                  <Card className="bg-white/10 backdrop-blur-sm border-none text-white">
                    <CardContent className="flex flex-col items-center justify-center p-6">
                      <blockquote className="text-lg font-light mb-4 text-center">
                        "{testimonial.quote}"
                      </blockquote>
                      <cite className="text-sm">
                        - {testimonial.author}, {testimonial.role}
                      </cite>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom content and separator */}
          <div>
            <div className="w-full h-px bg-gradient-to-r from-transparent via-white/30 to-transparent my-6"></div>
            <div className="flex justify-between items-end w-full mt-4">
              <div className="text-xl font-light font-mono">
                <span className="text-sm uppercase tracking-wide block mb-1">Version</span>
                <span className="text-2xl">v1.0.3</span>
              </div>
              <div className="flex items-end space-x-8">
                <div className="w-24">
                  <span className="text-sm uppercase tracking-wide block mb-1 text-center">Calendar</span>
                  {renderCalendar()}
                </div>
                <div className="text-xl font-light font-mono text-right">
                  <span className="text-sm uppercase tracking-wide block mb-1">Date</span>
                  {mounted ? formatDate.date(currentTime, isUKLocale) : "Date"}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced animated background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 opacity-30"></div>
          <div className="absolute inset-0 neural-network"></div>
          <div className="absolute inset-0 particles"></div>
          <div className="absolute inset-0 pulse-circles"></div>
          <div className="absolute inset-0 drifting-dots"></div>
          <div className="absolute inset-0 large-circles"></div>
          <div className="absolute inset-0 glowing-orbs"></div>
          <div className="absolute inset-0 swarming-dots"></div>
          <div className="absolute inset-0 gradient-sweep"></div>
          <div className="absolute inset-0 aurora-waves"></div>
          <div className="absolute inset-0 starry-sky"></div>
          <div className="absolute inset-0 monsoon-rain"></div>
        </div>
      </div>

      {/* Right side with tabs for login and register */}
      <div className="flex flex-col justify-center w-full lg:w-1/2 p-8 lg:p-24 bg-background">
        <Card className="backdrop-blur-sm bg-background/70">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center">Welcome to EduClipsAI</CardTitle>
            <CardDescription className="text-center">Sign in to your account or create a new one</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>
              <TabsContent value="login">
                <form onSubmit={(e) => handleSubmit(e, 'login')} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                      <Input
                        id="login-email"
                        type="email"
                        placeholder="name@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                      <Input
                        id="login-password"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Button type="submit" className="w-full gradient-button">
                    <Zap className="mr-2 h-5 w-5" />
                    Unlock Your Learning
                  </Button>
                </form>
              </TabsContent>
              <TabsContent value="register">
                <form onSubmit={(e) => handleSubmit(e, 'register')} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="register-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                      <Input
                        id="register-email"
                        type="email"
                        placeholder="name@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                      <Input
                        id="register-password"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Button type="submit" className="w-full gradient-button">
                    <Sparkles className="mr-2 h-5 w-5" />
                    Start Your AI Learning Journey
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="relative w-full">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-muted" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 w-full">
              <Button variant="outline" className="hover-glow">
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </Button>
              <Button variant="outline" className="hover-glow">
                <svg viewBox="0 0 24 24" className="mr-2 h-4 w-4" aria-hidden="true">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                  <path d="M1 1h22v22H1z" fill="none" />
                </svg>
                Google
              </Button>
            </div>
          </CardFooter>
        </Card>
        <div className="mt-8 text-sm text-center text-muted-foreground">
          <p>
            By continuing, you agree to our{' '}
            <Link href="/terms" className="underline underline-offset-4 hover:text-primary">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="underline underline-offset-4 hover:text-primary">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>

      <style jsx global>{`
        @keyframes subtlePulse {
          0%, 100% { transform: scale(1); opacity: 0.4; }
          50% { transform: scale(1.05); opacity: 0.6; }
        }

        @keyframes gentleFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        @keyframes softNetwork {
          0%, 100% { background-position: 0% 0%; }
          50% { background-position: 100% 100%; }
        }

        @keyframes calmDrift {
          0% { transform: translate(0, 0); }
          25% { transform: translate(3%, 5%); }
          50% { transform: translate(5%, 3%); }
          75% { transform: translate(3%, -3%); }
          100% { transform: translate(0, 0); }
        }

        @keyframes softGlow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.5; }
        }

        @keyframes swarm {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(15px, 15px); }
          50% { transform: translate(-15px, 15px); }
          75% { transform: translate(-15px, -15px); }
        }

        @keyframes dramaticGradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes gradientSweep {
          0%, 100% { transform: translateX(-100%); opacity: 0; }
          50% { transform: translateX(100%); opacity: 0.2; }
        }

        @keyframes floatAnimation {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        @keyframes auroraWaves {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.3; }
          50% { transform: translateY(-20px) scale(1.1); opacity: 0.5; }
        }

        @keyframes twinkle {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        @keyframes monsoonRain {
          0% { transform: translateX(-100%) translateY(-100%); }
          100% { transform: translateX(100%) translateY(100%); }
        }

        .neural-network {
          background-image: 
            radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px),
            radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px);
          background-size: 60px 60px;
          animation: softNetwork 60s infinite linear;
        }

        .particles::before,
        .particles::after {
          content: '';
          position: absolute;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.3);
          animation: gentleFloat 12s infinite ease-in-out, calmDrift 30s infinite ease-in-out;
        }

        .particles::before {
          top: 20%;
          left: 20%;
          animation-delay: -2s;
        }

        .particles::after {
          bottom: 20%;
          right: 20%;
          animation-delay: -4s;
        }

        .pulse-circles::before,
        .pulse-circles::after {
          content: '';
          position: absolute;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.05);
          animation: subtlePulse 8s infinite ease-in-out, calmDrift 35s infinite ease-in-out;
        }

        .pulse-circles::before {
          width: 300px;
          height: 300px;
          top: 10%;
          left: 10%;
        }

        .pulse-circles::after {
          width: 400px;
          height: 400px;
          bottom: 10%;
          right: 10%;
          animation-delay: -3s;
        }

        .drifting-dots::before,
        .drifting-dots::after,
        .drifting-dots .dot {
          content: '';
          position: absolute;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.2);
          animation: calmDrift 40s infinite ease-in-out;
        }

        .drifting-dots::before { top: 40%; left: 40%; animation-delay: -5s; }
        .drifting-dots::after { bottom: 30%; right: 35%; animation-delay: -15s; }
        .drifting-dots .dot:nth-child(1) { top: 15%; left: 25%; animation-delay: -7s; }
        .drifting-dots .dot:nth-child(2) { top: 60%; left: 15%; animation-delay: -12s; }
        .drifting-dots .dot:nth-child(3) { top: 75%; left: 35%; animation-delay: -18s; }
        .drifting-dots .dot:nth-child(4) { top: 25%; left: 65%; animation-delay: -23s; }
        .drifting-dots .dot:nth-child(5) { top: 80%; left: 70%; animation-delay: -9s; }

        .large-circles::before,
        .large-circles::after,
        .large-circles .circle {
          content: '';
          position: absolute;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.03);
          animation: subtlePulse 10s infinite ease-in-out, calmDrift 30s infinite ease-in-out;
        }

        .large-circles::before { width: 500px; height: 500px; top: 5%; left: 0%; }
        .large-circles::after { width: 450px; height: 450px; bottom: 10%; right: 5%; animation-delay: -4s; }
        .large-circles .circle:nth-child(1) { width: 400px; height: 400px; top: 30%; left: 20%; animation-delay: -8s; }
        .large-circles .circle:nth-child(2) { width: 550px; height: 550px; top: 60%; left: 50%; animation-delay: -12s; }
        .large-circles .circle:nth-child(3) { width: 350px; height: 350px; top: 15%; left: 60%; animation-delay: -16s; }

        .glowing-orbs::before,
        .glowing-orbs::after,
        .glowing-orbs .orb {
          content: '';
          position: absolute;
          width: 15px;
          height: 15px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 70%);
          animation: softGlow 8s infinite ease-in-out, calmDrift 35s infinite ease-in-out;
        }

        .glowing-orbs::before { top: 25%; left: 15%; }
        .glowing-orbs::after { bottom: 20%; right: 10%; animation-delay: -3s; }
        .glowing-orbs .orb:nth-child(1) { top: 50%; left: 50%; animation-delay: -1.5s; }
        .glowing-orbs .orb:nth-child(2) { top: 75%; left: 30%; animation-delay: -4.5s; }
        .glowing-orbs .orb:nth-child(3) { top: 10%; left: 60%; animation-delay: -6s; }

        .swarming-dots::before,
        .swarming-dots::after {
          content: '';
          position: absolute;
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.5);
          animation: swarm 15s infinite ease-in-out;
        }

        .swarming-dots::before {
          top: 30%;
          left: 40%;
          animation-delay: -2s;
        }

        .swarming-dots::after {
          top: 70%;
          left: 60%;
          animation-delay: -4s;
        }

        .gradient-sweep {
          position: absolute;
          top: 0;
          left: 0;
          width: 200%;
          height: 100%;
          background: linear-gradient(to right, transparent, rgba(255,255,255,0.2), transparent);
          animation: gradientSweep 15s infinite ease-in-out;
        }

        .aurora-waves {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(45deg, rgba(97, 218, 251, 0.1), rgba(128, 0, 128, 0.1), rgba(255, 0, 255, 0.1));
          filter: blur(30px);
          animation: auroraWaves 20s infinite ease-in-out;
        }

        .starry-sky::before,
        .starry-sky::after {
          content: '';
          position: absolute;
          width: 2px;
          height: 2px;
          background: white;
          box-shadow: 
            100px 200px white,
            200px 250px white,
            300px 300px white,
            400px 100px white,
            500px 200px white,
            600px 50px white,
            700px 300px white,
            800px 250px white,
            900px 150px white,
            1000px 100px white,
            1100px 200px white,
            1200px 300px white,
            1300px 200px white,
            1400px 50px white,
            1500px 250px white;
          animation: twinkle 5s infinite alternate;
        }

        .starry-sky::after {
          top: 50%;
          animation-delay: -2.5s;
        }

        .monsoon-rain::before,
        .monsoon-rain::after {
          content: '';
          position: absolute;
          width: 2px;
          height: 50px;
          background: linear-gradient(to bottom, rgba(255,255,255,0.5), rgba(255,255,255,0));
          animation: monsoonRain 2s linear infinite;
        }

        .monsoon-rain::before {
          top: -50px;
          left: 20%;
          animation-delay: -1s;
        }

        .monsoon-rain::after {
          top: -50px;
          left: 60%;
          animation-delay: -1.5s;
        }

        .gradient-button {
          background: linear-gradient(45deg, #667eea, #764ba2, #6B46C1, #4F46E5);
          background-size: 300% 300%;
          animation: dramaticGradient 8s ease infinite;
          transition: all 0.3s ease;
        }

        .gradient-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(107, 70, 193, 0.3);
        }

        .hover-glow {
          transition: all 0.3s ease;
        }

        .hover-glow:hover {
          box-shadow: 0 0 15px rgba(107, 70, 193, 0.3);
          transform: translateY(-2px);
        }
      `}</style>
    </div>
  )
}