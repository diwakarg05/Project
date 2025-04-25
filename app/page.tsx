import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CalendarCheck, Code2, MessageSquare, Video } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="fixed top-0 w-full bg-background/80 backdrop-blur-sm z-10 border-b border-border/40">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Video className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">InterviewHub</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button>Go to Dashboard</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              The Perfect Platform for Technical Interviews
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Seamless video calls, real-time code collaboration, and comprehensive interview management, all in one place.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/dashboard">
                <Button size="lg" className="w-full sm:w-auto">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Everything You Need for Technical Interviews</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-card rounded-lg p-6 shadow-sm border border-border/60 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary mb-4">
                <Video className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Video Calling</h3>
              <p className="text-muted-foreground">
                Crystal clear HD video calls with no downloads required. Works directly in your browser.
              </p>
            </div>
            
            <div className="bg-card rounded-lg p-6 shadow-sm border border-border/60 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary mb-4">
                <Code2 className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Code Editor</h3>
              <p className="text-muted-foreground">
                Collaborative code editor with syntax highlighting and support for multiple languages.
              </p>
            </div>
            
            <div className="bg-card rounded-lg p-6 shadow-sm border border-border/60 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary mb-4">
                <CalendarCheck className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Scheduling</h3>
              <p className="text-muted-foreground">
                Simple scheduling system for creating and booking interview slots with calendar integration.
              </p>
            </div>
            
            <div className="bg-card rounded-lg p-6 shadow-sm border border-border/60 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary mb-4">
                <MessageSquare className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Feedback</h3>
              <p className="text-muted-foreground">
                Structured feedback forms to evaluate candidates on technical and soft skills.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary/5 to-primary/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to elevate your interview process?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of companies that use InterviewHub to find and hire the best technical talent.
          </p>
          <Link href="/dashboard">
            <Button size="lg">Get Started</Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background py-12 border-t border-border/40">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-8 md:mb-0">
              <div className="flex items-center gap-2 mb-4">
                <Video className="h-6 w-6 text-primary" />
                <span className="font-bold text-xl">InterviewHub</span>
              </div>
              <p className="text-muted-foreground max-w-md">
                Making technical interviews seamless and efficient for both interviewers and candidates.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-semibold mb-3">Product</h3>
                <ul className="space-y-2">
                  <li><Link href="#" className="text-muted-foreground hover:text-foreground">Features</Link></li>
                  <li><Link href="#" className="text-muted-foreground hover:text-foreground">Pricing</Link></li>
                  <li><Link href="#" className="text-muted-foreground hover:text-foreground">Integrations</Link></li>
                  <li><Link href="#" className="text-muted-foreground hover:text-foreground">FAQ</Link></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-3">Company</h3>
                <ul className="space-y-2">
                  <li><Link href="#" className="text-muted-foreground hover:text-foreground">About</Link></li>
                  <li><Link href="#" className="text-muted-foreground hover:text-foreground">Blog</Link></li>
                  <li><Link href="#" className="text-muted-foreground hover:text-foreground">Careers</Link></li>
                  <li><Link href="#" className="text-muted-foreground hover:text-foreground">Contact</Link></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-3">Legal</h3>
                <ul className="space-y-2">
                  <li><Link href="#" className="text-muted-foreground hover:text-foreground">Privacy</Link></li>
                  <li><Link href="#" className="text-muted-foreground hover:text-foreground">Terms</Link></li>
                  <li><Link href="#" className="text-muted-foreground hover:text-foreground">Security</Link></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mt-12 pt-6 border-t border-border/40 text-center text-muted-foreground">
            <p>© {new Date().getFullYear()} InterviewHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}