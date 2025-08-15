
'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  HeartPulse,
  Users,
  ShieldOff,
  Twitter,
  Linkedin,
  Instagram,
  FileText,
  Bot,
  UserCheck,
  Zap,
  Menu,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { ThemeToggle } from '@/components/theme-toggle';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const features = [
  {
    icon: <Bot className="h-8 w-8 text-primary" />,
    title: 'AI Health Summaries',
    description:
      'Our AI turns complex medical jargon into simple, actionable insights you can actually use.',
  },
  {
    icon: <Users className="h-8 w-8 text-primary" />,
    title: 'Family Health Profiles',
    description:
      'Seamlessly manage health records for your entire family in one secure, organized application.',
  },
  {
    icon: <ShieldOff className="h-8 w-8 text-primary" />,
    title: 'Offline Emergency Mode',
    description:
      'Your most critical health information is always accessible, even without an internet connection.',
  },
];

const howItWorksSteps = [
  {
    icon: <FileText className="h-8 w-8 text-primary" />,
    title: 'Upload Your Documents',
    description: 'Securely upload medical reports, prescriptions, and lab results in seconds.',
  },
  {
    icon: <Bot className="h-8 w-8 text-primary" />,
    title: 'Let AI Do the Work',
    description: 'Our intelligent system analyzes and explains your data in simple terms.',
  },
  {
    icon: <UserCheck className="h-8 w-8 text-primary" />,
    title: 'Organize & Manage',
    description: 'Create family profiles, track medications, and set health reminders with ease.',
  },
  {
    icon: <Zap className="h-8 w-8 text-primary" />,
    title: 'Access Insights Instantly',
    description: 'Get emergency info, health tips, and summaries whenever you need them.',
  },
];

const teamMembers = [
    { name: 'Nehan Lil', role: 'Co-Founder', image: 'https://placehold.co/150x150.png', hint: 'man portrait' },
    { name: 'Hussain Md. Diyab', role: 'Co-Founder', image: 'https://placehold.co/150x150.png', hint: 'man portrait' },
    { name: 'Nikhil Gaur', role: 'Co-Founder', image: 'https://placehold.co/150x150.png', hint: 'man portrait' },
    { name: 'Bhavye Nijhawan', role: 'Technical Development Head', image: 'https://placehold.co/150x150.png', hint: 'man portrait' },
    { name: 'Chaitanya Khanna', role: 'R&D Head', image: 'https://placehold.co/150x150.png', hint: 'man portrait' },
    { name: 'Grishm Ghosh', role: 'Marketing & Media Head', image: 'https://placehold.co/150x150.png', hint: 'man portrait' },
]

const MotionCard = motion(Card);

function useMouseFollow() {
  const [mousePosition, setMousePosition] = useState({ x: -200, y: -200 });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', mouseMove);
    return () => window.removeEventListener('mousemove', mouseMove);
  }, []);

  return mousePosition;
}

