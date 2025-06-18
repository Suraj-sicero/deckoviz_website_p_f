import { useState } from 'react';
import { Check, X } from 'lucide-react';
import Button from './common/Button';
import { useNavigate } from 'react-router-dom';

interface PricingPlan {
  name: string;
  price: number;
  description: string;
  features: string[];
  isPopular?: boolean;
  buttonText: string;
}

const Pricing = () => {
  const [selectedTier, setSelectedTier] = useState<PricingPlan | null>(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const pricingTiers: PricingPlan[] = [
    {
      name: 'Starter',
      price: 699,
      description: 'Your gateway to a smarter, more beautiful world.',
      features: [
        '43-inch HD Smart Display',
        'Basic AI features for smart curation',
        'Advanced AI learning and personalization',
        'Unlimited and expanding art library',
        'Wi-Fi connectivity',
        '6 months of Advanced Subscription included',
        'Perfect for your first immersive art experience',
        'Ideal for bedrooms, cozy living rooms, and home offices',
      ],
      buttonText: 'Buy Now',
    },
    {
      name: 'Premium',
      price: 949,
      description: 'Our most loved choice for art, personalization, and storytelling.',
      features: [
        '55-inch Full HD Smart Display',
        'Advanced AI features with dynamic learning',
        'Expanded storage and customization features',
        'Unlimited and expanding art library',
        'Wi-Fi + Bluetooth connectivity',
        'Motion and light sensors',
        'Get 3 frame options, including 1 fully customized frame',
        '12 months of Advanced Subscription or 6 months of Elite Subscription included',
        'Ideal for living rooms, creative spaces, offices, cafes, and more',
      ],
      isPopular: true,
      buttonText: 'Buy Now',
    },
    {
      name: 'Professional',
      price: 1199,
      description: 'The ultimate Deckoviz experience — breathtaking, personal, extraordinary.',
      features: [
        '55-inch 4K UHD Premium Display',
        'Superior visual quality with advanced color calibration',
        'Premium finish options and custom frame designs',
        'Advanced AI learning, recommendations, curation, and personalization',
        'Priority access to new releases and special collections',
        'Unlimited and expanding art library',
        'Much greater storage for your creations, memories, and curated collections',
        'Wi-Fi + Bluetooth + motion and light sensors',
        'Get 6 frame options, including 1 fully customized frame',
        '24 months of Advanced or 12 months of Elite Subscription included',
        'Marketplace discounts for art, collections, and commissions',
        'Branded content options for businesses and spaces',
      ],
      buttonText: 'Buy Now'
    },
    {
      name: 'Enterprise',
      price: 0,
      description: 'Custom solutions crafted for businesses, galleries, and larger spaces.',
      features: [
        'Multiple frame network management',
        'Branded content creation and display',
        'API integration capabilities',
        'Dedicated account manager',
        'Custom sizing options',
        'Bulk order discounts',
        'Smart art and ambience solutions tailored for your brand and space',
      ],
      buttonText: 'Contact Sales'
    }
  ];

  const handleBuyNow = (tier: PricingPlan) => {
    navigate('/place-order', { 
      state: { 
        selectedTier: {
          name: tier.name,
          price: `$${tier.price}`,
          features: tier.features
        }
      }
    });
  };

  const openModal = (tier: PricingPlan) => {
    setSelectedTier(tier);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  // Modal for displaying all features
  const FeaturesModal = () => {
    if (!selectedTier) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold text-gray-900">{selectedTier.name} Features</h3>
              <button 
                onClick={closeModal}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <X size={24} className="text-gray-500" />
              </button>
            </div>
            
            <div className="mb-6">
              <span className="text-3xl font-bold text-gray-900">${selectedTier.price}</span>
              {selectedTier.price !== 0 && <span className="text-gray-500 ml-1">/frame</span>}
              <p className="text-gray-600 mt-2">{selectedTier.description}</p>
            </div>
            
            <div className="border-t border-gray-200 pt-4">
              <h4 className="font-medium text-lg mb-3">All Features:</h4>
              <ul className="space-y-3">
                {selectedTier.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check size={20} className="text-purple-600 mr-2 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="mt-8 flex justify-end space-x-3">
              <button 
                className="px-5 py-2 font-medium rounded-lg border border-gray-300 hover:bg-gray-50"
                onClick={closeModal}
              >
                Close
              </button>
              <button 
                className="px-5 py-2 font-medium rounded-lg bg-purple-600 text-white hover:bg-purple-700"
                onClick={() => {
                  closeModal();
                  handleBuyNow(selectedTier);
                }}
              >
                {selectedTier.buttonText}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section id="pricing" className="section-padding bg-white py-16">
      <div className="container mx-auto px-4 max-w-7xl">
        <h2 className="text-4xl font-bold text-center mb-4">
          Simple <span className="text-purple-600">Pricing</span>
        </h2>
        <p className="text-center text-lg text-gray-600 max-w-3xl mx-auto mb-12">
          Choose the perfect Deckoviz frame to match your space, your dreams, and your lifestyle. And enjoy early bird discounts of 20% off while discounts still apply! 
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {pricingTiers.map((tier, index) => (
            <div
              key={index}
              className={`rounded-xl p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] transition-all duration-300 hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.15)] hover:-translate-y-1 flex flex-col ${
                tier.isPopular
                  ? 'bg-purple-50 border-2 border-purple-200 relative group'
                  : 'bg-white border border-gray-200 group'
              }`}
            >
              {tier.isPopular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium shadow-lg">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2 group-hover:text-purple-600 transition-colors duration-300">{tier.name}</h3>
                <div className="mb-4">
                  {tier.price === 0 ? (
                    <span className="text-4xl font-bold group-hover:text-purple-600 transition-colors duration-300">Custom</span>
                  ) : (
                    <>
                      <span className="text-4xl font-bold group-hover:text-purple-600 transition-colors duration-300">${tier.price}</span>
                      <span className="text-gray-500">/frame</span>
                    </>
                  )}
                </div>
                <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">{tier.description}</p>
              </div>
              
              <ul className="space-y-3 mb-6">
                {tier.features.slice(0, 5).map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start group/item">
                    <Check size={18} className="text-purple-600 mr-2 mt-1 flex-shrink-0 group-hover/item:scale-110 transition-transform duration-300" />
                    <span className="text-gray-700 text-sm group-hover/item:text-gray-900 transition-colors duration-300">{feature}</span>
                  </li>
                ))}
              </ul>

              {tier.features.length > 5 && (
                <button
                  onClick={() => openModal(tier)}
                  className="text-purple-600 hover:text-purple-700 font-medium text-sm mb-6 flex items-center justify-center w-full group/button"
                >
                  <span className="group-hover/button:underline transition-all duration-300">See all features</span>
                </button>
              )}
              
              <div className="mt-auto">
                <Button 
                  variant={tier.isPopular ? "primary" : "black"}
                  size="md" 
                  className="w-full py-2 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
                  onClick={() => handleBuyNow(tier)}
                >
                  {tier.buttonText}
                </Button>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center mt-8">
          <a href="#" className="text-purple-600 hover:text-purple-700 font-medium">
            View complete feature comparison
          </a>
        </p>
      </div>
      
      {showModal && <FeaturesModal />}
    </section>
  );
};

export default Pricing;
