import { UserRole } from "@prisma/client";
import { z } from "zod";

export const EditUserSchema = z.object({
    name:z.string().optional(),
    role:z.enum([UserRole.ADMIN , UserRole.PREMIUM_USER , UserRole.USER])
})