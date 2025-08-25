import { Link } from "react-router-dom";
import { ArrowLeft, User, Settings, Bell, Shield, HelpCircle, LogOut, Edit, Camera, Award, TrendingDown } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";

const ProfilePage = () => {
  const userStats = [
    { label: "Total CO₂ Saved", value: "127.3kg", trend: "+12%" },
    { label: "Activities Logged", value: "89", trend: "+5" },
    { label: "Goals Achieved", value: "7/9", trend: "78%" },
    { label: "Streak Days", value: "23", trend: "+1" },
  ];

  const achievements = [
    { id: 1, title: "Eco Warrior", description: "Logged 100 activities", earned: true },
    { id: 2, title: "Goal Crusher", description: "Achieved 5 goals", earned: true },
    { id: 3, title: "Green Streak", description: "30 days of tracking", earned: false },
    { id: 4, title: "Carbon Saver", description: "Saved 200kg CO₂", earned: false },
  ];

  const menuItems = [
    { icon: User, title: "Personal Information", description: "Update your profile details" },
    { icon: Bell, title: "Notifications", description: "Manage notification preferences" },
    { icon: Shield, title: "Privacy & Security", description: "Control your data and privacy" },
    { icon: Settings, title: "App Settings", description: "Customize your experience" },
    { icon: HelpCircle, title: "Help & Support", description: "Get help and contact support" },
  ];

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <Link to="/" className="text-muted-foreground hover:text-primary">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <div>
            <h1 className="text-4xl font-bold text-foreground">Profile</h1>
            <p className="text-muted-foreground">Manage your account and preferences</p>
          </div>
        </div>

        {/* Profile Card */}
        <Card className="card-gradient shadow-card mb-8">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
              {/* Avatar */}
              <div className="relative">
                <Avatar className="w-32 h-32">
                  <AvatarImage src="/placeholder-avatar.jpg" alt="Profile" />
                  <AvatarFallback className="text-2xl bg-primary/20 text-primary">JD</AvatarFallback>
                </Avatar>
                <Button 
                  size="icon" 
                  variant="secondary" 
                  className="absolute bottom-2 right-2 rounded-full w-8 h-8"
                >
                  <Camera className="w-4 h-4" />
                </Button>
              </div>

              {/* Profile Info */}
              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h2 className="text-3xl font-bold text-foreground mb-2">John Doe</h2>
                    <p className="text-muted-foreground mb-2">john.doe@example.com</p>
                    <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                      <Badge className="bg-success/20 text-success">Eco Enthusiast</Badge>
                      <Badge className="bg-primary/20 text-primary">Goal Achiever</Badge>
                    </div>
                  </div>
                  <Button variant="outline">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {userStats.map((stat, index) => (
                    <div key={index} className="text-center p-4 bg-muted/50 rounded-lg">
                      <div className="text-2xl font-bold text-primary mb-1">{stat.value}</div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                      <div className="text-xs text-success">{stat.trend}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card className="card-gradient shadow-card mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Award className="w-6 h-6 text-primary" />
              <span>Achievements</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {achievements.map((achievement) => (
                <div 
                  key={achievement.id} 
                  className={`p-4 rounded-lg border-2 transition-colors ${
                    achievement.earned 
                      ? 'border-success/50 bg-success/10' 
                      : 'border-muted bg-muted/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className={`font-semibold ${
                        achievement.earned ? 'text-success' : 'text-muted-foreground'
                      }`}>
                        {achievement.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">{achievement.description}</p>
                    </div>
                    {achievement.earned && (
                      <Award className="w-6 h-6 text-success" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Settings Menu */}
        <Card className="card-gradient shadow-card mb-8">
          <CardHeader>
            <CardTitle>Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <div 
                  key={index}
                  className="flex items-center justify-between p-4 rounded-lg hover:bg-accent transition-colors cursor-pointer"
                >
                  <div className="flex items-center space-x-4">
                    <Icon className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <h4 className="font-medium text-foreground">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    Configure
                  </Button>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Quick Settings */}
        <Card className="card-gradient shadow-card mb-8">
          <CardHeader>
            <CardTitle>Quick Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-foreground">Daily Reminders</h4>
                <p className="text-sm text-muted-foreground">Get reminded to log your activities</p>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-foreground">Goal Notifications</h4>
                <p className="text-sm text-muted-foreground">Receive updates on goal progress</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-foreground">Weekly Reports</h4>
                <p className="text-sm text-muted-foreground">Get weekly carbon footprint summaries</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="border-destructive/50 shadow-card">
          <CardHeader>
            <CardTitle className="text-destructive">Account Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-foreground">Sign Out</h4>
                <p className="text-sm text-muted-foreground">Sign out of your account</p>
              </div>
              <Button variant="outline">
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-destructive">Delete Account</h4>
                <p className="text-sm text-muted-foreground">Permanently delete your account and data</p>
              </div>
              <Button variant="destructive">
                Delete Account
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;