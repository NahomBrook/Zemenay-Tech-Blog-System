import { Calendar, MapPin, ArrowUpRight } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const events = [
  {
    id: 1,
    title: "Addis Gaming Expo 2025",
    date: "April 20, 2025",
    location: "Addis Ababa Exhibition Center",
    description: "Join us for the largest gaming expo in Ethiopia, featuring tournaments, workshops, and more.",
    link: "/events/addis-gaming-expo-2025",
  },
  {
    id: 2,
    title: "Esports Bootcamp",
    date: "May 15, 2025",
    location: "Unity Park, Addis Ababa",
    description: "A bootcamp for aspiring esports players to hone their skills and compete with the best.",
    link: "/events/esports-bootcamp-2025",
  },
  {
    id: 3,
    title: "Game Developers Meetup",
    date: "June 10, 2025",
    location: "Innovation Hub, Addis Ababa",
    description: "A networking event for Ethiopian game developers to share ideas and collaborate.",
    link: "/events/game-developers-meetup-2025",
  },
];

export function FeaturedEvents() {
  return (
    <section className="py-24 bg-gradient-to-b from-background to-background/80">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center mb-12 text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
            <Calendar className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-3xl font-bold mb-4">Upcoming Events</h2>
          <p className="text-muted-foreground max-w-2xl">
            Discover the latest gaming events happening in Ethiopia. Don&apos;t miss out on the action!
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {events.map((event) => (
            <Card key={event.id} className="relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-b from-border to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <CardHeader className="relative z-10">
                <CardTitle>{event.title}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  <MapPin className="inline-block w-4 h-4 mr-1" />
                  {event.location}
                </p>
                <p className="text-sm text-muted-foreground">
                  <Calendar className="inline-block w-4 h-4 mr-1" />
                  {event.date}
                </p>
              </CardHeader>
              <CardContent className="relative z-10">
                <p className="text-muted-foreground">{event.description}</p>
              </CardContent>
              <CardFooter className="relative z-10">
                <Button asChild variant="outline" className="group">
                  <Link href={event.link}>
                    Learn More
                    <ArrowUpRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}