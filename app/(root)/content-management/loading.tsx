"use client";

import { Loader, Loader2 } from "lucide-react";



const Loading = () => {
  return ( 
    <div className="flex h-full w-full items-center justify-center mt-10">
      <Loader2 size={30} className="animate-spin" />
    </div>
   );
}
 
export default Loading;