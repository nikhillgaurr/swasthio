'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, FileText, Volume2, LoaderCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

function SubmitButton({ isLoading }: { isLoading: boolean }) {
  return (
    <Button type="submit" disabled={isLoading}>
      {isLoading ? <LoaderCircle className="animate-spin mr-2" /> : <Sparkles className="mr-2" />}
      Generate Summary
    </Button>
  );
}

export function HealthSummary() {
  const [summaryText, setSummaryText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate AI processing for demo
    setTimeout(() => {
      setSummaryText("Based on the health records provided, the patient appears to be in good overall health with well-controlled hypertension. Blood pressure readings are within acceptable range with current medication. Cholesterol levels are optimal. The knee pain after exercise may benefit from physical therapy as recommended. Continue current medication regimen and follow up as scheduled.");
      setIsLoading(false);
    }, 2000);
  };

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
            <form onSubmit={handleSubmit} className="space-y-4">
            <Textarea
                name="records"
                placeholder="Paste health records here..."
                className="min-h-[150px] bg-background/50 dark:bg-black/20"
                defaultValue={dummyRecords}
            />
            <SubmitButton isLoading={isLoading} />
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
