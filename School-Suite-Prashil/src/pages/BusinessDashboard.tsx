import React, { useState } from 'react';
import { GlassCard } from '../components/ui/GlassCard';
import { Button } from '../components/ui/Button';
import { Building2, Utensils, ShoppingBag, Bed, Sparkles, Wand2 } from 'lucide-react';
import styles from './BusinessDashboard.module.css';

type Vertical = 'restaurant' | 'hotel' | 'retail';

export const BusinessDashboard: React.FC = () => {
  const [vertical, setVertical] = useState<Vertical>('restaurant');

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.titleInfo}>
          <Building2 size={32} className={styles.headerIcon} />
          <div>
            <h1>Enterprise CCEMO Portal</h1>
            <p className={styles.subtitle}>Industry-specific CDEMO modes</p>
          </div>
        </div>
      </header>

      <div className={styles.verticalTabs}>
        <Button 
          variant={vertical === 'restaurant' ? 'primary' : 'secondary'} 
          onClick={() => setVertical('restaurant')}
        >
          <Utensils size={16} /> Restaurant
        </Button>
        <Button 
          variant={vertical === 'hotel' ? 'primary' : 'secondary'} 
          onClick={() => setVertical('hotel')}
        >
          <Bed size={16} /> Hotel
        </Button>
        <Button 
          variant={vertical === 'retail' ? 'primary' : 'secondary'} 
          onClick={() => setVertical('retail')}
        >
          <ShoppingBag size={16} /> Retail
        </Button>
      </div>

      <div className={styles.grid}>
        <GlassCard className={styles.profileCard}>
          <div className={styles.cardHeader}>
            <h3>Business Brand Profile</h3>
          </div>
          
          {vertical === 'restaurant' && (
            <div className={styles.profileForm}>
              <div className={styles.formGroup}>
                <label>Cuisine Type</label>
                <input type="text" defaultValue="Modern Fusion" className={styles.input} />
              </div>
              <div className={styles.formGroup}>
                <label>Price Point</label>
                <select className={styles.input}>
                  <option>$$$ (Fine Dining)</option>
                  <option>$$ (Casual)</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label>Ambiance Goals</label>
                <textarea className={styles.input} defaultValue="Intimate, low lighting, jazz music, romantic." />
              </div>
            </div>
          )}

          {vertical === 'hotel' && (
            <div className={styles.profileForm}>
              <div className={styles.formGroup}>
                <label>Property Tier</label>
                <select className={styles.input}>
                  <option>Boutique Luxury</option>
                  <option>Business/Corporate</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label>Key Amenities</label>
                <textarea className={styles.input} defaultValue="Rooftop pool, spa, farm-to-table breakfast." />
              </div>
            </div>
          )}

          {vertical === 'retail' && (
            <div className={styles.profileForm}>
              <div className={styles.formGroup}>
                <label>Product Category</label>
                <input type="text" defaultValue="High-end Streetwear" className={styles.input} />
              </div>
              <div className={styles.formGroup}>
                <label>Target Customer</label>
                <input type="text" defaultValue="Gen Z / Young Millennials" className={styles.input} />
              </div>
            </div>
          )}

          <Button variant="primary" style={{ marginTop: '1rem' }}>Save Profile</Button>
        </GlassCard>

        <GlassCard className={styles.cdemoCard}>
          <div className={styles.cardHeader}>
            <h3><Sparkles size={18} color="var(--accent-navy)"/> Vizzy CDEMO Mode</h3>
          </div>
          <p className={styles.cdemoDesc}>
            Vizzy inherently understands hospitality pacing, {vertical} aesthetics, and your brand profile. 
            What would you like to create?
          </p>

          <div className={styles.actionGrid}>
            {vertical === 'restaurant' && (
              <>
                <Button variant="secondary" className={styles.actionBtn}><Wand2 size={16}/> Draft Seasonal Menu</Button>
                <Button variant="secondary" className={styles.actionBtn}><Wand2 size={16}/> Ambiance Styling Concepts</Button>
              </>
            )}
            {vertical === 'hotel' && (
              <>
                <Button variant="secondary" className={styles.actionBtn}><Wand2 size={16}/> Guest Welcome Sequence</Button>
                <Button variant="secondary" className={styles.actionBtn}><Wand2 size={16}/> Concierge Recommendations</Button>
              </>
            )}
            {vertical === 'retail' && (
              <>
                <Button variant="secondary" className={styles.actionBtn}><Wand2 size={16}/> Merchandising Layout</Button>
                <Button variant="secondary" className={styles.actionBtn}><Wand2 size={16}/> Seasonal Campaign Strategy</Button>
              </>
            )}
            <Button variant="secondary" className={styles.actionBtn}><Wand2 size={16}/> Brand Storytelling Post</Button>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};