const WavyText = ({ text }: { text: string }) => {
  return (
    <h1 className="text-4xl md:text-6xl font-bold font-headline text-foreground text-center">
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          whileHover={{ y: -5, scaleY: 1.1, rotate: Math.random() > 0.5 ? 5 : -5, transition: { duration: 0.2 } }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </h1>
  );
};

const Section = ({ children, className, id }: { children: React.ReactNode; className?: string, id?: string }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
      target: ref,
      offset: ['start end', 'end start'],
    });
  
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
    const blur = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], ['blur(20px)', 'blur(0px)', 'blur(0px)', 'blur(20px)']);
  
    return (
      <motion.section id={id} ref={ref} style={{ opacity, filter: blur }} className={className}>
        {children}
      </motion.section>
    );
  };

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { x, y } = useMouseFollow();
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);


  const smoothX = useSpring(x, { stiffness: 300, damping: 30, mass: 0.5 });
  const smoothY = useSpring(y, { stiffness: 300, damping: 30, mass: 0.5 });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const heroRef = useRef(null);
  const { scrollYProgress: scrollYProgressHero } = useScroll({
      target: heroRef,
      offset: ["start start", "end start"]
  });
  const heroOpacity = useTransform(scrollYProgressHero, [0, 0.5], [1, 0]);
  const heroBlur = useTransform(scrollYProgressHero, [0, 0.5], ['blur(0px)', 'blur(8px)']);
  
  const aboutRef = useRef(null);
  const { scrollYProgress: scrollYProgressAbout } = useScroll({
    target: aboutRef,
    offset: ["start end", "end start"]
  });
  
  const aboutImageX = useTransform(scrollYProgressAbout, [0, 0.5], ['-100%', '0%']);
  const aboutTextX = useTransform(scrollYProgressAbout, [0, 0.5], ['100%', '0%']);

  const timelineRef = useRef(null);
  const { scrollYProgress: timelineScrollYProgress } = useScroll({
      target: timelineRef,
      offset: ['start end', 'end start']
  });
  const timelineOpacity = useTransform(timelineScrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const timelineBlur = useTransform(timelineScrollYProgress, [0, 0.2, 0.8, 1], ['blur(8px)', 'blur(0px)', 'blur(0px)', 'blur(8px)']);

  const teamRef = useRef(null);
  const { scrollYProgress: scrollYProgressTeam } = useScroll({
    target: teamRef,
    offset: ["start end", "center center"]
  });
  const teamImageScale = useTransform(scrollYProgressTeam, [0, 1], [0.8, 1]);
  const teamImageOpacity = useTransform(scrollYProgressTeam, [0, 1], [0.5, 1]);

  return (
    <div className="flex flex-col min-h-screen bg-background dark:bg-zinc-900 transition-colors duration-300 overflow-x-hidden">
      <motion.div
        className="fixed top-0 left-0 w-40 h-40 bg-primary/10 rounded-full -z-10 pointer-events-none hidden md:block"
        style={{
          translateX: smoothX,
          translateY: smoothY,
          x: '-50%',
          y: '-50%',
          filter: 'blur(80px)',
        }}
        animate={{
          scale: [1, 1.2, 1]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <div className="fixed top-4 right-4 z-50">
          <ThemeToggle />
      </div>

      <header
        className={`fixed top-4 left-0 w-full z-40 transition-all duration-500 ease-in-out flex justify-center`}
      >
        <motion.div 
            className="flex h-14 items-center justify-between md:justify-center px-4 md:px-0"
            initial={{ width: '100%', maxWidth: '100rem' }}
            animate={{
              width: isScrolled ? 'auto' : '100%',
              maxWidth: isScrolled ? '50rem' : '100rem',
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            whileHover={{ scale: 1.05, backdropFilter: 'blur(16px)' }}
        >
            <div className={`flex items-center justify-center h-full w-full ${isScrolled ? 'rounded-full border border-border/20 bg-background/80 backdrop-blur-md hover:backdrop-blur-lg shadow-lg' : ''} transition-all duration-300 ease-in-out`}>
                <nav className={`hidden md:flex items-center gap-10 text-sm font-medium px-8 whitespace-nowrap`}>
                    <a href="#features" className="link-underline hover:text-primary transition-colors">Features</a>
                    <a href="#how-it-works" className="link-underline hover:text-primary transition-colors">How It Works</a>
                    <a href="#about" className="link-underline hover:text-primary transition-colors">About Us</a>
                    <Link href="/contact" className="link-underline hover:text-primary transition-colors cursor-pointer">Contact</Link>
                </nav>
                <div className="md:hidden">
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Menu className="h-6 w-6" />
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="left">
                      <nav className="flex flex-col gap-6 text-lg font-medium p-6">
                        <a href="#features" className="hover:text-primary transition-colors">Features</a>
                        <a href="#how-it-works" className="hover:text-primary transition-colors">How It Works</a>
                        <a href="#about" className="hover:text-primary transition-colors">About Us</a>
                        <Link href="/contact" className="hover:text-primary transition-colors cursor-pointer">Contact</Link>
                      </nav>
                    </SheetContent>
                  </Sheet>
                </div>
            
                <motion.div 
                    className="hidden md:flex items-center"
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ 
                        opacity: isScrolled ? 1 : 0, 
                        width: isScrolled ? 'auto' : 0,
                    }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    style={{ overflow: 'hidden' }}
                >
                    <div className="w-px h-6 bg-border/40 ml-2 mr-6"></div>
                    <div className="flex items-center gap-4 pr-8">
                        <motion.a href="#" whileHover={{scale: 1.2, rotate: -10}}><Linkedin className="h-5 w-5 hover:text-primary transition-transform hover:scale-110"/></motion.a>
                        <motion.a href="#" whileHover={{scale: 1.2, rotate: 10}}><Twitter className="h-5 w-5 hover:text-primary transition-transform hover:scale-110"/></motion.a>
                        <motion.a href="#" whileHover={{scale: 1.2, rotate: -10}}><Instagram className="h-5 w-5 hover:text-primary transition-transform hover:scale-110"/></motion.a>
                    </div>
                </motion.div>
            </div>
        </motion.div>
      </header>


      <main className="flex-grow">
        <motion.section ref={heroRef} className="relative min-h-screen flex items-center justify-center py-20 md:py-32 text-center overflow-hidden" style={{opacity: heroOpacity, filter: heroBlur }}>
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 -z-10"></div>
            <motion.div 
                className="absolute top-1/4 left-1/4 w-32 h-32 bg-accent/10 rounded-full filter blur-2xl hidden md:block"
                animate={{scale: [1, 1.3, 1], x: [-10, 10, -10]}}
                transition={{duration: 10, repeat: Infinity, ease: 'easeInOut'}}
            />
            <motion.div 
                className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-secondary/10 rounded-full filter blur-2xl hidden md:block"
                animate={{scale: [1, 1.3, 1], y: [-10, 10, -10]}}
                transition={{duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 3}}
            />
          <motion.div
            className="container"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.05, duration: 0.1 },
              },
            }}
          >
            <div className="flex items-center gap-2 justify-center mb-4">
                <HeartPulse className="h-8 w-8 md:h-10 md:w-10 text-primary" />
                <span className="text-3xl md:text-4xl font-bold font-headline text-primary whitespace-nowrap">
                Swasthio
                </span>
            </div>
            <WavyText text="Your Health, Simplified." />
            
            <motion.p
              className="mt-4 max-w-2xl mx-auto text-base md:text-lg text-muted-foreground"
              variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { duration: 0.3 } } }}
            >
              AI-powered health records, summaries, and family profiles — all in
              one secure, intuitive place.
            </motion.p>
            <motion.div
              className="mt-8 flex flex-col sm:flex-row justify-center gap-4"
              variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { duration: 0.3 } } }}
            >
              <Button size="lg" asChild>
                <motion.a href="/download" whileHover={{ scale: 1.05, boxShadow: "0px 0px 20px hsl(var(--primary) / 0.4)" }} whileTap={{ scale: 0.95 }}>Download App</motion.a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <motion.a href="#features" whileHover={{ scale: 1.05, boxShadow: "0px 0px 15px hsl(var(--primary) / 0.2)" }} whileTap={{ scale: 0.95 }}>Learn More</motion.a>
              </Button>
            </motion.div>
            
            <motion.div
              className="mt-12 flex justify-center gap-6"
              variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { duration: 0.3 } } }}
            >
              <motion.a href="#" whileHover={{scale: 1.2, rotate: -10}} className="text-muted-foreground hover:text-primary transition-transform"><Linkedin className="h-6 w-6"/></motion.a>
              <motion.a href="#" whileHover={{scale: 1.2, rotate: 10}} className="text-muted-foreground hover:text-primary transition-transform"><Twitter className="h-6 w-6"/></motion.a>
              <motion.a href="#" whileHover={{scale: 1.2, rotate: -10}} className="text-muted-foreground hover:text-primary transition-transform"><Instagram className="h-6 w-6"/></motion.a>
            </motion.div>
          </motion.div>
        </motion.section>

        <Section id="features" className="py-20 bg-background">
            <div className="container">
                <h2 className="text-3xl font-bold text-center font-headline">
                A smarter way to manage your health
                </h2>
                <p className="mt-2 text-center text-muted-foreground">
                Swasthio empowers you with intelligent tools to understand and act on your health data.
                </p>
                <div className="mt-12 grid gap-8 md:grid-cols-3" onMouseLeave={() => setHoveredFeature(null)}>
                  {features.map((feature, index) => (
                      <MotionCard
                      key={index}
                      onHoverStart={() => setHoveredFeature(index)}
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.5 }}
                      transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
                      animate={{
                          scale: hoveredFeature === index ? 1.05 : (hoveredFeature !== null ? 0.95 : 1),
                          filter: hoveredFeature === index ? 'blur(0px)' : (hoveredFeature !== null ? 'blur(4px)' : 'blur(0px)'),
                          boxShadow: hoveredFeature === index ? "0px 10px 30px rgba(0,0,0,0.15)" : "0px 4px 15px rgba(0,0,0,0.05)",
                      }}
                      className="bg-white/40 dark:bg-zinc-800/40 backdrop-blur-2xl transition-all border rounded-2xl"
                      >
                      <CardHeader className="flex flex-row items-center gap-4">
                          <motion.div className="bg-primary/10 p-3 rounded-lg" whileHover={{scale: 1.1, rotate: 5}}>
                            {feature.icon}
                          </motion.div>
                          <CardTitle className="font-headline text-xl">
                          {feature.title}
                          </CardTitle>
                      </CardHeader>
                      <CardContent>
                          <p className="text-muted-foreground">
                          {feature.description}
                          </p>
                      </CardContent>
                      </MotionCard>
                  ))}
                </div>
            </div>
        </Section>

        <motion.section id="how-it-works" ref={timelineRef} style={{opacity: timelineOpacity, filter: timelineBlur}} className="py-20 bg-secondary/5 dark:bg-secondary/10">
          <div className="container">
            <h2 className="text-3xl font-bold text-center font-headline">Get Started in Minutes</h2>
            <p className="mt-2 text-center text-muted-foreground max-w-2xl mx-auto">
              Take control of your health records with a simple, four-step process.
            </p>
            {/* Desktop Timeline */}
            <div className="relative mt-12 hidden md:block">
              <motion.div
                className="absolute left-0 right-0 top-7 mx-auto h-0.5 bg-primary/30 w-3/4"
                style={{ scaleX: useTransform(timelineScrollYProgress, [0.3, 0.8], [0, 1]) }}
              />
              <div className="grid grid-cols-4 gap-8 relative">
                {howItWorksSteps.map((step, i) => (
                  <motion.div
                    key={i}
                    className="flex flex-col items-center text-center p-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ delay: i * 0.2 }}
                  >
                    <motion.div
                      className="bg-background dark:bg-zinc-800 p-4 rounded-full shadow-md mb-4 border-2 border-primary/20 z-10"
                      whileHover={{ rotate: 15, scale: 1.15 }}
                    >
                      {step.icon}
                    </motion.div>
                    <h3 className="font-bold font-headline">{step.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{step.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
            {/* Mobile Timeline */}
            <div className="mt-12 md:hidden">
              <div className="relative pl-8">
                <motion.div 
                    className="absolute left-0 top-0 w-0.5 bg-primary/30 ml-4"
                    style={{ 
                        height: useTransform(timelineScrollYProgress, [0.3, 0.8], ['0%', '100%']),
                    }}
                />
                  {howItWorksSteps.map((step, i) => (
                    <motion.div
                      key={i}
                      className="flex items-start gap-6 mb-10"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.5 }}
                      transition={{ delay: i * 0.2 }}
                    >
                      <div className="relative">
                        <motion.div 
                            className="bg-background dark:bg-zinc-800 p-3 rounded-full shadow-md border-2 border-primary/20 z-10 absolute -left-2"
                            style={{translateX: "-50%"}}
                            whileHover={{ scale: 1.15, rotate: 10 }}
                        >
                            {step.icon}
                        </motion.div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold font-headline text-lg">{step.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{step.description}</p>
                      </div>
                    </motion.div>
                  ))}
              </div>
            </div>
          </div>
        </motion.section>

        <Section id="about" ref={aboutRef} className="py-20 overflow-hidden bg-gradient-to-br from-primary/5 to-secondary/5 dark:from-primary/10 dark:to-secondary/10">
            <div className="container grid md:grid-cols-2 gap-12 items-center">
                <motion.div
                    style={{ x: aboutImageX }}
                    className="relative h-64 md:h-96 w-full rounded-2xl overflow-hidden shadow-2xl"
                >
                    <Image src="https://i.postimg.cc/NftP2d0d/Screenshot-2025-08-15-014458.png" alt="Illustration of modern healthcare technology" layout="fill" objectFit="cover" className="z-10 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-0"></div>
                </motion.div>
                <motion.div style={{ x: aboutTextX }}>
                  <h2 className="text-3xl font-bold font-headline">
                      Our Mission: Health Equity Through Clarity
                  </h2>
                  <p className="mt-4 text-muted-foreground">
                      We've seen firsthand the confusion and anxiety that medical complexity can cause. A diagnosis you can't decipher, a treatment plan you can't follow, a loved one's records you can't find—these are barriers to wellness. Swasthio was born from a deeply personal mission: to dismantle these barriers. We believe that understanding your own health is a fundamental right, not a privilege. Our platform is more than an app; it's a promise to bring clarity, control, and confidence to your health journey, empowering you and your family to live healthier, fuller lives.
                  </p>
                </motion.div>
            </div>
        </Section>

        <Section id="team" className="py-20 bg-background">
          <div ref={teamRef} className="container">
            <h2 className="text-3xl font-bold text-center font-headline mb-12">
              Meet The Team
            </h2>
            <div className="max-w-5xl mx-auto">
              <motion.div style={{scale: teamImageScale, opacity: teamImageOpacity}}>
                <Image 
                  src="https://i.postimg.cc/PJvhL2rX/teamcyan.jpg" 
                  alt="Meet the Swasthio team"
                  width={1200}
                  height={675}
                  className="rounded-2xl shadow-2xl w-full h-auto"
                  data-ai-hint="team photo"
                />
              </motion.div>
            </div>
          </div>
        </Section>

        <Section id="contact" className="py-20 bg-primary/5 dark:bg-primary/10 text-center">
            <div className="container">
                <motion.h2
                className="text-3xl font-bold font-headline"
                initial={{opacity: 0, y: 20}}
                whileInView={{opacity: 1, y: 0}}
                viewport={{once: true}}
                transition={{duration: 0.5}}
                >
                Ready to take control of your health?
                </motion.h2>
                <motion.p
                className="mt-4 max-w-2xl mx-auto text-muted-foreground"
                initial={{opacity: 0, y: 20}}
                whileInView={{opacity: 1, y: 0}}
                viewport={{once: true}}
                transition={{duration: 0.5, delay: 0.1}}
                >
                Join thousands who trust Swasthio for secure, smart, and
                simplified health management.
                </motion.p>
                <motion.div
                className="mt-8 flex flex-col sm:flex-row justify-center gap-4"
                initial={{opacity: 0, y: 20}}
                whileInView={{opacity: 1, y: 0}}
                viewport={{once: true}}
                transition={{duration: 0.5, delay: 0.2}}
                >
                <Button size="lg" asChild>
                    <motion.a href="/download" whileHover={{ scale: 1.05, boxShadow: "0px 0px 20px hsl(var(--primary) / 0.4)" }} whileTap={{ scale: 0.95 }}>Get the App</motion.a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <motion.a href="/contact" className="text-foreground" whileHover={{ scale: 1.05, boxShadow: "0px 0px 15px hsl(var(--primary) / 0.2)" }} whileTap={{ scale: 0.95 }}>Contact Us</motion.a>
                </Button>
                </motion.div>
            </div>
        </Section>
      </main>

      <motion.footer
        className="bg-secondary/20 dark:bg-zinc-900/40 text-secondary-foreground backdrop-blur-md"
        initial={{opacity: 0}}
        whileInView={{opacity: 1}}
        viewport={{once: true}}
        transition={{duration: 0.8}}
      >
        <div className="container py-12 grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-lg font-headline">Swasthio</h3>
            <p className="mt-2 text-sm text-secondary-foreground/80">
              Your Health, Simplified.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold">Company</h4>
              <ul className="mt-4 space-y-2 text-sm">
                <li>
                  <a href="#about" className="link-underline hover:text-primary transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#features" className="link-underline hover:text-primary transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <Link href="/contact" className="link-underline hover:text-primary transition-colors cursor-pointer">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold">Resources</h4>
              <ul className="mt-4 space-y-2 text-sm">
                <li>
                  <a href="#" className="link-underline hover:text-primary transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="link-underline hover:text-primary transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="link-underline hover:text-primary transition-colors">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div>
            <h4 className="font-semibold">Follow Us</h4>
            <div className="flex mt-4 space-x-4">
              <motion.a href="#" whileHover={{scale: 1.2, rotate: -10}} className="text-secondary-foreground/80 hover:text-primary transition-transform">
                <Linkedin />
              </motion.a>
              <motion.a href="#" whileHover={{scale: 1.2, rotate: 10}} className="text-secondary-foreground/80 hover:text-primary transition-transform">
                <Twitter />
              </motion.a>
              <motion.a href="#" whileHover={{scale: 1.2, rotate: -10}} className="text-secondary-foreground/80 hover:text-primary transition-transform">
                <Instagram />
              </motion.a>
            </div>
          </div>
        </div>
        <div className="border-t border-secondary-foreground/20 py-4">
          <p className="text-center text-xs text-secondary-foreground/60">
            &copy; {new Date().getFullYear()} Swasthio. All rights reserved. | Managed by Satraunis
          </p>
        </div>
      </motion.footer>
    </div>
  );
}
