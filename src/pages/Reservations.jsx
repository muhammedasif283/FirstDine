import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

function Reservations() {
  const { currentUser, userOrders, loading } = useAppContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (!currentUser) {
        navigate('/login');
    }
  }, [currentUser, navigate]);

  if (loading) {
      return (
          <div style={{ textAlign: 'center', padding: '100px' }}>
              <i className="ph ph-spinner ph-spin" style={{ fontSize: '3rem' }}></i>
              <p>Loading Bookings...</p>
          </div>
      );
  }

  if (userOrders.length === 0) {
      return (
          <div className="container" style={{ padding: '100px 20px', textAlign: 'center' }}>
              <i className="ph-light ph-calendar-blank" style={{ fontSize: '5rem', color: '#CBD5E1', marginBottom: '20px' }}></i>
              <h2 className="mb-4">No Reservations Yet</h2>
              <p className="text-secondary mb-6">You haven't booked any tables or pre-ordered food.</p>
              <button className="btn btn-primary" onClick={() => navigate('/')}>Home</button>
          </div>
      );
  }

  return (
      <div className="container" style={{ padding: '80px 20px', maxWidth: '900px' }}>
          <h2 className="mb-6">My Reservations</h2>
          <div style={{ display: 'grid', gap: '25px' }}>
              {userOrders.map(o => (
                  <div className="card p-6" key={o.id} style={{ borderLeft: '4px solid var(--brand-primary)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <div>
                              <h3 className="mb-2" style={{ fontSize: '1.4rem' }}>{o.restaurantName}</h3>
                              <p className="text-secondary">
                                  <i className="ph-fill ph-calendar-check" style={{ color: 'var(--brand-primary)' }}></i> {o.reservationDate} at {o.reservationTime} 
                                  &nbsp;•&nbsp; 
                                  <i className="ph-fill ph-users"></i> Table for {o.partySize}
                              </p>
                          </div>
                          <div style={{ textAlign: 'right' }}>
                              <div className="badge" style={{ 
                                  background: o.status === 'NEW' ? '#DBEAFE' : o.status === 'PREP' ? '#FEF3C7' : '#D1FAE5', 
                                  color: o.status === 'NEW' ? '#1E3A8A' : o.status === 'PREP' ? '#92400E' : '#065F46', 
                                  border: 'none' 
                              }}>
                                  {o.status === 'NEW' ? 'Confirmed & Sent to Kitchen' : o.status === 'PREP' ? 'Kitchen is Prepping' : 'Food Ready'}
                              </div>
                              <div className="mt-2" style={{ fontSize: '0.85rem', color: '#94A3B8', fontFamily: 'monospace' }}>Ticket: #{o.id}</div>
                          </div>
                      </div>
                      
                      {o.items && o.items.length > 0 ? (
                          <div className="mt-4" style={{ background: '#F8FAFC', padding: '20px', borderRadius: 'var(--radius-md)', border: '1px solid #F1F5F9' }}>
                              <div style={{ fontWeight: 700, color: 'var(--brand-dark)', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                  <i className="ph-fill ph-shopping-bag"></i> Pre-ordered Items
                              </div>
                              {o.items.map((i, idx) => (
                                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '0.95rem', color: 'var(--text-primary)' }}>
                                      <span><span style={{ fontWeight: 700, color: 'var(--text-secondary)', marginRight: '5px' }}>{i.quantity}x</span> {i.name}</span>
                                      <span style={{ fontWeight: 500 }}>₹{i.price * i.quantity}</span>
                                  </div>
                              ))}
                              <div style={{ borderTop: '1px dashed #CBD5E1', marginTop: '15px', paddingTop: '15px', display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '1.1rem', color: 'var(--brand-dark)' }}>
                                  <span>Total Paid / Due</span>
                                  <span>₹{o.totalAmount}</span>
                              </div>
                          </div>
                      ) : (
                          <div className="mt-4 p-4" style={{ background: '#F8FAFC', borderRadius: 'var(--radius-md)', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
                              Table Reservation Only (No Food Pre-ordered)
                          </div>
                      )}
                  </div>
              ))}
          </div>
      </div>
  );
}

export default Reservations;
