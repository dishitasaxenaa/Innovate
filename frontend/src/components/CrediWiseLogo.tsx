import { Shield } from "lucide-react";

export const CrediWiseLogo = () => {
  return (
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 rounded-xl gradient-hero flex items-center justify-center shadow-card">
        <Shield className="w-6 h-6 text-primary-foreground" />
      </div>
      <div>
        <h1 className="text-2xl font-display font-bold text-foreground tracking-tight">
          CrediWise
        </h1>
        <p className="text-xs text-muted-foreground font-medium">
          Responsible Credit Evaluation
        </p>
      </div>
    </div>
  );
};
