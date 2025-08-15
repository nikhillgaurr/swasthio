'use server';

// Disable server actions for static export
if (process.env.NODE_ENV === 'production') {
  throw new Error('Server actions are not supported in static export mode');
}

import { generateHealthSummary } from '@/ai/flows/generate-health-summary';
import { analyzePrescription } from '@/ai/flows/prescription-insights';
import { z } from 'zod';
import { Resend } from 'resend';

const healthSummarySchema = z.object({
    records: z.string().min(1, 'Health records cannot be empty.'),
});

const prescriptionSchema = z.object({
    prescription: z.string().min(1, 'Prescription details cannot be empty.'),
});

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

export async function getHealthSummary(prevState: any, formData: FormData) {
  const validatedFields = healthSummarySchema.safeParse({
    records: formData.get('records'),
  });

  if (!validatedFields.success) {
    return { error: 'Invalid input. Health records cannot be empty.' };
  }

  const recordsDataUri = `data:text/plain;base64,${Buffer.from(validatedFields.data.records).toString('base64')}`;

  try {
    const result = await generateHealthSummary({ healthRecordsDataUri: recordsDataUri });
    return { data: result };
  } catch (e) {
    console.error(e);
    return { error: 'Failed to generate summary. The AI model might be unavailable. Please try again later.' };
  }
}

export async function getPrescriptionInsights(prevState: any, formData: FormData) {
  const validatedFields = prescriptionSchema.safeParse({
    prescription: formData.get('prescription'),
  });

  if (!validatedFields.success) {
    return { error: 'Invalid input. Prescription details cannot be empty.' };
  }

  try {
    const result = await analyzePrescription({ prescriptionDetails: validatedFields.data.prescription });
    return { data: result };
  } catch (e) {
    console.error(e);
    return { error: 'Failed to analyze prescription. The AI model might be unavailable. Please try again later.' };
  }
}

export async function submitContactForm(prevState: any, formData: FormData) {
  const validatedFields = contactFormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
  });

  if (!validatedFields.success) {
    return { error: 'Invalid input. Please check the form and try again.', fields: validatedFields.error.flatten().fieldErrors };
  }
  
  const { name, email, message } = validatedFields.data;
  
  if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not set.");
      return { error: "Could not send message. Server configuration error." };
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    await resend.emails.send({
      from: 'Swasthio Contact Form <onboarding@resend.dev>',
      to: 'nikhilgaur1022@gmail.com',
      subject: 'New Contact Form Submission',
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
    });
    return { data: { success: true, message: 'Thank you for your message! We will get back to you soon.' } };
  } catch (error) {
    console.error("Failed to send email:", error);
    return { error: "Failed to send message. Please try again later." };
  }
}
