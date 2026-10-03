import React, { useEffect, useState } from 'react';
import db from '../services/firebase';

/**
 * WaitTimePredictor fetches the number of pending orders for a restaurant
 * and combines it with the base wait_time to provide an estimated waiting time.
 *
 * Props:
 *  - restaurantId: string
 *  - baseWait: string (e.g., '15-30 mins') – we extract the minimum minutes.
 */
const WaitTimePredictor = ({ restaurantId, baseWait }) => {
  const [estimated, setEstimated] = useState(baseWait);

  // Helper: extract the minimum minutes from a string like "15-30 mins" or "20 mins"
  const parseBase = (str) => {
    const match = str.match(/(\d+)/);
    return match ? parseInt(match[1], 10) : 0;
  };

  useEffect(() => {
    const fetchPending = async () => {
      try {
        const allOrders = await db.getAllOrders();
        const pending = allOrders.filter(
          (o) => o.restaurantId === restaurantId && o.status === 'NEW'
        );
        const base = parseBase(baseWait);
        // Simple model: each pending order adds 2 minutes to the wait.
        const estimate = base + pending.length * 2;
        setEstimated(`${estimate} mins`);
      } catch (e) {
        console.error('Wait time prediction error', e);
      }
    };
    fetchPending();
  }, [restaurantId, baseWait]);

  return (
    <div className="wait-time-predictor" style={{ marginTop: '0.5rem', color: '#F59E0B' }}>
      <i className="ph-fill ph-clock" style={{ marginRight: '4px' }}></i>
      Estimated wait: {estimated}
    </div>
  );
};

export default WaitTimePredictor;
