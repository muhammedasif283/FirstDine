import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc, addDoc, getDocs, query, where, updateDoc, onSnapshot, writeBatch } from 'firebase/firestore';
import { mockRestaurants } from './mockData';

class RealTimeDatabase {
    constructor() {
        // === 🔧 SETUP YOUR FIREBASE HERE 🔧 ===
        const firebaseConfig = {
            apiKey: "YOUR_API_KEY",
            authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
            projectId: "YOUR_PROJECT_ID",
            storageBucket: "YOUR_PROJECT_ID.appspot.com",
            messagingSenderId: "SENDER_ID",
            appId: "APP_ID"
        };
        // ======================================

        this.useMock = !firebaseConfig.apiKey || firebaseConfig.apiKey === "YOUR_API_KEY";
        this.listeners = [];

        if (!this.useMock) {
            console.log("🔥 Connecting to Firebase Firestore...");
            const app = initializeApp(firebaseConfig);
            this.firestore = getFirestore(app);
        } else {
            console.warn("⚠️ Firebase not configured. Using Mock Local Database (BroadcastChannel).");
            this.channel = new BroadcastChannel('firstdine_realtime_orders');
            this.channel.onmessage = (event) => {
                if (event.data.type === 'NEW_ORDER') {
                    this.listeners.forEach(callback => callback(event.data.payload));
                }
            };
        }
    }

    async getRestaurants() {
        if (this.useMock) return mockRestaurants;

        try {
            const colRef = collection(this.firestore, 'restaurants');
            const snapshot = await getDocs(colRef);
            if (snapshot.empty) {
                console.log("Seeding restaurants to Firestore...");
                const batch = writeBatch(this.firestore);
                mockRestaurants.forEach(r => {
                    const docRef = doc(colRef, r.id);
                    batch.set(docRef, r);
                });
                await batch.commit();
                return mockRestaurants;
            }
            return snapshot.docs.map(d => d.data());
        } catch (e) {
            console.error("Firebase fetch error", e);
            return mockRestaurants;
        }
    }

    async saveUser(userObj) {
        if (this.useMock) return;
        try {
            await setDoc(doc(this.firestore, 'users', userObj.username), userObj, { merge: true });
        } catch (e) {
            console.error("Failed to save user", e);
        }
    }

    async pushOrder(orderData) {
        if (this.useMock) {
            return new Promise((resolve) => {
                setTimeout(() => {
                    const payload = {
                        id: 'ORD-' + Math.random().toString(36).substr(2, 6).toUpperCase(),
                        timestamp: new Date().toISOString(),
                        ...orderData
                    };
                    this.channel.postMessage({ type: 'NEW_ORDER', payload });
                    const history = JSON.parse(localStorage.getItem('firstdine_orders') || '[]');
                    history.unshift(payload);
                    localStorage.setItem('firstdine_orders', JSON.stringify(history));
                    resolve(payload);
                }, 600);
            });
        }

        try {
            const docRef = await addDoc(collection(this.firestore, 'orders'), {
                timestamp: new Date().toISOString(),
                ...orderData
            });
            await updateDoc(docRef, { id: docRef.id }); // Save ID onto doc itself to match original behavior easily
            return { id: docRef.id, ...orderData };
        } catch (e) {
            console.error("Error creating order", e);
            throw e;
        }
    }

    async getUserOrders(username) {
        if (this.useMock) {
            const history = JSON.parse(localStorage.getItem('firstdine_orders') || '[]');
            return history.filter(o => o.customerUsername === username);
        }
        
        try {
            const q = query(collection(this.firestore, 'orders'), where('customerUsername', '==', username));
            const snapshot = await getDocs(q);
            const orders = snapshot.docs.map(d => d.data());
            return orders.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        } catch (e) {
            console.error("Error fetching user orders", e);
            return [];
        }
    }

    async getAllOrders() {
        if (this.useMock) {
            return JSON.parse(localStorage.getItem('firstdine_orders') || '[]');
        }

        try {
            const snapshot = await getDocs(collection(this.firestore, 'orders'));
            const orders = snapshot.docs.map(d => d.data());
            return orders.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        } catch (e) {
            console.error("Error fetching all orders", e);
            return [];
        }
    }

    async updateOrderStatus(id, newStatus) {
        if (this.useMock) {
            const history = JSON.parse(localStorage.getItem('firstdine_orders') || '[]');
            const match = history.find(o => o.id === id);
            if (match) {
                match.status = newStatus;
                localStorage.setItem('firstdine_orders', JSON.stringify(history));
            }
            return;
        }

        try {
            await updateDoc(doc(this.firestore, 'orders', id), { status: newStatus });
        } catch (e) {
            console.error("Error updating status", e);
        }
    }

    onNewOrder(callback) {
        this.listeners.push(callback);
        
        if (this.useMock) {
            return () => {
                this.listeners = this.listeners.filter(cb => cb !== callback);
            };
        }

        const q = query(collection(this.firestore, 'orders'), where('status', '==', 'NEW'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            snapshot.docChanges().forEach(change => {
                if (change.type === 'added') {
                    callback(change.doc.data());
                }
            });
        });

        return () => {
            this.listeners = this.listeners.filter(cb => cb !== callback);
            unsubscribe();
        };
    }

    onUserOrdersChange(username, callback) {
        if (this.useMock) {
            // Mock listener fallback uses BroadcastChannel hack
            const handler = () => {
                const history = JSON.parse(localStorage.getItem('firstdine_orders') || '[]');
                callback(history.filter(o => o.customerUsername === username));
            };
            this.channel.addEventListener('message', handler);
            window.addEventListener('storage', handler); // listen to localstorage changes 
            return () => {
                this.channel.removeEventListener('message', handler);
                window.removeEventListener('storage', handler);
            };
        }

        const q = query(collection(this.firestore, 'orders'), where('customerUsername', '==', username));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const orders = snapshot.docs.map(d => d.data());
            orders.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
            callback(orders);
        });

        return unsubscribe;
    }
}

const db = new RealTimeDatabase();
export default db;
