import { createRouteHandler, createUploadthing } from "uploadthing/next";
 
const f = createUploadthing();
 
// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique route key
  imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req }) => {
      // This code runs on your server before upload
      console.log("UploadThing middleware running");
      
      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { timestamp: Date.now() };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload complete for file:", file.name);
      console.log("File URL:", file.ufsUrl );
      
      // Return the URL or any other data you want to access in your client
      return { url: file.ufsUrl  };
    }),
};

// To be used with Next.js App Router
export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
  config: {
    // Configure UploadThing if needed
    // For example, you might want to change the URL pattern or add debug mode
    uploadthingId: process.env.UPLOADTHING_APP_ID,
    uploadthingSecret: process.env.UPLOADTHING_SECRET,
    // Debug messages for troubleshooting
    debug: true,
  }
});