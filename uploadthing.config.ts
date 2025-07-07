// uploadthing.config.ts

import { createUploadthing, type FileRouter } from "uploadthing/server";

const f = createUploadthing();

export const ourFileRouter = {
  uploadFile: f({ image: { maxFileSize: "2MB" } })
    .onUploadComplete(async ({file}) => {
      try {
        console.log("Upload complete callback:", file);

      
      } catch (err) {
        console.error("Error in onUploadComplete:", err);
      }
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
