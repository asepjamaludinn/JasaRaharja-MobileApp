"use server";

import { revalidatePath } from "next/cache";
import { newReportSchema } from "@/lib/schemas"; // Import schema

export async function uploadReport(prevState: any, formData: FormData) {
  const date = formData.get("date");
  const activity = formData.get("activity");
  const location = formData.get("location");
  const detailActivity = formData.get("detailActivity");
  const mediaFile = formData.get("media");

  // Validasi data menggunakan Zod schema
  const parsed = newReportSchema.safeParse({
    date,
    activity,
    location,
    detailActivity,
    media: mediaFile,
  });

  if (!parsed.success) {
    // Jika validasi gagal, kembalikan error dari Zod
    const errors = parsed.error.flatten().fieldErrors;
    return {
      success: false,
      message: "Validasi gagal. Periksa kembali input Anda.",
      errors: errors, // Mengembalikan detail error
    };
  }

  const { data } = parsed;

  // Di aplikasi nyata, Anda akan mengunggah file ke layanan penyimpanan di sini
  // Misalnya, Vercel Blob, AWS S3, dll.
  console.log(
    `Uploading file: ${data.media.name}, type: ${data.media.type}, size: ${data.media.size} bytes`
  );
  // const uploadResult = await uploadToStorage(data.media);
  // if (!uploadResult.success) {
  //   return { success: false, message: "Gagal mengunggah media." };
  // }

  // Simulasikan penyimpanan data laporan
  await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulasikan penundaan jaringan

  console.log({
    date: data.date,
    activity: data.activity,
    location: data.location,
    detailActivity: data.detailActivity,
    mediaFileName: data.media.name,
  });

  // Revalidate path jika diperlukan (misal: jika laporan ini memengaruhi daftar di halaman lain)
  revalidatePath("/activity/report-history");

  return { success: true, message: "Laporan berhasil dikirim! +50 poin" };
}
