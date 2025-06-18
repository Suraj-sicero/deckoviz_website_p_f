import React from 'react';
import { Gift, Send, CheckCircle, CreditCard } from 'lucide-react';

const Referral: React.FC = () => {
  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            Referral <span className="text-primary-600">Bonus</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            If you refer Deckoviz to friends, family, or anyone else who might be interested, we'll send a neat $20 into your bank account.
          </p>
          <p className="text-lg text-primary-600 font-semibold mt-4">
            Yes, it is as simple as that!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white p-8 rounded-xl shadow-sm">
            <div className="flex items-center mb-4">
              <Gift className="text-primary-600 mr-3" size={24} />
              <h3 className="text-xl font-semibold">Referral Rewards</h3>
            </div>
            <p className="text-gray-600 mb-4">
              For every person you refer to, using your unique referral code, we send a sweet $20 straight to your bank account.
            </p>
            <p className="text-gray-600">
              For more value, you can always choose a subscription bonus instead (psst, the subscriptions rewards are better value):
            </p>
            <ul className="mt-4 space-y-2">
              <li className="flex items-center text-gray-600">
                <CheckCircle className="text-primary-600 mr-2" size={16} />
                2 months of ultra premium
              </li>
              <li className="flex items-center text-gray-600">
                <CheckCircle className="text-primary-600 mr-2" size={16} />
                3 months of premium
              </li>
              <li className="flex items-center text-gray-600">
                <CheckCircle className="text-primary-600 mr-2" size={16} />
                4 months of basic subscription
              </li>
            </ul>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold mb-6">How do referrals work?</h3>
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-primary-100 p-2 rounded-full mr-4">
                  <Send className="text-primary-600" size={20} />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">1. Share your referral link</h4>
                  <p className="text-gray-600">
                    Send your unique link or username to a friend, family member, or anyone you think would love Deckoviz. 
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-primary-100 p-2 rounded-full mr-4">
                  <CreditCard className="text-primary-600" size={20} />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">2. They make a purchase</h4>
                  <p className="text-gray-600">
                    Once they buy a Deckoviz Smart Frame through your link, they’re automatically tagged as your referral. If it's ten people who have purchased through your link, here is a sweet $200 in your pocket, just like that. 
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-primary-100 p-2 rounded-full mr-4">
                  <CheckCircle className="text-primary-600" size={20} />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">3. They're enjoying Deckoviz - we know they will! </h4>
                  <p className="text-gray-600">
                    The referred user keeps their subscription active and doesn't request a refund.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-primary-100 p-2 rounded-full mr-4">
                  <Gift className="text-primary-600" size={20} />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">4. You get paid</h4>
                  <p className="text-gray-600">
                    We wire $20 directly to your bank account or PayPal account. 
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <a
            href="https://hpanel.hostinger.com/referrals"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-primary-600 text-white px-8 py-3 rounded-lg hover:bg-primary-700 transition-colors"
          >
            Start Referring Now
          </a>
          <p className="mt-4 text-gray-500">
            <a href="#" className="text-primary-600 hover:underline">Terms of Service</a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Referral; 
