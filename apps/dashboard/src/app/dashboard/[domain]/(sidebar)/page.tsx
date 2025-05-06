import { redirect } from "next/navigation";
import { getSaasProfileCookie } from "@/actions/cookies/login-session";

import { prisma } from "@school-clerk/db";

export default async function Page({ params }) {
  const profile = await getSaasProfileCookie();
  if (profile && !profile?.sessionId)
    redirect(`/onboarding/create-academic-session`);
  return (
    <div>
      <span>ABC</span>
      {/* <div>{JSON.stringify(profile)}</div> */}
      {/* <span>{domain}</span> */}
    </div>
  );
}
