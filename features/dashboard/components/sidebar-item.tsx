import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { SidebarItemProps } from "../types";
import { cn } from "@/lib/utils";

const SidebarItem = ({ href, icon: Icon, label }: SidebarItemProps) => {

    const pathname = usePathname();
    const router = useRouter()

    const isActive = (pathname === "/" && href === "/") ||
    pathname === href || pathname?.startsWith(`${href}/`)

    const onRoute = ()=>{
      router.push(href)
    }
  return (
    <>
      <button
        className={cn(
          "flex items-center gap-x-2 text-slate-500 dark:text-slate-100 text-sm font-[500] pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20",
          isActive && "text-zinc-700 bg-red-200/20 hover:bg-red-200/20 hover:text-zinc-700"
        )}
        onClick={onRoute}
      >
        <div className="flex items-center gap-x-2 py-4">
          <Icon
            size={22}
            className={cn("text-slate-500 dark:text-slate-100 transition-all" , isActive && "text-zinc-900")}
          />
          {label}
        </div>
        <div
          className={cn(
            "ml-auto opacity-0 border-2 border-[#D22B2B] dark:border-[#D22B2B] h-full transition-all" ,
            isActive && "opacity-100"
          )}
        />
      </button>
    </>
  );
};

export default SidebarItem;
