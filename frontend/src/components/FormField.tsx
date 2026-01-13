import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface FormFieldProps {
  label: string;
  children: ReactNode;
  optional?: boolean;
  className?: string;
}

export const FormField = ({ label, children, optional, className }: FormFieldProps) => {
  return (
    <div className={cn("space-y-2", className)}>
      <label className="text-sm font-medium text-foreground flex items-center gap-2">
        {label}
        {optional && (
          <span className="text-xs text-muted-foreground font-normal">(Optional)</span>
        )}
      </label>
      {children}
    </div>
  );
};
