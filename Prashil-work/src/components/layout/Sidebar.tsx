import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAppStore, type UserRole } from '../../store/useAppStore';
import { Home, Sparkles, TrendingUp, Users, Settings, BookOpen, FileSearch, Building2, Library, FolderHeart, Wrench } from 'lucide-react';
import styles from './Sidebar.module.css';
import { clsx } from 'clsx';

export const Sidebar: React.FC = () => {
  const { role, user, fetchUser } = useAppStore();

  React.useEffect(() => {
    fetchUser(role);
  }, [role, fetchUser]);

  const navItems = [
    { path: '/', label: 'School Ground', icon: Home, roles: ['student', 'teacher', 'admin'] },
    { path: '/journal', label: 'Daily Journal', icon: BookOpen, roles: ['student'] },
    { path: '/vizzy', label: 'Vizzy Chat', icon: Sparkles, roles: ['student'] },
    { path: '/progress', label: 'My Progress', icon: TrendingUp, roles: ['student', 'teacher'] },
    { path: '/creative', label: 'Creative Studio', icon: Sparkles, roles: ['student', 'teacher'] },
    { path: '/collections', label: 'My Collections', icon: FolderHeart, roles: ['student', 'teacher'] },
    { path: '/classes', label: 'My Classes', icon: Users, roles: ['teacher', 'admin'] },
    { path: '/classroom', label: 'Live Classroom', icon: Sparkles, roles: ['teacher'] },
    { path: '/group', label: 'Group Session', icon: Users, roles: ['teacher'] },
    { path: '/curriculum', label: 'Life Skills', icon: Library, roles: ['student', 'teacher', 'admin'] },
    { path: '/tools', label: 'Teaching Tools', icon: Wrench, roles: ['student', 'teacher', 'admin'] },
    { path: '/evaluation', label: 'Evaluation', icon: FileSearch, roles: ['teacher', 'admin'] },
    { path: '/business', label: 'Enterprise CCEMO', icon: Building2, roles: ['admin'] },
    { path: '/admin', label: 'Settings', icon: Settings, roles: ['admin'] },
  ];

  const visibleItems = navItems.filter(item => item.roles.includes(role));

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarContent}>
        <div className={styles.brand}>
          <img src="/logo.png" alt="Deckoviz Space Labs Logo" className={styles.brandLogo} />
          <h2>Deckoviz Space Labs</h2>
        </div>
        
        <nav className={styles.nav}>
          {visibleItems.map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => clsx(styles.navItem, isActive && styles.active)}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
      
      <div 
        className={styles.profileSection} 
        style={{ cursor: 'pointer' }}
        onClick={() => {
          const roles: UserRole[] = ['student', 'teacher', 'admin'];
          const nextRole = roles[(roles.indexOf(role) + 1) % roles.length];
          useAppStore.getState().setRole(nextRole);
        }}
        title="Click to switch role"
      >
        <div className={styles.avatarWrapper}>
          <div className={styles.avatar}>
            {role.charAt(0).toUpperCase()}
          </div>
          <div className={styles.statusDot}></div>
        </div>
        <div className={styles.profileInfo}>
          <span className={styles.profileName}>{user ? user.name : 'Loading...'}</span>
          <span className={styles.profileRole}>{role}</span>
        </div>
        <button className={styles.settingsBtn}>
          <Settings size={18} />
        </button>
      </div>
    </aside>
  );
};
