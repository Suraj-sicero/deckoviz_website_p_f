// Common types used throughout the application

export interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export interface StepProps {
  number: string;
  title: string;
  description: string;
  isLast?: boolean;
}

export interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'black';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  withIcon?: boolean;
  onClick?: () => void;
}

export interface GalleryItem {
  id: number;
  title: string;
  description: string;
  image: string;
}

export interface PricingTier {
  name: string;
  price: string | 'Custom';
  description: string;
  features: string[];
  isPopular?: boolean;
  buttonText: string;
}

export interface TestimonialProps {
  quote: string;
  author: string;
  role: string;
}

export interface CategoryProps {
  name: string;
  isSelected?: boolean;
  onClick?: () => void;
}