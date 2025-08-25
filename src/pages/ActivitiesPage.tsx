import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Plus, Search, Filter, Car, Zap, ShoppingBag, Leaf, Calendar, Edit, Trash2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ActivitiesPage = () => {
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const activities = [
    {
      id: 1,
      type: "transport",
      icon: Car,
      description: "Drive to work",
      carbonEmitted: 2.5,
      date: "2024-01-24",
      color: "text-destructive"
    },
    {
      id: 2,
      type: "energy",
      icon: Zap,
      description: "Home electricity usage",
      carbonEmitted: 1.2,
      date: "2024-01-24",
      color: "text-warning"
    },
    {
      id: 3,
      type: "shopping",
      icon: ShoppingBag,
      description: "Grocery shopping",
      carbonEmitted: 0.8,
      date: "2024-01-23",
      color: "text-ocean"
    },
    {
      id: 4,
      type: "food",
      icon: Leaf,
      description: "Lunch at restaurant",
      carbonEmitted: 0.5,
      date: "2024-01-23",
      color: "text-success"
    },
  ];

  const filteredActivities = activities.filter(activity => {
    const matchesFilter = filter === "all" || activity.type === filter;
    const matchesSearch = activity.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

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
              <h1 className="text-4xl font-bold text-foreground">Activity Log</h1>
              <p className="text-muted-foreground">Track and manage your daily activities</p>
            </div>
          </div>
          <Button variant="hero">
            <Plus className="w-4 h-4 mr-2" />
            Add Activity
          </Button>
        </div>

        {/* Filters */}
        <Card className="card-gradient shadow-card mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search activities..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Activities</SelectItem>
                  <SelectItem value="transport">Transport</SelectItem>
                  <SelectItem value="energy">Energy</SelectItem>
                  <SelectItem value="shopping">Shopping</SelectItem>
                  <SelectItem value="food">Food</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Activities List */}
        <div className="space-y-4">
          {filteredActivities.map((activity) => {
            const Icon = activity.icon;
            return (
              <Card key={activity.id} className="card-gradient shadow-card hover:shadow-glow transition-spring">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        activity.type === 'transport' ? 'bg-destructive/20' :
                        activity.type === 'energy' ? 'bg-warning/20' :
                        activity.type === 'shopping' ? 'bg-ocean/20' :
                        'bg-success/20'
                      }`}>
                        <Icon className={`w-6 h-6 ${activity.color}`} />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">
                          {activity.description}
                        </h3>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {activity.date}
                          </span>
                          <span className="capitalize">{activity.type}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary">
                          {activity.carbonEmitted}kg
                        </div>
                        <div className="text-sm text-muted-foreground">CO₂</div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="icon">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredActivities.length === 0 && (
          <Card className="card-gradient shadow-card">
            <CardContent className="p-12 text-center">
              <Leaf className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No activities found</h3>
              <p className="text-muted-foreground mb-6">
                Start tracking your carbon footprint by adding your first activity.
              </p>
              <Button variant="hero">
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Activity
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ActivitiesPage;