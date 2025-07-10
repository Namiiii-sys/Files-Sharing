import { prisma } from "@/lib/prisma";
import Link from "next/link";
import DeleteFileForm from "../components/DeleteFileForm";

export default async function FilesPage() {
  const files = await prisma.file.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <section className="h-full bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-900">
    <div className="max-w-3xl mx-auto p-12 px-4 ">
      <h1 className="text-2xl text-gray-400 font-bold mb-6 text-center py-2">All Uploaded Files</h1>

      {files.length === 0 ? (
        <p className="text-gray-500">No files uploaded yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {files.map((file) => (
            <div
              key={file.id}
              className="border rounded-lg shadow p-4 flex flex-col gap-2 bg-transparent hover:bg-gray-700"
            >
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-lg truncate">{file.name}</h2>
                {file.password && (
                  <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded">
                    Protected
                  </span>
                )}
              </div>

              <p className="text-sm text-gray-600">
                Uploaded: {new Date(file.createdAt).toLocaleString()}
              </p>

              <div className="mx-auto flex gap-3 p-3">
                <Link
                   href={`/download/${file.shortId}`}
                   className="bg-blue-600 hover:bg-blue-800 text-sm rounded-full px-5 py-2 w-full mx-auto">
                    View
                </Link>
                
                <DeleteFileForm shortId={file.shortId} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    </section>
  );
}
