import { cn } from "@/lib/utils";

interface ScoreGaugeProps {
  score: number;
  maxScore?: number;
  className?: string;
}

export const ScoreGauge = ({ score, maxScore = 900, className }: ScoreGaugeProps) => {
  const percentage = (score / maxScore) * 100;
  
  const getScoreColor = () => {
    if (percentage >= 70) return "text-score-excellent";
    if (percentage >= 50) return "text-score-good";
    if (percentage >= 30) return "text-score-neutral";
    return "text-score-poor";
  };

  const getScoreLabel = () => {
    if (percentage >= 70) return "Excellent";
    if (percentage >= 50) return "Good";
    if (percentage >= 30) return "Fair";
    return "Needs Improvement";
  };

  // SVG Arc calculation
  const radius = 120;
  const strokeWidth = 16;
  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = normalizedRadius * Math.PI; // Half circle
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className={cn("flex flex-col items-center", className)}>
      <div className="relative">
        <svg
          width={radius * 2}
          height={radius + 20}
          className="transform -rotate-0"
        >
          {/* Background arc */}
          <path
            d={`M ${strokeWidth / 2} ${radius} A ${normalizedRadius} ${normalizedRadius} 0 0 1 ${radius * 2 - strokeWidth / 2} ${radius}`}
            fill="none"
            stroke="hsl(var(--muted))"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
          
          {/* Gradient definition */}
          <defs>
            <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(var(--score-poor))" />
              <stop offset="50%" stopColor="hsl(var(--score-neutral))" />
              <stop offset="100%" stopColor="hsl(var(--score-excellent))" />
            </linearGradient>
          </defs>
          
          {/* Progress arc */}
          <path
            d={`M ${strokeWidth / 2} ${radius} A ${normalizedRadius} ${normalizedRadius} 0 0 1 ${radius * 2 - strokeWidth / 2} ${radius}`}
            fill="none"
            stroke="url(#scoreGradient)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-1000 ease-out"
            style={{
              animation: "score-fill 1.5s ease-out forwards",
            }}
          />
        </svg>
        
        {/* Score display */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pt-8">
          <span className={cn("text-6xl font-display font-bold", getScoreColor())}>
            {score}
          </span>
          <span className="text-muted-foreground text-sm mt-1">out of {maxScore}</span>
        </div>
      </div>
      
      {/* Score label */}
      <div className={cn(
        "mt-4 px-6 py-2 rounded-full font-semibold text-lg",
        percentage >= 70 && "bg-success/10 text-success",
        percentage >= 50 && percentage < 70 && "bg-success/10 text-score-good",
        percentage >= 30 && percentage < 50 && "bg-warning/10 text-warning",
        percentage < 30 && "bg-destructive/10 text-destructive"
      )}>
        {getScoreLabel()}
      </div>
    </div>
  );
};
