
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Flame } from "lucide-react";

interface WinStreakNotificationProps {
  streak: number;
}

const WinStreakNotification = ({ streak }: WinStreakNotificationProps) => {
  const { toast } = useToast();

  useEffect(() => {
    if (streak >= 3) {
      toast({
        title: "Win Streak Activated!",
        description: (
          <div className="flex items-center space-x-2">
            <Flame className="h-5 w-5 text-[#F97316]" />
            <span>You've entered the Weekly Reward Pool! Next draw in 6d 23h</span>
          </div>
        ),
        duration: 5000,
      });
    }
  }, [streak, toast]);

  return null;
};

export default WinStreakNotification;
