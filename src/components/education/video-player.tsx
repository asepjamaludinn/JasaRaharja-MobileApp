"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { addPoints } from "@/app/education/actions";
import { useToast } from "@/hooks/use-toast";

// Definisi tipe untuk YouTube Player API
interface YouTubePlayerOptions {
  height: string;
  width: string;
  videoId: string;
  playerVars: {
    autoplay?: 0 | 1;
    controls?: 0 | 1;
    rel?: 0 | 1;
    showinfo?: 0 | 1;
    modestbranding?: 0 | 1;
  };
  events?: {
    onReady?: (event: YouTubePlayerEvent) => void;
    onStateChange?: (event: YouTubeOnStateChangeEvent) => void;
  };
}

interface YouTubePlayer {
  loadVideoById: (videoId: string) => void;
  playVideo: () => void;
  pauseVideo: () => void;
  stopVideo: () => void;
  getPlayerState: () => number;
  destroy: () => void;
  // Tambahkan properti lain yang mungkin Anda gunakan
}

// Definisi tipe untuk event YouTube Player
interface YouTubePlayerEvent {
  target: YouTubePlayer;
  data?: unknown; // Mengubah 'any' menjadi 'unknown'
}

interface YouTubeOnStateChangeEvent extends YouTubePlayerEvent {
  data: number; // YT.PlayerState constants
}

// Declare the global YT object and its properties directly on Window
declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
    YT: {
      Player: new (
        elementId: string | HTMLElement,
        options: YouTubePlayerOptions
      ) => YouTubePlayer;
      PlayerState: {
        ENDED: number;
        PLAYING: number;
        PAUSED: number;
        BUFFERING: number;
        CUED: number;
      };
    };
  }
}

interface VideoPlayerClientProps {
  videoId: string;
  points: number;
}

export function VideoPlayerClient({ videoId, points }: VideoPlayerClientProps) {
  const playerRef = useRef<YouTubePlayer | null>(null); // Menggunakan tipe YouTubePlayer
  const playerContainerRef = useRef<HTMLDivElement>(null);
  const [hasAwardedPoints, setHasAwardedPoints] = useState(false);
  const [isPlayerApiReady, setIsPlayerApiReady] = useState(false); // Mengganti nama state agar lebih jelas
  const { toast } = useToast();

  // Muat YouTube Iframe API script
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      !document.getElementById("youtube-iframe-api")
    ) {
      const tag = document.createElement("script");
      tag.id = "youtube-iframe-api";
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);

      window.onYouTubeIframeAPIReady = () => {
        setIsPlayerApiReady(true);
      };
    } else if (typeof window !== "undefined" && window.YT && window.YT.Player) {
      setIsPlayerApiReady(true);
    }
  }, []);

  const handleAwardPoints = useCallback(async () => {
    if (hasAwardedPoints) {
      console.log("Poin sudah diberikan untuk video ini.");
      return;
    }

    try {
      const result = await addPoints(videoId, points);
      if (result.success) {
        setHasAwardedPoints(true);
        toast({
          title: "Poin Diberikan!",
          description: result.message,
          variant: "default",
        });
      } else {
        toast({
          title: "Gagal Memberikan Poin",
          description: result.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error calling addPoints:", error);
      toast({
        title: "Error",
        description: "Terjadi kesalahan saat mencoba memberikan poin.",
        variant: "destructive",
      });
    }
  }, [videoId, points, hasAwardedPoints, toast]);

  const onPlayerReady = useCallback((event: YouTubePlayerEvent) => {
    console.log("YouTube player is ready:", event.target);
  }, []);

  const onPlayerStateChange = useCallback(
    (event: YouTubeOnStateChangeEvent) => {
      if (event.data === window.YT.PlayerState.ENDED) {
        console.log("Video ended. Attempting to award points.");
        handleAwardPoints();
      }
    },
    [handleAwardPoints]
  );

  // Inisialisasi dan bersihkan pemutar YouTube
  useEffect(() => {
    if (!isPlayerApiReady || !playerContainerRef.current) return;

    const initializePlayer = () => {
      if (playerRef.current) {
        playerRef.current.destroy(); // Hancurkan instance lama jika ada
      }

      playerRef.current = new window.YT.Player(playerContainerRef.current!, {
        height: "100%",
        width: "100%",
        videoId: videoId,
        playerVars: {
          autoplay: 0,
          controls: 1,
          rel: 0, // Jangan tampilkan video terkait
          showinfo: 0, // Jangan tampilkan info video
          modestbranding: 1, // Gunakan branding YouTube yang minimal
        },
        events: {
          onReady: onPlayerReady,
          onStateChange: onPlayerStateChange,
        },
      });
    };

    initializePlayer();

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, [videoId, isPlayerApiReady, onPlayerReady, onPlayerStateChange]);

  return (
    <div className="w-full max-w-2xl aspect-video bg-black rounded-xl overflow-hidden shadow-lg">
      {!isPlayerApiReady && (
        <div className="flex items-center justify-center h-full text-white">
          Memuat pemutar video...
        </div>
      )}
      <div
        ref={playerContainerRef}
        id={`youtube-player-${videoId}`}
        className="w-full h-full"
      />
    </div>
  );
}
