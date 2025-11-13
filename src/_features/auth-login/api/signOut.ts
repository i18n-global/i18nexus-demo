/**
 * Sign out the current Firebase user
 */

import { signOut as firebaseSignOut } from "firebase/auth";
import { auth } from "@shared/lib";

export async function signOut(): Promise<void> {
  try {
    await firebaseSignOut(auth);
  } catch (error) {
    console.error("Sign out error:", error);
    throw error;
  }
}
