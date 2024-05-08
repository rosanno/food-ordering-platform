"use client";

import { Home, Mail, Phone } from "lucide-react";

import ContactInfo from "./_components/contact-info";
import ContactForm from "./_components/contact-form";

const ContactUsPage = () => {
  return (
    <section className="mt-10 md:mt-16 px-2 md:px-0">
      <div className="flex flex-col md:flex-row md:gap-20">
        <div className="space-y-6">
          <ContactInfo
            label="Binghamton, New York"
            sublabel="4343 Hinkle Deegan Lake Road"
            icon={Home}
          />
          <ContactInfo
            label="00 (958) 9865 562"
            sublabel="Mon to Fri 9am to 6 pm"
            icon={Phone}
          />
          <ContactInfo
            label="support@goodfood.com"
            sublabel="Send us your query anytime!"
            icon={Mail}
          />
        </div>
        <div className="flex-1">
          <ContactForm />
        </div>
      </div>
    </section>
  );
};

export default ContactUsPage;
