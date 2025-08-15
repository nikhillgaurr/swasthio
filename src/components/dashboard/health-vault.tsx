'use client';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UploadCloud, FileText, ShieldCheck } from 'lucide-react';

export function HealthVault() {
  const [isHovering, setIsHovering] = useState(false);

  const files = [
    { name: 'Annual-Checkup-2023.pdf', date: '2023-11-21' },
    { name: 'Blood-Test-Results.pdf', date: '2023-09-15' },
    { name: 'X-Ray-Knee.jpg', date: '2023-08-02' },
  ];

  return (
    <Card className="col-span-1 md:col-span-1 row-span-2 rounded-2xl border-white/20 bg-white/10 p-0 shadow-lg backdrop-blur-2xl dark:border-white/10 dark:bg-black/10">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
            <ShieldCheck className="w-6 h-6 text-primary" />
          </div>
          <div>
            <CardTitle className="text-xl font-bold text-foreground">Health Vault</CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-6 pb-6 space-y-4">
        <div
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          className="relative group w-full h-32 border-2 border-dashed border-muted-foreground/50 rounded-lg flex flex-col items-center justify-center transition-all duration-300 hover:border-primary hover:bg-primary/10"
        >
          <div
            className="absolute inset-0 bg-primary/20 rounded-lg transition-all duration-500 ease-in-out"
            style={{
              clipPath: isHovering
                ? 'circle(100% at 50% 50%)'
                : 'circle(0% at 50% 50%)',
            }}
          ></div>
          <UploadCloud className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors z-10" />
          <p className="text-sm text-muted-foreground group-hover:text-primary mt-2 z-10">
            Drag & drop files or click to upload
          </p>
        </div>
        <div className="space-y-2">
            <h4 className="font-semibold text-muted-foreground">Recent Documents</h4>
            {files.map(file => (
                <div key={file.name} className="flex items-center justify-between p-2 rounded-md hover:bg-primary/5">
                    <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-primary"/>
                        <span className="text-sm font-medium">{file.name}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{file.date}</span>
                </div>
            ))}
        </div>
      </CardContent>
    </Card>
  );
}
