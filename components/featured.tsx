"use client";

import Image from "next/image";
import { TbCircleArrowUpRightFilled } from "react-icons/tb";
import { HiCheckBadge } from "react-icons/hi2";
import { MdOutlineStar } from "react-icons/md";

const Featured = () => {
  return (
    <section
      className="
        mt-10 
        col-span-8 
        md:col-span-7
      "
    >
      <div
        className="
          relative 
          rounded-[35px] 
          overflow-hidden
          group
        "
      >
        <Image
          src={"/assets/food1.jpg"}
          alt=""
          height={800}
          width={900}
          className="
            lg:h-[420px] 
            w-full
            group-hover:scale-105
            transition
            duration-150
            ease-linear
          "
        />
        <div
          className="
           absolute 
           top-8 
           z-20 
           pl-6 
           lg:pl-14 
           flex 
           items-center 
           gap-2
          "
        >
          <div className="bg-black rounded-full p-2">
            <HiCheckBadge
              className="
                 text-[#EBB535] 
                 text-2xl
                "
            />
          </div>
          <div
            className="
              flex
              items-center gap-1
              bg-white/60
              backdrop-blur-md
              rounded-full
              px-5
              py-2.5
            "
          >
            <h2 className="text-[13px]">
              Show Top-Rated Foods
            </h2>
            <TbCircleArrowUpRightFilled
              className="
               text-xl 
               sm:text-2xl
              "
            />
          </div>
        </div>
        <div
          className="
            absolute 
            bottom-5 
            pl-6 
            pr-20 
            lg:pr-40
            lg:pl-14
          "
        >
          <h1
            className="
              text-xl 
              sm:text-[27px] 
              md:text-3xl
              text-white 
              sm:leading-10
              md:leading-snug
              lg:leading-snug
              tracking-wide
              font-semibold
              pointer-events-none
              relative
              z-10
            "
          >
            Savor Healthy Eats - Keep it Casual and
            Easy-Going!
          </h1>
        </div>
        <div
          className="
            bg-black/15 
            absolute 
            top-0 
            h-full 
            w-full
          "
        />
      </div>
      <div
        className="
          flex 
          items-center 
          justify-between
          bg-black
          rounded-full
          py-4
          px-10
          md:px-16
          md:py-5
          mt-6
        "
      >
        <h2 className="text-white font-semibold md:text-xl">
          3,500 + Ratings
        </h2>
        <div className="flex items-center gap-1.5">
          {[1, 2, 3, 4, 5].map((_, i) => (
            <div key={i}>
              {
                <MdOutlineStar
                  className="
                    text-yellow-400 
                    text-lg 
                    md:text-xl
                  "
                />
              }
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Featured;
