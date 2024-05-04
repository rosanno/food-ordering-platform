import GoBack from "@/components/go-back";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center mt-16">
      <div className="flex flex-col items-center text-center">
        <Image
          src="/assets/not-found.jpg"
          alt="404"
          height={440}
          width={440}
        />
        <h2 className="text-2xl text-muted-foreground font-bold">
          Page Not Found
        </h2>
        <p className="text-sm text-muted-foreground mt-2.5 mb-6">
          The page you were looking for might have been
          removed, <br /> had it&apos;s name changed or is
          temporarily unavailable
        </p>
        <GoBack />
      </div>
    </div>
  );
}
