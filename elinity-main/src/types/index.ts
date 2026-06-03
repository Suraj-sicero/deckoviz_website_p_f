// Common types used throughout the application

export interface NavItem {
  label: string;
  href: string;
}

export interface FeatureItem {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export interface TestimonialItem {
  id: number;
  quote: string;
  author: string;
  role: string;
  avatarUrl: string;
}