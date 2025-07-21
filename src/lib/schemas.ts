import { z } from "zod";

export const newReportSchema = z.object({
  date: z.string().min(1, "Tanggal wajib diisi."),
  activity: z.string().min(1, "Aktivitas wajib diisi."),
  location: z.string().min(1, "Lokasi wajib diisi."),
  detailActivity: z.string().min(1, "Deskripsi aktivitas wajib diisi."),
  media: z
    .instanceof(File, { message: "File media harus diunggah." })
    .refine((file) => file.size > 0, "Media wajib diunggah.")
    .refine((file) => {
      const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
      return allowedTypes.includes(file.type);
    }, "Format media tidak valid. Hanya JPG, PNG, WebP yang diizinkan.")
    .refine(
      (file) => file.size <= 5 * 1024 * 1024,
      "Ukuran file maksimal 5MB."
    ), // 5 MB
});

export type NewReportFormSchema = z.infer<typeof newReportSchema>;
