import { read } from "fs";

export const slugify = (...args: (string | number)[]): string => {
    const value = args.join(' ')
  
    return value
        .normalize('NFD') // split an accented letter in the base letter and the acent
        .replace(/[\u0300-\u036f]/g, '') // remove all previously split accents
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9 ]/g, '') // remove all chars not letters, numbers and spaces (to be replaced)
        .replace(/\s+/g, '-') // separator
  }
  

  export const calculateReadTime = (content:string)=>{
    const wordsPerMinute = 200;

    const words = content.trim().split(/\s+/)

    const numberOfWords = words.length;

    const readingTime = Math.ceil(numberOfWords / wordsPerMinute)
    
    const minReadingTime = 1;

    return readingTime < minReadingTime ? minReadingTime : readingTime
  }