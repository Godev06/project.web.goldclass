import logo from "../../assets/logo.png";

interface LogoProps {
  size?: "sm" | "md" | "lg";
}

const sizeMap = {
  sm: "h-12",
  md: "h-16",
  lg: "h-24",
};

export const Logo = ({ size = "md" }: LogoProps) => {
  return (
    <img
      src={logo}
      alt="GoldClass Logo"
      className={`${sizeMap[size]} w-auto`}
    />
  );
};