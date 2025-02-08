
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Gift, Loader2 } from "lucide-react";
import { getFlareRandomNumber } from "@/services/flareRNG";

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
      // Get random reward between 1-50 AMB using Flare RNG
      const randomReward = await getFlareRandomNumber(1, 50);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setReward(randomReward);
      toast({
        title: "Reward Claimed!",
        description: `You received ${randomReward} AMB tokens!`,
      });
      
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
