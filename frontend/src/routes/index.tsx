import AnimatedLogo from "@/components/Landing/AnimatedLogo";
import { Button } from "@/components/ui/button";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Feature } from "@/components/Landing/Feature";
import { AboutSection } from "@/components/Landing/AboutSection";
import { TestimonialsSection } from "@/components/Landing/TestimonialsSection";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="w-full min-h-dvh flex flex-col items-center">
      {/** Hero Section */}
      <section
        className="w-full h-dvh bg-gradient-to-br from-blue-200 via-gray-200 to-pink-200 flex flex-col items-center justify-center animate-fade-in-up"
        id="#"
      >
        <AnimatedLogo />
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-2 text-center drop-shadow-sm">
          NeuroChallenge
        </h1>
        <p className="text-lg md:text-xl text-gray-700 max-w-2xl text-center mb-2 animate-fade-in">
          Interactive platform to evaluate, train, and enhance your cognitive,
          sensory, and motor skills through fun, scientific challenges. Compete
          globally, track your progress, and unlock your brain's full potential!
        </p>
        <Button variant="link" className="animate-fade-in text-gray-700">
          <Link to="/challenges">Explore Challenges</Link>
        </Button>
      </section>
      <section
        id="features"
        className="w-full h-auto pt-20 pb-8 flex flex-col items-center justify-center bg-gradient-to-bl from-pink-200 via-gray-200 to-green-200 gap-4 md:gap-8"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 text-center drop-shadow-sm">
          Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 max-w-6xl">
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
