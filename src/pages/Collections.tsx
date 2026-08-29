import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, Image as ImageIcon } from 'lucide-react';
import styles from './Collections.module.css';

import { useAppStore } from '../store/useAppStore';

interface Artwork {
  id: string;
  title: string;
  type: 'image' | 'audio' | 'text';
  color: string;
}

interface Collection {
  id: string;
  title: string;
  description: string;
  color: string;
  icon?: any;
  artworks: Artwork[];
  createdAt: string;
}

export const Collections: React.FC = () => {
  const [selectedCollection, setSelectedCollection] = useState<Collection | null>(null);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);
  const user = useAppStore(state => state.user);

  React.useEffect(() => {
    if (user?.id) {
      setLoading(true);
      fetch(`http://localhost:3001/api/collections?userId=${user.id}`)
        .then(res => res.json())
        .then(data => {
          setCollections(data);
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [user]);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1>My Collections</h1>
          <p>Organize, view, and share all your generated artworks and stories in one place.</p>
        </div>
        <button className={styles.createBtn}>
          <Plus size={20} />
          New Collection
        </button>
      </header>

      <div className={styles.collectionGrid}>
        {loading ? (
          <div style={{ color: 'white', padding: '2rem' }}>Loading collections...</div>
        ) : collections.length === 0 ? (
          <div style={{ color: 'white', padding: '2rem' }}>No collections found. Create one!</div>
        ) : collections.map(collection => (
          <div key={collection.id} className={styles.collectionCard} onClick={() => setSelectedCollection(collection)}>
            <div className={styles.coverGraphic} style={{ background: collection.color || '#333' }}>
              {collection.icon ? <collection.icon size={48} className={styles.coverIcon} /> : <ImageIcon size={48} className={styles.coverIcon} />}
            </div>
            <div className={styles.cardInfo}>
              <h3>{collection.title}</h3>
              <p>{collection.description}</p>
              <div className={styles.meta}>
                <span>{collection.artworks?.length || 0} Items</span>
                <span>{new Date(collection.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {selectedCollection && (
          <div className={styles.overlay} onClick={() => setSelectedCollection(null)}>
            <motion.div 
              className={styles.modal}
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className={styles.closeBtn} onClick={() => setSelectedCollection(null)}>
                <X size={24} />
              </button>

              <div className={styles.modalHeader} style={{ background: selectedCollection.color }}>
                <h2>{selectedCollection.title}</h2>
                <p>{selectedCollection.description}</p>
              </div>

              <div className={styles.modalContent}>
                <div className={styles.artworkGrid}>
                  {selectedCollection.artworks.map(art => (
                    <div key={art.id} className={styles.artItem}>
                      {/* Using a CSS gradient block as a mock image thumbnail */}
                      <div className={styles.artGradient} style={{ background: art.color }}></div>
                      
                      <div className={styles.artOverlay}>
                        <div className={styles.artTitle}>{art.title}</div>
                        <div style={{ fontSize: '0.75rem', opacity: 0.8, textTransform: 'uppercase', marginTop: '4px' }}>
                          {art.type}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
