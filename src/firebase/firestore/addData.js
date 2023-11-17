import firebase_app from "../config";
import { getFirestore, doc, setDoc, collection, addDoc, updateDoc } from "firebase/firestore";

const db = getFirestore(firebase_app);

async function addClient(collectionName, userId, subcollectionName, data) {
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

async function editClientField(collectionName, userId, subcollectionName, client_id, data) {
    let result = null;
    let error = null;

    try {
        const userDocRef = doc(db, collectionName, userId);
        const subcollectionRef = collection(userDocRef, subcollectionName, client_id);
        const clientDocRef = doc(subcollectionRef, client_id);

        result = await updateDoc(clientDocRef, data);
    } catch (e) {
        error = e;
    }

    return { result, error };

}

export {
    addClient,
    editClientField
}