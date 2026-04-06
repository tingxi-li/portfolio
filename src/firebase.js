import { initializeApp } from "firebase/app";
import { getFirestore, doc, runTransaction } from "firebase/firestore";

// Replace with your Firebase config from:
// Firebase Console → Project Settings → Your apps → Web app
const firebaseConfig = {
  apiKey: "AIzaSyD52b7RfxHmnByqttsDHV5nIp0xD6ovuWg",
  authDomain: "tingxi-portfolio.firebaseapp.com",
  projectId: "tingxi-portfolio",
  storageBucket: "tingxi-portfolio.firebasestorage.app",
  messagingSenderId: "394084954232",
  appId: "1:394084954232:web:90f1d79df05f4d874fbd8d",
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
