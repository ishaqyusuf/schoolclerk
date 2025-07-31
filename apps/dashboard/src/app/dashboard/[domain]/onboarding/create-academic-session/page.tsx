import { getSaasProfileCookie } from "@/actions/cookies/login-session";
import { AcademicSessionForm } from "@/components/forms/academic-session-form";

export default async function CreateAcademicSessionPage({}) {
  const profile = await getSaasProfileCookie();

  return (
    <div className="">
      <AcademicSessionForm />
    </div>
  );
}
