import { useState, useEffect } from 'react';
import db from '../services/firebase';

function Dashboard() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Add custom body styling and cleanup on unmount
    document.body.style.backgroundColor = '#0F172A';
    document.body.style.color = '#F8FAFC';

    if ("Notification" in window) {
      Notification.requestPermission();
    }
    
    return () => {
      document.body.style.backgroundColor = '';
      document.body.style.color = '';
    };
  }, []);

  useEffect(() => {
    let unsubscribe;
    const initDashboard = async () => {
        const initialOrders = await db.getAllOrders();
        // Fallback to missing status
        const processed = initialOrders.map(o => ({...o, status: o.status || 'NEW'}));
        setOrders(processed);

        unsubscribe = db.onNewOrder((newOrder) => {
            setOrders(prev => {
                if (!prev.find(o => o.id === newOrder.id)) {
                    playSound();
                    if ("Notification" in window && Notification.permission === "granted") {
                        new Notification("New Order Received!", {
                            body: `${newOrder.customerName} just ordered from ${newOrder.restaurantName}.`,
                            icon: '/favicon.ico'
                        });
                    }
                    return [{...newOrder, status: 'NEW'}, ...prev];
                }
                return prev;
            });
        });
    };

    initDashboard();

    return () => {
        if (unsubscribe) unsubscribe();
    };
  }, []);

  const playSound = () => {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(800, audioCtx.currentTime); 
      oscillator.connect(audioCtx.destination);
      oscillator.start();
      oscillator.stop(audioCtx.currentTime + 0.1);
  };

  const updateStatus = async (id, newStatus) => {
      setOrders(prev => prev.map(o => o.id === id ? { ...o, status: newStatus } : o));
      await db.updateOrderStatus(id, newStatus);
  };

  const renderTicket = (o) => {
      const timeStr = new Date(o.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
      const tableId = `T${Math.floor(Math.random() * 20) + 1}`; 
      
      return (
          <div className="ticket" key={o.id} style={{
              background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '8px', padding: '15px', marginBottom: '15px', cursor: 'pointer'
          }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '0.85rem', color: '#94A3B8' }}>
                  <span style={{ fontWeight: 700, color: 'white' }}>#{o.id}</span>
                  <span style={{ fontWeight: 600, color: 'var(--brand-primary)' }}>{timeStr}</span>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
                  <div style={{ background: '#38BDF8', color: '#0F172A', padding: '4px 8px', borderRadius: '4px', fontWeight: 700, fontSize: '0.9rem' }}>{tableId}</div>
                  <div>
                      <div style={{ fontWeight: 600, color: 'white' }}>{o.customerName}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--brand-primary)' }}>
                          <i className="ph-fill ph-users"></i> {o.partySize} • Arriving {o.reservationTime}
                      </div>
                  </div>
              </div>

              {o.items.length > 0 ? (
                  <div style={{ background: 'rgba(0,0,0,0.2)', padding: '10px', borderRadius: '4px', marginBottom: '15px' }}>
                      {o.items.map((i, idx) => (
                          <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px', fontSize: '0.95rem' }}>
                              <span><span style={{ fontWeight: 700, color: '#4ADE80', marginRight: '8px' }}>{i.quantity}x</span> {i.name}</span>
                          </div>
                      ))}
                  </div>
              ) : (
                  <div style={{ padding: '10px', color: '#94A3B8', fontStyle: 'italic' }}>Table Reservation Only</div>
              )}
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  {o.status === 'NEW' && (
                      <>
                          <button style={{ padding: '8px', borderRadius: '4px', fontWeight: 600, fontSize: '0.85rem', background: 'transparent', border: '1px solid #EF4444', color: '#EF4444', cursor: 'pointer' }} onClick={() => updateStatus(o.id, 'CANCELLED')}>Reject</button>
                          <button style={{ padding: '8px', borderRadius: '4px', fontWeight: 600, fontSize: '0.85rem', background: '#F59E0B', color: 'white', border: 'none', cursor: 'pointer' }} onClick={() => updateStatus(o.id, 'PREP')}>Start Prep</button>
                      </>
                  )}
                  {o.status === 'PREP' && (
                      <>
                          <button style={{ opacity: 0, pointerEvents: 'none' }}>-</button>
                          <button style={{ padding: '8px', borderRadius: '4px', fontWeight: 600, fontSize: '0.85rem', background: '#4ADE80', color: '#064E3B', border: 'none', cursor: 'pointer' }} onClick={() => updateStatus(o.id, 'READY')}>Food Ready</button>
                      </>
                  )}
                  {o.status === 'READY' && (
                      <button style={{ gridColumn: 'span 2', padding: '8px', borderRadius: '4px', fontWeight: 600, fontSize: '0.85rem', background: 'rgba(255,255,255,0.1)', color: 'white', border: 'none', cursor: 'pointer' }} onClick={() => updateStatus(o.id, 'ARCHIVED')}>Acknowledge</button>
                  )}
              </div>
          </div>
      );
  };

  const newOrders = orders.filter(o => o.status === 'NEW');
  const prepOrders = orders.filter(o => o.status === 'PREP');
  const readyOrders = orders.filter(o => o.status === 'READY');

  return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <nav style={{ backgroundColor: '#1E293B', borderBottom: '1px solid rgba(255,255,255,0.1)', padding: '15px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div className="brand" style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.4rem', fontWeight: 700 }}>
                  <i className="ph-fill ph-storefront brand-icon" style={{ background: 'rgba(255,255,255,0.1)', padding: '8px', borderRadius: '8px', color: 'var(--brand-primary)' }}></i>
                  <span style={{ color: 'white' }}>First<span style={{ color: 'var(--brand-primary)' }}>Dine</span> Kitchen POS</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#4ADE80', fontWeight: 600, fontSize: '0.9rem', background: 'rgba(74, 222, 128, 0.1)', padding: '6px 12px', borderRadius: '50px' }}>
                  <div style={{ width: '8px', height: '8px', background: '#4ADE80', borderRadius: '50%', boxShadow: '0 0 0 0 rgba(74, 222, 128, 0.7)', animation: 'pulse 2s infinite' }}></div>
                  Receiving Live Orders
              </div>
          </nav>

          <div style={{ padding: '30px', maxWidth: '1400px', margin: '0 auto', flexGrow: 1, width: '100%' }}>
              <h2 style={{ color: 'white' }}>Live KDS (Kitchen Display System)</h2>
              <p style={{ color: '#94A3B8', marginTop: '5px' }}>Orders sync automatically from the Diner App in real-time.</p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginTop: '20px', alignItems: 'start' }}>
                  
                  <div style={{ background: '#1E293B', borderRadius: '12px', padding: '20px', minHeight: '80vh' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', paddingBottom: '10px', borderBottom: '2px solid rgba(255,255,255,0.05)', fontSize: '1.2rem', color: 'white', fontWeight: 700 }}>
                          <span>New Pre-Orders</span>
                          <span style={{ background: 'var(--brand-primary)', color: 'white', padding: '2px 8px', borderRadius: '50px', fontSize: '0.8rem' }}>{newOrders.length}</span>
                      </div>
                      <div>{newOrders.map(renderTicket)}</div>
                  </div>

                  <div style={{ background: '#1E293B', borderRadius: '12px', padding: '20px', minHeight: '80vh' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', paddingBottom: '10px', borderBottom: '2px solid rgba(255,255,255,0.05)', fontSize: '1.2rem', color: 'white', fontWeight: 700 }}>
                          <span>In Kitchen (Prep)</span>
                          <span style={{ background: '#F59E0B', color: 'white', padding: '2px 8px', borderRadius: '50px', fontSize: '0.8rem' }}>{prepOrders.length}</span>
                      </div>
                      <div>{prepOrders.map(renderTicket)}</div>
                  </div>

                  <div style={{ background: '#1E293B', borderRadius: '12px', padding: '20px', minHeight: '80vh' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', paddingBottom: '10px', borderBottom: '2px solid rgba(255,255,255,0.05)', fontSize: '1.2rem', color: 'white', fontWeight: 700 }}>
                          <span>Ready for Diner</span>
                          <span style={{ background: '#4ADE80', color: '#0F172A', padding: '2px 8px', borderRadius: '50px', fontSize: '0.8rem' }}>{readyOrders.length}</span>
                      </div>
                      <div>{readyOrders.map(renderTicket)}</div>
                  </div>

              </div>
          </div>
      </div>
  );
}

export default Dashboard;
