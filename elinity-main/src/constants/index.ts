import { FeatureItem, NavItem, TestimonialItem } from '../types';
import { LaptopIcon, ShieldIcon, GaugeIcon, HeartIcon } from 'lucide-react';

export const SITE_NAME = 'Nova';
export const SITE_DESCRIPTION = 'Experience technology at its finest';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'Features', href: '#features' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
];

export const FEATURES: FeatureItem[] = [
  {
    id: 1,
    title: 'High Performance',
    description: 'Blazing fast performance that exceeds expectations and delivers results when you need them most.',
    icon: 'GaugeIcon',
  },
  {
    id: 2,
    title: 'Enhanced Security',
    description: 'Advanced protection features that keep your data safe and your privacy respected at all times.',
    icon: 'ShieldIcon',
  },
  {
    id: 3,
    title: 'Intuitive Design',
    description: 'Thoughtfully crafted interfaces that feel natural and make complex tasks simple and enjoyable.',
    icon: 'HeartIcon',
  },
  {
    id: 4,
    title: 'Cutting-edge Technology',
    description: 'Incorporating the latest advancements to provide capabilities beyond the ordinary.',
    icon: 'LaptopIcon',
  },
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 1,
    quote: "This product has completely transformed how we approach our daily workflow. The attention to detail is impressive.",
    author: "Alex Morgan",
    role: "Creative Director",
    avatarUrl: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300",
  },
  {
    id: 2,
    quote: "I've never experienced such a seamless integration. Everything just works the way you'd expect it to.",
    author: "Samantha Lee",
    role: "Tech Entrepreneur",
    avatarUrl: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300",
  },
  {
    id: 3,
    quote: "The support team is exceptional. They helped us implement solutions that perfectly fit our unique needs.",
    author: "Marcus Johnson",
    role: "Operations Manager",
    avatarUrl: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=300",
  },
];