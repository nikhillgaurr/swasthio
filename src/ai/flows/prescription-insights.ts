'use server';
/**
 * @fileOverview An AI agent that highlights key information from prescription details.
 *
 * - analyzePrescription - A function that handles the prescription analysis process.
 * - AnalyzePrescriptionInput - The input type for the analyzePrescription function.
 * - AnalyzePrescriptionOutput - The return type for the analyzePrescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzePrescriptionInputSchema = z.object({
  prescriptionDetails: z
    .string()
    .describe('The prescription details to analyze.'),
});
export type AnalyzePrescriptionInput = z.infer<
  typeof AnalyzePrescriptionInputSchema
>;

const AnalyzePrescriptionOutputSchema = z.object({
  dosage: z.string().describe('The prescribed dosage of the medication.'),
  potentialSideEffects: z
    .string()
    .describe('Potential side effects of the medication.'),
  interactions: z
    .string()
    .describe('Potential interactions with other medications.'),
  summary: z.string().describe('A summary of the prescription insights.'),
});
export type AnalyzePrescriptionOutput = z.infer<
  typeof AnalyzePrescriptionOutputSchema
>;

export async function analyzePrescription(
  input: AnalyzePrescriptionInput
): Promise<AnalyzePrescriptionOutput> {
  return analyzePrescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzePrescriptionPrompt',
  input: {schema: AnalyzePrescriptionInputSchema},
  output: {schema: AnalyzePrescriptionOutputSchema},
  prompt: `You are a pharmacist analyzing prescription details.

You will highlight key information such as dosages, potential side effects, and interactions with other medications.

Prescription Details: {{{prescriptionDetails}}}

Based on the prescription details, provide the following information:
- Dosage: What is the prescribed dosage of the medication?
- Potential Side Effects: What are the potential side effects of the medication?
- Interactions: What are the potential interactions with other medications?
- Summary: Provide a concise summary of the prescription insights.

Ensure the output is formatted for easy readability and understanding.
`,
});

const analyzePrescriptionFlow = ai.defineFlow(
  {
    name: 'analyzePrescriptionFlow',
    inputSchema: AnalyzePrescriptionInputSchema,
    outputSchema: AnalyzePrescriptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
