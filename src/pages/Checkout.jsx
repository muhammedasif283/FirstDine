import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import db from '../services/firebase';

function Checkout() {
  const { cart, currentUser, clearCart } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();
  const restaurant = location.state?.restaurant;

  if (!restaurant) {
      return (
          <div className="container p-6" style={{ paddingTop: '120px', textAlign: 'center', minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <i className="ph ph-warning-circle text-gray" style={{ fontSize: '4rem', color: 'var(--brand-primary)', marginBottom: '1rem' }}></i>
              <h2>No Restaurant Selected</h2>
              <p className="text-secondary mt-2" style={{ maxWidth: '400px' }}>Please choose a restaurant first before making a booking or placing a pre-order.</p>
              <button className="btn btn-primary mt-6" onClick={() => navigate('/')}>Browse Restaurants</button>
          </div>
      );
  }

  const [date, setDate] = useState('2026-03-09');
  const [time, setTime] = useState('19:00 PM');
  const [guests, setGuests] = useState(2);
  const [isProcessing, setIsProcessing] = useState(false);

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const confirmBooking = async () => {
      if (!currentUser) {
          alert("Please login to complete your reservation.");
          navigate('/login');
          return;
      }

      const orderData = {
          restaurantId: restaurant.id,
          restaurantName: restaurant.name,
          customerName: currentUser.name,
          customerUsername: currentUser.username,
          reservationDate: date,
          reservationTime: time,
          partySize: guests,
          items: cart,
          totalAmount: total,
          status: 'NEW'
      };

      setIsProcessing(true);

      try {
          const ticket = await db.pushOrder(orderData);
          alert(`🎉 Booking Confirmed! [Ticket: ${ticket.id}]\nYour table for ${guests} is reserved at ${time}.\nKitchen has received your pre-order!`);
          clearCart();
          navigate('/');
      } catch (e) {
          alert("Failed to confirm booking.");
          console.error(e);
          setIsProcessing(false);
      }
  };

  return (
      <div className="container checkout-layout" style={{ paddingTop: '100px', paddingBottom: '40px' }}>
          <button className="btn btn-ghost mb-4" onClick={() => navigate(`/restaurant/${restaurant?.id}`)}>
              <i className="ph ph-arrow-left"></i> Back to Menu
          </button>
          
          <div className="checkout-grid">
              <div className="reservation-form card p-6">
                  <h2>Reservation Details</h2>
                  <h4 className="mt-2 text-primary">{restaurant?.name}</h4>
                  
                  <div className="form-group mt-4">
                      <label>Date</label>
                      <input type="date" className="form-control" value={date} onChange={e => setDate(e.target.value)} />
                  </div>
                  
                  <div className="form-group">
                      <label>Time</label>
                      <select className="form-control" value={time} onChange={e => setTime(e.target.value)}>
                          <option>19:00 PM</option>
                          <option>19:30 PM</option>
                          <option>20:00 PM</option>
                          <option>20:30 PM</option>
                      </select>
                  </div>
                  
                  <div className="form-group">
                      <label>Party Size</label>
                      <div className="qty-selector">
                          <button className="btn btn-icon" onClick={() => setGuests(Math.max(1, guests - 1))}><i className="ph ph-minus"></i></button>
                          <input type="number" value={guests} readOnly className="text-center" style={{ width: '40px', border: 'none', background: 'transparent', fontSize: '1.1rem', fontWeight: 600 }} />
                          <button className="btn btn-icon" onClick={() => setGuests(guests + 1)}><i className="ph ph-plus"></i></button>
                      </div>
                  </div>
              </div>
              
              <div className="summary-card card p-6 bg-slate">
                  <h2>Order Summary</h2>
                  {cart.length > 0 ? (
                      <>
                          <div className="summary-items mt-4">
                              {cart.map(item => (
                                  <div className="summary-item" key={item.id}>
                                      <span>{item.name} ({item.quantity})</span>
                                      <span>₹{item.price * item.quantity}</span>
                                  </div>
                              ))}
                              <div className="summary-total mt-4">
                                  <span>Total Amount</span>
                                  <span>₹{total}</span>
                              </div>
                          </div>
                          <div className="alert mt-4">
                              <i className="ph-fill ph-check-circle"></i> Kitchen will start prep right before you arrive!
                          </div>
                      </>
                  ) : (
                      <p className="mt-4">Table Reservation Only. No pre-ordered items.</p>
                  )}
                  
                  <button className="btn btn-primary mt-6" style={{ width: '100%' }} disabled={isProcessing} onClick={confirmBooking}>
                      {isProcessing ? <><i className="ph ph-spinner ph-spin"></i> Processing...</> : 'Confirm Reservation'}
                  </button>
              </div>
          </div>
      </div>
  );
}

export default Checkout;
