"use client";

import { LucideIcon } from "lucide-react";

interface IconButton {
  label: string;
  variant?: "primary" | "success" | "secondary" | "danger";
  icon: LucideIcon;
  className?: string;
  onClick: () => void;
}

const IconButton = ({
  label,
  variant = "primary",
  className = "",
  onClick,
  icon: Icon,
}: IconButton) => {
  const baseStyles =
    "p-2.5 rounded-full flex justify-center transition duration-300";
  const variantStyles = {
    success:
      "bg-green-300/25 text-green-600 hover:bg-green-500 hover:text-white",
    primary:
      "bg-blue-300/25 text-blue-600 hover:bg-blue-500 hover:text-white",
    secondary:
      "bg-indigo-300/25 text-indigo-600 hover:bg-indigo-500 hover:text-white",
    danger:
      "bg-red-300/25 text-red-600 hover:bg-red-500 hover:text-white",
  };

  const styles = `${baseStyles} ${variantStyles[variant]} ${className}`;

  return (
    <div className="flex flex-col items-center gap-2">
      <button onClick={onClick} className={styles}>
        <Icon className="h-3 w-3" />
      </button>
      <small>{label}</small>
    </div>
  );
};

export default IconButton;
