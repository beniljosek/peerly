"use client"

import { useState } from "react"
import { Header } from "./header"
import { TopicModal } from "./topic-modal"

export function HeaderWrapper() {
  const [showTopicModal, setShowTopicModal] = useState(false)

  return (
    <>
      <Header onCreateTopic={() => setShowTopicModal(true)} />
      <TopicModal 
        open={showTopicModal} 
        onOpenChange={setShowTopicModal} 
      />
    </>
  )
} 