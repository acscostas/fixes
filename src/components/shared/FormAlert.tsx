import { AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

interface FormAlertProps {
  children: React.ReactNode;
  className?: string;
}

export function FormAlert({ children, className }: FormAlertProps) {
  return (
    <div
      className={cn(
        "flex gap-2 rounded-md px-3 py-2.5 text-xs leading-relaxed",
        "bg-[hsl(var(--feedback-warning-bg))] border border-[hsl(var(--feedback-warning-border))] text-[hsl(38,70%,65%)]",
        className
      )}
    >
      <AlertTriangle className="h-3.5 w-3.5 flex-shrink-0 mt-0.5" />
      <span>{children}</span>
    </div>
  );
}
