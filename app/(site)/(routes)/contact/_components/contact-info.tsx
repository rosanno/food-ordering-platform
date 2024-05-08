"use client";

import { LucideIcon } from "lucide-react";

interface ContactInfoProps {
  label: string;
  sublabel: string;
  icon: LucideIcon;
}

const ContactInfo = ({
  label,
  sublabel,
  icon: Icon,
}: ContactInfoProps) => {
  return (
    <div className="flex items-center gap-7">
      <Icon className="text-[#FFA71E]" />
      <div>
        <h3 className="font-light text-[15px] mb-1">
          {label}
        </h3>
        <p className="text-muted-foreground text-sm">
          {sublabel}
        </p>
      </div>
    </div>
  );
};

export default ContactInfo;
