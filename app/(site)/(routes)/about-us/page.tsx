"use client";

import { services } from "@/constants";
import Image from "next/image";

const AboutUsPage = () => {
  return (
    <>
      <section className="mt-14 mx-4 md:mx-0 px-2.5">
        <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-8">
          <div className="flex-1">
            <h1 className="text-4xl font-medium">
              About Our Story
            </h1>
            <p className="text-muted-foreground text-sm leading-6 mt-5">
              Our journey began with a shared passion for
              bringing people together through delightful
              dining experiences. Was born out of a dream to
              create a place where every meal is a
              celebration of flavors, creativity, and
              heartfelt hospitality.
            </p>
          </div>
          <div className="flex-1">
            <Image
              src="/assets/bg-1.jpg"
              alt="about-bg"
              height={480}
              width={480}
              className="h-80 md:h-[360px] w-full object-cover"
            />
          </div>
        </div>
      </section>
      <section className="mt-20 mx-4 md:mx-0 px-2.5">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-4xl font-medium">
            What Kind of Services we Offer
          </h1>
          <p className="mt-3.5 text-muted-foreground text-sm">
            Who are in extremely love with eco friendly
            system.
          </p>
        </div>
        <div className="mt-16">
          <div className="flex flex-col md:flex-row justify-center gap-6">
            {services.map((service, index) => (
              <div key={index} className="group flex-1">
                <div className="h-60 w-full overflow-hidden">
                  <Image
                    src={service.img}
                    alt="service image"
                    height={540}
                    width={540}
                    className="h-full w-full object-cover group-hover:scale-110 transition duration-200"
                  />
                </div>
                <h3 className="mt-4 text-lg font-medium group-hover:text-[#FFA71E]">
                  {service.label}
                </h3>
                <p className="mt-5 text-sm text-muted-foreground leading-6">
                  {service.details}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutUsPage;
