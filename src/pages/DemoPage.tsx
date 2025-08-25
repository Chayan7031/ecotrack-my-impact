import { Link } from "react-router-dom";
import { ArrowLeft, Play, CheckCircle, BarChart3, Target, Leaf } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const DemoPage = () => {
  const demoSteps = [
    {
      id: 1,
      title: "Track Your Activities",
      description: "Log daily activities like transportation, energy use, food choices, and shopping habits.",
      icon: Leaf,
      completed: true
    },
    {
      id: 2,
      title: "View Your Dashboard",
      description: "See beautiful charts and analytics showing your carbon footprint trends over time.",
      icon: BarChart3,
      completed: true
    },
    {
      id: 3,
      title: "Set Sustainability Goals",
      description: "Create personal targets to reduce your environmental impact and track progress.",
      icon: Target,
      completed: false
    },
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
            <h1 className="text-4xl font-bold text-foreground">EcoTrack Demo</h1>
            <p className="text-muted-foreground">See how easy it is to track your carbon footprint</p>
          </div>
        </div>

        {/* Video Demo Section */}
        <Card className="card-gradient shadow-glow mb-8">
          <CardContent className="p-8">
            <div className="aspect-video bg-muted/50 rounded-lg flex items-center justify-center mb-6">
              <div className="text-center">
                <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Play className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Interactive Demo Video</h3>
                <p className="text-muted-foreground">Watch how EcoTrack helps you reduce your carbon footprint</p>
              </div>
            </div>
            <div className="flex justify-center">
              <Button variant="hero" size="lg">
                <Play className="w-5 h-5 mr-2" />
                Play Demo Video
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Demo Steps */}
        <div className="space-y-6 mb-8">
          <h2 className="text-2xl font-bold text-foreground text-center">How EcoTrack Works</h2>
          
          {demoSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <Card key={step.id} className="card-gradient shadow-card">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-6">
                    {/* Step Number */}
                    <div className="flex-shrink-0">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        step.completed ? 'bg-success text-white' : 'bg-primary/20 text-primary'
                      }`}>
                        {step.completed ? <CheckCircle className="w-6 h-6" /> : <span className="font-bold">{step.id}</span>}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <Icon className="w-6 h-6 text-primary" />
                        <h3 className="text-xl font-semibold text-foreground">{step.title}</h3>
                      </div>
                      <p className="text-muted-foreground mb-4">{step.description}</p>
                      
                      {/* Demo Action */}
                      <div className="flex items-center space-x-4">
                        <Button variant={step.completed ? "eco" : "hero"} size="sm">
                          {step.completed ? "View Example" : "Try Now"}
                        </Button>
                        {step.completed && (
                          <span className="text-success text-sm font-medium">✓ Demo Available</span>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Interactive Demo Features */}
        <Card className="card-gradient shadow-card mb-8">
          <CardHeader>
            <CardTitle>Try These Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-foreground">Sample Dashboard</h4>
                <div className="h-32 bg-muted/50 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <BarChart3 className="w-8 h-8 text-primary mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Interactive Charts</p>
                  </div>
                </div>
                <Link to="/dashboard">
                  <Button variant="outline" className="w-full">
                    View Sample Dashboard
                  </Button>
                </Link>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-foreground">Activity Tracking</h4>
                <div className="h-32 bg-muted/50 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Leaf className="w-8 h-8 text-success mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Log Activities</p>
                  </div>
                </div>
                <Link to="/activities">
                  <Button variant="outline" className="w-full">
                    Try Activity Logger
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <Card className="card-gradient shadow-glow border-primary/20">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold text-foreground mb-4">Ready to Start Your Journey?</h3>
            <p className="text-muted-foreground mb-6">
              Join thousands of users who are already making a positive impact on the environment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/auth">
                <Button variant="hero" size="lg">
                  Get Started for Free
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button variant="outline" size="lg">
                  Explore More Features
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DemoPage;