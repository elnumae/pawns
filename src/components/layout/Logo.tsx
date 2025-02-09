
import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface LogoProps extends HTMLAttributes<HTMLImageElement> {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const Logo = ({ className, size = "md", ...props }: LogoProps) => {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-20 h-20"
  };

  return (
    <img
      src="/logo.png"
      alt="Pawns Logo"
      className={cn(sizeClasses[size], className)}
      {...props}
    />
  );
};

export default Logo;
