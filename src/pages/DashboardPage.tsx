import { useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, TrendingDown, Leaf, Zap, Car, ShoppingBag, Plus } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useActivities } from "@/hooks/useActivities";
import { useAuth } from "@/hooks/useAuth";
import Navigation from "@/components/Navigation";

const DashboardPage = () => {
  const { user } = useAuth();
  const { activities, isLoading } = useActivities();

  // Calculate activity breakdown from real data
  const activityBreakdown = useMemo(() => {
    const breakdown = activities.reduce((acc, activity) => {
      const type = activity.type;
      if (!acc[type]) {
        acc[type] = 0;
      }
      acc[type] += activity.carbon_emitted;
      return acc;
    }, {} as Record<string, number>);

    return [
      { icon: Car, type: "Transport", amount: breakdown.transport || 0, color: "text-destructive" },
      { icon: Zap, type: "Energy", amount: breakdown.energy || 0, color: "text-warning" },
      { icon: ShoppingBag, type: "Shopping", amount: breakdown.shopping || 0, color: "text-ocean" },
      { icon: Leaf, type: "Food", amount: breakdown.food || 0, color: "text-success" },
    ];
  }, [activities]);

  // Calculate weekly data from real activities
  const weeklyData = useMemo(() => {
    const today = new Date();
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    const weekData = [];
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dayActivities = activities.filter(activity => {
        const activityDate = new Date(activity.activity_date);
        return activityDate.toDateString() === date.toDateString();
      });
      
      const totalEmissions = dayActivities.reduce((sum, activity) => 
        sum + activity.carbon_emitted, 0
      );
      
      weekData.push({
        day: weekdays[date.getDay()],
        emissions: totalEmissions,
      });
    }
    
    return weekData;
  }, [activities]);

  // Calculate today's emissions
  const todayEmissions = useMemo(() => {
    const today = new Date().toDateString();
    return activities
      .filter(activity => new Date(activity.activity_date).toDateString() === today)
      .reduce((sum, activity) => sum + activity.carbon_emitted, 0);
  }, [activities]);

  const weeklyAverage = useMemo(() => {
    const total = weeklyData.reduce((sum, day) => sum + day.emissions, 0);
    return total / 7;
  }, [weeklyData]);

  return (
    <>
      <Navigation />
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
                    <span>Weekly Average: {weeklyAverage.toFixed(1)}kg CO₂</span>
                    <span className="flex items-center text-success">
                      <TrendingDown className="w-4 h-4 mr-1" />
                      Track for trends
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
                  <div className="text-4xl font-bold text-primary mb-2">{todayEmissions.toFixed(1)}kg</div>
                  <div className="text-muted-foreground mb-4">CO₂ emitted today</div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-success h-2 rounded-full" style={{ width: `${Math.min((todayEmissions / 2) * 100, 100)}%` }}></div>
                  </div>
                  <div className="text-sm text-muted-foreground mt-2">
                    {Math.round((todayEmissions / 2) * 100)}% of daily goal (2kg)
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
                  {activityBreakdown.map((activity) => {
                    const Icon = activity.icon;
                    return (
                      <div key={activity.type} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Icon className={`w-5 h-5 ${activity.color}`} />
                          <span className="font-medium">{activity.type}</span>
                        </div>
                        <span className="text-muted-foreground">{activity.amount.toFixed(1)}kg</span>
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
    </>
  );
};

export default DashboardPage;