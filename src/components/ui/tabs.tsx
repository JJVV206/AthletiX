import type React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "@/lib/utils";

export const Tabs = TabsPrimitive.Root;

export const TabsList = ({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) => (
  <TabsPrimitive.List
    className={cn(
      "inline-flex h-14 w-full items-center justify-center rounded-[26px] bg-muted p-1 text-muted-foreground",
      className,
    )}
    {...props}
  />
);

export const TabsTrigger = ({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) => (
  <TabsPrimitive.Trigger
    className={cn(
      "inline-flex flex-1 items-center justify-center rounded-[22px] px-4 py-3 text-sm font-semibold transition-all data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-soft",
      className,
    )}
    {...props}
  />
);

export const TabsContent = ({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) => (
  <TabsPrimitive.Content className={cn("mt-6", className)} {...props} />
);
