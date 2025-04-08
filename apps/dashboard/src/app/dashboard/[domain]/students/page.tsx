export default async function Page({ params }) {
  const domain = (await params).domain;
  return (
    <div>
      <span>{domain}</span>
    </div>
  );
}
