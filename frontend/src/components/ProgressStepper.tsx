import { cn } from "@/lib/utils";

interface ProgressStepperProps {
  currentStep: number;
  totalSteps: number;
  labels?: string[];
}

export const ProgressStepper = ({ currentStep, totalSteps, labels }: ProgressStepperProps) => {
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex items-center justify-between relative">
        {/* Progress line background */}
        <div className="absolute top-4 left-4 right-4 h-1 bg-muted rounded-full" />
        
        {/* Progress line fill */}
        <div 
          className="absolute top-4 left-4 h-1 gradient-hero rounded-full transition-all duration-500 ease-out"
          style={{ width: `calc(${((currentStep - 1) / (totalSteps - 1)) * 100}% - 2rem)` }}
        />

        {Array.from({ length: totalSteps }, (_, i) => {
          const stepNumber = i + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;
          
          return (
            <div key={i} className="flex flex-col items-center relative z-10">
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300",
                  isCompleted && "gradient-hero text-primary-foreground shadow-card",
                  isCurrent && "bg-primary text-primary-foreground shadow-elevated ring-4 ring-primary/20",
                  !isCompleted && !isCurrent && "bg-muted text-muted-foreground"
                )}
              >
                {isCompleted ? (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  stepNumber
                )}
              </div>
              {labels && labels[i] && (
                <span className={cn(
                  "text-xs mt-2 font-medium transition-colors",
                  (isCompleted || isCurrent) ? "text-primary" : "text-muted-foreground"
                )}>
                  {labels[i]}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
