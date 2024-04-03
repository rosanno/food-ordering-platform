"use client";

import { HiOutlineMagnifyingGlass } from "react-icons/hi2";

const Article = () => {
  return (
    <section
      className="
        space-y-10 
        col-span-8 
        md:col-span-5 
        md:px-6
      "
    >
      <div></div>
      <p className="text-[13px] sm:text-sm sm:leading-6">
        Overall, &quot;Create Delicious Dishes&quot; is an
        essential resource for anyone looking to start a
        food business or take their culinary skills to next
        level.
      </p>
      <div
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
        />
        <div
          className="
             cursor-pointer
             bg-black 
             rounded-full 
             p-2.5
             lg:p-4
            "
        >
          <HiOutlineMagnifyingGlass
            className="
              text-xl 
              text-white
            "
          />
        </div>
      </div>
    </section>
  );
};

export default Article;
