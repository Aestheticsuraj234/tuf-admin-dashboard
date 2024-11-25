import Header from "@/components/shared/header";
import { getAllUser } from "@/features/user-management/actions";
import { UserClient } from "@/features/user-management/components/client";
import UserInfoCard from "@/features/user-management/components/user-info-card";
import { UserRole } from "@prisma/client";
import { CrownIcon, ShieldEllipsis, User2Icon, UserIcon } from "lucide-react";
import React from "react";

const UserManagementPage = async () => {
  const allusers = await getAllUser();

  const { totalAdmins, totalRegularUsers, totalPremiumUsers } = allusers.reduce(
    (acc, user) => {
      if (user.role === UserRole.ADMIN) acc.totalAdmins += 1;
      if (user.role === UserRole.USER) acc.totalRegularUsers += 1; // Fixed capitalization
      if (user.role === UserRole.PREMIUM_USER) acc.totalPremiumUsers += 1;
      return acc; // Always return the accumulator in reduce
    },
    { totalAdmins: 0, totalRegularUsers: 0, totalPremiumUsers: 0 } // Fixed capitalization
  );


  const formattedUsers = allusers.map((user)=>{
    return{
        id:user.id,
        name:user.name,
        email:user.email,
        image:user.image,
        role:user.role,
        createdAt:user.createdAt

    }
  })

  return (
    <main className="px-4 py-4 flex flex-col">
      <Header
        title="User Mangement"
        description="Manage All users in the system"
      />

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4 mt-10 mx-10">
        <UserInfoCard
          title="Total Users"
          numberOfPeople={allusers.length}
          Icon={UserIcon}
          backgroundColor="#90ee90"
        />
        <UserInfoCard
          title="Total Admins"
          numberOfPeople={totalAdmins}
          Icon={ShieldEllipsis}
          backgroundColor="#ff6347"
        />
        <UserInfoCard
          title="Total Regular Users"
          numberOfPeople={totalRegularUsers}
          Icon={User2Icon}
          backgroundColor="#87cefa"
        />

        <UserInfoCard
          title="Total Premium Users"
          numberOfPeople={totalPremiumUsers}
          Icon={CrownIcon}
          backgroundColor="#9966ff"
        />
      </div>

    <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
            <UserClient data={formattedUsers}/>
        </div>
    </div>

    </main>
  );
};

export default UserManagementPage;
