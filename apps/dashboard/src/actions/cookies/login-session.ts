"use server";

import { cookies, headers } from "next/headers";
import { redirect, RedirectType } from "next/navigation";
import { env } from "@/env";

import { prisma } from "@school-clerk/db";

function getCookieName(domain, name) {
  return `${domain}-${name}`;
}
interface SaasProfile {
  domain: string;
  sessionId?: string;
  schoolId?: string;
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
  const value = cookieStore.get(cookieName)?.value;
  if (!value) return null;
  const profile = JSON.parse(value as any) as SaasProfile;

  if (profile?.schoolId) {
    return profile;
  }

  // return await setSaasProfileCookie();
}
export async function clearSaasCookie() {
  const { domain, host } = await getTenantDomain();
  const cookieStore = cookies();
  const cookieName = getCookieName(domain, "saas-profile");
  cookieStore.delete(cookieName);
}
export async function initializeSaasProfile() {
  const profile = await getSaasProfileCookie();
  const { domain, host } = await getTenantDomain();

  const cookieStore = cookies();
  const cookieName = getCookieName(domain, "saas-profile");
  if (!profile || !profile?.schoolId) {
    const cookieData = await loadSaasProfile();
    cookieStore.set(cookieName, JSON.stringify(cookieData));
    if (!cookieData?.schoolId)
      redirect(`/onboarding/create-school`, RedirectType.replace);
    if (!cookieData?.termId)
      redirect(`/onboarding/create-term`, RedirectType.replace);
    if (!cookieData?.sessionId)
      redirect(`/onboarding/create-school-session`, RedirectType.replace);
    return cookieData;
  }
  return profile;
}
export async function loadSaasProfile() {
  const { domain, host } = await getTenantDomain();
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
    schoolId: school?.id,
  } satisfies SaasProfile;

  return cookieData;
}
export async function setSaasProfileCookie() {
  const { domain, host } = await getTenantDomain();

  const cookieStore = cookies();
  const cookieName = getCookieName(domain, "saas-profile");
  const profile = cookieStore.get(cookieName);
  if (profile) {
    const resp = JSON.parse(profile.value) as SaasProfile;
    if (resp?.schoolId) return resp;
  }

  cookieStore.set(cookieName, JSON.stringify(cookieData));
  // console.log({
  //   cookieData,
  // });
  if (!session) redirect("/onboarding/create-school-session");
  return cookieData;
}
