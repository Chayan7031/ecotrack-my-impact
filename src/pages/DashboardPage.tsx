import { Link } from "react-router-dom";
import { ArrowLeft, TrendingDown, Leaf, Zap, Car, ShoppingBag, Plus } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const DashboardPage = () => {
  const weeklyData = [
    { day: "Mon", emissions: 2.1 },
    { day: "Tue", emissions: 1.8 },
    { day: "Wed", emissions: 2.4 },
    { day: "Thu", emissions: 1.5 },
    { day: "Fri", emissions: 2.8 },
    { day: "Sat", emissions: 1.2 },
    { day: "Sun", emissions: 0.9 },
  ];

  const activities = [
    { icon: Car, type: "Transport", amount: 0.8, color: "text-destructive" },
    { icon: Zap, type: "Energy", amount: 0.4, color: "text-warning" },
    { icon: ShoppingBag, type: "Shopping", amount: 0.3, color: "text-ocean" },
    { icon: Leaf, type: "Food", amount: 0.2, color: "text-success" },
  ];

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-muted-foreground hover:text-primary">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <div>
              <h1 className="text-4xl font-bold text-foreground">Carbon Dashboard</h1>
              <p className="text-muted-foreground">Track your environmental impact</p>
            </div>
          </div>
          <Link to="/activities">
            <Button variant="hero">
              <Plus className="w-4 h-4 mr-2" />
              Log Activity
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Chart Area */}
          <div className="lg:col-span-2">
            <Card className="card-gradient shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingDown className="w-6 h-6 text-success" />
                  <span>Weekly Carbon Footprint</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-end justify-between h-48 bg-muted/50 rounded-lg p-4">
                    {weeklyData.map((data) => (
                      <div key={data.day} className="flex flex-col items-center space-y-2">
                        <div
                          className="bg-primary rounded-t-md w-8 transition-all duration-500 hover:bg-primary-light cursor-pointer"
                          style={{ height: `${(data.emissions / 3) * 100}%` }}
                        ></div>
                        <span className="text-sm text-muted-foreground font-medium">
                          {data.day}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {data.emissions}kg
                        </span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex justify-between items-center text-sm text-muted-foreground">
                    <span>Weekly Average: 1.7kg CO₂</span>
                    <span className="flex items-center text-success">
                      <TrendingDown className="w-4 h-4 mr-1" />
                      -12% from last week
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card className="card-gradient shadow-card">
              <CardHeader>
                <CardTitle className="text-lg">Today's Impact</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">1.3kg</div>
                  <div className="text-muted-foreground mb-4">CO₂ emitted today</div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-success h-2 rounded-full" style={{ width: "65%" }}></div>
                  </div>
                  <div className="text-sm text-muted-foreground mt-2">
                    65% of daily goal (2kg)
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Activity Breakdown */}
            <Card className="card-gradient shadow-card">
              <CardHeader>
                <CardTitle className="text-lg">Activity Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activities.map((activity) => {
                    const Icon = activity.icon;
                    return (
                      <div key={activity.type} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Icon className={`w-5 h-5 ${activity.color}`} />
                          <span className="font-medium">{activity.type}</span>
                        </div>
                        <span className="text-muted-foreground">{activity.amount}kg</span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="card-gradient shadow-card">
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link to="/activities" className="block">
                  <Button variant="eco" size="sm" className="w-full justify-start">
                    <Leaf className="w-4 h-4 mr-2" />
                    Log Activity
                  </Button>
                </Link>
                <Link to="/dashboard" className="block">
                  <Button variant="ocean" size="sm" className="w-full justify-start">
                    <TrendingDown className="w-4 h-4 mr-2" />
                    View Trends
                  </Button>
                </Link>
                <Link to="/activities" className="block">
                  <Button variant="earth" size="sm" className="w-full justify-start">
                    <Car className="w-4 h-4 mr-2" />
                    Add Transport
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;