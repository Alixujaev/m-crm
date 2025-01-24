import loader from "@/assets/loader.gif";
import Image from "next/image";

const Loader = ({ className }: { className?: string }) => {
  return (
    <div className={`w-full flex justify-center items-center ${className}`}>
      <Image src={loader} alt="loader" className="w-14 h-14" />
    </div>
  );
};

export default Loader;
