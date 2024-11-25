import { getUserById } from "@/features/auth/actions";
import UserEditForm from "@/features/user-management/components/user-edit-form";
import React from "react";

const UserEditPage = async (props: { params: Promise<{ userId: string }> }) => {
  const params = await props.params;

  const User = await getUserById(params.userId)



  return (
    <div className="px-4 py-4 mt-5 flex flex-col">
        <UserEditForm
        user={User}
        />
    </div>
  )
};

export default UserEditPage;
