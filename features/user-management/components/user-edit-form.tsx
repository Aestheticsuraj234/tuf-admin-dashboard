"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import React, { useState } from "react";
import { EditUserSchema } from "../schema";
import { UserRole } from "@prisma/client";
import Hint from "@/components/shared/hint";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { UpdateUser } from "../actions";

// TODO: CHANGE THE PROPS TYPE OF USERS LATER.
const UserEditForm = ({ user }: any) => {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  const form = useForm<z.infer<typeof EditUserSchema>>({
    resolver: zodResolver(EditUserSchema),
    defaultValues: {
      name: user.name || "",
      role: user.role || UserRole.USER,
    },
  });

  async function onSubmit(values: z.infer<typeof EditUserSchema>) {
    try {
      setIsPending(true);
      const updatedUser = await UpdateUser(values, user.id);
      console.log(updatedUser);
      toast("User Updated Successfully✅");
    } catch (error) {
      console.log(error);
      toast("Something Went Wrong❌");
    } finally {
      setIsPending(false);
    }
  }

  const onBack = () => {
    router.back();
  };

  return (
    <>
      <Hint
        label="Go Back"
        side="right"
        align="center"
        sideOffset={18}
        alignOffset={18}
      >
        <Button
          onClick={onBack}
          variant={"outline"}
          size={"icon"}
          className="flex justify-center items-center px-2 py-2 rounded-md"
        >
          <ArrowLeft size={24} />
        </Button>
      </Hint>

      <div className="px-4 py-4 mt-5 flex flex-col justify-center items-center">
        <Card className="w-[600px]">
          <CardHeader>
            <p className="text-2xl font-semibold text-center"> ⚙️Settings</p>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <div>
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                            disabled={isPending}
                            placeholder="Jhon Doe"
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div>
                  <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Role</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            disabled={isPending}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select a Role" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value={UserRole.ADMIN}>
                                Admin
                              </SelectItem>
                              <SelectItem value={UserRole.USER}>
                                User
                              </SelectItem>
                              <SelectItem value={UserRole.PREMIUM_USER}>
                                Premium User
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button disabled={isPending} type="submit">
                  Save
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default UserEditForm;
