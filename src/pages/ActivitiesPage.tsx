import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Plus, Search, Filter, Car, Zap, ShoppingBag, Leaf, Calendar, Edit, Trash2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useActivities } from "@/hooks/useActivities";
import Navigation from "@/components/Navigation";

const ActivitiesPage = () => {
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newActivity, setNewActivity] = useState({
    type: 'transport' as const,
    description: '',
    carbon_emitted: 0,
    activity_date: new Date().toISOString().split('T')[0]
  });

  const { activities, isLoading, addActivity, deleteActivity } = useActivities();

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'transport': return Car;
      case 'energy': return Zap;
      case 'shopping': return ShoppingBag;
      case 'food': return Leaf;
      default: return Leaf;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'transport': return 'text-destructive';
      case 'energy': return 'text-warning';
      case 'shopping': return 'text-ocean';
      case 'food': return 'text-success';
      default: return 'text-success';
    }
  };

  const filteredActivities = activities.filter(activity => {
    const matchesFilter = filter === "all" || activity.type === filter;
    const matchesSearch = activity.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleAddActivity = async (e: React.FormEvent) => {
    e.preventDefault();
    await addActivity.mutateAsync(newActivity);
    setNewActivity({
      type: 'transport',
      description: '',
      carbon_emitted: 0,
      activity_date: new Date().toISOString().split('T')[0]
    });
    setIsAddDialogOpen(false);
  };

  const handleDeleteActivity = async (id: string) => {
    if (confirm('Are you sure you want to delete this activity?')) {
      await deleteActivity.mutateAsync(id);
    }
  };

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
                <h1 className="text-4xl font-bold text-foreground">Activity Log</h1>
                <p className="text-muted-foreground">Track and manage your daily activities</p>
              </div>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="hero">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Activity
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Activity</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleAddActivity} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="activity-type">Activity Type</Label>
                    <Select 
                      value={newActivity.type} 
                      onValueChange={(value: any) => setNewActivity(prev => ({ ...prev, type: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="transport">Transport</SelectItem>
                        <SelectItem value="energy">Energy</SelectItem>
                        <SelectItem value="food">Food</SelectItem>
                        <SelectItem value="shopping">Shopping</SelectItem>
                        <SelectItem value="waste">Waste</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Input
                      id="description"
                      value={newActivity.description}
                      onChange={(e) => setNewActivity(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="e.g., Drive to work"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="carbon-emitted">Carbon Emitted (kg)</Label>
                    <Input
                      id="carbon-emitted"
                      type="number"
                      step="0.1"
                      min="0"
                      value={newActivity.carbon_emitted}
                      onChange={(e) => setNewActivity(prev => ({ ...prev, carbon_emitted: parseFloat(e.target.value) || 0 }))}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="activity-date">Date</Label>
                    <Input
                      id="activity-date"
                      type="date"
                      value={newActivity.activity_date}
                      onChange={(e) => setNewActivity(prev => ({ ...prev, activity_date: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" variant="hero" disabled={addActivity.isPending}>
                      {addActivity.isPending ? "Adding..." : "Add Activity"}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
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
            const Icon = getActivityIcon(activity.type);
            const color = getActivityColor(activity.type);
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
                        <Icon className={`w-6 h-6 ${color}`} />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">
                          {activity.description}
                        </h3>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {new Date(activity.activity_date).toLocaleDateString()}
                          </span>
                          <span className="capitalize">{activity.type}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary">
                          {activity.carbon_emitted}kg
                        </div>
                        <div className="text-sm text-muted-foreground">CO₂</div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="icon">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="text-destructive hover:text-destructive"
                          onClick={() => handleDeleteActivity(activity.id)}
                          disabled={deleteActivity.isPending}
                        >
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
              <Button variant="hero" onClick={() => setIsAddDialogOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Activity
              </Button>
            </CardContent>
          </Card>
        )}
        </div>
      </div>
    </>
  );
};

export default ActivitiesPage;