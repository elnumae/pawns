
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import { Gamepad2, Bot, Users, Trophy, Clock, Zap, Timer } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const Play = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16 px-4 max-w-7xl mx-auto">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { label: "Total players", value: "2,451" },
            { label: "Online now", value: "142" },
            { label: "Total games", value: "12,392" },
            { label: "Ongoing games", value: "38" },
          ].map((stat, i) => (
            <div key={i} className="glassmorphism p-4 rounded-xl text-center">
              <div className="text-muted-foreground">{stat.label}</div>
              <div className="text-2xl font-bold mt-1">{stat.value}</div>
            </div>
          ))}
        </div>

        {/* Game Modes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Dialog>
            <DialogTrigger asChild>
              <button className="glassmorphism p-8 rounded-xl text-center hover-effect">
                <Gamepad2 className="h-12 w-12 mx-auto mb-4 text-[#F97316]" />
                <h3 className="text-xl font-semibold mb-2">Play Now</h3>
                <p className="text-muted-foreground">Quick match with random opponent</p>
              </button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Choose Time Control</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4 p-4">
                <TimeControlButton 
                  icon={<Zap className="h-5 w-5" />}
                  title="Bullet 1|1"
                  description="1 min + 1 sec"
                />
                <TimeControlButton 
                  icon={<Clock className="h-5 w-5" />}
                  title="Blitz 3|2"
                  description="3 min + 2 sec"
                />
                <TimeControlButton 
                  icon={<Clock className="h-5 w-5" />}
                  title="Blitz 5|5"
                  description="5 min + 5 sec"
                />
                <TimeControlButton 
                  icon={<Timer className="h-5 w-5" />}
                  title="Rapid 10|0"
                  description="10 min"
                />
              </div>
            </DialogContent>
          </Dialog>

          <button className="glassmorphism p-8 rounded-xl text-center hover-effect">
            <Bot className="h-12 w-12 mx-auto mb-4 text-primary" />
            <h3 className="text-xl font-semibold mb-2">Play with AI</h3>
            <p className="text-muted-foreground">Challenge the computer</p>
          </button>

          <button className="glassmorphism p-8 rounded-xl text-center hover-effect">
            <Users className="h-12 w-12 mx-auto mb-4 text-primary" />
            <h3 className="text-xl font-semibold mb-2">Play with Friend</h3>
            <p className="text-muted-foreground">Create a private game</p>
          </button>

          <button className="glassmorphism p-8 rounded-xl text-center hover-effect">
            <Trophy className="h-12 w-12 mx-auto mb-4 text-primary" />
            <h3 className="text-xl font-semibold mb-2">Tournament</h3>
            <p className="text-muted-foreground">Compete for prizes</p>
          </button>
        </div>
      </main>
    </div>
  );
};

const TimeControlButton = ({ icon, title, description }: { 
  icon: React.ReactNode; 
  title: string; 
  description: string; 
}) => (
  <Button 
    variant="outline" 
    className="w-full h-auto flex-col p-6 hover:bg-primary/10"
  >
    <div className="flex items-center justify-center mb-2">
      {icon}
    </div>
    <div className="text-lg font-semibold">{title}</div>
    <div className="text-sm text-muted-foreground">{description}</div>
  </Button>
);

export default Play;
