"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CardWithHover } from "@/components/ui/card-with-hover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MainLayout } from "@/components/layout/main-layout";
import { mockInterviewSlots, mockInterviews, getUserByRole } from "@/lib/api/mockData";
import { formatDistance } from "date-fns";
import { Calendar, Clock, Users, Video } from "lucide-react";
import { User, InterviewSlot } from "@/lib/types";

export default function DashboardPage() {
  // In a real app, you'd get this from an auth context or session
  const userRole = "candidate";

  const [upcomingInterviews, setUpcomingInterviews] = useState([]);
  const [availableSlots, setAvailableSlots] = useState<InterviewSlot[]>([]);
  const [interviewers, setInterviewers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      // Get all unbooked slots
      const slots = mockInterviewSlots.filter(slot => !slot.isBooked && new Date(slot.startTime) > new Date());
      setAvailableSlots(slots);
      
      // Get next 3 upcoming interviews
      const upcoming = mockInterviews
        .filter(interview => interview.status === "scheduled" && new Date() < new Date(interview.startTime))
        .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime())
        .slice(0, 3);
      setUpcomingInterviews(upcoming);
      
      // Get interviewers
      const interviewers = await getUserByRole("interviewer");
      setInterviewers(interviewers);
      
      setIsLoading(false);
    };
    
    fetchData();
  }, []);

  return (
    <MainLayout>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's what's happening.</p>
        </div>
        
        {userRole === "candidate" ? (
          <Link href="/schedule" passHref>
            <Button>
              Find Interview Slots
            </Button>
          </Link>
        ) : (
          <Link href="/schedule/create" passHref>
            <Button>
              Create Interview Slot
            </Button>
          </Link>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Upcoming Interviews</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{isLoading ? "..." : mockInterviews.length}</div>
            <p className="text-xs text-muted-foreground">
              {isLoading ? "" : mockInterviews.length > 0 ? "Next on " + new Date(mockInterviews[0].startTime).toLocaleDateString() : "No upcoming interviews"}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Available Slots</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{isLoading ? "..." : availableSlots.length}</div>
            <p className="text-xs text-muted-foreground">
              {isLoading ? "" : availableSlots.length > 0 ? "From " + interviewers.length + " interviewers" : "No available slots"}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Interviewers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{isLoading ? "..." : interviewers.length}</div>
            <p className="text-xs text-muted-foreground">
              {isLoading ? "" : "Active on the platform"}
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="upcoming" className="mb-8">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming Interviews</TabsTrigger>
          <TabsTrigger value="available">Available Slots</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upcoming" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? (
              Array(3).fill(0).map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardContent className="p-6">
                    <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-muted rounded w-1/2 mb-4"></div>
                    <div className="h-3 bg-muted rounded w-full mb-2"></div>
                    <div className="h-3 bg-muted rounded w-5/6"></div>
                  </CardContent>
                </Card>
              ))
            ) : mockInterviews.length > 0 ? (
              mockInterviews.map((interview) => (
                <CardWithHover 
                  key={interview.id}
                  title={
                    <div className="flex items-center gap-2">
                      <Video className="h-4 w-4 text-primary" />
                      <span>Frontend Interview</span>
                    </div>
                  }
                  description={`with ${interviewers.find(i => i.id === interview.interviewerId)?.name || "Interviewer"}`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center text-sm">
                      <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{new Date(interview.startTime).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{new Date(interview.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {new Date(interview.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                    <div className="pt-2">
                      <Link href={`/interviews/${interview.id}`}>
                        <Button className="w-full">Join Interview</Button>
                      </Link>
                    </div>
                  </div>
                </CardWithHover>
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-8">
                <Video className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-1">No upcoming interviews</h3>
                <p className="text-muted-foreground mb-4">You don't have any interviews scheduled yet.</p>
                <Link href="/schedule">
                  <Button>Find Available Slots</Button>
                </Link>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="available" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? (
              Array(3).fill(0).map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardContent className="p-6">
                    <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-muted rounded w-1/2 mb-4"></div>
                    <div className="h-3 bg-muted rounded w-full mb-2"></div>
                    <div className="h-3 bg-muted rounded w-5/6"></div>
                  </CardContent>
                </Card>
              ))
            ) : availableSlots.length > 0 ? (
              availableSlots.map((slot) => {
                const interviewer = interviewers.find(i => i.id === slot.interviewerId);
                return (
                  <CardWithHover
                    key={slot.id}
                    title={slot.title}
                    description={
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">with</span>
                        <div className="flex items-center">
                          {interviewer?.avatarUrl && (
                            <span className="relative flex h-6 w-6 mr-2 overflow-hidden rounded-full">
                              <img
                                src={interviewer.avatarUrl}
                                alt={interviewer.name}
                                className="h-full w-full object-cover"
                              />
                            </span>
                          )}
                          <span>{interviewer?.name || "Interviewer"}</span>
                        </div>
                      </div>
                    }
                  >
                    <div className="space-y-3">
                      <p className="text-sm text-muted-foreground">
                        {slot.description || "No description provided."}
                      </p>
                      <div className="flex items-center text-sm">
                        <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{new Date(slot.startTime).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{new Date(slot.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {new Date(slot.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                      <div className="pt-2">
                        <Link href={`/schedule/book/${slot.id}`}>
                          <Button className="w-full">Book This Slot</Button>
                        </Link>
                      </div>
                    </div>
                  </CardWithHover>
                );
              })
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-8">
                <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-1">No available slots</h3>
                <p className="text-muted-foreground mb-4">There are no interview slots available at the moment.</p>
                <Button variant="outline" onClick={() => {}}>Check again later</Button>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
      
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Active Interviewers</h2>
          <Link href="/interviewers">
            <Button variant="ghost" size="sm">View All</Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {isLoading ? (
            Array(4).fill(0).map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-muted"></div>
                    <div>
                      <div className="h-4 bg-muted rounded w-24 mb-2"></div>
                      <div className="h-3 bg-muted rounded w-16"></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            interviewers.slice(0, 4).map((interviewer) => (
              <Card key={interviewer.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <span className="relative flex h-10 w-10 overflow-hidden rounded-full">
                      <img
                        src={interviewer.avatarUrl || "https://images.pexels.com/photos/7148384/pexels-photo-7148384.jpeg"}
                        alt={interviewer.name}
                        className="h-full w-full object-cover"
                      />
                    </span>
                    <div>
                      <p className="font-medium">{interviewer.name}</p>
                      <p className="text-xs text-muted-foreground">
                        Member for {formatDistance(new Date(interviewer.createdAt), new Date(), { addSuffix: true })}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </section>
    </MainLayout>
  );
}