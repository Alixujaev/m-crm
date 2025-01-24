"use client";
import { sidebarLinks } from "@/lib/contstants";
import Link from "next/link";
import { usePathname } from "next/navigation";
const Sidebar = () => {
  const pathname = usePathname();
  return (
    <div className="bg-white w-[280px] h-full fixed shadow-md p-5 flex flex-col justify-between">
      <div className="w-full">
        <div>
          {sidebarLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`flex gap-3 items-center p-2 rounded-md mb-1 relative ${
                pathname.split("/")[1] === link.href.substring(1)
                  ? "bg-[#28b39331]"
                  : ""
              }`}
            >
              <p
                className={`font-semibold ${
                  pathname.split("/")[1] === link.href.substring(1)
                    ? "text-[#28b392]"
                    : "text-[#4B5563]"
                }`}
              >
                {link.name}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
