import { TitleHeader } from "@/components/layout/title-header";
import { BottomNavigation } from "@/components/layout/bottom-navigation";
import { getEducationMaterialByVideoId } from "@/services/education";
import { VideoPlayerClient } from "@/components/education/video-player";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface VideoPageProps {
  params: {
    videoId: string;
  };
}

export default async function VideoPage({ params }: VideoPageProps) {
  const { videoId } = await params;

  const material = await getEducationMaterialByVideoId(videoId);

  if (!material) {
    return (
      <div className="min-h-screen bg-screenBackground flex flex-col pb-20">
        <TitleHeader title="Video Not Found" />
        <main className="flex-1 py-6 px-4 flex flex-col items-center justify-center text-dashboardTextPrimary">
          <p className="text-lg font-semibold">Video tidak ditemukan.</p>
          <p className="text-sm text-dashboardTextSecondary mt-2">
            Materi edukasi untuk video ID ini tidak tersedia.
          </p>
        </main>
        <BottomNavigation />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-screenBackground flex flex-col pb-20">
      <TitleHeader title="Video Player" />
      <main className="flex-1 py-6 px-4 flex flex-col items-center gap-6">
        {" "}
        <VideoPlayerClient
          videoId={material.videoId}
          points={material.points}
        />
        <p className="text-dashboardTextPrimary text-center text-base font-medium">
          Menonton video ini akan memberikan Anda{" "}
          <span className="font-bold text-dashboardBlue">
            +{material.points} poin!
          </span>
        </p>
        <Card className="w-full max-w-2xl bg-dashboardHeaderBg shadow-card rounded-xl">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-dashboardTextPrimary">
              Deskripsi
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-dashboardTextSecondary whitespace-pre-wrap leading-relaxed">
              {material.description}
            </p>
          </CardContent>
        </Card>
      </main>
      <BottomNavigation />
    </div>
  );
}
