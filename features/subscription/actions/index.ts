"use server";
import * as z from "zod";
import { SubscriptionSchema, UpdateSubscriptionSchema } from "../schema";
import { currentUser } from "@/features/auth/actions";
import { db } from "@/lib/db/db";
import { PLAN, SubscriptionStatus, UserRole } from "@prisma/client";
import { Vidaloka } from "next/font/google";
import { revalidatePath } from "next/cache";

export const create_subscription = async (
  values: z.infer<typeof SubscriptionSchema>
) => {
  const user = await currentUser();

  if (user?.role !== "ADMIN") {
    throw new Error("You are not a admin");
  }

  if (values.userId === user.id) {
    throw new Error("Admin you need not to subscribe to a plan");
  }

  // subscription
  const subscriber = await db.subscription.create({
    data: {
      user: {
        connect: {
          id: values.userId,
        },
      },
      plan: values.plan as PLAN,
      startDate: values.startDate,
      endDate: values.endDate,
    },
  });

  // premium_user

  await db.user.update({
    where: {
      id: values.userId,
    },
    data: {
      role: UserRole.PREMIUM_USER,
    },
  });

  revalidatePath("/subscription-management", "page");

  return {
    success: true,
    message: "User created successfully",
    data: subscriber,
  };
};

export const onDeleteSubscription = async (id: string) => {
  const user = await currentUser();

  if (user?.role !== "ADMIN") {
    throw new Error("You are not a admin");
  }

  const subscription = await db.subscription.findUnique({
    where: {
      id,
    },
    select: {
      userId: true,
    },
  });

  if (!subscription) {
    throw new Error("Not Found: Subscription not found");
  }

  await db.user.update({
    where: {
      id: subscription.userId,
    },
    data: {
      role: "USER",
    },
  });

  await db.subscription.delete({
    where: {
      id,
    },
  });

  revalidatePath("/subscription-management", "page");
  return {
    success: true,
    message: "Subscription Deleted successfully",
  };
};

export const update_subscription = async (
  values: z.infer<typeof UpdateSubscriptionSchema>,
  id: string
) => {
  const user = await currentUser();

  if (user?.role !== "ADMIN") {
    throw new Error("You are not a admin");
  }
  const subscription = await db.subscription.findUnique({
    where: {
      id,
    },
    select: {
      userId: true,
    },
  });

  if (!subscription) {
    throw new Error("Not Found: Subscription not found");
  }

  const updatedSubscriber = await db.subscription.update({
    where: { id },
    data: {
      plan: values.plan as PLAN,
      status: values.status as SubscriptionStatus,
      startDate: values.startDate,
      endDate: values.endDate,
    },
  });
  revalidatePath("/subscription-management");

  return {
    success: true,
    message: "Subscription updated successfully",
    data: updatedSubscriber,
  };
};
