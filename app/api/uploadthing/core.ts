import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  uploadFile: f({ image: { maxFileSize: "4MB" } })
    .onUploadComplete(async ({ file }) => {
      console.log("✅ File uploaded:", file);
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
