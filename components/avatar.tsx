"use client";

import { UserButton, useUser } from "@clerk/nextjs";

import ButtonLink from "./ui/button-link";
import { Skeleton } from "./ui/skeleton";

const Avatar = () => {
  const { isSignedIn, isLoaded } = useUser();
  return (
    <div>
      {isLoaded ? (
        <>
          {isSignedIn ? (
            <>
              <UserButton afterSignOutUrl="/" />
            </>
          ) : (
            <ButtonLink href="/sign-in">Sign in</ButtonLink>
          )}
        </>
      ) : (
        <Skeleton className="h-8 w-8 rounded-full bg-gray-300/55" />
      )}
    </div>
  );
};

export default Avatar;
