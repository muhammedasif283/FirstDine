import React from 'react';
import QRCode from 'qrcode.react';

/**
 * TableQR component generates a QR code that encodes a URL for scanning.
 * The encoded URL points to the Scan page with restaurant and table parameters.
 *
 * Props:
 *  - restaurantId: string – the ID of the restaurant.
 *  - tableId: string|number – the table identifier.
 *  - size?: number – size of the QR code canvas (default 180).
 */
const TableQR = ({ restaurantId, tableId, size = 180 }) => {
  // Build a URL that the scanner can resolve. Using relative path ensures it works on localhost.
  const encodedUrl = `${window.location.origin}/scan?restaurant=${encodeURIComponent(restaurantId)}&table=${encodeURIComponent(tableId)}`;

  return (
    <div className="table-qr-container" style={{ textAlign: 'center', margin: '2rem 0' }}>
      <h3 style={{ marginBottom: '0.5rem' }}>Scan to Order at Table {tableId}</h3>
      <QRCode value={encodedUrl} size={size} level="H" includeMargin={true} />
      <p style={{ fontSize: '0.85rem', marginTop: '0.5rem', color: 'var(--text-secondary)' }}>
        {encodedUrl}
      </p>
    </div>
  );
};

export default TableQR;
