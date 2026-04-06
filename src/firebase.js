import { initializeApp } from "firebase/app";
import { getFirestore, doc, runTransaction } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/**
 * Increment the visitor count by 1 and return the new total.
 * Uses a single Firestore document: counters/visitors { count: number }
 */
export async function incrementVisitorCount() {
  const ref = doc(db, "counters", "visitors");
  const newCount = await runTransaction(db, async (tx) => {
    const snap = await tx.get(ref);
    const current = snap.exists() ? snap.data().count : 0;
    const next = current + 1;
    tx.set(ref, { count: next });
    return next;
  });
  return newCount;
}
