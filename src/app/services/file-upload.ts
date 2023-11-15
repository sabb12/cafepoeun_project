import { supabase } from "@/repositories";

type ImageUploadReponse = {
  data: { path: string } | null;
  error: any;
};

export const uploadProductImage: (
  filename: string,
  file: File
) => Promise<ImageUploadReponse> = function (filename: string, file: File) {
  return supabase.storage.from("products").upload(filename, file);
};
