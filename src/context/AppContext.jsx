import { useState, useEffect, createContext, useContext } from 'react';
import db from '../services/firebase'

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('firstdine_user')) || null);
  const [cart, setCart] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userOrders, setUserOrders] = useState([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const data = await db.getRestaurants();
        setRestaurants(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchRestaurants();
  }, []);

  useEffect(() => {
    const theme = localStorage.getItem('firstdine_theme');
    if (theme === 'dark') {
      document.documentElement.classList.add('dark-theme');
      document.body.classList.add('dark-theme');
    }

    if ("Notification" in window) {
      Notification.requestPermission();
    }
  }, []);

  // Global Realtime Orders Listener!
  useEffect(() => {
    if (!currentUser) {
        setUserOrders([]);
        return;
    }

    const unsubscribe = db.onUserOrdersChange(currentUser.username, (data) => {
        setUserOrders(prev => {
            if (prev.length > 0 && "Notification" in window && Notification.permission === "granted") {
                data.forEach(newO => {
                    const oldO = prev.find(o => o.id === newO.id);
                    if (oldO && oldO.status !== newO.status) {
                        new Notification("FirstDine Update!", {
                            body: `Your order at ${newO.restaurantName} is now ${newO.status === 'PREP' ? 'being prepared globally!' : newO.status === 'READY' ? 'READY for you!' : newO.status}.`,
                            icon: '/favicon.ico'
                        });
                    }
                });
            }
            return data;
        });
    });

    return () => {
        if (typeof unsubscribe === 'function') unsubscribe();
    };
  }, [currentUser]);

  const login = async (username) => {
    const userData = { name: username, username: username.toLowerCase() };
    try { await db.saveUser(userData); } catch(e) {}
    localStorage.setItem('firstdine_user', JSON.stringify(userData));
    setCurrentUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('firstdine_user');
    setCurrentUser(null);
  };

  const addToCart = (item, restaurant) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (index) => {
    setCart(prev => prev.filter((_, i) => i !== index));
  };

  const clearCart = () => setCart([]);

  return (
    <AppContext.Provider value={{
      currentUser, login, logout, 
      cart, addToCart, removeFromCart, clearCart, 
      restaurants, loading, userOrders
    }}>
      {children}
    </AppContext.Provider>
  );
};
