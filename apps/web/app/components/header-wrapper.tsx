"use client"

import { useState } from "react"
import { Header } from "./header"
import { TopicModal } from "./topic-modal"
import { useSuperCoins } from "@/contexts/supercoin-context"

export function HeaderWrapper() {
  const [showTopicModal, setShowTopicModal] = useState(false)
  const { balance } = useSuperCoins()

  return (
    <>
      <Header 
        onCreateTopic={() => setShowTopicModal(true)} 
        supercoinBalance={balance}
      />
      <TopicModal 
        open={showTopicModal} 
        onOpenChange={setShowTopicModal} 
      />
    </>
  )
} 