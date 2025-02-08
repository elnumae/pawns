
import { Button } from "@/components/ui/button";
import { Wallet, ExternalLink, Link2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Logo from "./Logo";
import { useIsMobile } from "@/hooks/use-mobile";
import DailyRewardModal from "../rewards/DailyRewardModal";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const Navbar = () => {
  const isMobile = useIsMobile();
  const [showDailyReward, setShowDailyReward] = useState(false);

  useEffect(() => {
    const checkDailyReward = () => {
      const lastClaim = localStorage.getItem("lastDailyReward");
      if (!lastClaim) {
        setShowDailyReward(true);
        return;
      }

      const lastClaimDate = new Date(lastClaim);
      const now = new Date();
      const dayDiff = (now.getTime() - lastClaimDate.getTime()) / (1000 * 3600 * 24);

      if (dayDiff >= 1) {
        setShowDailyReward(true);
      }
    };

    // Check after a short delay to avoid immediate popup
    setTimeout(checkDailyReward, 1000);
  }, []);

  return (
    <nav className="fixed top-0 w-full z-50 glassmorphism">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center space-x-2">
            <Logo size="md" />
            <span className="text-xl font-bold text-gradient">Pawns</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            {isMobile ? (
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="default" size="sm" className="hover-effect">
                    <Link2 className="h-4 w-4 mr-2" />
                    Connect
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-48">
                  <div className="flex flex-col space-y-2">
                    <Button variant="outline" size="sm" className="hover-effect w-full">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Connect Lichess
                    </Button>
                    <Button variant="default" size="sm" className="hover-effect w-full">
                      <Wallet className="h-4 w-4 mr-2" />
                      Connect Wallet
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            ) : (
              <>
                <Button variant="outline" size="sm" className="hover-effect">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Connect Lichess
                </Button>
                <Button variant="default" size="sm" className="hover-effect">
                  <Wallet className="h-4 w-4 mr-2" />
                  Connect Wallet
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      <DailyRewardModal 
        isOpen={showDailyReward} 
        onClose={() => setShowDailyReward(false)} 
      />
    </nav>
  );
};

export default Navbar;
