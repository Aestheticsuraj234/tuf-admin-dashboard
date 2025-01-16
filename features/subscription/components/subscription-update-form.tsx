"use client";
import React, { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PLAN, SubscriptionStatus, User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { UpdateSubscriptionSchema } from "../schema";
import { toast } from "sonner";
import Hint from "@/components/shared/hint";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, CalendarIcon } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { update_subscription } from "../actions";

interface SubscribedUserInterface {
  id: string;
  user: User;
  plan: PLAN;
  status: SubscriptionStatus;
  startDate: Date;
  endDate: Date;
}

const SubscriptionUpdateForm = ({
  subscribedUser,
}: {
  subscribedUser: SubscribedUserInterface;
}) => {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  const form = useForm<z.infer<typeof UpdateSubscriptionSchema>>({
    resolver: zodResolver(UpdateSubscriptionSchema),
    defaultValues: {
      plan: subscribedUser.plan,
      status: subscribedUser.status,
      startDate: subscribedUser.startDate,
      endDate: subscribedUser.endDate,
    },
  });

  async function onSubmit(values: z.infer<typeof UpdateSubscriptionSchema>) {
    try {
      setIsPending(true)
      const UpdatedsubscribedUser = await update_subscription(values , subscribedUser.id);
      console.log(UpdatedsubscribedUser)
      toast("Subscription Added Successfully")
      form.reset()
    } catch (error) {
      console.error((error as Error).message)
      toast("Something went wrong")
    }
    finally{
      setIsPending(false)
    }
  }

  const onBack = () => {
    router.back();
  };
  return (
    <>
      <Hint label={"Go Back"} side="right" align="start" sideOffset={18}>
        <Button
          onClick={onBack}
          variant={"outline"}
          size={"icon"}
          className="flex justify-center items-center px-2 py-2 rounded-md"
        >
          <ArrowLeftIcon size={24} />
        </Button>
      </Hint>

      <div className="px-4 py-4 mt-5 flex flex-col justify-center items-center">
        <Card className="w-[600px]">
          <CardHeader>
            <div className="flex flex-col items-center justify-center w-full mt-4 mb-4 ">
              <Button
                variant={"outline"}
                size={"lg"}
                className="flex px-4 py-4 flex-row items-center justify-center gap-x-4"
              >
                <img
                  src={subscribedUser.user.image!}
                  width={40}
                  height={40}
                  alt={subscribedUser.user.name!}
                  className="rounded-full object-contain my-3"
                />
                <span
                  className="text-xl font-bold text-zinc-800 dark:text-zinc-100
                "
                >
                  {subscribedUser.user.name}
                </span>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                className="space-y-6"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <FormField
                  control={form.control}
                  name="plan"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Plan</FormLabel>
                      <FormControl>
                        <Select
                          disabled={isPending}
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          value={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a Plan" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value={PLAN.PREMIUM}>
                              Premium
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <FormControl>
                        <Select
                          disabled={isPending}
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value={SubscriptionStatus.ACTIVE}>
                              Active
                            </SelectItem>
                            <SelectItem value={SubscriptionStatus.INACTIVE}>
                              Inactive
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex flex-row items-center justify-between w-full">
                  <FormField
                    control={form.control}
                    name="startDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Start Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-[240px] pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a Start Date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date > new Date() ||
                                date < new Date("1900-01-01")
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="endDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>End Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-[240px] pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick an End Date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) => {
                                const startDateValue =
                                  form.getValues("startDate");
                                const startDate = new Date(startDateValue!);
                                if (isNaN(startDate.getTime())) return true;

                                const minDate = startDate;
                                const maxDate = new Date(startDate);
                                maxDate.setDate(startDate.getDate() + 30);

                                return date < minDate || date > maxDate;
                              }}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button type="submit" disabled={isPending}>
                  Update
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default SubscriptionUpdateForm;
