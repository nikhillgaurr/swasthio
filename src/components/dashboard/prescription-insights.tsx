'use client';
import { useEffect } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Pill, Sparkles, LoaderCircle } from 'lucide-react';
import { getPrescriptionInsights } from '@/app/actions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

const initialState = {
  error: null,
  data: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? <LoaderCircle className="animate-spin mr-2" /> : <Sparkles className="mr-2" />}
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
  const [state, formAction] = useFormState(getPrescriptionInsights, initialState);
  const { toast } = useToast();
  
  const dummyPrescription = `Medication: Amoxicillin 500mg capsules.
Instructions: Take one capsule every 8 hours for 7 days. Finish all medication even if you feel better.
Doctor: Dr. Emily Carter.
Pharmacy: Wellness Pharmacy.`;

  useEffect(() => {
    if (state.error) {
        toast({
            variant: "destructive",
            title: "Error",
            description: state.error,
        })
    }
  }, [state, toast]);

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
            <form action={formAction} className="space-y-4">
            <Textarea
                name="prescription"
                placeholder="Paste prescription details here..."
                className="min-h-[120px] bg-background/50 dark:bg-black/20"
                defaultValue={dummyPrescription}
            />
            <SubmitButton />
            </form>

            <AnimatePresence>
            {state.data && (
                <motion.div 
                className="space-y-4 pt-4"
                initial="hidden"
                animate="visible"
                transition={{ staggerChildren: 0.1 }}
                >
                <h3 className="font-semibold text-foreground">AI Insights:</h3>
                <InsightSection title="Dosage" content={state.data.dosage} badgeVariant="default" />
                <InsightSection title="Potential Side Effects" content={state.data.potentialSideEffects} badgeVariant="destructive" />
                <InsightSection title="Interactions" content={state.data.interactions} badgeVariant="secondary" />
                <InsightSection title="Summary" content={state.data.summary} badgeVariant="outline" />
                </motion.div>
            )}
            </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  );
}
