"use server";

import { cookies } from "next/headers";
import {
  getSaasProfileCookie,
  getTenantDomain,
} from "@/actions/cookies/login-session";
import { Cookies } from "@/utils/contants";

export default async function Page({ params }) {
  (await cookies()).set({
    name: Cookies.SaasProfile,
    value: "lorem",
  });
  const profile = await getSaasProfileCookie();
  return (
    <div>
      {/* <div>{JSON.stringify(profile)}</div> */}
      {/* <span>{domain}</span> */}
    </div>
  );
}
