'use client';
import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Pill, Sparkles, LoaderCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';

function SubmitButton({ isLoading }: { isLoading: boolean }) {
  return (
    <Button type="submit" disabled={isLoading}>
      {isLoading ? <LoaderCircle className="animate-spin mr-2" /> : <Sparkles className="mr-2" />}
      Get Insights
    </Button>
  );
}

const InsightSection = ({ title, content, badgeVariant }: { title: string; content: string; badgeVariant: "default" | "secondary" | "destructive" | "outline" }) => (
    <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ ease: "easeOut" }}>
        <Badge variant={badgeVariant} className="mb-2">{title}</Badge>
        <p className="text-sm text-foreground/80">{content}</p>
    </motion.div>
)

export function PrescriptionInsights() {
  const [insights, setInsights] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  const dummyPrescription = `Medication: Amoxicillin 500mg capsules.
Instructions: Take one capsule every 8 hours for 7 days. Finish all medication even if you feel better.
Doctor: Dr. Emily Carter.
Pharmacy: Wellness Pharmacy.`;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate AI processing for demo
    setTimeout(() => {
      setInsights({
        dosage: "Take one 500mg capsule every 8 hours (three times daily) for 7 days",
        potentialSideEffects: "Common side effects may include nausea, diarrhea, stomach upset, and allergic reactions",
        interactions: "May interact with blood thinners and birth control pills. Avoid alcohol during treatment",
        summary: "Amoxicillin is an antibiotic used to treat bacterial infections. Complete the full course even if symptoms improve"
      });
      setIsLoading(false);
    }, 2000);
  };

  return (
    <Card className="col-span-1 md:col-span-1 row-span-1 rounded-2xl border-white/20 bg-white/10 p-0 shadow-lg backdrop-blur-2xl dark:border-white/10 dark:bg-black/10">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
            <Pill className="w-6 h-6 text-primary" />
          </div>
          <div>
            <CardTitle className="text-xl font-bold text-foreground">Prescription Insights</CardTitle>
            <p className="text-sm text-muted-foreground">Understand your medication.</p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="px-6 pb-6">
        <div className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
            <Textarea
                name="prescription"
                placeholder="Paste prescription details here..."
                className="min-h-[120px] bg-background/50 dark:bg-black/20"
                defaultValue={dummyPrescription}
            />
            <SubmitButton isLoading={isLoading} />
            </form>

            <AnimatePresence>
            {insights && (
                <motion.div 
                className="space-y-4 pt-4"
                initial="hidden"
                animate="visible"
                transition={{ staggerChildren: 0.1 }}
                >
                <h3 className="font-semibold text-foreground">AI Insights:</h3>
                <InsightSection title="Dosage" content={insights.dosage} badgeVariant="default" />
                <InsightSection title="Potential Side Effects" content={insights.potentialSideEffects} badgeVariant="destructive" />
                <InsightSection title="Interactions" content={insights.interactions} badgeVariant="secondary" />
                <InsightSection title="Summary" content={insights.summary} badgeVariant="outline" />
                </motion.div>
            )}
            </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  );
}
