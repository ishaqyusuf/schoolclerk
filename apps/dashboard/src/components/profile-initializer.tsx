"use client";

import { useEffect } from "react";
import {
  getSaasProfileCookie,
  setSaasProfileCookie,
} from "@/actions/cookies/login-session";

export function ProfileInitializer() {
  useEffect(() => {
    getSaasProfileCookie().then((data) => {
      if (!data) setSaasProfileCookie().then((e) => {});
    });
  });

  return <></>;
}
