'use client';

import { useEffect, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, FileText, Volume2, LoaderCircle } from 'lucide-react';
import { getHealthSummary } from '@/app/actions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
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
      Generate Summary
    </Button>
  );
}

export function HealthSummary() {
  const [state, formAction] = useFormState(getHealthSummary, initialState);
  const [summaryText, setSummaryText] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    if (state.data?.summary) {
      setSummaryText(state.data.summary);
    }
    if (state.error) {
        toast({
            variant: "destructive",
            title: "Error",
            description: state.error,
        })
    }
  }, [state, toast]);

  const handleReadAloud = () => {
    if ('speechSynthesis' in window && summaryText) {
      const utterance = new SpeechSynthesisUtterance(summaryText);
      window.speechSynthesis.speak(utterance);
    }
  };
  
  const dummyRecords = `Patient: John Doe, DOB: 1985-05-15.
Last check-up: 2023-11-20. Blood pressure: 122/81 mmHg. Cholesterol: Total 190 mg/dL.
Allergies: Penicillin.
Medications: Lisinopril 10mg daily for hypertension.
Notes: Patient reports occasional knee pain after exercise. Recommended physical therapy.`;

  return (
    <Card className="col-span-1 md:col-span-2 row-span-2 rounded-2xl border-white/20 bg-white/10 p-0 shadow-lg backdrop-blur-2xl dark:border-white/10 dark:bg-black/10">
      <CardHeader>
        <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-primary" />
            </div>
            <div>
                <CardTitle className="text-xl font-bold text-foreground">AI Health Summary</CardTitle>
                <p className="text-sm text-muted-foreground">Get a clear overview of your health records.</p>
            </div>
            </div>
            {summaryText && (
            <Button variant="ghost" size="icon" onClick={handleReadAloud} aria-label="Read summary aloud" className="bg-white/10 hover:bg-white/20">
                <Volume2 />
            </Button>
            )}
        </div>
      </CardHeader>

      <CardContent className="px-6 pb-6">
        <div className="space-y-4">
            <form action={formAction} className="space-y-4">
            <Textarea
                name="records"
                placeholder="Paste health records here..."
                className="min-h-[150px] bg-background/50 dark:bg-black/20"
                defaultValue={dummyRecords}
            />
            <SubmitButton />
            </form>

            <AnimatePresence>
            {summaryText && (
                <motion.div
                initial={{ opacity: 0, filter: 'blur(10px)' }}
                animate={{ opacity: 1, filter: 'blur(0px)' }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                className="prose prose-sm dark:prose-invert max-w-none rounded-lg bg-primary/5 p-4 mt-4"
                >
                <h3 className="font-semibold text-foreground">Summary:</h3>
                <p className="text-foreground/80">{summaryText}</p>
                </motion.div>
            )}
            </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  );
}
