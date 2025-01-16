import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
type UserCardProps = {
    image: string;
    name: string;
  };
  
  const UserCardWithId = ({ image, name }: UserCardProps) => {
    return (
      <div className="flex flex-row items-center justify-start gap-4  mx-2 my-2">
        <Avatar>
          <AvatarImage src={image} alt={name} height={30} width={30} />
          <AvatarFallback>
            {name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
  
        <div className="flex flex-col items-start justify-start">
          <p className="text-base font-semibold">{name}</p>
        </div>
      </div>
    );
  };
export default UserCardWithId;
