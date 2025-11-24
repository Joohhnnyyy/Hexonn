"use client";

import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "",
};

const canInit =
  typeof window !== "undefined" &&
  !!firebaseConfig.apiKey &&
  !!firebaseConfig.authDomain &&
  !!firebaseConfig.projectId &&
  !!firebaseConfig.appId;

const app = canInit
  ? getApps().length
    ? getApps()[0]
    : initializeApp(firebaseConfig)
  : undefined as unknown as ReturnType<typeof initializeApp>;

export const auth = app ? getAuth(app) : ({} as any);
