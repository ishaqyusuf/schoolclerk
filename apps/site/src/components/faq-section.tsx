import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@school-clerk/ui/accordion";

const faqs = [
  {
    question: "How secure is our school data with SchoolClerk?",
    answer:
      "We take data security extremely seriously. SchoolClerk uses bank-level encryption, regular security audits, and complies with FERPA, COPPA, and GDPR regulations. All data is stored in secure, redundant data centers with 24/7 monitoring.",
  },
  {
    question: "How long does it take to set up SchoolClerk for our school?",
    answer:
      "Most schools are up and running within 1-2 weeks. Our onboarding team will help you import existing data, configure your school structure, and train your staff. We provide comprehensive support throughout the entire setup process.",
  },
  {
    question: "Can we customize SchoolClerk with our school's branding?",
    answer:
      "Professional and Enterprise plans include custom branding options. You can add your school logo, colors, and even get a custom subdomain like yourschool.schoolclerk.app. We also offer white-labeled mobile apps.",
  },
  {
    question: "What kind of support do you provide?",
    answer:
      "We offer multiple support channels including email, live chat, and phone support (for Professional and Enterprise plans). Our support team consists of education technology experts who understand the unique needs of schools.",
  },
  {
    question: "Can SchoolClerk handle multiple campuses or branches?",
    answer:
      "Yes! SchoolClerk is designed to manage multiple campuses from a single dashboard. Each campus can have its own subdomain, staff, and settings while maintaining centralized reporting and administration.",
  },
  {
    question: "Is there a mobile app for parents and students?",
    answer:
      "Yes, we provide mobile apps for iOS and Android. Parents can check attendance, grades, and communicate with teachers. Students can access their schedules, assignments, and grades. Professional plans include custom-branded mobile apps.",
  },
  {
    question: "Can we import our existing student data?",
    answer:
      "Our team will help you migrate data from your current system. We support imports from Excel files, CSV files, and can integrate with most existing school management systems during the transition.",
  },
  {
    question: "What happens if we need to cancel our subscription?",
    answer:
      "You can cancel anytime with 30 days notice. We'll help you export all your data in standard formats. There are no cancellation fees, and we'll ensure a smooth transition if you decide to move to another system.",
  },
];

export function FAQSection() {
  return (
    <section id="faq" className="py-20 lg:py-32">
      <div className="container">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Get answers to common questions about SchoolClerk's features,
            security, and implementation.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border rounded-lg px-6"
              >
                <AccordionTrigger className="text-left hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
