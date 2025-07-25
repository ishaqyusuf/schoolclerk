import Link from "next/link";

export default async function Layout({ children }) {
  return (
    <>
      <div className="h-12 px-4 flex  gap-4">
        <div className="flex-1"></div>
        <Link href={`/first-term-1446-1447/classrooms`}>Classrooms</Link>
      </div>
      {children}
    </>
  );
}
