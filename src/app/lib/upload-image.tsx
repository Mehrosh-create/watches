import cloudinary from "./cloudinary";

interface UploadResult {
  public_id: string;
  secure_url: string;
  // Add other properties you need
}

export const UploadImage = async (file: File, folder: string): Promise<UploadResult> => {
  const buffer = await file.arrayBuffer();
  const bytes = Buffer.from(buffer);

  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          resource_type: "auto",
          folder: folder,
        },
        (error, result) => {
          if (error) {
            return reject(error);
          }
          if (!result) {
            return reject(new Error("Upload result is undefined"));
          }
          return resolve({
            public_id: result.public_id,
            secure_url: result.secure_url,
            // Add other properties you need
          });
        }
      )
      .end(bytes);
  });
};