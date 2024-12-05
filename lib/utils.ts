import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import {format} from "date-fns"
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const formatDateTime = (date:Date)=>{
  return format(date , "PPpp")
}

export const formatDate = (date:Date)=>{
  return format(date , "PPP")
}