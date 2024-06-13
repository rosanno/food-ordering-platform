"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useDebouncedCallback } from "use-debounce";
import {
  useRouter,
  useSearchParams,
} from "next/navigation";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";

const Article = () => {
  const [query, setQuery] = useState<string>("");

  const searchParams = useSearchParams();
  const router = useRouter();

  const handleSearch = useDebouncedCallback(() => {
    const params = new URLSearchParams(searchParams);

    query
      ? params.set("query", query)
      : params.delete("query");
    router.push(`/menu?${params.toString()}`);
  });

  return (
    <section
      className="
        space-y-10 
        col-span-8 
        md:col-span-5 
        md:px-6
      "
    >
      <motion.p
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          duration: 0.5,
          ease: "easeIn",
        }}
        className="text-sm sm:leading-6 text-muted-foreground"
      >
        Overall, &quot;Create Delicious Dishes&quot; is an
        essential resource for anyone looking to start a
        food business or take their culinary skills to next
        level.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          delay: 0.5,
          ease: "easeIn",
        }}
        className="
         flex 
         items-center 
         border 
         rounded-full 
         py-1 
         px-3.5
        "
      >
        <input
          placeholder="Find Great Food"
          className="
             w-full 
             py-2 
             px-2.5
             lg:py-4
             border-0 
             text-[13px] 
             focus:outline-none
            "
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              handleSearch();
            }
          }}
        />
        <div
          role="button"
          className="
             cursor-pointer
             bg-black 
             rounded-full 
             p-2.5
             lg:p-4
            "
          onClick={handleSearch}
        >
          <HiOutlineMagnifyingGlass
            className="
              text-xl 
              text-white
            "
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Article;
