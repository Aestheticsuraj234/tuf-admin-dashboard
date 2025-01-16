import { PLAN, SubscriptionStatus } from "@prisma/client";
import { z } from "zod";

export const SubscriptionSchema = z.object({
    userId:z.string().optional(),
    plan:z.nativeEnum(PLAN).optional(),
    startDate:z.date().optional(),
    endDate:z.date().optional(),
})

export const UpdateSubscriptionSchema = z.object({
    plan:z.enum([PLAN.PREMIUM]).optional(),
    status:z.nativeEnum(SubscriptionStatus).optional(),
    startDate:z.date().optional(),
    endDate:z.date().optional(),
  
  })