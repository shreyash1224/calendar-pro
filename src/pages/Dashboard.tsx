import { Calendar, Clock, Zap, TrendingUp } from "lucide-react";
import { StatCard } from "@/components/StatCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import heroImage from "@/assets/hero-calendar.jpg";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {

  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-lg mb-8">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="relative bg-gradient-primary p-12 rounded-lg">
          <h1 className="text-4xl font-bold text-primary-foreground mb-4 animate-fade-in">
            Welcome to CalendarPro
          </h1>
          <p className="text-lg text-primary-foreground/90 mb-6 max-w-2xl">
            Your intelligent calendar automation platform. Streamline scheduling, automate workflows, and never miss an important event.
          </p>
          <div className="flex gap-4">
            <Button variant="secondary" size="lg" className="shadow-lg" onClick={() => navigate('/events/create')}>
              Create Event
            </Button>
            <Button variant="outline" size="lg" className="bg-background/10 border-primary-foreground/20 text-primary-foreground hover:bg-background/20">
              Set Up Automation
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8 animate-scale-in">
        <StatCard
          title="Total Events"
          value={127}
          description="This month"
          icon={Calendar}
          trend="+12% from last month"
        />
        <StatCard
          title="Active Automations"
          value={8}
          description="Running workflows"
          icon={Zap}
        />
        <StatCard
          title="Hours Saved"
          value="24.5"
          description="This week"
          icon={Clock}
          trend="+8% from last week"
        />
        <StatCard
          title="Success Rate"
          value="98.5%"
          description="Automation success"
          icon={TrendingUp}
        />
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid gap-6 md:grid-cols-2 mb-8">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Recent Events</CardTitle>
            <CardDescription>Your upcoming scheduled events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { title: "Team Meeting", time: "Today at 2:00 PM", type: "Meeting" },
                { title: "Project Review", time: "Tomorrow at 10:00 AM", type: "Review" },
                { title: "Client Call", time: "Wed at 3:30 PM", type: "Call" },
              ].map((event, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                >
                  <div>
                    <p className="font-medium">{event.title}</p>
                    <p className="text-sm text-muted-foreground">{event.time}</p>
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                    {event.type}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Active Automations</CardTitle>
            <CardDescription>Your running automation workflows</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Daily Standup Reminder", status: "Active", executions: 15 },
                { name: "Meeting Prep Automation", status: "Active", executions: 8 },
                { name: "Weekly Report Generator", status: "Active", executions: 3 },
              ].map((automation, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                >
                  <div>
                    <p className="font-medium">{automation.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {automation.executions} executions this week
                    </p>
                  </div>
                  <span className="flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks and shortcuts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <Button variant="outline" className="h-20 flex-col">
              <Calendar className="h-5 w-5 mb-2" />
              <span>Schedule Event</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Zap className="h-5 w-5 mb-2" />
              <span>Create Automation</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Clock className="h-5 w-5 mb-2" />
              <span>View Calendar</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
