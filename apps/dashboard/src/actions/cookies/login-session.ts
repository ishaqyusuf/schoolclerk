"use server";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { env } from "@/env";

import { prisma } from "@school-clerk/db";

function getCookieName(domain, name) {
  return `${domain}-${name}`;
}
interface SaasProfile {
  domain: string;
  sessionId?: string;
  termId?: string;
}
export async function getTenantDomain() {
  const host = decodeURIComponent(headers().get("host") || "");

  return {
    host,
    domain: host?.replace(`.${env.APP_ROOT_DOMAIN}`, ""),
  };
}
export async function getSaasProfileCookie() {
  const { domain, host } = await getTenantDomain();
  const cookieStore = cookies();
  const cookieName = getCookieName(domain, "saas-profile");
  const profile = cookieStore.get(cookieName);
  if (profile) {
    return JSON.parse(profile.value) as SaasProfile;
  }

  return await setSaasProfileCookie();
}
export async function setSaasProfileCookie() {
  const { domain, host } = await getTenantDomain();

  const cookieStore = cookies();
  const cookieName = getCookieName(domain, "saas-profile");
  const profile = cookieStore.get(cookieName);
  if (profile) {
    const resp = JSON.parse(profile.value) as SaasProfile;
    if (!resp.sessionId) redirect(`/onboarding/create-academic-session`);
    return resp;
  }
  const school = await prisma.schoolProfile.findFirst({
    where: {
      // domain: domain,
      subDomain: domain,
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
  if (!school) redirect("/create-school");
  const session = school?.sessions?.[0];
  const term = session?.terms?.[0];
  const cookieData = {
    domain: domain,
    sessionId: session?.id,
    termId: term?.id,
  } satisfies SaasProfile;
  cookies().set({
    name: cookieName,
    value: JSON.stringify(cookieData),
  });
  console.log({
    cookieData,
  });
  if (!session) redirect("/create-school-session");
}
