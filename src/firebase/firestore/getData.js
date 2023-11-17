import firebase_app from "../config";
import { getFirestore, doc, getDoc, collection, getDocs } from "firebase/firestore";

const db = getFirestore(firebase_app)

async function getClients(coll, id) {
    let result = {};
    let error = null;

    // Query a reference to a subcollection
    const querySnapshot = await getDocs(collection(db, coll, id, 'clients'));
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        result[doc.id] = doc.data();
    });

    return { result, error };
}

export {
    getClients,
}