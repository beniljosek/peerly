"use client"

import React, { createContext, useContext, useState, ReactNode } from 'react'

export interface Topic {
  id: number
  title: string
  description: string
  category: string
  level: string
  price: string
  tags: string[]
  tutor?: {
    name: string
    avatar: string
    rating: number
    sessions: number
  }
  students?: number
  isUserTopic?: boolean // Flag to identify user's own topics
}

interface TopicContextType {
  // Browser topics (all available topics)
  browserTopics: Topic[]
  // User's teaching topics
  userTopics: Topic[]
  // Add a new topic to both browser and user topics
  addTopic: (topic: Omit<Topic, 'id'>, username?: string, sessions?: number) => void
  // Remove a topic from user's teaching topics
  removeUserTopic: (topicId: number) => void
  // Update a topic
  updateTopic: (topicId: number, updates: Partial<Topic>) => void
}

const TopicContext = createContext<TopicContextType | undefined>(undefined)

// Initial mock data for browser topics
const initialBrowserTopics: Topic[] = [
  {
    id: 1,
    title: "Advanced React Hooks & State Management",
    description: "Master useEffect, useContext, useReducer and custom hooks. Perfect for intermediate developers.",
    category: "Programming",
    level: "Intermediate",
    tutor: {
      name: "Sarah Chen",
      avatar: "/placeholder.svg?height=40&width=40&text=SC",
      rating: 4.9,
      sessions: 127,
    },
    price: "Free",
    tags: ["React", "JavaScript", "Hooks"],
  },
  {
    id: 2,
    title: "Calculus I: Limits and Derivatives",
    description: "Comprehensive coverage of limits, continuity, and differentiation with practical examples.",
    category: "Mathematics",
    level: "Beginner",
    tutor: {
      name: "Michael Rodriguez",
      avatar: "/placeholder.svg?height=40&width=40&text=MR",
      rating: 4.8,
      sessions: 89,
    },
    price: "15 SuperCoins",
    tags: ["Calculus", "Math", "Derivatives"],
  },
  {
    id: 3,
    title: "Spanish Conversation Practice",
    description: "Improve your Spanish speaking skills through interactive conversations and cultural insights.",
    category: "Languages",
    level: "Intermediate",
    tutor: {
      name: "Isabella Martinez",
      avatar: "/placeholder.svg?height=40&width=40&text=IM",
      rating: 5.0,
      sessions: 203,
    },
    price: "12 SuperCoins",
    tags: ["Spanish", "Conversation", "Culture"],
  },
  {
    id: 4,
    title: "Digital Marketing Fundamentals",
    description: "Learn SEO, social media marketing, and content strategy from real-world campaigns.",
    category: "Business",
    level: "Beginner",
    tutor: {
      name: "Alex Thompson",
      avatar: "/placeholder.svg?height=40&width=40&text=AT",
      rating: 4.7,
      sessions: 156,
    },
    price: "20 SuperCoins",
    tags: ["Marketing", "SEO", "Social Media"],
  },
  {
    id: 5,
    title: "Data Structures & Algorithms",
    description: "Master arrays, linked lists, trees, and sorting algorithms with coding practice.",
    category: "Programming",
    level: "Advanced",
    tutor: {
      name: "David Kim",
      avatar: "/placeholder.svg?height=40&width=40&text=DK",
      rating: 4.9,
      sessions: 234,
    },
    price: "25 SuperCoins",
    tags: ["Algorithms", "Data Structures", "Coding"],
  },
  {
    id: 6,
    title: "Creative Writing Workshop",
    description: "Develop your storytelling skills, character development, and narrative techniques.",
    category: "Arts",
    level: "Intermediate",
    tutor: {
      name: "Emma Wilson",
      avatar: "/placeholder.svg?height=40&width=40&text=EW",
      rating: 4.8,
      sessions: 78,
    },
    price: "18 SuperCoins",
    tags: ["Writing", "Creative", "Storytelling"],
  },
  {
    id: 7,
    title: "Pinia",
    description: "Pinia - state management in vue",
    category: "Programming",
    level: "Intermediate",
    tutor: {
      name: "Sarah Chen",
      avatar: "/placeholder.svg?height=40&width=40&text=SC",
      rating: 4.7,
      sessions: 45,
    },
    price: "$20",
    tags: ["Vue", "Pinia", "State Management"],
  },
]

