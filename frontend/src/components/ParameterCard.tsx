import { cn } from "@/lib/utils";
import { CheckCircle, AlertCircle, MinusCircle } from "lucide-react";

interface ParameterCardProps {
  title: string;
  status: "positive" | "neutral" | "negative";
  description?: string;
  className?: string;
}

export const ParameterCard = ({ title, status, description, className }: ParameterCardProps) => {
  const getStatusConfig = () => {
    switch (status) {
      case "positive":
        return {
          icon: CheckCircle,
          label: "Positive",
          bgColor: "bg-success/10",
          textColor: "text-success",
          borderColor: "border-success/20",
        };
      case "neutral":
        return {
          icon: MinusCircle,
          label: "Neutral",
          bgColor: "bg-warning/10",
          textColor: "text-warning",
          borderColor: "border-warning/20",
        };
      case "negative":
        return {
          icon: AlertCircle,
          label: "Needs Improvement",
          bgColor: "bg-destructive/10",
          textColor: "text-destructive",
          borderColor: "border-destructive/20",
        };
    }
  };

  const config = getStatusConfig();
  const Icon = config.icon;

  return (
    <div
      className={cn(
        "bg-card rounded-2xl p-6 shadow-card border-2 transition-all duration-300 hover:shadow-elevated",
        config.borderColor,
        className
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h3 className="font-display font-semibold text-lg text-foreground">{title}</h3>
          {description && (
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
          )}
        </div>
        <div className={cn("flex items-center gap-2 px-3 py-1.5 rounded-full", config.bgColor)}>
          <Icon className={cn("w-4 h-4", config.textColor)} />
          <span className={cn("text-sm font-medium", config.textColor)}>{config.label}</span>
        </div>
      </div>
    </div>
  );
};
