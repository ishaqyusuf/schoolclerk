"use client";

import { useEffect } from "react";
import { initializeSaasProfile } from "@/actions/cookies/login-session";

export function ProfileInitializer() {
  useEffect(() => {
    initializeSaasProfile().then((e) => {});
  }, []);

  return <></>;
}
