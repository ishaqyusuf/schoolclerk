import { getTenantDomain } from "@/actions/cookies/login-session";

export default async function Page({ params }) {
  const domain = (await params).domain;
  const tenant = getTenantDomain();

  return (
    <div>
      <span>{domain}</span>
      <p>{tenant.domain}</p>
    </div>
  );
}
