import { Header } from "./header";

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
    {
      href: `/first-term-1446-1447/report-sheet`,
      label: "Report Sheet",
    },
  ];
  return (
    <>
      <Header />
      <div className="p-6">{children}</div>
    </>
  );
}
