import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import LiveMap from '../components/LiveMap';
import TableQR from '../components/TableQR';
import WaitTimePredictor from '../components/WaitTimePredictor';

function Restaurant() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { restaurants, cart, addToCart, removeFromCart } = useAppContext();
  
  const restaurant = restaurants.find(r => r.id === id);

  if (!restaurant) {
      return <div className="container" style={{ padding: '100px 0', textAlign: 'center' }}>Restaurant not found</div>;
  }

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <>
      <div className="restaurant-header" style={{ backgroundColor: '#1E293B' }}>
          <img src={restaurant.image} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }} onError={(e) => { e.target.onerror = null; e.target.src = `https://loremflickr.com/800/500/food?lock=${restaurant.id.replace('r', '')}`; }} alt="" />
          <div className="container header-content" style={{ position: 'relative', zIndex: 2 }}>
              <button className="btn btn-icon btn-back" onClick={() => navigate('/')}><i className="ph ph-arrow-left"></i></button>
              <div className="header-info">
                  <h1>{restaurant.name}</h1>
                  <p><i className="ph-fill ph-star"></i> {restaurant.rating} • {restaurant.cuisine} • {restaurant.distance}</p>
                  <WaitTimePredictor restaurantId={restaurant.id} baseWait={restaurant.wait_time} />
              </div>
          </div>
      </div>

      <div className="container" style={{ paddingTop: '30px' }}>
          <h2 style={{ marginBottom: '10px' }}>Live Location & Directions</h2>
          <LiveMap destinationName={restaurant.name} address="Kochi, Kerala" />
      </div>

      <div className="container menu-layout">
          <div className="menu-section">
              <h2>Digital Menu</h2>
              <p className="text-secondary mb-4">Live prices and availability.</p>
              
              <div className="menu-list">
                  {restaurant.menu.map(item => (
                      <div className="menu-item" key={item.id}>
                          <div className="menu-info">
                              <div className="menu-title">
                                  <h4>{item.name}</h4>
                                  <span className="tag">{item.tag}</span>
                              </div>
                              <p className="menu-desc">{item.description}</p>
                              <p className="menu-price">₹{item.price}</p>
                          </div>
                          <button className="btn btn-outline btn-add" onClick={() => addToCart(item, restaurant)}>Add</button>
                      </div>
                  ))}
              </div>
          </div>
          
          <div className="booking-sidebar">
              {cart.length === 0 ? (
                  <div className="empty-cart">
                      <i className="ph ph-shopping-bag text-gray" style={{ fontSize: '3rem' }}></i>
                      <h3>No items selected</h3>
                      <p className="text-secondary">Add items to pre-order and save time when you arrive.</p>
                      <button className="btn btn-primary mt-4" style={{ width: '100%' }} onClick={() => navigate('/checkout', { state: { restaurant } })}>Reserve Table Only</button>
                  </div>
              ) : (
                  <div className="cart-active">
                      <h3>Pre-Order Cart</h3>
                      <div className="cart-items mt-4">
                          {cart.map((item, index) => (
                              <div className="cart-item" key={index}>
                                  <div className="item-name">{item.name} <span className="qty">x{item.quantity}</span></div>
                                  <div className="item-price">₹{item.price * item.quantity}</div>
                                  <button className="btn-remove" onClick={() => removeFromCart(index)}><i className="ph ph-x"></i></button>
                              </div>
                          ))}
                      </div>
                      <div className="cart-total mt-4">
                          <span>Total</span>
                          <span>₹{total}</span>
                      </div>
                      <button className="btn btn-primary mt-4" style={{ width: '100%' }} onClick={() => navigate('/checkout', { state: { restaurant } })}>Proceed to Checkout</button>
                  </div>
              )}
          </div>
      </div>
    </>
  );
}

export default Restaurant;
