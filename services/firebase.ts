import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

// Your web app's Firebase configuration
// These values should be in a .env file (e.g., VITE_FIREBASE_API_KEY)
const env = (import.meta as any).env;

const firebaseConfig = {
  apiKey: env.VITE_FIREBASE_API_KEY,
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: env.VITE_FIREBASE_APP_ID
};

// Initialize Firebase
// We wrap this in a check so the app doesn't crash if keys are missing during development
let db: any = null;

try {
  if (firebaseConfig.apiKey) {
    const app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    console.log("Firebase initialized successfully.");
  } else {
    console.warn("Firebase configuration missing. App running in demo mode (no persistence).");
  }
} catch (error) {
  console.error("Firebase initialization error:", error);
}

export const submitApplication = async (data: any) => {
  // If no DB configured, simulate success after delay
  if (!db) {
    console.log("Demo Mode: Application data that would be saved:", data);
    await new Promise(resolve => setTimeout(resolve, 1500));
    return true;
  }

  try {
    // Add a new document with a generated ID to 'partners' collection
    await addDoc(collection(db, "partners"), {
      ...data,
      submittedAt: new Date(),
      status: 'pending' // pending, approved, rejected
    });
    return true;
  } catch (e) {
    console.error("Error adding document: ", e);
    throw new Error("Failed to submit application. Please try again.");
  }
};