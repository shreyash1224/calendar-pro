import { Plus, Zap, Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";

const Automations = () => {
  const automations = [
    {
      id: 1,
      name: "Daily Standup Reminder",
      description: "Sends a reminder 15 minutes before daily standup meetings",
      trigger: "Before Event",
      action: "Send Notification",
      status: "active",
      executions: 156,
    },
    {
      id: 2,
      name: "Meeting Prep Automation",
      description: "Automatically creates prep tasks for upcoming meetings",
      trigger: "New Event Created",
      action: "Create Tasks",
      status: "active",
      executions: 89,
    },
    {
      id: 3,
      name: "Weekly Report Generator",
      description: "Generates and emails weekly calendar summary every Friday",
      trigger: "Schedule (Weekly)",
      action: "Send Email",
      status: "active",
      executions: 12,
    },
    {
      id: 4,
      name: "Overtime Alert",
      description: "Notifies when weekly meeting hours exceed threshold",
      trigger: "Condition Met",
      action: "Send Alert",
      status: "paused",
      executions: 7,
    },
  ];

  return (
    <div className="min-h-screen">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Automations</h1>
          <p className="text-muted-foreground">
            Create workflows to automate your calendar management
          </p>
        </div>
        <Button variant="gradient" size="lg" className="gap-2">
          <Plus className="h-4 w-4" />
          Create Automation
        </Button>
      </div>

      {/* Overview Stats */}
      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Automations</CardTitle>
            <Zap className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">3 running now</p>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Executions</CardTitle>
            <Play className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">264</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <Zap className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">98.5%</div>
            <p className="text-xs text-primary">+2.5% from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Automations List */}
      <div className="space-y-4">
        {automations.map((automation) => (
          <Card
            key={automation.id}
            className="shadow-card hover:shadow-elegant transition-all duration-300"
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <CardTitle className="text-xl">{automation.name}</CardTitle>
                    <Badge
                      variant="outline"
                      className={
                        automation.status === "active"
                          ? "bg-primary/10 text-primary border-primary/20"
                          : "bg-muted"
                      }
                    >
                      {automation.status === "active" ? (
                        <span className="flex items-center gap-1">
                          <span className="flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-primary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                          </span>
                          Active
                        </span>
                      ) : (
                        <span className="flex items-center gap-1">
                          <Pause className="h-3 w-3" />
                          Paused
                        </span>
                      )}
                    </Badge>
                  </div>
                  <CardDescription>{automation.description}</CardDescription>
                </div>
                <Switch defaultChecked={automation.status === "active"} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex gap-6 text-sm">
                  <div>
                    <span className="text-muted-foreground">Trigger:</span>{" "}
                    <span className="font-medium">{automation.trigger}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Action:</span>{" "}
                    <span className="font-medium">{automation.action}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Executions:</span>{" "}
                    <span className="font-medium">{automation.executions}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                  <Button variant="ghost" size="sm">
                    Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Templates Section */}
      <Card className="shadow-card mt-8">
        <CardHeader>
          <CardTitle>Automation Templates</CardTitle>
          <CardDescription>
            Quick start with pre-built automation templates
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                title: "Meeting Reminder",
                description: "Send reminders before meetings",
              },
              {
                title: "Task Creator",
                description: "Auto-create tasks from events",
              },
              {
                title: "Calendar Sync",
                description: "Sync with external calendars",
              },
            ].map((template, i) => (
              <Card key={i} className="hover:border-primary transition-colors cursor-pointer">
                <CardHeader>
                  <Zap className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-base">{template.title}</CardTitle>
                  <CardDescription className="text-sm">
                    {template.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" size="sm" className="w-full">
                    Use Template
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Automations;
