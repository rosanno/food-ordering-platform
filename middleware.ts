import {
  authMiddleware,
  redirectToSignIn,
} from "@clerk/nextjs";
import { NextResponse } from "next/server";

// See https://clerk.com/docs/references/nextjs/auth-middleware
// for more information about configuring your Middleware
export default authMiddleware({
  afterAuth(auth, req, evt) {
    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }

    return NextResponse.next();
  },
  // Allow signed out users to access the specified routes:
  publicRoutes: [
    "/",
    "/menu",
    "/menu/:menuSlug",
    "/restaurant/:restaurantSlug",
    "/contact",
    "/about-us",
    "/api/uploadthing",
  ],
});

export const config = {
  matcher: [
    // Exclude files with a "." followed by an extension, which are typically static files.
    // Exclude files in the _next directory, which are Next.js internals.
    "/((?!.+\\.[\\w]+$|_next).*)",
    // Re-include any files in the api or trpc folders that might have an extension
    "/(api|trpc)(.*)",
  ],
};
