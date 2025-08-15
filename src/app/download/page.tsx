
import { Smile } from 'lucide-react';

export default function DownloadPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground text-center p-4">
      <div className="max-w-md">
        <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4">Coming Soon!</h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-8">
          Our app is currently under development and will be available on the App Store and Google Play shortly.
        </p>
        <Smile className="h-16 w-16 text-primary animate-bounce" />
      </div>
    </div>
  );
}
