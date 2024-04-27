"use client";

import Image from "next/image";
import { FaFacebookF } from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";
import { BsInstagram } from "react-icons/bs";

import Logo from "./ui/logo";
import {
  contactInfo,
  helpCenter,
  paymentMethods,
  quickLinks,
} from "@/constants/link";
import FooterLinks from "./footer-links";

const Footer = () => {
  return (
    <footer className="mt-32">
      <div className="px-2 md:px-2.5 w-full max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between">
          <div>
            <Logo />
            <div className="space-y-2.5 mt-3">
              <p className="text-muted-foreground text-[13px]">
                7 days a Week (10:00 am - 8:00 pm)
              </p>
              <div className="flex items-center gap-1.5">
                <Image
                  src="/assets/app-store-logo.png"
                  alt="logo"
                  height={120}
                  width={120}
                  className="w-28 object-contain"
                />
                <Image
                  src="/assets/play-store-logo.png"
                  alt="logo"
                  height={120}
                  width={120}
                  className="w-32 object-contain"
                />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-10 mt-10 md:mt-0">
            <div>
              <h3 className="text-sm font-medium mb-5">
                Quick Links
              </h3>
              {quickLinks.map((item, _) => (
                <FooterLinks
                  key={_}
                  label={item.label}
                  href={item.href}
                  link={true}
                />
              ))}
            </div>
            <div>
              <h3 className="text-sm font-medium mb-5">
                Help Center
              </h3>
              {helpCenter.map((item, i) => (
                <FooterLinks
                  key={i}
                  label={item.label}
                  href={item.href}
                  link={true}
                />
              ))}
            </div>
            <div className="mt-5 md:mt-0">
              <h3 className="text-sm font-medium mb-5">
                Payment Methods
              </h3>
              {paymentMethods.map((item, i) => (
                <FooterLinks key={i} label={item.label} />
              ))}
            </div>
            <div className="mt-5 md:mt-0">
              <h3 className="text-sm font-medium mb-5">
                Contact Info
              </h3>
              {contactInfo.map((item, i) => (
                <FooterLinks
                  key={i}
                  label={item.label}
                  icon={item.icon}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#FF9E0A] py-3.5 mt-10 md:mt-16">
        <div className="flex items-center justify-between px-2 md:px-2.5 w-full max-w-5xl mx-auto">
          <p className="text-[13px] text-gray-100">
            &copy; 2024 GoodFood All rights reserved.
          </p>
          <div className="flex items-center gap-2.5">
            <FaFacebookF className="text-white" />
            <RiTwitterXLine className="text-white" />
            <BsInstagram className="text-white" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
