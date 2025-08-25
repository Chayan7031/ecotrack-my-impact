import { Leaf, BarChart3, Target, BookOpen, Users, Smartphone } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const Features = () => {
  const features = [
    {
      icon: Leaf,
      title: "Activity Tracking",
      description: "Log daily activities like transport, energy use, food choices, and shopping habits with our intuitive interface.",
      color: "text-success"
    },
    {
      icon: BarChart3,
      title: "Beautiful Analytics",
      description: "Visualize your carbon footprint with stunning charts and insights that help you understand your environmental impact.",
      color: "text-primary"
    },
    {
      icon: Target,
      title: "Personal Goals",
      description: "Set achievable sustainability targets and track your progress towards reducing your carbon footprint over time.",
      color: "text-ocean"
    },
    {
      icon: BookOpen,
      title: "Eco Tips & Guides",
      description: "Access curated environmental tips and sustainable living guides tailored to your lifestyle and activities.",
      color: "text-warning"
    },
    {
      icon: Users,
      title: "Community Impact",
      description: "Join a community of eco-conscious individuals and see how your efforts contribute to global sustainability.",
      color: "text-earth"
    },
    {
      icon: Smartphone,
      title: "Mobile Optimized",
      description: "Track your footprint on the go with our fully responsive design that works seamlessly across all devices.",
      color: "text-destructive"
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Everything You Need to Go Green
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive tools and insights to help you reduce your environmental impact 
            and live more sustainably every day.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={feature.title}
                className="card-gradient shadow-card hover:shadow-glow transition-spring group animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-spring ${feature.color.includes('success') ? 'bg-success/20' :
                    feature.color.includes('primary') ? 'bg-primary/20' :
                    feature.color.includes('ocean') ? 'bg-ocean/20' :
                    feature.color.includes('warning') ? 'bg-warning/20' :
                    feature.color.includes('earth') ? 'bg-earth/20' :
                    'bg-destructive/20'
                    }`}>
                    <Icon className={`w-6 h-6 ${feature.color}`} />
                  </div>
                  <CardTitle className="text-xl font-semibold group-hover:text-primary transition-smooth">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 animate-fade-up">
          <div className="inline-flex items-center space-x-2 text-sm text-muted-foreground mb-4">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span>Join thousands of eco-warriors making a difference</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;