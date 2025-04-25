"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { MainLayout } from "@/components/layout/main-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Textarea } from "@/components/ui/textarea";
import { mockInterviews, getUser } from "@/lib/api/mockData";
import { Clock, Copy, Download, Maximize2, Mic, MicOff, Video as VideoIcon, VideoOff } from "lucide-react";
import { createDailyToken } from "@/lib/api/daily";
import { User } from "@/lib/types";
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';

export default function InterviewPage() {
  const { id } = useParams();
  const interviewId = Array.isArray(id) ? id[0] : id;
  
  const [interview, setInterview] = useState(null);
  const [candidate, setCandidate] = useState<User | null>(null);
  const [interviewer, setInterviewer] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Video call states
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  
  // Notes and code states
  const [notes, setNotes] = useState("");
  const [code, setCode] = useState(`// Write your code here
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// Example usage
console.log(fibonacci(10));
`);
  
  // Timer state
  const [timer, setTimer] = useState({
    isRunning: false,
    minutes: 45,
    seconds: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      // Find the interview from mock data
      const foundInterview = mockInterviews.find(i => i.id === interviewId);
      
      if (foundInterview) {
        setInterview(foundInterview);
        
        // Fetch candidate and interviewer details
        const candidateData = await getUser(foundInterview.candidateId);
        const interviewerData = await getUser(foundInterview.interviewerId);
        
        setCandidate(candidateData);
        setInterviewer(interviewerData);
      }
      
      setIsLoading(false);
    };
    
    fetchData();
  }, [interviewId]);

  // Timer effect
  useEffect(() => {
    let interval = null;
    
    if (timer.isRunning) {
      interval = setInterval(() => {
        if (timer.seconds === 0) {
          if (timer.minutes === 0) {
            clearInterval(interval);
            setTimer(prev => ({ ...prev, isRunning: false }));
          } else {
            setTimer(prev => ({
              ...prev,
              minutes: prev.minutes - 1,
              seconds: 59,
            }));
          }
        } else {
          setTimer(prev => ({
            ...prev,
            seconds: prev.seconds - 1,
          }));
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }
    
    return () => clearInterval(interval);
  }, [timer]);

  // Function to connect to the video call
  const connectToCall = async () => {
    setIsConnecting(true);
    
    try {
      // In a real implementation, you would:
      // 1. Get a token from your server
      // 2. Initialize the Daily.co call with the token
      // 3. Join the room
      
      // For demo purposes, we'll just simulate this process
      const token = await createDailyToken(interviewId, "User Name");
      
      // Simulate connection delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setIsVideoReady(true);
      setIsConnecting(false);
    } catch (error) {
      console.error("Failed to connect to call:", error);
      setIsConnecting(false);
    }
  };

  // Function to toggle the timer
  const toggleTimer = () => {
    setTimer(prev => ({
      ...prev,
      isRunning: !prev.isRunning,
    }));
  };

  // Function to reset the timer
  const resetTimer = () => {
    setTimer({
      isRunning: false,
      minutes: 45,
      seconds: 0,
    });
  };

  // Function to copy code to clipboard
  const copyCodeToClipboard = () => {
    navigator.clipboard.writeText(code);
    // Would show a toast notification in a real implementation
  };

  return (
    <MainLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Interview Room</h1>
          <p className="text-muted-foreground">
            {isLoading ? "Loading interview details..." : (
              candidate && interviewer ? `${candidate.name} interviewed by ${interviewer.name}` : "Interview details"
            )}
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-muted px-3 py-1.5 rounded-md">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="font-mono">
              {String(timer.minutes).padStart(2, '0')}:{String(timer.seconds).padStart(2, '0')}
            </span>
          </div>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" onClick={toggleTimer}>
                  {timer.isRunning ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="6" y="4" width="4" height="16" />
                      <rect x="14" y="4" width="4" height="16" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                {timer.isRunning ? "Pause timer" : "Start timer"}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" onClick={resetTimer}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 2v6h6" />
                    <path d="M3 13a9 9 0 1 0 3-7.7L3 8" />
                  </svg>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                Reset timer
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Video Call Section */}
        <div className="lg:col-span-2">
          <Card className="overflow-hidden">
            <CardHeader className="bg-muted/50 py-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Video Call</CardTitle>
                
                {isVideoReady && (
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setIsAudioOn(!isAudioOn)}
                    >
                      {isAudioOn ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setIsVideoOn(!isVideoOn)}
                    >
                      {isVideoOn ? <VideoIcon className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />}
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => {}}
                    >
                      <Maximize2 className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            </CardHeader>
            
            <CardContent className="p-0">
              {!isVideoReady ? (
                <div className="flex flex-col items-center justify-center h-80 bg-muted/30">
                  <VideoIcon className="h-16 w-16 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-4">Ready to join the interview?</h3>
                  <Button 
                    onClick={connectToCall} 
                    disabled={isConnecting}
                    className="min-w-32"
                  >
                    {isConnecting ? "Connecting..." : "Join Video Call"}
                  </Button>
                </div>
              ) : (
                <div className="relative h-96 bg-black">
                  {/* This would be replaced with the actual video call components */}
                  <div className="absolute inset-0 flex items-center justify-center text-white">
                    <div className="text-center">
                      <div className="flex justify-center mb-4">
                        <div className="relative h-24 w-24 overflow-hidden rounded-full border-2 border-primary">
                          <img
                            src={candidate?.avatarUrl || "https://images.pexels.com/photos/7148384/pexels-photo-7148384.jpeg"}
                            alt={candidate?.name || "Candidate"}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      </div>
                      <p className="text-lg font-medium">{candidate?.name || "Candidate"}</p>
                      <p className="text-sm opacity-80">Connected</p>
                    </div>
                  </div>
                  
                  {/* Interviewer's video thumbnail */}
                  <div className="absolute bottom-4 right-4 h-32 w-48 bg-muted rounded-lg overflow-hidden border border-border shadow-md">
                    <div className="h-full w-full flex items-center justify-center">
                      <div className="relative h-16 w-16 overflow-hidden rounded-full border-2 border-primary/50">
                        <img
                          src={interviewer?.avatarUrl || "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg"}
                          alt={interviewer?.name || "Interviewer"}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        {/* Notes Section */}
        <div className="lg:col-span-1">
          <Card className="h-full flex flex-col">
            <CardHeader className="py-3 bg-muted/50">
              <CardTitle className="text-lg">Interview Notes</CardTitle>
            </CardHeader>
            
            <CardContent className="flex-grow p-0">
              <Textarea
                placeholder="Take notes during the interview..."
                className="border-0 rounded-none h-full min-h-[300px] resize-none focus-visible:ring-0 focus-visible:ring-offset-0"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Code Editor Section */}
      <div className="mt-6">
        <Card>
          <CardHeader className="py-3 bg-muted/50">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Code Editor</CardTitle>
              
              <div className="flex items-center gap-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon" onClick={copyCodeToClipboard}>
                        <Copy className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      Copy code
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon" onClick={() => {}}>
                        <Download className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      Download code
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="p-0">
            <Tabs defaultValue="javascript" className="w-full">
              <div className="border-b border-border">
                <div className="px-4">
                  <TabsList className="h-9 bg-transparent">
                    <TabsTrigger value="javascript" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none">JavaScript</TabsTrigger>
                    <TabsTrigger value="typescript" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none">TypeScript</TabsTrigger>
                    <TabsTrigger value="python" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none">Python</TabsTrigger>
                  </TabsList>
                </div>
              </div>
              
              <TabsContent value="javascript" className="mt-0">
                <div className="border-0 h-80">
                  <CodeMirror
                    value={code}
                    height="320px"
                    extensions={[javascript()]}
                    onChange={(value) => setCode(value)}
                    theme="dark"
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="typescript" className="mt-0">
                <div className="border-0 h-80">
                  <CodeMirror
                    value={`// TypeScript code example
interface User {
  id: string;
  name: string;
  email: string;
}

function formatUser(user: User): string {
  return \`\${user.name} (\${user.email})\`;
}

// Example usage
const user: User = {
  id: "123",
  name: "John Doe",
  email: "john@example.com"
};

console.log(formatUser(user));`}
                    height="320px"
                    extensions={[javascript({ typescript: true })]}
                    theme="dark"
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="python" className="mt-0">
                <div className="border-0 h-80">
                  <CodeMirror
                    value={`# Python code example
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

# Example usage
print(fibonacci(10))`}
                    height="320px"
                    theme="dark"
                  />
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}