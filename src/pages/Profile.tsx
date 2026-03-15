import { useAuth } from "@/hooks/useAuth";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut, User } from "lucide-react";

const ProfilePage = () => {
  const { user, isAdmin, signOut } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center space-y-2">
          <div className="mx-auto w-16 h-16 rounded-full bg-muted flex items-center justify-center">
            <User className="w-8 h-8 text-muted-foreground" />
          </div>
          <h1 className="font-heading text-2xl font-bold text-foreground">Your Profile</h1>
          <p className="text-sm text-muted-foreground">{user?.email}</p>
          {isAdmin && (
            <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full bg-accent/15 text-accent-foreground">
              Admin
            </span>
          )}
        </div>

        <div className="space-y-3">
          {isAdmin && (
            <Button asChild variant="outline" className="w-full">
              <Link to="/admin">Go to Admin Panel</Link>
            </Button>
          )}
          <Button
            variant="ghost"
            className="w-full"
            onClick={() => signOut()}
          >
            <LogOut className="w-4 h-4 mr-2" /> Sign Out
          </Button>
        </div>

        <Link to="/" className="block text-center text-sm text-muted-foreground hover:text-foreground">
          ← Back to home
        </Link>
      </div>
    </div>
  );
};

export default ProfilePage;
