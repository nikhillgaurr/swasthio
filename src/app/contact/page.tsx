import { Mail, Phone } from 'lucide-react';
import Link from 'next/link';

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl font-headline text-primary">
                Swasthio
            </Link>
        </div>
      </header>
      <main className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-md p-8 m-4 rounded-2xl border-white/20 bg-white/10 shadow-lg backdrop-blur-2xl dark:border-white/10 dark:bg-black/10">
            <h1 className="text-3xl font-bold text-center font-headline mb-2">Contact Us</h1>
            <p className="text-center text-muted-foreground mb-8">Get in touch with our team.</p>
            <div className="space-y-6">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                        <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                        <h2 className="font-semibold">Email</h2>
                        <a href="mailto:nikhilgaur1022@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">
                            nikhilgaur1022@gmail.com
                        </a>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                        <Phone className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                        <h2 className="font-semibold">Phone</h2>
                        <a href="tel:8882067367" className="text-muted-foreground hover:text-primary transition-colors">
                            8882067367
                        </a>
                    </div>
                </div>
            </div>
        </div>
      </main>
    </div>
  );
}
