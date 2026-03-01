'use client'

import { useEffect, useRef, useState } from 'react'
import { Volume2, VolumeX, Play } from 'lucide-react'

export default function VideoSection() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)

  useEffect(() => {
    const video = videoRef.current
    const container = containerRef.current
    if (!video || !container) return

    const gesehen = localStorage.getItem('video_gesehen')
    if (!gesehen) {
      // Zum Video scrollen
      container.scrollIntoView({ behavior: 'smooth', block: 'center' })

      // Video starten (muted wegen Browser-Pflicht)
      video.play().then(() => {
        setIsPlaying(true)
        localStorage.setItem('video_gesehen', 'true')

        // Nach kurzer Verzögerung Ton einschalten versuchen
        video.muted = false
        setIsMuted(false)
      }).catch(() => {
        // Autoplay blocked — kein Problem
      })
    }
  }, [])

  function togglePlay() {
    const video = videoRef.current
    if (!video) return

    if (video.paused) {
      video.play()
      setIsPlaying(true)
    } else {
      video.pause()
      setIsPlaying(false)
    }
  }

  function toggleMute() {
    const video = videoRef.current
    if (!video) return

    video.muted = !video.muted
    setIsMuted(video.muted)
  }

  return (
    <div ref={containerRef} className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/20 border border-gray-200">
      <video
        ref={videoRef}
        src="/videos/Intro.mp4"
        muted
        playsInline
        preload="metadata"
        onClick={togglePlay}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
        className="w-full aspect-video bg-black cursor-pointer"
      />

      {/* Play-Overlay wenn pausiert */}
      {!isPlaying && (
        <button
          onClick={togglePlay}
          className="absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity hover:bg-black/40"
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-500 shadow-lg shadow-brand-500/30">
            <Play className="h-7 w-7 text-white ml-1" />
          </div>
        </button>
      )}

      {/* Mute-Button */}
      <button
        onClick={toggleMute}
        className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-black/70"
      >
        {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
      </button>
    </div>
  )
}
