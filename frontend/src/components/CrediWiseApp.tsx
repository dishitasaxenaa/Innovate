import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CrediWiseLogo } from "@/components/CrediWiseLogo";
import { FormField } from "@/components/FormField";
import { Loader2, Shield, Eye, Target, TrendingUp, Leaf, Percent } from "lucide-react";

interface FormData {
  bankName: string;
  accountNumber: string;
  ifscCode: string;
  panNumber: string;
  educationLevel: string;
}

interface BackendResults {
  crediScore: number;
  interestRate: number;
  greenScore: number;
}

// Simulated backend API call
const simulateBackendCall = async (data: {
  bank_name: string;
  account_number: string;
  ifsc: string;
  pan_number: string;
  education_level: string;
}): Promise<BackendResults> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1500));
  
  // Return simulated backend response
  return {
    crediScore: 710,
    interestRate: 8.5,
    greenScore: 85,
  };
};

const CrediWiseApp = () => {
  const [formData, setFormData] = useState<FormData>({
    bankName: "",
    accountNumber: "",
    ifscCode: "",
    panNumber: "",
    educationLevel: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<BackendResults | null>(null);

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setResults(null);

    try {
      // Prepare data for backend API
      const apiPayload = {
        bank_name: formData.bankName,
        account_number: formData.accountNumber,
        ifsc: formData.ifscCode,
        pan_number: formData.panNumber,
        education_level: formData.educationLevel,
      };

      // Send to backend (simulated)
      const backendResults = await simulateBackendCall(apiPayload);
      setResults(backendResults);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = 
    formData.bankName && 
    formData.accountNumber && 
    formData.ifscCode && 
    formData.panNumber && 
    formData.educationLevel;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-center">
          <CrediWiseLogo />
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-2xl mx-auto">
          <div className="space-y-8">
            <div className="text-center space-y-3">
              <h2 className="text-3xl font-display font-bold text-foreground">Welcome to CrediWise</h2>
              <p className="text-muted-foreground text-lg max-w-lg mx-auto">
                A responsible credit evaluation framework designed for students and first-time earners.
              </p>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap justify-center gap-4 py-4">
              {[
                { icon: Shield, label: "Secure & Private" },
                { icon: Eye, label: "Transparent" },
                { icon: Target, label: "Fair Evaluation" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-accent text-accent-foreground text-sm font-medium"
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </div>
              ))}
            </div>

            {/* Form */}
            <div className="bg-card rounded-2xl p-6 md:p-8 shadow-card border border-border space-y-6">
              <h3 className="font-display font-semibold text-lg text-foreground">Your Details</h3>
              
              <div className="grid gap-5">
                <FormField label="Bank Name">
                  <Select value={formData.bankName} onValueChange={(v) => updateFormData("bankName", v)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your bank" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sbi">State Bank of India (SBI)</SelectItem>
                      <SelectItem value="hdfc">HDFC Bank</SelectItem>
                      <SelectItem value="icici">ICICI Bank</SelectItem>
                      <SelectItem value="axis">Axis Bank</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </FormField>

                <FormField label="Account Number">
                  <Input
                    placeholder="Enter your account number"
                    value={formData.accountNumber}
                    onChange={(e) => updateFormData("accountNumber", e.target.value)}
                  />
                </FormField>

                <FormField label="IFSC Code">
                  <Input
                    placeholder="e.g., SBIN0001234"
                    value={formData.ifscCode}
                    onChange={(e) => updateFormData("ifscCode", e.target.value.toUpperCase())}
                  />
                </FormField>

                <FormField label="PAN Number">
                  <Input
                    placeholder="e.g., ABCDE1234F"
                    value={formData.panNumber}
                    onChange={(e) => updateFormData("panNumber", e.target.value.toUpperCase())}
                    maxLength={10}
                  />
                </FormField>

                <FormField label="Highest Education Pursued / Pursuing">
                  <Select value={formData.educationLevel} onValueChange={(v) => updateFormData("educationLevel", v)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select education level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high-school">High School</SelectItem>
                      <SelectItem value="diploma">Diploma</SelectItem>
                      <SelectItem value="bachelors">Bachelor's Degree</SelectItem>
                      <SelectItem value="masters">Master's Degree</SelectItem>
                      <SelectItem value="doctorate">Doctorate</SelectItem>
                    </SelectContent>
                  </Select>
                </FormField>
              </div>

              <Button 
                variant="hero" 
                size="lg" 
                className="w-full"
                onClick={handleSubmit}
                disabled={!isFormValid || isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Submit"
                )}
              </Button>
            </div>

            {/* Results Section */}
            {results && (
              <div className="animate-fade-in space-y-6">
                <div className="text-center space-y-2">
                  <h3 className="text-2xl font-display font-bold text-foreground">Your CrediWise Results</h3>
                  <p className="text-muted-foreground">Generated by our backend evaluation system</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Credi Score Card */}
                  <div className="bg-card rounded-2xl p-6 shadow-card border border-border text-center space-y-3">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                      <TrendingUp className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Credi Score</p>
                      <p className="text-4xl font-bold text-foreground">{results.crediScore}</p>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-destructive via-warning to-success rounded-full transition-all duration-1000"
                        style={{ width: `${(results.crediScore / 900) * 100}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">Out of 900</p>
                  </div>

                  {/* Interest Rate Card */}
                  <div className="bg-card rounded-2xl p-6 shadow-card border border-border text-center space-y-3">
                    <div className="w-12 h-12 rounded-full bg-secondary/50 flex items-center justify-center mx-auto">
                      <Percent className="w-6 h-6 text-foreground" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Interest Rate</p>
                      <p className="text-4xl font-bold text-foreground">{results.interestRate}%</p>
                    </div>
                    <p className="text-xs text-muted-foreground">Recommended rate based on your profile</p>
                  </div>

                  {/* Green Score Card */}
                  <div className="bg-card rounded-2xl p-6 shadow-card border border-border text-center space-y-3">
                    <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center mx-auto">
                      <Leaf className="w-6 h-6 text-success" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Green Score</p>
                      <p className="text-4xl font-bold text-success">{results.greenScore}</p>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-success rounded-full transition-all duration-1000"
                        style={{ width: `${results.greenScore}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">Sustainability rating</p>
                  </div>
                </div>
              </div>
            )}

            {/* Disclaimer */}
            <div className="bg-accent/50 rounded-xl p-4 flex items-start gap-3">
              <Shield className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <p className="text-sm text-muted-foreground">
                This is a conceptual prototype. No real banking data is processed or stored. 
                All information entered is for demonstration purposes only.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 py-6 mt-auto">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p className="flex items-center justify-center gap-2">
            <Shield className="w-4 h-4" />
            CrediWise — Conceptual Prototype for Fair Credit Evaluation
          </p>
        </div>
      </footer>
    </div>
  );
};

export default CrediWiseApp;
