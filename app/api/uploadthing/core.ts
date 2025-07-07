import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  uploadFile: f({ image: { maxFileSize: "4MB" } })
    .onUploadComplete(async ({ file }) => {
      console.log("✅ File uploaded:", file);
      // NO DB logic for now to avoid crashes
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
