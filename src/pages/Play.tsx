
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import { Gamepad2, Bot, Users, Trophy, Clock, Zap, Timer, Wallet, ExternalLink } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const Play = () => {
  const [showConnectionModal, setShowConnectionModal] = useState(false);
  const [showBettingModal, setShowBettingModal] = useState(false);
  const [isLichessConnected, setIsLichessConnected] = useState(false);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [selectedTimeControl, setSelectedTimeControl] = useState("");
  const [betAmount, setBetAmount] = useState("10");
  const { toast } = useToast();

  const handleTimeControlSelect = (timeControl: string) => {
    setSelectedTimeControl(timeControl);
    if (!isLichessConnected || !isWalletConnected) {
      setShowConnectionModal(true);
    } else {
      setShowBettingModal(true);
    }
  };

  const handleLichessConnect = () => {
    // TODO: Implement Lichess connection
    setIsLichessConnected(true);
    toast({
      title: "Successfully connected to Lichess",
      description: "Your Lichess account is now linked",
    });
  };

  const handleWalletConnect = () => {
    // TODO: Implement wallet connection
    setIsWalletConnected(true);
    toast({
      title: "Wallet connected",
      description: "Your wallet is now connected",
    });
  };

  const handleBetSubmit = () => {
    toast({
      title: "Game starting",
      description: `Starting game with ${betAmount} AMB bet`,
    });
    setShowBettingModal(false);
  };

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
                  onClick={() => handleTimeControlSelect("1|1")}
                />
                <TimeControlButton 
                  icon={<Clock className="h-5 w-5" />}
                  title="Blitz 3|2"
                  description="3 min + 2 sec"
                  onClick={() => handleTimeControlSelect("3|2")}
                />
                <TimeControlButton 
                  icon={<Clock className="h-5 w-5" />}
                  title="Blitz 5|5"
                  description="5 min + 5 sec"
                  onClick={() => handleTimeControlSelect("5|5")}
                />
                <TimeControlButton 
                  icon={<Timer className="h-5 w-5" />}
                  title="Rapid 10|0"
                  description="10 min"
                  onClick={() => handleTimeControlSelect("10|0")}
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

        {/* Connection Modal */}
        <Dialog open={showConnectionModal} onOpenChange={setShowConnectionModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Connect Required Services</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="flex justify-between items-center p-4 border rounded-lg">
                <div className="space-y-1">
                  <h4 className="font-semibold">Lichess Account</h4>
                  <p className="text-sm text-muted-foreground">Connect to play matches</p>
                </div>
                <Button 
                  variant={isLichessConnected ? "outline" : "default"}
                  onClick={handleLichessConnect}
                  className="hover-effect"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  {isLichessConnected ? "Connected" : "Connect"}
                </Button>
              </div>

              <div className="flex justify-between items-center p-4 border rounded-lg">
                <div className="space-y-1">
                  <h4 className="font-semibold">Wallet</h4>
                  <p className="text-sm text-muted-foreground">Connect to place bets</p>
                </div>
                <Button 
                  variant={isWalletConnected ? "outline" : "default"}
                  onClick={handleWalletConnect}
                  className="hover-effect"
                >
                  <Wallet className="h-4 w-4 mr-2" />
                  {isWalletConnected ? "Connected" : "Connect"}
                </Button>
              </div>

              {isLichessConnected && isWalletConnected && (
                <Button 
                  className="w-full mt-4"
                  onClick={() => {
                    setShowConnectionModal(false);
                    setShowBettingModal(true);
                  }}
                >
                  Continue
                </Button>
              )}
            </div>
          </DialogContent>
        </Dialog>

        {/* Betting Modal */}
        <Dialog open={showBettingModal} onOpenChange={setShowBettingModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Select Bet Amount</DialogTitle>
            </DialogHeader>
            <div className="space-y-6 py-4">
              <RadioGroup 
                defaultValue="10" 
                onValueChange={setBetAmount}
                className="grid grid-cols-3 gap-4"
              >
                {["10", "30", "50"].map((amount) => (
                  <div key={amount}>
                    <RadioGroupItem
                      value={amount}
                      id={`amount-${amount}`}
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor={`amount-${amount}`}
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <span className="text-xl font-bold">{amount}</span>
                      <span className="text-sm text-muted-foreground">AMB</span>
                    </Label>
                  </div>
                ))}
              </RadioGroup>

              <div className="space-y-2">
                <Label htmlFor="custom-amount">Custom amount</Label>
                <Input
                  id="custom-amount"
                  type="number"
                  placeholder="Enter amount"
                  value={betAmount}
                  onChange={(e) => setBetAmount(e.target.value)}
                  min="1"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total stake:</span>
                  <span className="font-medium">{betAmount} AMB</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Potential win:</span>
                  <span className="font-medium">{Number(betAmount) * 2} AMB</span>
                </div>
              </div>

              <Button className="w-full" onClick={handleBetSubmit}>
                Start Game
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
};

const TimeControlButton = ({ 
  icon, 
  title, 
  description,
  onClick 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string;
  onClick: () => void;
}) => (
  <Button 
    variant="outline" 
    className="w-full h-auto flex-col p-6 hover:bg-primary/10"
    onClick={onClick}
  >
    <div className="flex items-center justify-center mb-2">
      {icon}
    </div>
    <div className="text-lg font-semibold">{title}</div>
    <div className="text-sm text-muted-foreground">{description}</div>
  </Button>
);

export default Play;
