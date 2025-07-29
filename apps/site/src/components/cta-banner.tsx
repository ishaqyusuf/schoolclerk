import { ArrowRight, Users } from "lucide-react";
import Link from "next/link";
import { Button } from "@school-clerk/ui/button";
export function CTABanner() {
  return (
    <section className="py-20 lg:py-32 bg-primary text-primary-foreground">
      <div className="container text-center space-y-8">
        <div className="space-y-4">
          <h2 className="text-3xl lg:text-5xl font-bold">
            Join 500+ Schools Transforming Their Academic Workflow
          </h2>
          <p className="text-xl opacity-90 max-w-3xl mx-auto">
            Don't let outdated systems hold your school back. Start your free
            trial today and see why educational institutions worldwide choose
            SchoolClerk.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            variant="secondary"
            className="text-lg px-8"
            asChild
          >
            <Link href="/signup">
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="text-lg px-8 border-primary-foreground/20 hover:bg-primary-foreground/10 bg-transparent"
            asChild
          >
            <Link href="/demo">
              <Users className="mr-2 h-5 w-5" />
              Schedule Demo
            </Link>
          </Button>
        </div>

        <div className="flex justify-center space-x-8 text-sm opacity-80">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span>30-day free trial</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span>No credit card required</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span>Setup in 1-2 weeks</span>
          </div>
        </div>
      </div>
    </section>
  );
}
