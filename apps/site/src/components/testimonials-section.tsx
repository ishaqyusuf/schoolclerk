import { Card, CardContent } from "@school-clerk/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@school-clerk/ui/avatar";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Dr. Sarah Johnson",
    role: "Principal",
    school: "Greenwood Elementary",
    avatar: "/placeholder.svg?height=40&width=40",
    content:
      "SchoolClerk has transformed how we manage our school. The attendance tracking and parent communication features have saved us countless hours every week.",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "IT Administrator",
    school: "Riverside High School",
    avatar: "/placeholder.svg?height=40&width=40",
    content:
      "The multi-branch support is incredible. We can manage all three of our campuses from one dashboard. The custom branding makes it feel like our own system.",
    rating: 5,
  },
  {
    name: "Lisa Rodriguez",
    role: "Academic Director",
    school: "St. Mary's College",
    avatar: "/placeholder.svg?height=40&width=40",
    content:
      "The grade management and assessment tools are exactly what we needed. Our teachers love how easy it is to input grades and generate reports.",
    rating: 5,
  },
  {
    name: "James Wilson",
    role: "Superintendent",
    school: "Metro School District",
    avatar: "/placeholder.svg?height=40&width=40",
    content:
      "We've been using SchoolClerk for 2 years across 15 schools. The analytics and reporting capabilities have given us insights we never had before.",
    rating: 5,
  },
  {
    name: "Dr. Priya Patel",
    role: "Vice Principal",
    school: "Innovation Academy",
    avatar: "/placeholder.svg?height=40&width=40",
    content:
      "The mobile app is a game-changer. Parents can check their child's attendance and grades instantly. Communication has never been easier.",
    rating: 5,
  },
  {
    name: "Robert Thompson",
    role: "Finance Manager",
    school: "Oakwood Preparatory",
    avatar: "/placeholder.svg?height=40&width=40",
    content:
      "The billing and fee management system has streamlined our entire financial process. Payment tracking and reporting are now completely automated.",
    rating: 5,
  },
];

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-20 lg:py-32 bg-muted/50">
      <div className="container">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold">
            Trusted by Educational Leaders
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            See what school administrators, teachers, and IT professionals are
            saying about SchoolClerk.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="group hover:shadow-lg transition-all duration-300"
            >
              <CardContent className="p-6 space-y-4">
                <div className="flex space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-muted-foreground italic">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                    />
                    <AvatarFallback>
                      {testimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.school}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
