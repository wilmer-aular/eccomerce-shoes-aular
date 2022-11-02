import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, query, where, doc, getDoc, serverTimestamp, updateDoc, addDoc, deleteDoc } from 'firebase/firestore/lite';
import { config } from '../../config.js'
import { setError, setData } from '../util/util.js';
const app = initializeApp(config.firebase);
const db = getFirestore(app);

class CrudFirebase {
    constructor(collectionName) {
        this.useCollection = collection(db, collectionName);
        this.collectionName = collectionName;
    }

    async getAll() {
        try {
            const itemsSnapshot = await getDocs(this.useCollection);
            return itemsSnapshot.docs.map(setData);
        } catch (error) {
            return setError(error)
        };
    };

    async find(field, value, op = '==') {
        const filter = query(this.useCollection, where(field, op, value));
        const itemsSnapshot = await getDocs(filter);
        return itemsSnapshot.docs.map(setData);
    };

    async getById(id) {
        try {
            const docRef = doc(db, this.collectionName, id)
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) return setData(docSnap);
            return { error: true, message: 'item not found' }
        } catch (error) {
            return setError(error)
        };
    };
    async create(data) {
        try {
            data.timestamp = serverTimestamp();
            const newData = await addDoc(this.useCollection, data);
            return { success: true, id: newData.id }
        } catch (error) {
            return setError(error)
        };
    };
    async update(id, data) {
        try {
            const itemRef = doc(this.useCollection, id);
            await updateDoc(itemRef, data);
            return { success: true };
        } catch (error) {
            return setError(error)
        };
    };
    async deleteById(id) {
        try {
            const docRef = doc(db, this.collectionName, id)
            await deleteDoc(docRef);
            return { success: true };
        } catch (error) {
            return setError(error)
        };
    }
}

export default CrudFirebase;