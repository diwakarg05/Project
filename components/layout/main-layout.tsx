"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ModeToggle } from "@/components/theme/mode-toggle";
import { Calendar, Code2, Video, LayoutDashboard, ClipboardList } from "lucide-react";
import { cn } from "@/lib/utils";

interface MainLayoutProps {
  children: React.ReactNode;
}

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  icon: React.ReactNode;
}

function NavLink({ href, children, icon }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link href={href} passHref>
      <Button
        variant={isActive ? "default" : "ghost"}
        className={cn(
          "w-full justify-start gap-2",
          isActive ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
        )}
      >
        {icon}
        <span>{children}</span>
      </Button>
    </Link>
  );
}

export function MainLayout({ children }: MainLayoutProps) {
  // Default user info
  const user = {
    name: "Demo User",
    role: "user",
    avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar - hidden on mobile */}
      <aside className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 bg-background border-r border-border/40">
        <div className="h-full flex flex-col px-2 py-4">
          <div className="px-4 py-2 flex items-center gap-2 mb-6">
            <Video className="h-8 w-8 text-primary" />
            <span className="font-bold text-xl">InterviewHub</span>
          </div>
          
          <nav className="flex-1 space-y-1">
            <NavLink href="/dashboard" icon={<LayoutDashboard className="h-5 w-5" />}>
              Dashboard
            </NavLink>
            <NavLink href="/interviews" icon={<Video className="h-5 w-5" />}>
              Interviews
            </NavLink>
            <NavLink href="/schedule" icon={<Calendar className="h-5 w-5" />}>
              Schedule
            </NavLink>
            <NavLink href="/playground" icon={<Code2 className="h-5 w-5" />}>
              Code Playground
            </NavLink>
            <NavLink href="/feedback" icon={<ClipboardList className="h-5 w-5" />}>
              Feedback
            </NavLink>
          </nav>
          
          <div className="mt-auto pt-4 border-t border-border/40">
            <div className="px-4 py-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{user.name}</span>
                  <span className="text-xs text-muted-foreground capitalize">{user.role}</span>
                </div>
              </div>
            </div>
            
            <div className="px-4 mt-2">
              <ModeToggle />
            </div>
          </div>
        </div>
      </aside>
      
      {/* Main content */}
      <main className="flex-1 md:ml-64">
        {/* Mobile header */}
        <header className="md:hidden sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b border-border/40 px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Video className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg">InterviewHub</span>
          </div>
          
          <div className="flex items-center gap-2">
            <ModeToggle />
            <Avatar className="h-8 w-8">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
            </Avatar>
          </div>
        </header>
        
        {/* Content area */}
        <div className="px-4 py-6 md:px-8 md:py-8">
          {children}
        </div>
      </main>
    </div>
  );
}