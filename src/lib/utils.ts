import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function successResponse(payload:object){
  return new Response(JSON.stringify(payload),{
    status:200,
    headers:{"content-type":"application/json"}
  })
}


export function errorResponse(message:string,status=400){
  return new Response(
    JSON.stringify({
    error:message,
  }),
  {
    status,
    headers:{"content-type":"appliction/json"},
  },
)
}