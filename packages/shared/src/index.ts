// Common types used across frontend and backend
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  isMentor: boolean;
  learnCoins: number;
  rating: number;
  skills: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Session {
  id: string;
  studentId: string;
  mentorId: string;
  topic: string;
  duration: number; // in minutes
  status: SessionStatus;
  startTime: Date;
  endTime?: Date;
  learnCoinsCost: number;
  createdAt: Date;
  updatedAt: Date;
}

export enum SessionStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

export interface Mentor {
  id: string;
  userId: string;
  skills: string[];
  hourlyRate: number; // in LearnCoins
  isAvailable: boolean;
  rating: number;
  totalSessions: number;
  introductionVideo?: string;
  verified: boolean;
}

export interface Transaction {
  id: string;
  userId: string;
  type: TransactionType;
  amount: number;
  description: string;
  sessionId?: string;
  createdAt: Date;
}

export enum TransactionType {
  EARNED = 'EARNED',
  SPENT = 'SPENT',
  REFUND = 'REFUND',
  BONUS = 'BONUS'
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Validation schemas
export const userSchema = {
  email: 'string',
  name: 'string',
  password: 'string'
} as const;

export const sessionSchema = {
  topic: 'string',
  duration: 'number',
  mentorId: 'string'
} as const; 