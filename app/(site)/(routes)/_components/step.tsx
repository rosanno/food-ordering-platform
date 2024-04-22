"use client";

import Image from "next/image";

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
    <section className="mt-32 lg:mt-60">
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
        <h4 className="uppercase text-[13px] text-yellow-500">
          step by step
        </h4>
        <h4 className="text-2xl font-semibold">
          How It Works
        </h4>
        <p className="text-[13px] text-muted-foreground tracking-wide">
          Explore following these steps will help you find a
          disher you love easily
        </p>
      </div>
      <div
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
      >
        {data.map((_, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center text-center px-16"
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
          </div>
        ))}
      </div>
    </section>
  );
};

export default Step;
