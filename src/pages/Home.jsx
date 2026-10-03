import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { motion } from 'framer-motion';

function Home() {
  const { restaurants, currentUser, userOrders } = useAppContext();
  const navigate = useNavigate();
  
  const [currentCuisineFilter, setCurrentCuisineFilter] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [currentCoords, setCurrentCoords] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const cuisines = ['Arabic', 'Chinese', 'Spanish', 'Indian', 'Turkish', 'Japanese', 'Italian'];

  let displayRestaurants = restaurants;
  if (currentCuisineFilter) {
      displayRestaurants = displayRestaurants.filter(r => r.cuisine.toLowerCase() === currentCuisineFilter.toLowerCase());
  }
  if (searchTerm) {
      const term = searchTerm.toLowerCase();
      displayRestaurants = displayRestaurants.filter(r => 
          r.name.toLowerCase().includes(term) || 
          r.cuisine.toLowerCase().includes(term) || 
          r.description.toLowerCase().includes(term) ||
          (r.menu && r.menu.some(item => item.name.toLowerCase().includes(term)))
      );
  }

  const handleLocationChange = (val) => {
    if (val === 'clear') {
        setCurrentLocation(null);
        return;
    }
    if (val === 'current') {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    setCurrentCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
                    setTimeout(() => {
                        setCurrentLocation("Your GPS Location");
                        alert("📍 Location successfully updated! Distances are now real-time.");
                    }, 600);
                },
                () => {
                    setTimeout(() => {
                        setCurrentLocation("Kochi, Kerala (Auto-detected)");
                    }, 800);
                }
            );
        } else {
            setCurrentLocation("Kochi, Kerala (Default)");
        }
    } else if (val) {
        setCurrentLocation(val);
    }
  };

  const filterByCuisine = (cuisine) => {
      setCurrentCuisineFilter(prev => prev === cuisine ? null : cuisine);
  };

  const clearFilters = () => {
      setCurrentCuisineFilter(null);
      setCurrentLocation(null);
      setCurrentCoords(null);
      setSearchTerm('');
  };

  const getRestaurantCoords = (r) => {
      // Deterministic pseudorandom coords near Kochi for MVP presentation
      const num = parseInt(r.id.replace('r', ''));
      const lat = 9.9312 + ((num % 10) * 0.005);
      const lng = 76.2673 + ((num % 7) * 0.005);
      return { lat, lng };
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
      const R = 6371;
      const dLat = (lat2 - lat1) * Math.PI / 180;
      const dLon = (lon2 - lon1) * Math.PI / 180;
      const a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon/2) * Math.sin(dLon/2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
      return (R * c).toFixed(1); 
  };

  // AI Recommendation Engine
  const getTopCuisine = () => {
    if (!userOrders || userOrders.length === 0) return null;
    const cuisineCounts = {};
    userOrders.forEach(order => {
       const res = restaurants.find(r => r.id === order.restaurantId);
       if (res) {
          cuisineCounts[res.cuisine] = (cuisineCounts[res.cuisine] || 0) + 1;
       }
    });
    const sorted = Object.entries(cuisineCounts).sort((a, b) => b[1] - a[1]);
    return sorted.length > 0 ? sorted[0][0] : null;
  };
  const favoriteCuisine = getTopCuisine();
  const recommended = favoriteCuisine ? restaurants.filter(r => r.cuisine === favoriteCuisine).slice(0, 3) : [];

  // Popular Dishes (Sample random menus from closest logic)
  const popularDishes = [];
  restaurants.slice(3, 7).forEach(r => {
      if (r.menu?.length > 1) {
          popularDishes.push({ ...r.menu[1], restaurantId: r.id, restaurantName: r.name });
      }
  });

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <section className="hero-section">
          <div className="container hero-content">
              <div className="hero-text">
                  <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="hero-title">
                      Dine in Begins <br/><span className="brand-primary-text">Before You Arrive.</span>
                  </motion.h1>
                  <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="hero-subtitle">
                      Experience the future of dining. Seamlessly discover, pre-book, and dine without the wait.
                  </motion.p>
                  
                  <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }} className="search-controls">
                      <div className="location-selector" id="loc-selector-btn">
                          <i className="ph-fill ph-map-pin" id="loc-icon"></i>
                          <select id="home-location" onChange={(e) => handleLocationChange(e.target.value)} value={currentLocation || ""}>
                              <option value="" disabled>{currentLocation || 'Select Location'}</option>
                              <option value="current">📍 Use Current Location</option>
                              <option value="Downtown, Kochi">Downtown, Kochi</option>
                              <option value="Edappally">Edappally</option>
                              <option value="Fort Kochi">Fort Kochi</option>
                              {currentLocation && <option value="clear" style={{ color: 'red' }}>Clear Location</option>}
                          </select>
                      </div>
                      
                      <div className="search-bar">
                          <i className="ph-bold ph-magnifying-glass"></i>
                          <input 
                              type="text" 
                              placeholder="Search premium restaurants, dishes, or cuisines..." 
                              value={searchTerm}
                              onChange={(e) => setSearchTerm(e.target.value)}
                          />
                      </div>
                  </motion.div>

                  <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }} className="cuisine-filters">
                      {cuisines.map((c) => (
                          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} key={c} className={`filter-btn ${currentCuisineFilter === c ? 'active' : ''}`} onClick={() => filterByCuisine(c)}>
                              {c}
                          </motion.button>
                      ))}
                  </motion.div>
              </div>
          </div>
      </section>

      {/* AI Recommendations Section */}
      {currentUser && favoriteCuisine && !currentCuisineFilter && !currentLocation && (
          <section className="container" style={{ padding: '40px 20px 20px', borderBottom: '1px solid var(--border-color)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                  <i className="ph-fill ph-sparkle" style={{ color: '#F59E0B', fontSize: '1.8rem' }}></i>
                  <h2 style={{ fontSize: '1.6rem' }}>Based on your past {favoriteCuisine} orders</h2>
              </div>
              <div className="restaurant-grid">
                  {recommended.map(r => (
                      <div key={r.id} className="restaurant-card" onClick={() => navigate(`/restaurant/${r.id}`)}>
                          <div className="card-image-wrapper">
                              <img 
                                  src={r.image} 
                                  alt={r.name} 
                                  className="card-image" 
                                  onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800'; }} 
                              />
                              <div style={{ position: 'absolute', top: '10px', left: '10px', background: '#F59E0B', color: 'white', padding: '4px 10px', borderRadius: 'var(--radius-sm)', fontSize: '0.75rem', fontWeight: 700, boxShadow: '0 2px 6px rgba(0,0,0,0.3)' }}>Top Match</div>
                          </div>
                          <div className="card-content">
                              <div className="card-header">
                                  <h3>{r.name}</h3>
                                  <span className="rating"><i className="ph-fill ph-star"></i> {r.rating}</span>
                              </div>
                              <p className="card-meta">{r.cuisine} • {r.distance}</p>
                              <p className="card-desc">{r.description}</p>
                              <div className="card-actions">
                                  <button className="btn btn-primary btn-card-action">Book Table & Menu</button>
                              </div>
                          </div>
                      </div>
                  ))}
              </div>
          </section>
      )}

      {/* Popular Dishes Near You */}
      {!currentCuisineFilter && popularDishes.length > 0 && (
         <section className="container popular-dishes-section">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Popular Dishes Near You</h2>
                  <span className="text-secondary" style={{ fontSize: '0.88rem' }}>Curated chef specialties</span>
              </div>
              <div className="popular-dishes-scroll">
                  {popularDishes.map((dish, i) => (
                      <motion.div 
                          initial={{ opacity: 0, x: 20 }} 
                          animate={{ opacity: 1, x: 0 }} 
                          transition={{ delay: 0.1 + (i * 0.08) }} 
                          whileHover={{ y: -4 }} 
                          key={dish.id || i} 
                          className="popular-dish-card"
                          onClick={() => navigate(`/restaurant/${dish.restaurantId}`)}
                      >
                          <img 
                              src={dish.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=400'} 
                              alt={dish.name} 
                              className="popular-dish-img"
                              onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=400'; }}
                          />
                          <div className="popular-dish-info">
                              <h4 className="popular-dish-title">{dish.name}</h4>
                              <p className="popular-dish-res">From {dish.restaurantName}</p>
                              <div className="popular-dish-bottom">
                                  <span className="popular-dish-price">₹{dish.price}</span>
                                  {dish.tag && <span className="popular-dish-badge">{dish.tag}</span>}
                              </div>
                          </div>
                      </motion.div>
                  ))}
              </div>
         </section>
      )}

      <section className="restaurants-section container" id="restaurants">
          <div className="section-header reveal active">
              <h2>{currentCuisineFilter ? `${currentCuisineFilter} Restaurants` : (currentLocation ? `Restaurants near ${currentLocation}` : 'Trending Near You')}</h2>
              <button className="btn btn-ghost" onClick={clearFilters}>See All <i className="ph-bold ph-arrow-right"></i></button>
          </div>
          
          {displayRestaurants.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-secondary)' }}>
                  <i className="ph-light ph-storefront" style={{ fontSize: '3.5rem', marginBottom: '14px', color: 'var(--brand-primary)' }}></i>
                  <h3 style={{ marginBottom: '8px' }}>No restaurants found</h3>
                  <p>Try searching for a different keyword or click See All to reset filters.</p>
                  <button className="btn btn-outline mt-4" onClick={clearFilters}>Reset All Filters</button>
              </div>
          ) : (
              <div className="restaurant-grid">
                  {displayRestaurants.map((r, i) => {
                      let realDistanceDisplay = r.distance;
                      if (currentCoords) {
                          const rc = getRestaurantCoords(r);
                          realDistanceDisplay = `${calculateDistance(currentCoords.lat, currentCoords.lng, rc.lat, rc.lng)} km away (Live)`;
                      }

                      return (
                          <motion.div 
                              initial={{ opacity: 0, y: 25 }} 
                              animate={{ opacity: 1, y: 0 }} 
                              transition={{ delay: Math.min((i % 12) * 0.05, 0.4), duration: 0.4 }} 
                              key={r.id} 
                              className="restaurant-card" 
                              onClick={() => navigate(`/restaurant/${r.id}`)}
                          >
                              <div className="card-image-wrapper">
                                  <img 
                                      src={r.image} 
                                      alt={r.name} 
                                      className="card-image" 
                                      loading="lazy"
                                      onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800'; }} 
                                  />
                                  <div className="card-badge">
                                      <i className="ph-fill ph-clock"></i> {r.wait_time}
                                  </div>
                              </div>
                              <div className="card-content">
                                  <div className="card-header">
                                      <h3>{r.name}</h3>
                                      <span className="rating"><i className="ph-fill ph-star"></i> {r.rating}</span>
                                  </div>
                                  <p className="card-meta">
                                      {r.cuisine} • <span style={currentCoords ? { color: '#22C55E', fontWeight: 600 } : {}}>{realDistanceDisplay}</span>
                                  </p>
                                  <p className="card-desc">{r.description}</p>
                                  <div className="card-actions">
                                      <button className="btn btn-primary btn-card-action">
                                          <span>Book Table & Menu</span>
                                          <i className="ph-bold ph-arrow-right"></i>
                                      </button>
                                  </div>
                              </div>
                          </motion.div>
                      );
                  })}
              </div>
          )}
      </section>
    </motion.div>
  );
}

export default Home;
