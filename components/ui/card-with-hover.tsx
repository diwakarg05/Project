"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface CardWithHoverProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: React.ReactNode;
  description?: React.ReactNode;
  footer?: React.ReactNode;
  children?: React.ReactNode;
}

export function CardWithHover({
  title,
  description,
  footer,
  children,
  className,
  ...props
}: CardWithHoverProps) {
  return (
    <motion.div
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className={cn("transition-all duration-200", className)}
      {...props}
    >
      <Card className="h-full border-border/50 shadow-sm hover:shadow-md transition-shadow">
        {(title || description) && (
          <CardHeader>
            {title && <CardTitle>{title}</CardTitle>}
            {description && <CardDescription>{description}</CardDescription>}
          </CardHeader>
        )}
        {children && <CardContent>{children}</CardContent>}
        {footer && <CardFooter>{footer}</CardFooter>}
      </Card>
    </motion.div>
  );
}