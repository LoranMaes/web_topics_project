import firebase_app from "../config";
import { getFirestore, doc, setDoc, collection, addDoc } from "firebase/firestore";

const db = getFirestore(firebase_app);

export default async function addData(collectionName, userId, subcollectionName, data) {
    let result = null;
    let error = null;

    try {
        const userDocRef = doc(db, collectionName, userId);

        const subcollectionRef = collection(userDocRef, subcollectionName);

        result = await addDoc(subcollectionRef, data);
    } catch (e) {
        error = e;
    }

    return { result, error };
}
