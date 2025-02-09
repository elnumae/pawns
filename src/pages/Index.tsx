
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Trophy, Gamepad2, Coins } from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "@/components/layout/Logo";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8 animate-fade-in">
            <Logo size="lg" className="mx-auto" />
            <h1 className="text-4xl sm:text-6xl font-bold">
              Play Chess. <span className="text-gradient">Earn Rewards.</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Connect your wallet, link your Lichess account, and start earning AMB tokens while playing the game you love.
            </p>
            <div className="flex justify-center gap-4">
              <Link to="/play">
                <Button size="lg" className="hover-effect bg-[#F97316] hover:bg-[#F97316]/90">
                  Play Now
                </Button>
              </Link>
              <Link to="/whitepaper">
                <Button size="lg" variant="outline" className="hover-effect">
                  Whitepaper
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Trophy className="h-8 w-8" />}
              title="Win Games, Win Crypto"
              description="Not a Grandmaster? No problem. Turn your chess skills into real rewards. Play, win, and earn AMB tokens every match."
            />
            <FeatureCard 
              icon={<Gamepad2 className="h-8 w-8" />}
              title="Play on Lichess, Earn More"
              description="Connected to Lichess, the world's leading open-source chess platform. But here's the twist—you don't just gain Elo, you win crypto."
            />
            <FeatureCard 
              icon={<Coins className="h-8 w-8" />}
              title="Choose Your Bet, Multiply Your Rewards"
              description="Set your own stakes, win daily rewards just for showing up, and boost your earnings with streak-based prizes."
            />
          </div>
        </section>
      </main>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { 
  icon: React.ReactNode;
  title: string;
  description: string;
}) => (
  <div className="p-6 glassmorphism rounded-xl hover-effect">
    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </div>
);

export default Index;
