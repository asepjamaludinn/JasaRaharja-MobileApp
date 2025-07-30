"use client"; // Tandai sebagai Client Component

import { useEffect, useRef, useState } from "react";
import { TitleHeader } from "@/components/layout/title-header";
import { BottomNavigation } from "@/components/layout/bottom-navigation";
import { useToast } from "@/hooks/use-toast";
import { addPoints } from "../actions";
import { educationMaterials } from "@/data/education-materi";

interface VideoPageProps {
  params: {
    videoId: string;
  };
}

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

export default function VideoPage({ params }: VideoPageProps) {
  const { videoId } = params;
  const playerRef = useRef<any>(null);
  const [pointsAwarded, setPointsAwarded] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const { toast } = useToast();

  const material = educationMaterials.find((m) => m.videoId === videoId);
  const pointsToAward = material ? material.points : 25;

  useEffect(() => {
    const loadYouTubeAPI = () => {
      if (!window.YT) {
        const tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName("script")[0];
        firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
      }
    };

    loadYouTubeAPI();

    window.onYouTubeIframeAPIReady = () => {
      playerRef.current = new window.YT.Player("youtube-player", {
        videoId: videoId,
        playerVars: {
          autoplay: 1,
          controls: 1,
          rel: 0,
          modestbranding: 1,
        },
        events: {
          onReady: (event: any) => {
            setVideoLoaded(true);
            event.target.playVideo();
          },
          onStateChange: (event: any) => {
            if (event.data === window.YT.PlayerState.ENDED && !pointsAwarded) {
              console.log("Video ended. Awarding points...");
              setPointsAwarded(true);
              handleAwardPoints(videoId, pointsToAward);
            }
          },
          onError: (event: any) => {
            console.error("YouTube Player Error:", event.data);
            toast({
              title: "Kesalahan Video",
              description: "Gagal memuat video YouTube. Silakan coba lagi.",
              variant: "destructive",
            });
          },
        },
      });
    };

    return () => {
      if (
        playerRef.current &&
        typeof playerRef.current.destroy === "function"
      ) {
        playerRef.current.destroy();
      }

      if (window.onYouTubeIframeAPIReady) {
        delete window.onYouTubeIframeAPIReady;
      }
    };
  }, [videoId, pointsAwarded, pointsToAward, toast]);

  const handleAwardPoints = async (id: string, points: number) => {
    const result = await addPoints(id, points);
    if (result.success) {
      toast({
        title: "Poin Ditambahkan!",
        description: result.message,
        variant: "default",
      });
    } else {
      toast({
        title: "Gagal Menambah Poin",
        description: result.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-screenBackground flex flex-col pb-20">
      <TitleHeader title="Video Player" />
      <main className="flex-1 py-6 px-4 flex flex-col items-center justify-center">
        <div className="w-full max-w-2xl aspect-video bg-black rounded-xl overflow-hidden shadow-lg">
          <div id="youtube-player" className="w-full h-full">
            {!videoLoaded && (
              <div className="flex items-center justify-center h-full text-white">
                Memuat video...
              </div>
            )}
          </div>
        </div>

        <p className="mt-4 text-dashboardTextPrimary text-center">
          {pointsAwarded
            ? `Anda telah mendapatkan ${pointsToAward} poin!`
            : `Menonton video ini akan memberikan Anda +${pointsToAward} poin!`}
        </p>
      </main>
      <BottomNavigation />
    </div>
  );
}
