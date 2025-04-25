import { User, InterviewSlot, Interview, Feedback, UserRole } from "@/lib/types";

// Mock users
export const mockUsers: User[] = [
  {
    id: "1",
    name: "John Interviewer",
    email: "interviewer@example.com",
    role: "interviewer",
    avatarUrl: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    createdAt: new Date("2023-01-15"),
  },
  {
    id: "2",
    name: "Jane Candidate",
    email: "candidate@example.com",
    role: "candidate",
    avatarUrl: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    createdAt: new Date("2023-02-20"),
  },
  {
    id: "3",
    name: "Michael Tech",
    email: "michael@example.com",
    role: "interviewer",
    avatarUrl: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    createdAt: new Date("2023-01-10"),
  },
];

// Mock interview slots
export const mockInterviewSlots: InterviewSlot[] = [
  {
    id: "slot1",
    interviewerId: "1",
    title: "Frontend Developer Interview",
    description: "React & JavaScript focused interview for mid-level developers",
    startTime: new Date(Date.now() + 86400000), // Tomorrow
    endTime: new Date(Date.now() + 86400000 + 3600000), // Tomorrow + 1 hour
    isBooked: false,
  },
  {
    id: "slot2",
    interviewerId: "1",
    title: "Senior React Developer",
    description: "Advanced React concepts and architecture discussion",
    startTime: new Date(Date.now() + 172800000), // Day after tomorrow
    endTime: new Date(Date.now() + 172800000 + 3600000), // Day after tomorrow + 1 hour
    isBooked: true,
    candidateId: "2",
  },
  {
    id: "slot3",
    interviewerId: "3",
    title: "Backend Developer Interview",
    description: "Node.js and database design focus",
    startTime: new Date(Date.now() + 259200000), // Three days from now
    endTime: new Date(Date.now() + 259200000 + 3600000), // Three days from now + 1 hour
    isBooked: false,
  },
];

// Mock interviews
export const mockInterviews: Interview[] = [
  {
    id: "interview1",
    slotId: "slot2",
    candidateId: "2",
    interviewerId: "1",
    roomUrl: "https://yourdomain.daily.co/interview1",
    status: "scheduled",
    createdAt: new Date(Date.now() - 86400000), // Yesterday
  },
];

// Mock feedback
export const mockFeedback: Feedback[] = [
  {
    id: "feedback1",
    interviewId: "interview1",
    interviewerId: "1",
    candidateId: "2",
    technicalScore: 4,
    communicationScore: 5,
    problemSolvingScore: 4,
    comments: "Strong technical skills and excellent communication. Would be a great addition to the team.",
    recommendation: "hire",
    createdAt: new Date(Date.now() - 43200000), // 12 hours ago
  },
];

// Helper functions to simulate API calls

export function getUser(id: string): Promise<User | undefined> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockUsers.find(user => user.id === id));
    }, 300);
  });
}

export function getUserByRole(role: UserRole): Promise<User[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockUsers.filter(user => user.role === role));
    }, 300);
  });
}

export function getInterviewSlots(): Promise<InterviewSlot[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockInterviewSlots);
    }, 300);
  });
}

export function getInterviewSlotsByInterviewer(interviewerId: string): Promise<InterviewSlot[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockInterviewSlots.filter(slot => slot.interviewerId === interviewerId));
    }, 300);
  });
}

export function getInterviewsByCandidateId(candidateId: string): Promise<Interview[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockInterviews.filter(interview => interview.candidateId === candidateId));
    }, 300);
  });
}

export function getInterviewsByInterviewerId(interviewerId: string): Promise<Interview[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockInterviews.filter(interview => interview.interviewerId === interviewerId));
    }, 300);
  });
}

export function getFeedbackByInterviewId(interviewId: string): Promise<Feedback | undefined> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockFeedback.find(feedback => feedback.interviewId === interviewId));
    }, 300);
  });
}