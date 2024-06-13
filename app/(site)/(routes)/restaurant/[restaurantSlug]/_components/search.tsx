"use client";

import {
  useSearchParams,
  usePathname,
  useRouter,
} from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { cn } from "@/lib/utils";

interface SearchProps {
  placeholder: string;
  className?: string;
}

const Search = ({
  placeholder,
  className,
}: SearchProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const onSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);

    term
      ? params.set("query", term)
      : params.delete("query");

    replace(`${pathname}?${params.toString()}`);
  });

  return (
    <div className="flex items-center border rounded-sm">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        type="text"
        placeholder={placeholder}
        className={cn(
          "w-full outline-none py-1 md:py-1.5 px-3 text-sm placeholder:text-sm",
          className
        )}
        onChange={(e) => {
          onSearch(e.target.value);
        }}
        defaultValue={searchParams.get("query")?.toString()}
      />
    </div>
  );
};

export default Search;
