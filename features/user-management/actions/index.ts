"use server";
import { currentUser, getUserById } from "@/features/auth/actions";
import { db } from "@/lib/db/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { EditUserSchema } from "../schema";

export const getAllUser = async () => {
  const allusers = await db.user.findMany();

  return allusers;
};

export const onDeleteUser = async (userId: string) => {
  const user = await currentUser();

  if (user?.role !== "ADMIN") {
    throw new Error("Not Authorize");
  }

  const existingUser = await db.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!existingUser) {
    throw new Error("User does not Available");
  }

  await db.user.delete({
    where: {
      id: userId,
    },
  });

  revalidatePath("/user-management", "page");
};

export const UpdateUser = async (
  values: z.infer<typeof EditUserSchema>,
  userId: string
) => {
  const user = await currentUser();

  if (user?.role !== "ADMIN") {
    throw new Error("Unauthorize for this action");
  }

  const existingUser = await getUserById(userId);

  if (!existingUser) {
    throw new Error("User not Found");
  }

  const { role, name } = values;
 const updateUser =  await db.user.update({
    where: {
      id: userId,
    },
    data: {
      name,
      role,
    },
  });

  return {
    success:true,
    message:"User Updated Successfully",
    data:updateUser
  }
};
