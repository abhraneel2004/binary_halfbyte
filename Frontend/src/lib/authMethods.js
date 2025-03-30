// src/lib/authMethods.js
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    GithubAuthProvider,
    signInWithPopup,
    signOut,
    updateProfile,
} from 'firebase/auth';

// Email & Password Sign-Up
export const signUpWithEmail = async (auth, email, password, username) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, { displayName: username });
        return userCredential.user;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Email & Password Sign-In
export const signInWithEmail = async (auth, email, password) => {
    try {
        return await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        throw new Error(error.message);
    }
};

// Google Sign-In
export const signInWithGoogle = async (auth) => {
    try {
        const provider = new GoogleAuthProvider();
        return await signInWithPopup(auth, provider);
    } catch (error) {
        throw new Error(error.message);
    }
};

// GitHub Sign-In
export const signInWithGithub = async (auth) => {
    try {
        const provider = new GithubAuthProvider();
        return await signInWithPopup(auth, provider);
    } catch (error) {
        throw new Error(error.message);
    }
};

// Sign-Out
export const logout = async (auth) => {
    try {
        await signOut(auth);
    } catch (error) {
        throw new Error(error.message);
    }
};
