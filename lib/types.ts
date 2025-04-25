export type UserRole = 'candidate' | 'interviewer' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  createdAt: Date;
}

export interface InterviewSlot {
  id: string;
  interviewerId: string;
  title: string;
  description?: string;
  startTime: Date;
  endTime: Date;
  isBooked: boolean;
  candidateId?: string;
}

export interface Interview {
  id: string;
  slotId: string;
  candidateId: string;
  interviewerId: string;
  roomUrl: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
  createdAt: Date;
}

export interface Feedback {
  id: string;
  interviewId: string;
  interviewerId: string;
  candidateId: string;
  technicalScore: number;
  communicationScore: number;
  problemSolvingScore: number;
  comments: string;
  recommendation: 'hire' | 'consider' | 'reject';
  createdAt: Date;
}