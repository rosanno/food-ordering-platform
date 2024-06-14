"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import {
  staggerContainer,
  staggerItem,
} from "@/constants/variants";

const data = [
  {
    label: "Choose Location",
    details:
      "Enter your address or choose your current location using app",
    img: "/assets/svg-1.svg",
  },
  {
    label: "Order Favorite Food",
    details:
      "Choose your favorite food and a payment method.",
    img: "/assets/svg-2.svg",
  },
  {
    label: "Fast Delivery",
    details:
      "Get it delivered right to your door in 1 hour or less.",
    img: "/assets/svg-3.svg",
  },
];

const Step = () => {
  return (
    <section className="mt-52 lg:mt-72">
      <div
        className="
          flex 
          flex-col 
          items-center 
          justify-center 
          text-center 
          px-5 
          sm:px-0 
          space-y-2
        "
      >
        <motion.h4
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.6,
            delay: 0.3,
            ease: "easeInOut",
          }}
          className="uppercase text-[13px] text-yellow-500"
        >
          step by step
        </motion.h4>
        <motion.h4
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            delay: 0.5,
            ease: "easeInOut",
          }}
          className="text-2xl font-semibold"
        >
          How It Works
        </motion.h4>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.6,
            delay: 0.8,
            ease: "easeInOut",
          }}
          className="text-[13px] text-muted-foreground tracking-wide"
        >
          Explore following these steps will help you find a
          disher you love easily
        </motion.p>
      </div>
      <motion.div
        className="
          flex 
          flex-col 
          md:flex-row 
          justify-center 
          items-center 
          gap-6
          md:gap-2 
          mt-16
        "
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        {data.map((_, index) => (
          <motion.div
            key={index}
            className="flex flex-col items-center justify-center text-center px-16"
            variants={staggerItem}
            transition={{
              duration: 0.7,
              ease: "linear",
            }}
          >
            <div className="h-32 w-32">
              <Image
                src={_.img}
                alt={_.label}
                height={150}
                width={150}
              />
            </div>
            <div className="mt-6 space-y-2">
              <h4 className="font-semibold">{_.label}</h4>
              <p className="text-[13px] text-muted-foreground">
                {_.details}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Step;
