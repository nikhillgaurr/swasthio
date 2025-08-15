'use client';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { HeartPulse, QrCode } from 'lucide-react';

export function EmergencyAccess() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">
          <HeartPulse className="mr-2 h-4 w-4" />
          Emergency
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-destructive/80 border-destructive-foreground/20 text-destructive-foreground backdrop-blur-2xl">
        <DialogHeader>
          <DialogTitle>Emergency Access</DialogTitle>
          <DialogDescription className="text-destructive-foreground/80">
            Show this to first responders.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex justify-center">
            <div className="bg-white p-4 rounded-lg">
                <QrCode className="h-40 w-40 text-black" />
            </div>
          </div>
          <div className="space-y-2 text-center">
            <h3 className="font-bold">John Doe</h3>
            <p>DOB: 1985-05-15</p>
            <p>Blood Type: O+</p>
            <p className='font-semibold'>Allergies: Penicillin</p>
            <p className='font-semibold'>Primary Contact: Jane Doe (555-123-4567)</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
