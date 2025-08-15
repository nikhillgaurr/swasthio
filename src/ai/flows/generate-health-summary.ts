'use server';

/**
 * @fileOverview A health record summarization AI agent.
 *
 * - generateHealthSummary - A function that handles the health record summarization process.
 * - GenerateHealthSummaryInput - The input type for the generateHealthSummary function.
 * - GenerateHealthSummaryOutput - The return type for the generateHealthSummary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateHealthSummaryInputSchema = z.object({
  healthRecordsDataUri: z
    .string()
    .describe(
      'The health records as a data URI that must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.'    ),
});
export type GenerateHealthSummaryInput = z.infer<typeof GenerateHealthSummaryInputSchema>;

const GenerateHealthSummaryOutputSchema = z.object({
  summary: z.string().describe('A concise and easy-to-understand summary of the user\'s overall health status.'),
});
export type GenerateHealthSummaryOutput = z.infer<typeof GenerateHealthSummaryOutputSchema>;

export async function generateHealthSummary(input: GenerateHealthSummaryInput): Promise<GenerateHealthSummaryOutput> {
  return generateHealthSummaryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateHealthSummaryPrompt',
  input: {schema: GenerateHealthSummaryInputSchema},
  output: {schema: GenerateHealthSummaryOutputSchema},
  prompt: `You are an AI assistant specialized in summarizing health records.

  Please provide a concise and easy-to-understand summary of the user's overall health status based on the following health records.

  Health Records: {{healthRecordsDataUri}}`,
});

const generateHealthSummaryFlow = ai.defineFlow(
  {
    name: 'generateHealthSummaryFlow',
    inputSchema: GenerateHealthSummaryInputSchema,
    outputSchema: GenerateHealthSummaryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
