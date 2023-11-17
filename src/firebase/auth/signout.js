import { getAuth, signOut } from "firebase/auth";
import firebase_app from "../config";


export default async function logout() {
    const auth = getAuth();
    signOut(auth)
}