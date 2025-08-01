"use client";

import { useState, useEffect, startTransition } from "react";
import { useActionState } from "react";
import { TitleHeader } from "@/components/layout/title-header";
import { BottomNavigation } from "@/components/layout/bottom-navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UploadMediaCard } from "@/components/report/upload-media-card";
import { uploadReport, type UploadReportState } from "../actions";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { newReportSchema, type NewReportFormSchema } from "@/lib/schemas";
import { useToast } from "@/hooks/use-toast";

export default function NewReportPage() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const { toast } = useToast();

  const [serverState, formAction, isPending] = useActionState<
    UploadReportState | null,
    FormData
  >(uploadReport, null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
    clearErrors,
    setValue,
  } = useForm<NewReportFormSchema>({
    resolver: zodResolver(newReportSchema),
  });

  const handleFileChange = (selectedFile: File | null) => {
    setFile(selectedFile);
    if (selectedFile) {
      clearErrors("media");
      setValue("media", selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
    } else {
      setValue("media", undefined);
      setPreviewUrl(null);
    }
  };

  const handleClearPreview = () => {
    setFile(null);
    setPreviewUrl(null);
    setValue("media", undefined);
    clearErrors("media");
    const fileInput = document.getElementById("media") as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
  };

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  useEffect(() => {
    if (serverState?.success) {
      reset();
      setFile(null);
      setPreviewUrl(null);
      const fileInput = document.getElementById("media") as HTMLInputElement;
      if (fileInput) {
        fileInput.value = "";
      }
      toast({
        title: "Laporan Dikirim!",
        description: serverState.message,
        variant: "default",
      });
    } else if (serverState?.message && !serverState.success) {
      setError("root.serverError", {
        type: "server",
        message: serverState.message,
      });
      toast({
        title: "Pengiriman Gagal",
        description: serverState.message,
        variant: "destructive",
      });
    }
  }, [serverState, reset, setFile, setPreviewUrl, setError, toast]);

  const onSubmit = async (data: NewReportFormSchema) => {
    const formData = new FormData();

    formData.append("content", data.content);
    formData.append("activity", data.activity);
    formData.append("location", data.location);

    if (file) {
      formData.append("media", file);
    }

    startTransition(() => {
      formAction(formData);
    });
  };

  return (
    <div className="min-h-screen bg-screenBackground flex flex-col pb-20">
      <TitleHeader title="New Report" />
      <main className="flex-1 space-y-6 py-6 px-4">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label
                htmlFor="activity"
                className="text-dashboardTextPrimary font-semibold mb-2 block"
              >
                Activity
              </Label>
              <Input
                id="activity"
                type="text"
                placeholder="Masukkan Sosialisasi"
                {...register("activity")}
              />
              {errors.activity && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.activity.message}
                </p>
              )}
            </div>
            <div>
              <Label
                htmlFor="location"
                className="text-dashboardTextPrimary font-semibold mb-2 block"
              >
                Location
              </Label>
              <Input
                id="location"
                type="text"
                placeholder="Masukkan Lokasi"
                {...register("location")}
              />
              {errors.location && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.location.message}
                </p>
              )}
            </div>
            <div>
              <Label
                htmlFor="content"
                className="text-dashboardTextPrimary font-semibold mb-2 block"
              >
                Detail Activity
              </Label>
              <Input
                id="content"
                type="text"
                placeholder="Masukkan Activity"
                {...register("content")}
              />
              {errors.content && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.content.message}
                </p>
              )}
            </div>
          </div>
          <div className="space-y-4">
            <Label className="text-dashboardTextPrimary font-semibold mb-2 block">
              Upload Media
            </Label>
            <UploadMediaCard
              onFileChange={handleFileChange}
              file={file}
              register={register("media")}
              previewUrl={previewUrl}
              onClearPreview={handleClearPreview}
            />
            {typeof errors.media?.message === "string" && (
              <p className="text-red-500 text-sm mt-1">
                {errors.media.message}
              </p>
            )}
          </div>
          {serverState && serverState.message && (
            <p
              className={`text-center text-sm ${
                serverState.success ? "text-green-600" : "text-red-600"
              }`}
            >
              {serverState.message}
            </p>
          )}
          {errors.root?.serverError && (
            <p className="text-red-500 text-sm text-center mt-1">
              {errors.root.serverError.message}
            </p>
          )}
          <Button
            type="submit"
            className="w-full h-[58px] rounded-[25px] bg-dashboardBlue text-[#FCD53F] text-lg shadow-md hover:bg-dashboardBlue/90"
            disabled={isPending}
          >
            {isPending ? "Uploading..." : "Upload + 50 points"}
          </Button>
        </form>
      </main>
      <BottomNavigation />
    </div>
  );
}
