import { UTApi } from "uploadthing/server";
import { NextRequest } from "next/server";
import { createRouteHandler } from "uploadthing/next";

import { ourFileRouter } from "./core";

// Export routes for Next App Router
export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
});

export async function DELETE(req: NextRequest) {
  const { key } = await req.json();
  const utapi = new UTApi();

  await utapi.deleteFiles(key);

  return Response.json({ message: "Image deleted" });
}
