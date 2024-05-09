"use client";


import Image from "next/image";
import ContactForm from "./_components/contact-form";

const ContactUsPage = () => {
  return (
    <section className="mt-10 md:mt-20 px-2 md:px-0">
      <div className="max-w-xl mx-auto">
        <h1 className="text-4xl">Contact Us</h1>
        <p className="text-[13px] text-muted-foreground mt-1.5">
          Have questions or feedback? We&apos;re here to
          help.
        </p>
        <div className="mt-8">
          <ContactForm />
        </div>
      </div>
    </section>
  );
};

export default ContactUsPage;
