import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogOut, User, Loader2, Calendar, MapPin } from "lucide-react";

interface Registration {
  id: string;
  course_title: string;
  created_at: string;
}

const ProfilePage = () => {
  const { user, isAdmin, signOut } = useAuth();
  const { toast } = useToast();

  // Password change
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [savingPassword, setSavingPassword] = useState(false);

  // Email change
  const [newEmail, setNewEmail] = useState("");
  const [savingEmail, setSavingEmail] = useState(false);

  // Registrations
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loadingRegs, setLoadingRegs] = useState(true);

  useEffect(() => {
    if (!user) return;
    const fetchRegistrations = async () => {
      const { data } = await supabase
        .from("registrations")
        .select("id, course_title, created_at")
        .eq("email", user.email ?? "")
        .order("created_at", { ascending: false });
      setRegistrations(data ?? []);
      setLoadingRegs(false);
    };
    fetchRegistrations();
  }, [user]);

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      toast({ title: "Password too short", description: "Must be at least 6 characters", variant: "destructive" });
      return;
    }
    if (newPassword !== confirmPassword) {
      toast({ title: "Passwords don't match", variant: "destructive" });
      return;
    }
    setSavingPassword(true);
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    setSavingPassword(false);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Password updated" });
      setNewPassword("");
      setConfirmPassword("");
    }
  };

  const handleEmailChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmail) return;
    setSavingEmail(true);
    const { error } = await supabase.auth.updateUser({ email: newEmail });
    setSavingEmail(false);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Confirmation sent", description: "Check your new email to confirm the change." });
      setNewEmail("");
    }
  };

  return (
    <div className="min-h-screen bg-background px-4 py-12">
      <div className="w-full max-w-lg mx-auto space-y-8">
        {/* Header */}
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

        <Tabs defaultValue="registrations" className="w-full">
          <TabsList className="w-full">
            <TabsTrigger value="registrations" className="flex-1">My Events</TabsTrigger>
            <TabsTrigger value="settings" className="flex-1">Settings</TabsTrigger>
          </TabsList>

          {/* Registrations tab */}
          <TabsContent value="registrations" className="mt-6">
            {loadingRegs ? (
              <div className="text-center py-8">
                <Loader2 className="w-5 h-5 animate-spin mx-auto text-muted-foreground" />
              </div>
            ) : registrations.length === 0 ? (
              <div className="text-center py-8 space-y-2">
                <Calendar className="w-8 h-8 mx-auto text-muted-foreground" />
                <p className="text-muted-foreground text-sm">You haven't registered for any events yet.</p>
                <Button asChild variant="outline" size="sm">
                  <Link to="/#courses">Browse Courses</Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {registrations.map((r) => (
                  <div
                    key={r.id}
                    className="flex items-center justify-between p-4 rounded-lg border border-border bg-card"
                  >
                    <div>
                      <p className="font-medium text-foreground text-sm">{r.course_title}</p>
                      <p className="text-xs text-muted-foreground">
                        Registered {new Date(r.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                      </p>
                    </div>
                    <MapPin className="w-4 h-4 text-accent shrink-0" />
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Settings tab */}
          <TabsContent value="settings" className="mt-6 space-y-6">
            {/* Change email */}
            <form onSubmit={handleEmailChange} className="space-y-3">
              <h3 className="font-heading font-semibold text-foreground">Change Email</h3>
              <div className="space-y-2">
                <Label htmlFor="newEmail">New Email</Label>
                <Input
                  id="newEmail"
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="new@example.com"
                  required
                />
              </div>
              <Button type="submit" size="sm" disabled={savingEmail}>
                {savingEmail ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                Update Email
              </Button>
            </form>

            <hr className="border-border" />

            {/* Change password */}
            <form onSubmit={handlePasswordChange} className="space-y-3">
              <h3 className="font-heading font-semibold text-foreground">Change Password</h3>
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input
                  id="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  minLength={6}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  minLength={6}
                  required
                />
              </div>
              <Button type="submit" size="sm" disabled={savingPassword}>
                {savingPassword ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                Update Password
              </Button>
            </form>
          </TabsContent>
        </Tabs>

        {/* Actions */}
        <div className="space-y-3">
          {isAdmin && (
            <Button asChild variant="outline" className="w-full">
              <Link to="/admin">Go to Admin Panel</Link>
            </Button>
          )}
          <Button variant="ghost" className="w-full" onClick={() => signOut()}>
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
