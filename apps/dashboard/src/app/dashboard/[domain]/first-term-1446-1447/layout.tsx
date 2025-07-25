import Link from "next/link";

export default async function Layout({ children, params }) {
  const domain = params.domain;
  const navLinks = [
    {
      href: `/first-term-1446-1447`,
      label: "Home",
    },
    {
      href: `/first-term-1446-1447/classrooms`,
      label: "Classrooms",
    },
    {
      href: `/first-term-1446-1447/payments`,
      label: "Payments",
    },
  ];
  return (
    <>
      <div className="h-16 border-b flex items-center px-6 bg-white">
        <nav className="flex items-center gap-6 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-foreground transition-colors hover:text-foreground/80"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="p-6">{children}</div>
    </>
  );
}
