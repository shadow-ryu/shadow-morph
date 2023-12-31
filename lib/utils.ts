import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isBase64Image(imageData: string) {
  const base64Regex = /^data:image\/(png|jpe?g|gif|webp);base64,/;
  return base64Regex.test(imageData);
}
export   const generateLocalURl = (file: any) => {
  if (!file) return;
  return URL.createObjectURL(file);
};
export const upperCaseFirstChar=(string:string)=>{
  return string.charAt(0).toUpperCase() + string.slice(1);
}
export function formatDateString(dateString: string) {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString(undefined, options);

  const time = date.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });

  return `${time} - ${formattedDate}`;
}

export const generateResponse=({status=404,success=false,data={},err=true,message=""})=>{
  return {
    data,
    message,
    success,
    status,err
  }

}