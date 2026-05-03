import { useState, useEffect, useCallback } from "react";
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc, query, where, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/config";
import { useAuth } from "../context/AuthContext";

export function useFirestore(collectionName) {
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchDocs = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    try {
      const q = query(
        collection(db, collectionName),
        where("uid", "==", user.uid)
      );
      const snapshot = await getDocs(q);
      setDocs(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  }, [user, collectionName]);

  useEffect(() => { fetchDocs(); }, [fetchDocs]);

  const addDocument = async (data) => {
    await addDoc(collection(db, collectionName), {
      ...data, uid: user.uid, createdAt: serverTimestamp()
    });
    fetchDocs();
  };

  const deleteDocument = async (id) => {
    await deleteDoc(doc(db, collectionName, id));
    fetchDocs();
  };

  const updateDocument = async (id, data) => {
    await updateDoc(doc(db, collectionName, id), data);
    fetchDocs();
  };

  return { docs, loading, addDocument, deleteDocument, updateDocument };
}