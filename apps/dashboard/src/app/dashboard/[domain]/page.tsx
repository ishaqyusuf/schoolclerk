import Link from "next/link";

export default async function Page({ params }) {
  const domain = (await params).domain;
  return (
    <div>
      <span>{domain}</span>
    </div>
  );
}
