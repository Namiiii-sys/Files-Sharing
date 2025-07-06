// uploadthing.config.ts
import { createUploadthing, type FileRouter } from "uploadthing/server";

const f = createUploadthing();

export const ourFileRouter = {
  uploadFile: f({ image: { maxFileSize: "2MB" } })
    .onUploadComplete(({ file }) => {
      console.log("File uploaded:", file.url);
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
