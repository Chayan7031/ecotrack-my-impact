import { Link } from "react-router-dom";
import { ArrowRight, Leaf, BarChart3, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import heroImage from "@/assets/hero-eco.jpg";

const Hero = () => {
  const features = [
    {
      icon: Leaf,
      title: "Track Activities",
      description: "Log daily activities and see their carbon footprint impact",
    },
    {
      icon: BarChart3,
      title: "View Insights",
      description: "Beautiful charts and trends to visualize your progress",
    },
    {
      icon: Target,
      title: "Set Goals",
      description: "Create personal targets to reduce your carbon footprint",
    },
  ];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Eco-friendly landscape representing sustainable living"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 hero-gradient opacity-85"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="text-center lg:text-left animate-fade-up">
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Track Your Carbon Footprint
              <span className="block text-primary-glow">Make a Difference</span>
            </h1>
            
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Join thousands of eco-conscious individuals reducing their environmental impact. 
              Track daily activities, set sustainable goals, and watch your carbon footprint shrink.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
              <Link to="/activities">
                <Button variant="hero" size="lg" className="text-lg">
                  Start Tracking
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/demo">
                <Button variant="outline" size="lg" className="text-lg bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20">
                  Watch Demo
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 text-center lg:text-left">
              <div className="animate-bounce-in" style={{ animationDelay: "0.2s" }}>
                <div className="text-3xl font-bold text-white">10k+</div>
                <div className="text-white/80 text-sm">Active Users</div>
              </div>
              <div className="animate-bounce-in" style={{ animationDelay: "0.4s" }}>
                <div className="text-3xl font-bold text-white">2.5M</div>
                <div className="text-white/80 text-sm">kg CO₂ Saved</div>
              </div>
              <div className="animate-bounce-in" style={{ animationDelay: "0.6s" }}>
                <div className="text-3xl font-bold text-white">95%</div>
                <div className="text-white/80 text-sm">Goal Achievement</div>
              </div>
            </div>
          </div>

          {/* Right Column - Feature Cards */}
          <div className="space-y-6 animate-slide-in-right">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={feature.title}
                  className="card-gradient border-white/20 backdrop-blur-sm hover:shadow-glow transition-spring animate-scale-in p-6"
                  style={{ animationDelay: `${0.2 + index * 0.1}s` }}
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 eco-gradient rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-card-foreground mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-white/60">
        <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;