
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const Logo = ({ className, size = "md" }: LogoProps) => {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-20 h-20"
  };

  return (
    <svg
      viewBox="0 0 100 100"
      className={cn(sizeClasses[size], "fill-current", className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Base of the pawn */}
      <path
        d="M20 85 L80 85 L75 95 L25 95 Z"
        className="fill-primary"
      />
      
      {/* Body of the pawn */}
      <path
        d="M35 85 L65 85 L60 45 L40 45 Z"
        className="fill-primary"
      />
      
      {/* Head of the pawn */}
      <circle
        cx="50"
        cy="30"
        r="15"
        className="fill-primary"
      />
    </svg>
  );
};

export default Logo;
