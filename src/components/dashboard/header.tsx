'use client';
import { FamilyProfiles } from './family-profiles';
import { EmergencyAccess } from './emergency-access';
import { Stethoscope } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
        <div className="flex items-center gap-4">
          <Stethoscope className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-bold text-primary font-headline">Swasthio</h1>
        </div>
        <div className="flex items-center gap-4">
          <FamilyProfiles />
          <EmergencyAccess />
        </div>
      </div>
    </header>
  );
}
