import firebase_app from "../config";
import {
  getFirestore,
  doc,
  getDoc,
  collection,
  getDocs,
} from "firebase/firestore";

const db = getFirestore(firebase_app);

async function getClients(coll, id) {
  let result = {};
  let error = null;

  // Query a reference to a subcollection
  const querySnapshot = await getDocs(collection(db, coll, id, "clients"));
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    result[doc.id] = doc.data();
  });

  return { result, error };
}

async function getClient(coll, id, client_id) {
  let result = {};
  let error = null;

  // Query a reference to a subcollection
  const docRef = doc(db, coll, id, "clients", client_id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    result = docSnap.data();
  } else {
    error = "No data found";
  }

  return { result, error };
}

export { getClients, getClient };
