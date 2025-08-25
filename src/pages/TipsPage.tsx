import { Link } from "react-router-dom";
import { ArrowLeft, Lightbulb, Search, Filter, Car, Zap, ShoppingBag, Leaf, Heart, Share2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

const TipsPage = () => {
  const tips = [
    {
      id: 1,
      title: "Switch to Public Transportation",
      description: "Using public transport can reduce your carbon footprint by up to 40% compared to driving alone. Consider taking the bus, train, or subway for your daily commute.",
      category: "transport",
      icon: Car,
      impact: "High",
      difficulty: "Easy",
      co2Savings: "2.6kg per day",
      likes: 156,
      color: "text-destructive"
    },
    {
      id: 2,
      title: "Unplug Electronics When Not in Use",
      description: "Electronics continue to draw power even when turned off. Unplugging devices or using power strips can reduce your energy consumption by 10-15%.",
      category: "energy",
      icon: Zap,
      impact: "Medium",
      difficulty: "Easy",
      co2Savings: "0.8kg per week",
      likes: 89,
      color: "text-warning"
    },
    {
      id: 3,
      title: "Choose Local and Seasonal Produce",
      description: "Buying locally grown, seasonal fruits and vegetables reduces transportation emissions and supports your local economy.",
      category: "food",
      icon: Leaf,
      impact: "Medium",
      difficulty: "Easy",
      co2Savings: "1.2kg per week",
      likes: 203,
      color: "text-success"
    },
    {
      id: 4,
      title: "Reduce Single-Use Items",
      description: "Bring reusable bags, water bottles, and containers when shopping. This simple change can significantly reduce plastic waste and manufacturing emissions.",
      category: "shopping",
      icon: ShoppingBag,
      impact: "High",
      difficulty: "Easy",
      co2Savings: "0.5kg per week",
      likes: 134,
      color: "text-ocean"
    },
    {
      id: 5,
      title: "LED Light Bulb Upgrade",
      description: "Replace incandescent bulbs with LED lights. They use 75% less energy and last 25 times longer, making them both eco-friendly and cost-effective.",
      category: "energy",
      icon: Zap,
      impact: "Medium",
      difficulty: "Easy",
      co2Savings: "0.3kg per month",
      likes: 78,
      color: "text-warning"
    },
    {
      id: 6,
      title: "Try Meatless Mondays",
      description: "Reducing meat consumption just one day per week can have a significant environmental impact. Try delicious plant-based recipes and discover new flavors.",
      category: "food",
      icon: Leaf,
      impact: "High",
      difficulty: "Medium",
      co2Savings: "3.3kg per week",
      likes: 267,
      color: "text-success"
    },
  ];

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'High':
        return 'bg-destructive/20 text-destructive';
      case 'Medium':
        return 'bg-warning/20 text-warning';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-success/20 text-success';
      case 'Medium':
        return 'bg-warning/20 text-warning';
      default:
        return 'bg-destructive/20 text-destructive';
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
              <h1 className="text-4xl font-bold text-foreground">Eco Tips & Guides</h1>
              <p className="text-muted-foreground">Discover actionable ways to reduce your environmental impact</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-primary">{tips.length}</div>
            <div className="text-sm text-muted-foreground">Tips Available</div>
          </div>
        </div>

        {/* Featured Tip */}
        <Card className="card-gradient shadow-glow mb-8 border-primary/20">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Lightbulb className="w-6 h-6 text-primary" />
              <CardTitle className="text-primary">Tip of the Day</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-success/20 rounded-lg flex items-center justify-center">
                <Leaf className="w-6 h-6 text-success" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Choose Local and Seasonal Produce
                </h3>
                <p className="text-muted-foreground mb-4">
                  Buying locally grown, seasonal fruits and vegetables reduces transportation emissions and supports your local economy.
                </p>
                <div className="flex items-center space-x-4">
                  <Badge className="bg-success/20 text-success">High Impact</Badge>
                  <Badge className="bg-success/20 text-success">Easy</Badge>
                  <span className="text-sm text-muted-foreground">Saves 1.2kg CO₂ per week</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Filters */}
        <Card className="card-gradient shadow-card mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search eco tips..."
                    className="pl-10"
                  />
                </div>
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-full md:w-48">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="transport">Transport</SelectItem>
                  <SelectItem value="energy">Energy</SelectItem>
                  <SelectItem value="food">Food</SelectItem>
                  <SelectItem value="shopping">Shopping</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Tips Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tips.map((tip) => {
            const Icon = tip.icon;
            return (
              <Card key={tip.id} className="card-gradient shadow-card hover:shadow-glow transition-spring">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      tip.category === 'transport' ? 'bg-destructive/20' :
                      tip.category === 'energy' ? 'bg-warning/20' :
                      tip.category === 'food' ? 'bg-success/20' :
                      'bg-ocean/20'
                    }`}>
                      <Icon className={`w-6 h-6 ${tip.color}`} />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getImpactColor(tip.impact)}>
                        {tip.impact} Impact
                      </Badge>
                    </div>
                  </div>
                  <CardTitle className="text-lg leading-tight">{tip.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {tip.description}
                  </p>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Difficulty:</span>
                      <Badge className={getDifficultyColor(tip.difficulty)}>
                        {tip.difficulty}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">CO₂ Savings:</span>
                      <span className="font-medium text-primary">{tip.co2Savings}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div className="flex items-center space-x-1">
                      <Heart className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{tip.likes}</span>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Share2 className="w-4 h-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Call to Action */}
        <Card className="card-gradient shadow-card mt-12">
          <CardContent className="p-8 text-center">
            <Lightbulb className="w-16 h-16 text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-foreground mb-2">Have an Eco Tip to Share?</h3>
            <p className="text-muted-foreground mb-6">
              Help others reduce their carbon footprint by sharing your sustainable living tips and experiences.
            </p>
            <Button variant="hero" size="lg">
              Submit Your Tip
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TipsPage;