import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, Image as ImageIcon, Music, Type } from 'lucide-react';
import styles from './Collections.module.css';

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
  itemCount: number;
  lastUpdated: string;
  color: string;
  icon: any;
  artworks: Artwork[];
}

const MOCK_COLLECTIONS: Collection[] = [
  {
    id: 'col1',
    title: 'Solar System Artworks',
    description: 'A collection of generated planetary textures and space environments for the science project.',
    itemCount: 12,
    lastUpdated: '2 days ago',
    color: 'linear-gradient(135deg, #ff9a9e, #fecfef)',
    icon: ImageIcon,
    artworks: [
      { id: 'a1', title: 'Mars Surface', type: 'image', color: 'linear-gradient(135deg, #ff7e5f, #feb47b)' },
      { id: 'a2', title: 'Jupiter Storms', type: 'image', color: 'linear-gradient(135deg, #8e2de2, #4a00e0)' },
      { id: 'a3', title: 'Saturn Rings', type: 'image', color: 'linear-gradient(135deg, #fceabb, #f8b500)' },
      { id: 'a4', title: 'Pluto Ice', type: 'image', color: 'linear-gradient(135deg, #00c6ff, #0072ff)' },
      { id: 'a5', title: 'Venus Clouds', type: 'image', color: 'linear-gradient(135deg, #f12711, #f5af19)' },
    ]
  },
  {
    id: 'col2',
    title: 'Cyberpunk Story Concepts',
    description: 'Character designs and environmental concept art for my sci-fi creative writing assignment.',
    itemCount: 8,
    lastUpdated: '1 week ago',
    color: 'linear-gradient(135deg, #a18cd1, #fbc2eb)',
    icon: Type,
    artworks: [
      { id: 'c1', title: 'Neon Alley', type: 'image', color: 'linear-gradient(135deg, #000428, #004e92)' },
      { id: 'c2', title: 'Hacker Hideout', type: 'image', color: 'linear-gradient(135deg, #11998e, #38ef7d)' },
      { id: 'c3', title: 'Cyber City Draft 1', type: 'text', color: 'linear-gradient(135deg, #434343, #000000)' },
    ]
  },
  {
    id: 'col3',
    title: 'Ambient Focus Beats',
    description: 'Generated lo-fi and ambient tracks I use while studying math.',
    itemCount: 5,
    lastUpdated: 'Just now',
    color: 'linear-gradient(135deg, #84fab0, #8fd3f4)',
    icon: Music,
    artworks: [
      { id: 'm1', title: 'Rainy Cafe Study', type: 'audio', color: 'linear-gradient(135deg, #304352, #d7d2cc)' },
      { id: 'm2', title: 'Midnight Synth', type: 'audio', color: 'linear-gradient(135deg, #4b6cb7, #182848)' },
      { id: 'm3', title: 'Morning Light', type: 'audio', color: 'linear-gradient(135deg, #fffc00, #ffffff)' },
    ]
  }
];

export const Collections: React.FC = () => {
  const [selectedCollection, setSelectedCollection] = useState<Collection | null>(null);

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
        {MOCK_COLLECTIONS.map(collection => (
          <div key={collection.id} className={styles.collectionCard} onClick={() => setSelectedCollection(collection)}>
            <div className={styles.coverGraphic} style={{ background: collection.color }}>
              <collection.icon size={48} className={styles.coverIcon} />
            </div>
            <div className={styles.cardInfo}>
              <h3>{collection.title}</h3>
              <p>{collection.description}</p>
              <div className={styles.meta}>
                <span>{collection.itemCount} Items</span>
                <span>{collection.lastUpdated}</span>
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
