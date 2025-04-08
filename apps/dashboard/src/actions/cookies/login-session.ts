import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { db } from "@school-clerk/db";

function getCookieName(domain, name) {
  return `${domain}-${name}`;
}
interface SaasProfile {
  domain: string;
  sessionId?: string;
  termId?: string;
}
export function getSaasProfileCookie(domain: string) {
  const cookieStore = cookies();
  const cookieName = getCookieName(domain, "saas-profile");
  const profile = cookieStore.get(cookieName);
  if (profile) {
    return JSON.parse(profile.value) as SaasProfile;
  }
  return null;
}
export async function setSaasProfileCookie(domain: string) {
  const cookieStore = cookies();
  const cookieName = getCookieName(domain, "saas-profile");
  const profile = cookieStore.get(cookieName);
  if (profile) {
    return JSON.parse(profile.value) as SaasProfile;
  }
  const school = await db.schoolProfile.findFirst({
    where: {
      domain: domain,
    },
    select: {
      id: true,
      // sessi: true,
      // termId: true,
      sessions: {
        orderBy: {
          createdAt: "desc",
        },
        take: 1,
        select: {
          id: true,
          terms: {
            take: 1,
            select: {
              id: true,
            },
            orderBy: {
              createdAt: "desc",
            },
          },
        },
      },
    },
  });
  if (!school) redirect("/not-found");
  const session = school?.sessions?.[0];
  const term = session?.terms?.[0];
  cookieStore.set(
    cookieName,
    JSON.stringify({
      domain: domain,
      sessionId: session?.id,
      termId: term?.id,
    } satisfies SaasProfile),
  );
}
