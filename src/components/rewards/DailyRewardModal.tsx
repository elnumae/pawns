
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Gift, Loader2 } from "lucide-react";

interface DailyRewardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DailyRewardModal = ({ isOpen, onClose }: DailyRewardModalProps) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [reward, setReward] = useState<number | null>(null);
  const { toast } = useToast();

  const handleClaimReward = async () => {
    setIsSpinning(true);
    
    try {
      // TODO: Integrate with Flare's RNG API
      const mockReward = Math.floor(Math.random() * 50) + 1; // Mock reward 1-50 AMB
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setReward(mockReward);
      toast({
        title: "Reward Claimed!",
        description: `You received ${mockReward} AMB tokens!`,
      });
      
      // Store last claim date in localStorage
      localStorage.setItem("lastDailyReward", new Date().toISOString());
      
    } catch (error) {
      toast({
        title: "Error claiming reward",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsSpinning(false);
      setTimeout(onClose, 2000);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">
            Daily Reward
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center space-y-6 py-8">
          <div className={`transition-all duration-700 ${isSpinning ? "animate-spin" : ""}`}>
            <Gift className="h-16 w-16 text-[#F97316]" />
          </div>
          
          {reward !== null ? (
            <div className="text-center animate-fade-in">
              <h3 className="text-3xl font-bold text-[#F97316] mb-2">
                {reward} AMB
              </h3>
              <p className="text-muted-foreground">Congratulations!</p>
            </div>
          ) : (
            <Button 
              onClick={handleClaimReward} 
              disabled={isSpinning}
              className="w-full max-w-xs hover-effect"
            >
              {isSpinning ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Claiming...
                </>
              ) : (
                "Claim Reward"
              )}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DailyRewardModal;
