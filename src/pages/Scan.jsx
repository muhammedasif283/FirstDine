import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QrReader } from 'react-qr-reader';

/**
 * Scan page allows staff/customer to scan a QR code placed on a table.
 * The QR contains a URL like `/scan?restaurant=restId&table=tableId`.
 * Upon successful scan we extract the params and navigate to the restaurant page.
 */
const Scan = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleResult = (result, err) => {
    if (result) {
      const text = result?.text;
      if (text) {
        try {
          const url = new URL(text);
          const restaurantId = url.searchParams.get('restaurant');
          const tableId = url.searchParams.get('table');
          if (restaurantId) {
            // Navigate to Restaurant page with optional state containing tableId
            navigate(`/restaurant/${restaurantId}`, { state: { tableId } });
          } else {
            setError('QR does not contain a restaurant id');
          }
        } catch (e) {
          setError('Invalid QR code data');
        }
      }
    }

    if (err) {
      // Note: react-qr-reader triggers err callback on every frame if no QR is found.
      // We only want to log real camera capture or permission issues.
      if (err.name === 'NotAllowedError' || err.name === 'NotFoundError') {
        console.error(err);
        setError('Camera error – ensure camera permissions are granted');
      }
    }
  };

  return (
    <div className="container" style={{ padding: '2rem 0', textAlign: 'center' }}>
      <h2>Scan Table QR Code</h2>
      {error && <p style={{ color: 'red', margin: '1rem 0' }}>{error}</p>}
      
      <div style={{ width: '100%', maxWidth: '400px', margin: '0 auto', overflow: 'hidden', borderRadius: '12px' }}>
        <QrReader
          onResult={handleResult}
          constraints={{ facingMode: 'environment' }}
        />
      </div>

      <p style={{ marginTop: '1.5rem', color: 'var(--text-secondary)' }}>
        Align the QR code within the viewfinder. Once detected, you will be taken to the restaurant's ordering page.
      </p>
    </div>
  );
};

export default Scan;
