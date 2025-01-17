"use client"

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"

declare global {
  interface Window {
    SpeechRecognition: any
    webkitSpeechRecognition: any
  }
}

export function VoiceCommands() {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    const recognition = new SpeechRecognition()

    recognition.continuous = true
    recognition.interimResults = true

    recognition.onresult = (event: any) => {
      const current = event.resultIndex
      const transcript = event.results[current][0].transcript
      setTranscript(transcript)

      // Handle voice commands here
      if (transcript.toLowerCase().includes('go to dashboard')) {
        window.location.href = '/dashboard'
      }
      // Add more voice commands as needed
    }

    if (isListening) {
      recognition.start()
    } else {
      recognition.stop()
    }

    return () => {
      recognition.stop()
    }
  }, [isListening])

  return (
    <div>
      <Button onClick={() => setIsListening(!isListening)}>
        {isListening ? 'Stop Listening' : 'Start Voice Commands'}
      </Button>
      {transcript && <p>You said: {transcript}</p>}
    </div>
  )
}

