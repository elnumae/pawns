
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { ChessPiece, TrendingUp, Shield, Trophy } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8 animate-fade-in">
            <ChessPiece className="h-20 w-20 mx-auto text-primary" />
            <h1 className="text-4xl sm:text-6xl font-bold">
              Play Chess. <span className="text-gradient">Earn Rewards.</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Connect your wallet, link your Lichess account, and start earning AMB tokens while playing the game you love.
            </p>
            <div className="flex justify-center gap-4">
              <Button size="lg" className="hover-effect">
                Get Started
              </Button>
              <Button size="lg" variant="outline" className="hover-effect">
                Learn More
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Shield className="h-8 w-8" />}
              title="Secure Staking"
              description="Stake your AMB tokens safely and earn rewards based on your performance"
            />
            <FeatureCard 
              icon={<TrendingUp className="h-8 w-8" />}
              title="Real-time Tracking"
              description="Monitor your games, earnings, and token balance in real-time"
            />
            <FeatureCard 
              icon={<Trophy className="h-8 w-8" />}
              title="Leaderboards"
              description="Compete with other players and climb the global rankings"
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
