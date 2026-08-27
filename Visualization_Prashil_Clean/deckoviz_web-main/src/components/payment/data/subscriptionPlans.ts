export type SubscriptionPlan = {
  name: string;
  monthlyPrice: number;
  yearlyPrice: number;
  imageCredits: number;
  videoMinutes: number;
  textTokens: number;
  audioMinutes: number;
  dailyRecommendations: number;
  totalCredits: number;
  features: string[];
};

export const subscriptionPlans: SubscriptionPlan[] = [
  {
    name: "Basic Plan",
    monthlyPrice: 10,
    yearlyPrice: 90,
    imageCredits: 10,
    videoMinutes: 0,
    textTokens: 100_000,
    audioMinutes: 0,
    dailyRecommendations: 20,
    totalCredits: 100,
    features: [
      "No voice features",
      "No video features",
    ],
  },
  {
    name: "Premium Plan",
    monthlyPrice: 20,
    yearlyPrice: 160,
    imageCredits: 20,
    videoMinutes: 3,
    textTokens: 300_000,
    audioMinutes: 30,
    dailyRecommendations: 30,
    totalCredits: 500,
    features: [
      "Daily proactive creations for you",
    ],
  },
  {
    name: "Ultra Plan",
    monthlyPrice: 30,
    yearlyPrice: 240,
    imageCredits: 20,
    videoMinutes: 10,
    textTokens: 500_000,
    audioMinutes: 60,
    dailyRecommendations: 30,
    totalCredits: 1000,
    features: [
      "Comprehensive deep user persona integration",
      "More immersive, more personalized, more magical experience",
      "First to try out new features",
      "Daily proactive creations for you",
    ],
  },
]; 