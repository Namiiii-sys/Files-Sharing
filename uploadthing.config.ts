// uploadthing.config.ts

import { createUploadthing, type FileRouter } from "uploadthing/server";

const f = createUploadthing();

export const ourFileRouter = {
  uploadFile: f({ image: { maxFileSize: "2MB" } })
    .onUploadComplete(async ({file}) => {
      try {
        const url = `https://utfs.io/f/${file.key}`;
        console.log("✅ File uploaded:", url);

        return { uploadedUrl: url }; // 
      
      } catch (err) {
        console.error("Error in onUploadComplete:", err);
      }
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
