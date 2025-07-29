import { Card, CardContent } from "@school-clerk/ui/card";
import {
  Users,
  Calendar,
  GraduationCap,
  MessageSquare,
  CreditCard,
  Building,
  Smartphone,
  Shield,
} from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Student Information System",
    description:
      "Comprehensive student profiles with academic history, personal details, and progress tracking.",
  },
  {
    icon: Calendar,
    title: "Attendance & Timetable Management",
    description:
      "Automated attendance tracking with smart timetable generation and conflict resolution.",
  },
  {
    icon: GraduationCap,
    title: "Grades & Assessments",
    description:
      "Flexible grading systems with detailed assessment tools and progress analytics.",
  },
  {
    icon: MessageSquare,
    title: "Teacher & Parent Communication",
    description:
      "Seamless communication channels between teachers, parents, and administrators.",
  },
  {
    icon: CreditCard,
    title: "Fee & Billing System",
    description:
      "Automated fee collection with payment tracking and financial reporting.",
  },
  {
    icon: Building,
    title: "Multi-Branch Support",
    description:
      "Manage multiple campuses with custom subdomains like schoolname.schoolclerk.app",
  },
  {
    icon: Smartphone,
    title: "Custom Branded Mobile App",
    description:
      "White-labeled mobile applications for students, teachers, and parents.",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description:
      "Bank-level security with data encryption and compliance certifications.",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 lg:py-32">
      <div className="container">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold">
            Everything Your School Needs
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From student enrollment to graduation, SchoolClerk provides all the
            tools you need to manage your educational institution efficiently.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
