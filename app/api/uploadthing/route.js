// app/api/uploadthing/route.js
// import { createNextRouteHandler } from "uploadthing/next";
import {createRouteHandler} from "uploadthing/next"
import { ourFileRouter } from "../../../lib/uploadthing";

// Export routes for Next App Router
export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
});
