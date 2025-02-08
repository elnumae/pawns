
import { Button } from "@/components/ui/button";
import { ArrowUp, Wallet, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full z-50 glassmorphism">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center space-x-2">
            <ArrowUp className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-gradient">Pawns</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" className="hover-effect">
              <ExternalLink className="h-4 w-4 mr-2" />
              Connect Lichess
            </Button>
            <Button variant="default" size="sm" className="hover-effect">
              <Wallet className="h-4 w-4 mr-2" />
              Connect Wallet
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
