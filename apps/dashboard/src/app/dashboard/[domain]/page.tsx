import { redirect } from "next/navigation";
import { getSaasProfileCookie } from "@/actions/cookies/login-session";

export default async function Page({ params }) {
  // (await cookies()).set({
  //   name: Cookies.SaasProfile,
  //   value: "lorem",
  // });

  // const cookieStore = cookies();
  // cookieStore.get(Cookies.SaasProfile);
  // cookieStore.set(Cookies.SaasProfile, JSON.stringify({}));
  // cookies().set({
  //   name: Cookies.SaasProfile,
  //   value: "lorem",
  // });
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
