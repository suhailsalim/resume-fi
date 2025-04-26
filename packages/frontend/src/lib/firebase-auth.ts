'use client';

import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { app } from './firebase';
import api from '@/services/api';

// Initialize Auth
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

async function signInWithGoogle() {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const idToken = await result.user.getIdToken();
    
    // Send token to backend to get our JWT
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/google/callback`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ idToken }),
    });
    
    if (!response.ok) {
      throw new Error(`Authentication failed: ${response.statusText}`);
    }
    
    const data = await response.json();
    api.login({ token: data.access_token });
    
    return { user: result.user, token: data.access_token };
  } catch (error) {
    console.error('Error signing in with Google:', error);
    throw error;
  }
}

async function logOut() {
  try {
    await signOut(auth);
    api.logout();
  } catch (error) {
    console.error('Error logging out:', error);
    throw error;
  }
}

export { auth, signInWithGoogle, logOut };