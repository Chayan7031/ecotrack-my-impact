import { Link } from "react-router-dom";
import { ArrowLeft, Target, Plus, TrendingDown, Calendar, CheckCircle, AlertCircle } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const GoalsPage = () => {
  const goals = [
    {
      id: 1,
      title: "Reduce Weekly Transport Emissions",
      target: 10,
      current: 7.2,
      period: "weekly",
      status: "active",
      deadline: "2024-01-31",
      description: "Cut transport emissions by 30% compared to last month"
    },
    {
      id: 2,
      title: "Daily Energy Limit",
      target: 2,
      current: 1.3,
      period: "daily",
      status: "active",
      deadline: "2024-01-25",
      description: "Keep daily energy consumption under 2kg CO₂"
    },
    {
      id: 3,
      title: "Monthly Carbon Budget",
      target: 50,
      current: 15.6,
      period: "monthly",
      status: "completed",
      deadline: "2024-01-31",
      description: "Stay within 50kg CO₂ monthly budget"
    },
  ];

  const getProgressPercentage = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-success';
      case 'at-risk':
        return 'text-warning';
      default:
        return 'text-primary';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return CheckCircle;
      case 'at-risk':
        return AlertCircle;
      default:
        return Target;
    }
  };

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
              <h1 className="text-4xl font-bold text-foreground">Sustainability Goals</h1>
              <p className="text-muted-foreground">Set and track your carbon reduction targets</p>
            </div>
          </div>
          <Button variant="hero">
            <Plus className="w-4 h-4 mr-2" />
            New Goal
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="card-gradient shadow-card">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-success mb-2">2</div>
              <div className="text-muted-foreground">Active Goals</div>
            </CardContent>
          </Card>
          <Card className="card-gradient shadow-card">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">1</div>
              <div className="text-muted-foreground">Completed</div>
            </CardContent>
          </Card>
          <Card className="card-gradient shadow-card">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-warning mb-2">68%</div>
              <div className="text-muted-foreground">Avg Progress</div>
            </CardContent>
          </Card>
        </div>

        {/* Goals List */}
        <div className="space-y-6">
          {goals.map((goal) => {
            const StatusIcon = getStatusIcon(goal.status);
            const progress = getProgressPercentage(goal.current, goal.target);
            
            return (
              <Card key={goal.id} className="card-gradient shadow-card hover:shadow-glow transition-spring">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center space-x-3">
                      <StatusIcon className={`w-6 h-6 ${getStatusColor(goal.status)}`} />
                      <span>{goal.title}</span>
                    </CardTitle>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>{goal.deadline}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6">{goal.description}</p>
                  
                  <div className="space-y-4">
                    {/* Progress Bar */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Progress</span>
                        <span className="text-sm text-muted-foreground">
                          {goal.current}kg / {goal.target}kg CO₂
                        </span>
                      </div>
                      <Progress value={progress} className="h-2" />
                    </div>

                    {/* Status and Actions */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                          goal.status === 'completed' ? 'bg-success/20 text-success' :
                          goal.status === 'at-risk' ? 'bg-warning/20 text-warning' :
                          'bg-primary/20 text-primary'
                        }`}>
                          {goal.status}
                        </span>
                        <span className="text-sm text-muted-foreground capitalize">
                          {goal.period} goal
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                        {goal.status === 'active' && (
                          <Button variant="eco" size="sm">
                            <TrendingDown className="w-4 h-4 mr-2" />
                            Track Progress
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Call to Action */}
        <Card className="card-gradient shadow-card mt-8">
          <CardContent className="p-8 text-center">
            <Target className="w-16 h-16 text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-foreground mb-2">Ready to Set a New Goal?</h3>
            <p className="text-muted-foreground mb-6">
              Create personalized targets to reduce your carbon footprint and track your environmental impact.
            </p>
            <Button variant="hero" size="lg">
              <Plus className="w-5 h-5 mr-2" />
              Create Your First Goal
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GoalsPage;