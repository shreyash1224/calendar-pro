import { useState } from "react";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useEvents } from "@/hooks/useEvents";
import { useNavigate } from "react-router-dom";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const { data: events, isLoading } = useEvents();
  const navigate = useNavigate();

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: firstDayOfMonth }, (_, i) => i);

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  return (
    <div className="min-h-screen">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Calendar</h1>
          <p className="text-muted-foreground">Manage your schedule and events</p>
        </div>
        <Button variant="gradient" size="lg" className="gap-2" onClick={() => navigate('/events/create')}>
          <Plus className="h-4 w-4" />
          New Event
        </Button>
      </div>

      <Card className="shadow-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" onClick={previousMonth}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={nextMonth}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2 mb-4">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div
                key={day}
                className="text-center font-semibold text-sm text-muted-foreground py-2"
              >
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-2">
            {emptyDays.map((_, index) => (
              <div key={`empty-${index}`} className="aspect-square" />
            ))}
            {days.map((day) => {
              const isToday =
                day === new Date().getDate() &&
                currentDate.getMonth() === new Date().getMonth() &&
                currentDate.getFullYear() === new Date().getFullYear();

              const dayDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
              const isSelected = selectedDate && 
                dayDate.toDateString() === selectedDate.toDateString();

              const dayEvents = events?.filter(event => {
                const eventDate = new Date(event.date);
                return eventDate.getDate() === day &&
                  eventDate.getMonth() === currentDate.getMonth() &&
                  eventDate.getFullYear() === currentDate.getFullYear();
              }) || [];

              return (
                <button
                  key={day}
                  onClick={() => setSelectedDate(dayDate)}
                  className={`aspect-square rounded-lg border border-border hover:bg-accent transition-colors relative ${
                    isToday ? "bg-primary text-primary-foreground hover:bg-primary/90" : ""
                  } ${isSelected ? "ring-2 ring-primary" : ""}`}
                >
                  <span className="absolute top-2 left-2 text-sm font-medium">
                    {day}
                  </span>
                  {dayEvents.length > 0 && (
                    <div className="absolute bottom-2 left-2 right-2 flex flex-col gap-0.5">
                      {dayEvents.slice(0, 2).map((event, idx) => (
                        <div key={idx} className="text-xs bg-primary/20 text-primary px-1 py-0.5 rounded truncate">
                          {event.title}
                        </div>
                      ))}
                      {dayEvents.length > 2 && (
                        <div className="text-xs text-muted-foreground">
                          +{dayEvents.length - 2} more
                        </div>
                      )}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Selected Date Events */}
      {selectedDate && (
        <Card className="shadow-card mt-8">
          <CardHeader>
            <CardTitle>Events for {selectedDate.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-4">
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
              </div>
            ) : (
              <>
                {events && events.filter(event => {
                  const eventDate = new Date(event.date);
                  return eventDate.toDateString() === selectedDate.toDateString();
                }).length > 0 ? (
                  <div className="space-y-4">
                    {events
                      .filter(event => {
                        const eventDate = new Date(event.date);
                        return eventDate.toDateString() === selectedDate.toDateString();
                      })
                      .map((event) => (
                        <div
                          key={event.id}
                          className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                        >
                          <div>
                            <p className="font-medium">{event.title}</p>
                            <p className="text-sm text-muted-foreground">
                              {event.time} • {event.duration}
                            </p>
                          </div>
                          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                            {event.type}
                          </Badge>
                        </div>
                      ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">No events scheduled for this date</p>
                )}
              </>
            )}
          </CardContent>
        </Card>
      )}

      {/* Upcoming Events */}
      <Card className="shadow-card mt-8">
        <CardHeader>
          <CardTitle>Upcoming Events</CardTitle>
          <CardDescription>All upcoming events across your calendar</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {events && events.filter(e => e.status === 'UPCOMING').length > 0 ? (
                events
                  .filter(e => e.status === 'UPCOMING')
                  .slice(0, 5)
                  .map((event) => (
                    <div
                      key={event.id}
                      className="flex items-center gap-4 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                    >
                      <div className="w-1 h-12 rounded-full bg-primary" />
                      <div className="flex-1">
                        <p className="font-medium">{event.title}</p>
                        <p className="text-sm text-muted-foreground">{event.time} • {event.duration}</p>
                      </div>
                      <div className="text-sm font-medium text-muted-foreground">
                        {new Date(event.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                      </div>
                    </div>
                  ))
              ) : (
                <p className="text-muted-foreground text-center">No upcoming events</p>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Calendar;
