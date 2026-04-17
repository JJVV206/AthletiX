import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function createId(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
}

export function formatDuration(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
}

export function formatLongDuration(totalSeconds: number) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return [hours, minutes, seconds]
    .map((value) => value.toString().padStart(2, "0"))
    .join(":");
}

export function formatNumber(value: number) {
  return new Intl.NumberFormat("en-US").format(value);
}

export function formatWeight(value: number) {
  return `${value.toFixed(1)} kg`;
}

export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}