// Initial mock data for user's teaching topics
const initialUserTopics: Topic[] = [
  {
    id: 101,
    title: "Advanced React Hooks & State Management",
    description: "Master useEffect, useContext, useReducer and custom hooks.",
    category: "Programming",
    level: "Intermediate",
    tutor: {
      name: "Current User",
      avatar: "/placeholder.svg?height=40&width=40&text=CU",
      rating: 4.8,
      sessions: 45,
    },
    price: "Free",
    tags: ["React", "JavaScript", "Hooks"],
    students: 45,
    isUserTopic: true,
  },
  {
    id: 102,
    title: "Node.js API Development",
    description: "Build RESTful APIs with Express.js and MongoDB.",
    category: "Programming",
    level: "Intermediate",
    tutor: {
      name: "Current User",
      avatar: "/placeholder.svg?height=40&width=40&text=CU",
      rating: 4.7,
      sessions: 32,
    },
    price: "20 SuperCoins",
    tags: ["Node.js", "Express", "MongoDB"],
    students: 32,
    isUserTopic: true,
  },
  {
    id: 103,
    title: "JavaScript Fundamentals",
    description: "Learn the core concepts of JavaScript programming.",
    category: "Programming",
    level: "Beginner",
    tutor: {
      name: "Current User",
      avatar: "/placeholder.svg?height=40&width=40&text=CU",
      rating: 4.9,
      sessions: 67,
    },
    price: "15 SuperCoins",
    tags: ["JavaScript", "Programming", "Basics"],
    students: 67,
    isUserTopic: true,
  },
]

export function TopicProvider({ children }: { children: ReactNode }) {
  const [browserTopics, setBrowserTopics] = useState<Topic[]>(initialBrowserTopics)
  const [userTopics, setUserTopics] = useState<Topic[]>(initialUserTopics)

  const addTopic = (topicData: Omit<Topic, 'id'>, username?: string, sessions?: number) => {
    const newId = Math.max(...browserTopics.map(t => t.id), ...userTopics.map(t => t.id)) + 1
    
    // Create tutor object with Sarah Chen as default, or use provided username
    const tutorName = username || "Sarah Chen"
    const tutor = {
      name: tutorName,
      avatar: `/placeholder.svg?height=40&width=40&text=${tutorName.substring(0, 2).toUpperCase()}`,
      rating: 5.0, // Default rating for new topics
      sessions: sessions || 0,
    }

    const newTopic: Topic = {
      ...topicData,
      id: newId,
      tutor,
    }

    // Add to browser topics (all topics)
    setBrowserTopics(prev => [newTopic, ...prev])
    
    // Add to user topics (if it's a user topic)
    if (topicData.isUserTopic) {
      setUserTopics(prev => [newTopic, ...prev])
    }
  }

  const removeUserTopic = (topicId: number) => {
    setUserTopics(prev => prev.filter(topic => topic.id !== topicId))
    // Also remove from browser topics if it's a user topic
    setBrowserTopics(prev => prev.filter(topic => topic.id !== topicId))
  }

  const updateTopic = (topicId: number, updates: Partial<Topic>) => {
    setBrowserTopics(prev => 
      prev.map(topic => 
        topic.id === topicId ? { ...topic, ...updates } : topic
      )
    )
    
    setUserTopics(prev => 
      prev.map(topic => 
        topic.id === topicId ? { ...topic, ...updates } : topic
      )
    )
  }

  const value: TopicContextType = {
    browserTopics,
    userTopics,
    addTopic,
    removeUserTopic,
    updateTopic,
  }

  return (
    <TopicContext.Provider value={value}>
      {children}
    </TopicContext.Provider>
  )
}

export function useTopics() {
  const context = useContext(TopicContext)
  if (context === undefined) {
    throw new Error('useTopics must be used within a TopicProvider')
  }
  return context
} 