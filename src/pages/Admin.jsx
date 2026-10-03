import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import db from '../services/firebase';

function Admin() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.backgroundColor = '#F8FAFC';
    document.body.style.color = '#0F172A';
    
    const initAdmin = async () => {
      const allOrders = await db.getAllOrders();
      setOrders(allOrders);
      setLoading(false);
    };

    initAdmin();

    return () => {
      document.body.style.backgroundColor = '';
      document.body.style.color = '';
    };
  }, []);

  if (loading) {
      return (
          <div style={{ textAlign: 'center', padding: '100px' }}>
              <i className="ph ph-spinner ph-spin" style={{ fontSize: '3rem' }}></i>
              <p>Loading Analytics...</p>
          </div>
      );
  }

  const completedOrders = orders.filter(o => o.status === 'READY' || o.status === 'ARCHIVED');
  const totalRevenue = completedOrders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
  const totalBookings = orders.length;
  const newOrders = orders.filter(o => o.status === 'NEW');

  // Simple mock revenue data for the chart (last 7 days logic simulated)
  const chartData = [
      { day: 'Mon', amount: totalRevenue * 0.1 },
      { day: 'Tue', amount: totalRevenue * 0.15 },
      { day: 'Wed', amount: totalRevenue * 0.08 },
      { day: 'Thu', amount: totalRevenue * 0.2 },
      { day: 'Fri', amount: totalRevenue * 0.25 },
      { day: 'Sat', amount: totalRevenue * 0.4 },
      { day: 'Sun', amount: totalRevenue * 0.3 }
  ];
  const maxAmount = Math.max(...chartData.map(d => d.amount), 1);

  return (
      <div style={{ minHeight: '100vh', display: 'flex' }}>
          {/* Sidebar */}
          <aside style={{ width: '250px', backgroundColor: '#1E293B', color: 'white', display: 'flex', flexDirection: 'column' }}>
              <div style={{ padding: '20px', fontSize: '1.4rem', fontWeight: 700, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <i className="ph-fill ph-chart-pie-slice" style={{ color: 'var(--brand-primary)', marginRight: '10px' }}></i>
                  Admin Pro
              </div>
              <div style={{ padding: '20px', flexGrow: 1 }}>
                  <div style={{ margin: '10px 0', padding: '10px 15px', background: 'rgba(255,255,255,0.1)', borderRadius: '8px', cursor: 'pointer' }}>
                      <i className="ph ph-squares-four" style={{ marginRight: '10px' }}></i> Overview
                  </div>
                  <div style={{ margin: '10px 0', padding: '10px 15px', color: '#94A3B8', cursor: 'pointer' }}>
                      <i className="ph ph-book-open" style={{ marginRight: '10px' }}></i> Menu Manager
                  </div>
                  <div style={{ margin: '10px 0', padding: '10px 15px', color: '#94A3B8', cursor: 'pointer' }} onClick={() => navigate('/dashboard')}>
                      <i className="ph ph-cooking-pot" style={{ marginRight: '10px' }}></i> Kitchen KDS
                  </div>
              </div>
          </aside>

          {/* Main Content */}
          <main style={{ flexGrow: 1, padding: '40px', backgroundColor: '#F8FAFC' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                  <h2>Restaurant Performance</h2>
                  <button className="btn btn-outline" onClick={() => navigate('/')}>Exit to Diner App</button>
              </div>

              {/* Top Stats */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '40px' }}>
                  <div className="card p-6" style={{ background: 'white', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                      <p className="text-secondary" style={{ fontSize: '0.9rem', fontWeight: 600 }}>Total Revenue</p>
                      <h3 style={{ fontSize: '2rem', color: '#10B981', marginTop: '10px' }}>₹{totalRevenue.toLocaleString()}</h3>
                  </div>
                  <div className="card p-6" style={{ background: 'white', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                      <p className="text-secondary" style={{ fontSize: '0.9rem', fontWeight: 600 }}>Total Bookings</p>
                      <h3 style={{ fontSize: '2rem', color: '#3B82F6', marginTop: '10px' }}>{totalBookings}</h3>
                  </div>
                  <div className="card p-6" style={{ background: 'white', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                      <p className="text-secondary" style={{ fontSize: '0.9rem', fontWeight: 600 }}>Action Required</p>
                      <h3 style={{ fontSize: '2rem', color: '#F59E0B', marginTop: '10px' }}>{newOrders.length} <span style={{fontSize:'1rem', color:'#94A3B8'}}>New Orders</span></h3>
                  </div>
                  <div className="card p-6" style={{ background: 'white', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                      <p className="text-secondary" style={{ fontSize: '0.9rem', fontWeight: 600 }}>Customer Rating</p>
                      <h3 style={{ fontSize: '2rem', color: '#F59E0B', marginTop: '10px' }}>4.8 <i className="ph-fill ph-star" style={{fontSize: '1.5rem'}}></i></h3>
                  </div>
              </div>

              {/* Main Structure Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
                  
                  {/* Revenue Chart */}
                  <div className="card" style={{ background: 'white', borderRadius: '12px', padding: '30px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                      <h3 style={{ marginBottom: '20px' }}>7-Day Revenue</h3>
                      <div style={{ display: 'flex', alignItems: 'flex-end', height: '250px', gap: '20px', paddingBottom: '20px', borderBottom: '1px solid #E2E8F0' }}>
                          {chartData.map((d, i) => (
                              <div key={i} style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end' }}>
                                  <div style={{ 
                                      width: '100%', 
                                      backgroundColor: '#3B82F6', 
                                      height: `${(d.amount / maxAmount) * 200}px`,
                                      borderRadius: '4px 4px 0 0',
                                      transition: 'height 0.5s ease'
                                  }}></div>
                                  <span style={{ marginTop: '10px', fontSize: '0.85rem', color: '#64748B', fontWeight: 600 }}>{d.day}</span>
                              </div>
                          ))}
                      </div>
                  </div>

                  {/* Immediate Action Panel */}
                  <div className="card" style={{ background: 'white', borderRadius: '12px', padding: '30px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                      <h3 style={{ marginBottom: '20px' }}>Live Order Queue</h3>
                      {newOrders.length === 0 ? (
                          <div style={{ textAlign: 'center', color: '#94A3B8', padding: '40px 0' }}>
                              <i className="ph-light ph-check-circle" style={{ fontSize: '3rem' }}></i>
                              <p className="mt-2">No pending orders.</p>
                          </div>
                      ) : (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                              {newOrders.slice(0, 4).map(o => (
                                  <div key={o.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px', background: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                                      <div>
                                          <div style={{ fontWeight: 600 }}>{o.customerName}</div>
                                          <div style={{ fontSize: '0.85rem', color: '#64748B' }}>₹{o.totalAmount} • {o.items.length} items</div>
                                      </div>
                                      <button className="btn" style={{ padding: '6px 12px', fontSize: '0.85rem', background: '#DBEAFE', color: '#1E3A8A' }} onClick={() => navigate('/dashboard')}>Review</button>
                                  </div>
                              ))}
                              {newOrders.length > 4 && <button className="btn btn-ghost" style={{ width: '100%' }} onClick={() => navigate('/dashboard')}>See all {newOrders.length} orders</button>}
                          </div>
                      )}
                  </div>
              </div>

          </main>
      </div>
  );
}

export default Admin;
