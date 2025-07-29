import { Card, CardContent } from "@school-clerk/ui/card";
import { UserPlus, Settings, Users, BarChart3 } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "Sign Up",
    description:
      "Create your school account in minutes with our simple onboarding process.",
  },
  {
    icon: Settings,
    title: "Set Up School",
    description:
      "Configure your school structure, classes, subjects, and academic calendar.",
  },
  {
    icon: Users,
    title: "Add Students & Staff",
    description:
      "Import or manually add students, teachers, and administrative staff.",
  },
  {
    icon: BarChart3,
    title: "Manage Academics",
    description:
      "Start managing attendance, grades, communications, and all academic operations.",
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 lg:py-32 bg-muted/50">
      <div className="container">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold">
            Get Started in 4 Simple Steps
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Setting up SchoolClerk for your institution is quick and
            straightforward. Our team will guide you through every step.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <Card className="text-center group hover:shadow-lg transition-all duration-300">
                <CardContent className="p-8 space-y-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto group-hover:bg-primary/20 transition-colors">
                    <step.icon className="h-8 w-8 text-primary" />
                  </div>
                  <div className="absolute -top-4 -left-4 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-semibold">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-border"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
