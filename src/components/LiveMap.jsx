import React, { useState, useEffect } from 'react';

function LiveMap({ destinationName, address = 'Kochi, Kerala' }) {
  const [travelMode, setTravelMode] = useState('driving');
  const [userLocation, setUserLocation] = useState(null);
  const [locating, setLocating] = useState(false);

  useEffect(() => {
    if (navigator.geolocation) {
      setLocating(true);
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
          setLocating(false);
        },
        () => {
          // Default Kochi center coordinates fallback
          setUserLocation({ lat: 9.9312, lng: 76.2673 });
          setLocating(false);
        }
      );
    }
  }, []);

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${destinationName}, ${address}`)}`;

  const travelModes = [
    { id: 'driving', icon: 'ph-car', label: 'Drive', time: '12 mins', distance: '3.4 km' },
    { id: 'walking', icon: 'ph-person-simple-walk', label: 'Walk', time: '38 mins', distance: '3.2 km' },
    { id: 'transit', icon: 'ph-bus', label: 'Metro/Bus', time: '20 mins', distance: '3.9 km' }
  ];

  const currentMode = travelModes.find(m => m.id === travelMode) || travelModes[0];

  return (
    <div className="live-map-card">
      <div className="live-map-header">
        <div className="live-map-title">
          <span className="live-ping"></span>
          <div>
            <h4>{destinationName}</h4>
            <p className="text-secondary">{address}</p>
          </div>
        </div>
        <div className="travel-mode-pills">
          {travelModes.map((mode) => (
            <button
              key={mode.id}
              className={`travel-pill ${travelMode === mode.id ? 'active' : ''}`}
              onClick={() => setTravelMode(mode.id)}
            >
              <i className={`ph-bold ${mode.icon}`}></i>
              <span>{mode.time}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="map-visual-container">
        {/* Stylized vector map canvas */}
        <div className="map-grid-bg">
          <svg className="map-routes-svg" viewBox="0 0 800 240" preserveAspectRatio="none">
            <defs>
              <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="50%" stopColor="#F59E0B" />
                <stop offset="100%" stopColor="#FF6B6B" />
              </linearGradient>
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Simulated background roads */}
            <path d="M 0,180 Q 200,120 400,170 T 800,130" stroke="rgba(148, 163, 184, 0.15)" strokeWidth="6" fill="none" />
            <path d="M 50,240 Q 300,60 650,200" stroke="rgba(148, 163, 184, 0.12)" strokeWidth="4" fill="none" />
            <path d="M 200,0 C 250,120 500,80 600,240" stroke="rgba(148, 163, 184, 0.1)" strokeWidth="3" fill="none" />

            {/* Active GPS Route */}
            <path
              d="M 120,160 C 260,110 380,210 520,130 S 640,90 680,85"
              stroke="url(#routeGradient)"
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray="8 6"
              className="animated-route"
              fill="none"
              filter="url(#glow)"
            />
          </svg>

          {/* User Starting Pin */}
          <div className="map-pin user-pin" style={{ left: '15%', top: '65%' }}>
            <div className="pin-pulse user-pulse"></div>
            <div className="pin-marker user-marker">
              <i className="ph-fill ph-navigation-arrow"></i>
            </div>
            <span className="pin-label">You ({locating ? 'Locating...' : 'Your Location'})</span>
          </div>

          {/* Restaurant Destination Pin */}
          <div className="map-pin destination-pin" style={{ left: '85%', top: '35%' }}>
            <div className="pin-pulse dest-pulse"></div>
            <div className="pin-marker dest-marker">
              <i className="ph-fill ph-fork-knife"></i>
            </div>
            <span className="pin-label dest-label">{destinationName}</span>
          </div>

          {/* Floating ETA badge */}
          <div className="eta-badge-floating">
            <i className={`ph-fill ${currentMode.icon}`}></i>
            <div>
              <strong>{currentMode.time}</strong>
              <small>({currentMode.distance}) • Normal Traffic</small>
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="map-footer-actions">
          <div className="navigation-status">
            <i className="ph-fill ph-check-circle text-success"></i>
            <span>Live route active from current position</span>
          </div>
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline btn-sm map-directions-btn"
          >
            <i className="ph-bold ph-arrow-square-out"></i>
            Open Directions in Google Maps
          </a>
        </div>
      </div>
    </div>
  );
}

export default LiveMap;
