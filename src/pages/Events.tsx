import { Plus, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useEvents, useCreateEvent, useDeleteEvent } from "@/hooks/useEvents";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "react-router-dom";

const Events = () => {
  const navigate = useNavigate();
  const { data: events, isLoading, error } = useEvents();
  const deleteEvent = useDeleteEvent();
  const createEvent = useCreateEvent();

  const handleCreate = () => {
    console.log("Creating event...");
    createEvent.mutate({
      title: 'New Event',
      date: '2025-10-16',
      time: '10:00 AM',
      duration: '2h',
      type: 'Meeting',
      status: 'UPCOMING'
    });
  };


  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="shadow-card p-6">
          <CardTitle className="text-destructive mb-2">Error loading events</CardTitle>
          <CardDescription>
            Unable to connect to the backend. Make sure your Spring Boot server is running on http://localhost:8081
          </CardDescription>
        </Card>
      </div>
    );
  }



  return (
    <div className="min-h-screen">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Events</h1>
          <p className="text-muted-foreground">Create and manage your calendar events</p>
        </div>
        {/* <Button onClick={handleCreate} variant="gradient" size="lg" className="gap-2"> */}
        <Button variant="gradient" size="lg" className="gap-2" onClick={() => navigate('/events/create')}>
          <Plus className="h-4 w-4" />
          Create Event
        </Button>
      </div>

      {/* Search and Filter */}
      <Card className="shadow-card mb-8">
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search events..."
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Events List */}
      <div className="grid gap-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">Upcoming Events</h2>
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="shadow-card">
                  <CardHeader>
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-4 w-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {events && events.length > 0 ? (
                events
                  .filter((event) => event.status === "UPCOMING")
                  .map((event) => (
                    <Card key={event.id} className="shadow-card hover:shadow-elegant transition-all duration-300">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-xl">{event.title}</CardTitle>
                            <CardDescription className="mt-2">
                              {new Date(event.date).toLocaleDateString("en-US", {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                            </CardDescription>
                          </div>
                          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                            {event.type}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <div className="flex gap-6 text-sm text-muted-foreground">
                            <span>🕐 {event.time}</span>
                            <span>⏱️ {event.duration}</span>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              Edit
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => event.id && deleteEvent.mutate(event.id)}
                              disabled={deleteEvent.isPending}
                            >
                              Delete
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
              ) : (
                <Card className="shadow-card p-6">
                  <p className="text-muted-foreground text-center">No upcoming events</p>
                </Card>
              )}
            </div>
          )}
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Past Events</h2>
          {isLoading ? (
            <Skeleton className="h-32 w-full" />
          ) : (
            <div className="space-y-4">
              {events && events.filter((event) => event.status === "COMPLETED").length > 0 ? (
                events
                  .filter((event) => event.status === "COMPLETED")
                  .map((event) => (
                    <Card key={event.id} className="shadow-card opacity-75">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-xl">{event.title}</CardTitle>
                            <CardDescription className="mt-2">
                              {new Date(event.date).toLocaleDateString("en-US", {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                            </CardDescription>
                          </div>
                          <Badge variant="outline" className="bg-muted">
                            {event.type}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <div className="flex gap-6 text-sm text-muted-foreground">
                            <span>🕐 {event.time}</span>
                            <span>⏱️ {event.duration}</span>
                          </div>
                          <Badge className="bg-muted text-muted-foreground">
                            Completed
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))
              ) : (
                <Card className="shadow-card p-6">
                  <p className="text-muted-foreground text-center">No past events</p>
                </Card>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Events;