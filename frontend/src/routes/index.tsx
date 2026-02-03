import AnimatedLogo from "@/components/Landing/AnimatedLogo";
import { Button } from "@/components/ui/button";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Feature } from "@/components/Landing/Feature";
import { AboutSection } from "@/components/Landing/AboutSection";
import { TestimonialsSection } from "@/components/Landing/TestimonialsSection";
import { Sparkles, Zap, Trophy } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="w-full min-h-dvh flex flex-col items-center">
      {/** Hero Section */}
      <section
        className="relative w-full min-h-dvh bg-gradient-to-br from-background via-primary/5 to-accent/10 dark:from-background dark:via-primary/10 dark:to-accent/20 flex flex-col items-center justify-center overflow-hidden"
        id="#"
      >
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 dark:bg-[var(--neon-cyan)]/20 rounded-full blur-3xl animate-pulse-glow" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 dark:bg-[var(--neon-purple)]/20 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "1s" }} />
        </div>

        <div className="relative z-10 flex flex-col items-center px-4">
          <AnimatedLogo />
          <h1 className="text-5xl md:text-7xl font-extrabold mb-4 text-center bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent dark:from-[var(--neon-cyan)] dark:via-[var(--neon-purple)] dark:to-[var(--neon-pink)] animate-fade-in-up py-3" style={{ lineHeight: '1.3', paddingBottom: '1rem', paddingTop: '0.5rem' }}>
            NeuroChallenge
          </h1>
          <p className="text-lg md:text-xl text-foreground/70 dark:text-foreground/80 max-w-3xl text-center mb-8 animate-fade-in leading-relaxed">
            Interactive platform to <span className="font-semibold text-primary dark:text-[var(--neon-cyan)]">evaluate</span>, 
            {" "}<span className="font-semibold text-accent dark:text-[var(--neon-purple)]">train</span>, and{" "}
            <span className="font-semibold text-primary dark:text-[var(--neon-pink)]">enhance</span> your cognitive,
            sensory, and motor skills through fun, scientific challenges.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up">
            <Button 
              size="lg"
              className="bg-primary hover:bg-primary/90 dark:bg-primary dark:hover:bg-primary/80 dark:shadow-lg dark:shadow-primary/50 text-lg group"
            >
              <Link to="/challenges" className="flex items-center gap-2">
                Explore Challenges
                <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              </Link>
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="dark:border-primary/50 dark:text-primary dark:hover:bg-primary/10 text-lg group"
            >
              <Link to="/signin" className="flex items-center gap-2">
                Get Started
                <Zap className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl w-full">
            <div className="glass-effect rounded-2xl p-6 text-center animate-fade-in-up hover:scale-105 transition-transform">
              <div className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent dark:text-[var(--neon-cyan)]">
                30+
              </div>
              <div className="text-sm text-foreground/60 mt-2">Challenges</div>
            </div>
            <div className="glass-effect rounded-2xl p-6 text-center animate-fade-in-up hover:scale-105 transition-transform" style={{ animationDelay: "0.1s" }}>
              <div className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent dark:text-[var(--neon-purple)]">
                10K+
              </div>
              <div className="text-sm text-foreground/60 mt-2">Active Users</div>
            </div>
            <div className="glass-effect rounded-2xl p-6 text-center animate-fade-in-up hover:scale-105 transition-transform" style={{ animationDelay: "0.2s" }}>
              <div className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent dark:text-[var(--neon-pink)]">
                1M+
              </div>
              <div className="text-sm text-foreground/60 mt-2">Games Played</div>
            </div>
          </div>
        </div>
      </section>
      <section
        id="features"
        className="w-full py-24 flex flex-col items-center justify-center bg-gradient-to-b from-background to-muted/30 dark:from-background dark:to-muted/10"
      >
        <div className="max-w-7xl w-full px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent dark:from-[var(--neon-cyan)] dark:to-[var(--neon-purple)]">
              Features
            </h2>
            <p className="text-foreground/60 text-lg max-w-2xl mx-auto">
              Everything you need to train your brain and compete globally
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Feature
              title="Challenge Variety"
              description="Over 30 challenges in categories like memory, logic, attention, reflexes, peripheral vision, verbal reasoning, and coordination."
              icon="🧠"
            />
            <Feature
              title="Ranking System"
              description="Real-time global and regional rankings to compare your performance with users worldwide."
              icon="🏆"
            />
            <Feature
              title="Multiplayer Mode"
              description="Compete in real-time against other users and improve your cognitive skills while having fun."
              icon="🎮"
            />
          </div>
        </div>
      </section>
      <TestimonialsSection />
      <AboutSection />
      <style>{`
          @keyframes fade-in {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes fade-in-up {
            from { opacity: 0; transform: translateY(40px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes spin-slow {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          @keyframes bounce-slow {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
          @keyframes hero-fade-in {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
          }
          .animate-fade-in { animation: fade-in 1s both; }
          .animate-fade-in-up { animation: fade-in-up 1.2s both; }
          .animate-spin-slow { animation: spin-slow 6s linear infinite; }
          .animate-bounce-slow { animation: bounce-slow 2.5s infinite; }
          .animate-hero-fade-in { animation: hero-fade-in 1.2s both; }
        `}</style>
    </div>
  );
}
