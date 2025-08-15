'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const profiles = [
  { id: 'you', name: 'You', avatar: 'https://placehold.co/100x100' },
  { id: 'mom', name: 'Mom', avatar: 'https://placehold.co/100x101' },
  { id: 'dad', name: 'Dad', avatar: 'https://placehold.co/100x102' },
];

export function FamilyProfiles() {
  return (
    <TooltipProvider>
      <div className="flex items-center space-x-2">
        {profiles.map((profile, index) => (
          <Tooltip key={profile.id} delayDuration={100}>
            <TooltipTrigger>
              <div className="p-0.5 rounded-full bg-white/20 backdrop-blur-sm hover:scale-110 transition-transform">
                <Avatar
                  className={`w-10 h-10 border-2 ${
                    index === 0 ? 'border-primary' : 'border-transparent'
                  }`}
                >
                  <AvatarImage src={profile.avatar} alt={profile.name} data-ai-hint="portrait person" />
                  <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
                </Avatar>
              </div>
            </TooltipTrigger>
            <TooltipContent className="backdrop-blur-sm bg-background/80">
              <p>{profile.name}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
}
