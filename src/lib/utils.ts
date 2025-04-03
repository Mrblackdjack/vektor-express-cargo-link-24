
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { format } from "date-fns"
import { OrderStatus } from "@/components/orders/OrderDetailsPanel"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format a date string
 * @param dateString - Date string or Date object
 * @param formatPattern - Optional format pattern (default: dd.MM.yyyy)
 * @returns Formatted date string
 */
export function formatDate(dateString: string | Date, formatPattern: string = "dd.MM.yyyy"): string {
  if (!dateString) return "";
  
  try {
    const date = typeof dateString === "string" ? new Date(dateString) : dateString;
    return format(date, formatPattern);
  } catch (error) {
    console.error("Error formatting date:", error);
    return String(dateString); // Return original value if format fails
  }
}

/**
 * Format a number as currency (rubles)
 * @param amount - Amount to format
 * @returns Formatted currency string
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Get the CSS color class for an order status
 * @param status - Order status
 * @returns Tailwind CSS color class
 */
export function getStatusColor(status: OrderStatus): string {
  switch (status) {
    case "completed":
      return "text-green-600 bg-green-100";
    case "in_progress":
      return "text-blue-600 bg-blue-100";
    case "pending":
      return "text-yellow-600 bg-yellow-100";
    case "cancelled":
      return "text-red-600 bg-red-100";
    default:
      return "text-gray-600 bg-gray-100";
  }
}
