import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Target, Plus, TrendingDown, Calendar, CheckCircle, AlertCircle, Trash2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useGoals } from "@/hooks/useGoals";

const GoalsPage = () => {
  const { goals, isLoading, addGoal, updateGoal, deleteGoal } = useGoals();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  type GoalStatus = "active" | "completed" | "paused";
  type GoalCategory = "general" | "transport" | "energy" | "food" | "shopping" | "waste";
  const [newGoal, setNewGoal] = useState({
    title: "",
    description: "",
    target_value: 0,
    current_value: 0,
    target_date: "",
    status: "active" as GoalStatus,
    category: "general" as GoalCategory
  });
  const [editGoal, setEditGoal] = useState<null | (typeof newGoal & { id?: string })>(null);

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

  const handleAddGoal = async (e: React.FormEvent) => {
    e.preventDefault();
    await addGoal.mutateAsync(newGoal);
    setNewGoal({
      title: "",
      description: "",
      target_value: 0,
      current_value: 0,
      target_date: "",
      status: "active",
      category: "general"
    });
    setIsAddDialogOpen(false);
  };

  const handleEditGoal = (goal: any) => {
    setEditGoal(goal);
    setIsEditDialogOpen(true);
  };

  const handleUpdateGoal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editGoal || !editGoal.id) return;
    await updateGoal.mutateAsync({ ...editGoal, id: editGoal.id });
    setIsEditDialogOpen(false);
    setEditGoal(null);
  };

  const handleDeleteGoal = async (id: string) => {
    if (confirm('Are you sure you want to delete this goal?')) {
      await deleteGoal.mutateAsync(id);
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
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="hero">
                <Link to="/goals/new">
                <Plus className="w-4 h-4 mr-2" />
                New Goal
                </Link>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Goal</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddGoal} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="goal-title">Title</Label>
                  <Input
                    id="goal-title"
                    value={newGoal.title}
                    onChange={(e) => setNewGoal(prev => ({ ...prev, title: e.target.value }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="goal-description">Description</Label>
                  <Input
                    id="goal-description"
                    value={newGoal.description}
                    onChange={(e) => setNewGoal(prev => ({ ...prev, description: e.target.value }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="goal-target">Target (kg CO₂)</Label>
                  <Input
                    id="goal-target"
                    type="number"
                    min="0"
                    value={newGoal.target_value}
                    onChange={(e) => setNewGoal(prev => ({ ...prev, target_value: parseFloat(e.target.value) || 0 }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="goal-current">Current (kg CO₂)</Label>
                  <Input
                    id="goal-current"
                    type="number"
                    min="0"
                    value={newGoal.current_value}
                    onChange={(e) => setNewGoal(prev => ({ ...prev, current_value: parseFloat(e.target.value) || 0 }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="goal-category">Category</Label>
                  <select
                    id="goal-category"
                    value={newGoal.category}
                    onChange={(e) => setNewGoal(prev => ({ ...prev, category: e.target.value as GoalCategory }))}
                    required
                    className="w-full border rounded px-3 py-2"
                  >
                    <option value="general">General</option>
                    <option value="transport">Transport</option>
                    <option value="energy">Energy</option>
                    <option value="food">Food</option>
                    <option value="shopping">Shopping</option>
                    <option value="waste">Waste</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="goal-status">Status</Label>
                  <select
                    id="goal-status"
                    value={newGoal.status}
                    onChange={(e) => setNewGoal(prev => ({ ...prev, status: e.target.value as "active" | "completed" | "paused" }))}
                    required
                    className="w-full border rounded px-3 py-2"
                  >
                    <option value="active">Active</option>
                    <option value="completed">Completed</option>
                    <option value="paused">Paused</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="goal-date">Target Date</Label>
                  <Input
                    id="goal-date"
                    type="date"
                    value={newGoal.target_date}
                    onChange={(e) => setNewGoal(prev => ({ ...prev, target_date: e.target.value }))}
                    required
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" variant="hero" disabled={addGoal.isPending}>
                    {addGoal.isPending ? "Adding..." : "Add Goal"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
          {/* Edit Goal Dialog */}
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Goal</DialogTitle>
              </DialogHeader>
              {editGoal && (
                <form onSubmit={handleUpdateGoal} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-goal-title">Title</Label>
                    <Input
                      id="edit-goal-title"
                      value={editGoal.title}
                      onChange={(e) => setEditGoal((prev: any) => ({ ...prev, title: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-goal-description">Description</Label>
                    <Input
                      id="edit-goal-description"
                      value={editGoal.description}
                      onChange={(e) => setEditGoal((prev: any) => ({ ...prev, description: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-goal-target">Target (kg CO₂)</Label>
                    <Input
                      id="edit-goal-target"
                      type="number"
                      min="0"
                      value={editGoal.target_value}
                      onChange={(e) => setEditGoal((prev: any) => ({ ...prev, target_value: parseFloat(e.target.value) || 0 }))}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-goal-current">Current (kg CO₂)</Label>
                    <Input
                      id="edit-goal-current"
                      type="number"
                      min="0"
                      value={editGoal.current_value}
                      onChange={(e) => setEditGoal((prev: any) => ({ ...prev, current_value: parseFloat(e.target.value) || 0 }))}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-goal-category">Category</Label>
                    <select
                      id="edit-goal-category"
                      value={editGoal.category}
                      onChange={(e) => setEditGoal((prev: any) => ({ ...prev, category: e.target.value as GoalCategory }))}
                      required
                      className="w-full border rounded px-3 py-2"
                    >
                      <option value="general">General</option>
                      <option value="transport">Transport</option>
                      <option value="energy">Energy</option>
                      <option value="food">Food</option>
                      <option value="shopping">Shopping</option>
                      <option value="waste">Waste</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-goal-status">Status</Label>
                    <select
                      id="edit-goal-status"
                      value={editGoal.status}
                      onChange={(e) => setEditGoal((prev: any) => ({ ...prev, status: e.target.value as "active" | "completed" | "paused" }))}
                      required
                      className="w-full border rounded px-3 py-2"
                    >
                      <option value="active">Active</option>
                      <option value="completed">Completed</option>
                      <option value="paused">Paused</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-goal-date">Target Date</Label>
                    <Input
                      id="edit-goal-date"
                      type="date"
                      value={editGoal.target_date}
                      onChange={(e) => setEditGoal((prev: any) => ({ ...prev, target_date: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" variant="hero" disabled={updateGoal.isPending}>
                      {updateGoal.isPending ? "Updating..." : "Update Goal"}
                    </Button>
                  </div>
                </form>
              )}
            </DialogContent>
          </Dialog>
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
          {isLoading ? (
            <div className="text-center text-muted-foreground">Loading goals...</div>
          ) : goals.length === 0 ? (
            <Card className="card-gradient shadow-card">
              <CardContent className="p-12 text-center">
                <Target className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">No goals found</h3>
                <p className="text-muted-foreground mb-6">
                  Start by creating your first sustainability goal.
                </p>
                <Button variant="hero" onClick={() => setIsAddDialogOpen(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Your First Goal
                </Button>
              </CardContent>
            </Card>
          ) : (
            goals.map((goal: any) => {
              const StatusIcon = getStatusIcon(goal.status);
              const progress = getProgressPercentage(goal.current_value, goal.target_value);
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
                        <span>{goal.target_date}</span>
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
                            {goal.current_value}kg / {goal.target_value}kg CO₂
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
                            {goal.category} goal
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm" onClick={() => handleEditGoal(goal)}>
                            Edit
                          </Button>
                          <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => handleDeleteGoal(goal.id)}>
                            <Trash2 className="w-4 h-4" />
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
            })
          )}
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