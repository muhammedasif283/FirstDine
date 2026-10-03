import { motion } from 'framer-motion';

function Skeleton() {
  return (
    <div className="container" style={{ padding: '40px 0' }}>
       {/* Hero Skeleton (Staggered Animation) */}
       <div style={{ padding: '80px 0', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
           <motion.div 
               animate={{ opacity: [0.4, 0.8, 0.4] }} 
               transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }} 
               style={{ height: '48px', width: '50%', background: 'var(--border-color)', borderRadius: '8px', marginBottom: '20px' }} 
           />
           <motion.div 
               animate={{ opacity: [0.4, 0.8, 0.4] }} 
               transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }} 
               style={{ height: '24px', width: '30%', background: 'var(--border-color)', borderRadius: '4px' }} 
           />
       </div>

       {/* Masonry Layout Skeleton Feed */}
       <div className="restaurant-grid" style={{ marginTop: '20px' }}>
           {[1, 2, 3, 4, 5, 6].map(i => (
               <div key={i} className="restaurant-card" style={{ pointerEvents: 'none', border: 'none', boxShadow: 'none' }}>
                   <motion.div 
                       animate={{ opacity: [0.3, 0.6, 0.3] }} 
                       transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.15 }}
                       style={{ height: '220px', background: 'var(--border-color)', width: '100%', borderRadius: '12px 12px 0 0' }}
                   />
                   <div className="card-content" style={{ padding: '20px', border: '1px solid var(--border-color)', borderTop: 'none', borderRadius: '0 0 12px 12px' }}>
                       <motion.div 
                           animate={{ opacity: [0.3, 0.6, 0.3] }} 
                           transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.15 }}
                           style={{ height: '24px', background: 'var(--border-color)', width: '70%', borderRadius: '6px', marginBottom: '12px' }}
                       />
                       <motion.div 
                           animate={{ opacity: [0.3, 0.6, 0.3] }} 
                           transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.15 }}
                           style={{ height: '16px', background: 'var(--border-color)', width: '40%', borderRadius: '4px', marginBottom: '24px' }}
                       />
                       <motion.div 
                           animate={{ opacity: [0.3, 0.6, 0.3] }} 
                           transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.15 }}
                           style={{ height: '42px', background: 'var(--border-color)', width: '100%', borderRadius: '8px' }}
                       />
                   </div>
               </div>
           ))}
       </div>
    </div>
  );
}

export default Skeleton;
