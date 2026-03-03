import React from "react";
import { Gift, Send, CheckCircle, CreditCard } from "lucide-react";
import StarSparkles from "./StarSparkles";
import { motion } from "framer-motion";

const meetContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const meetLeft = {
  hidden: {
    opacity: 0,
    x: -200,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const meetRight = {
  hidden: {
    opacity: 0,
    x: 200,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};
const Referral: React.FC = () => {
  return (
    <section className="section-padding relative overflow-hidden">
      <StarSparkles />

      {/* Ambient gradient background */}
      <div className="absolute inset-0">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-purple-300/30 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] bg-pink-300/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-[700px] h-[700px] bg-indigo-300/20 rounded-full blur-[100px]" />
      </div>

      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
            <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 bg-clip-text text-transparent drop-shadow-sm">
              Referral Bonus ✨
            </span>
          </h2>
          <div className="absolute top-20 left-20 w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
          <div className="absolute bottom-24 right-32 w-2 h-2 bg-pink-400 rounded-full animate-pulse delay-300"></div>

          <div className="mx-auto w-24 h-1 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 opacity-70 mb-6"></div>

          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            If you refer Deckoviz to friends, family, or anyone else who might
            be interested, we'll send a neat $20 into your bank account.
          </p>
          <p className="text-lg text-primary-600 font-semibold mt-4">
            Yes, it is as simple as that!
          </p>
        </div>

        <motion.div
  variants={meetContainer}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.3 }}
  className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12"
>
          <motion.div
           variants={meetLeft}
            className="
relative p-8 rounded-2xl
bg-white/80 backdrop-blur-xl
border border-white/50
shadow-[0_20px_60px_rgba(168,85,247,0.2)]
hover:shadow-[0_30px_90px_rgba(168,85,247,0.35)]
transition-all duration-500
hover:-translate-y-1
"
          >
            <div className="flex items-center mb-4">
              <Gift
                className="text-purple-600 mr-3 drop-shadow-md group-hover:scale-110 transition-transform duration-300"
                size={26}
              />
              <h3 className="text-xl font-semibold">Referral Rewards</h3>
            </div>
            <p className="text-gray-600 mb-4">
              For every person you refer to, using your unique referral code, we
              send a sweet $20 straight to your bank account.
            </p>
            <p className="text-gray-600">
              For more value, you can always choose a subscription bonus instead
              (psst, the subscriptions rewards are better value):
            </p>
            <ul className="mt-4 space-y-2">
              <li className="flex items-center text-gray-600">
                <CheckCircle className="text-primary-600 mr-2" size={16} />2
                months of ultra premium
              </li>
              <li className="flex items-center text-gray-600">
                <CheckCircle className="text-primary-600 mr-2" size={16} />3
                months of premium
              </li>
              <li className="flex items-center text-gray-600">
                <CheckCircle className="text-primary-600 mr-2" size={16} />4
                months of basic subscription
              </li>
            </ul>
          </motion.div>

          <motion.div
  variants={meetRight}
            className="
relative p-8 rounded-2xl
bg-white/80 backdrop-blur-xl
border border-white/50
shadow-[0_20px_60px_rgba(168,85,247,0.2)]
hover:shadow-[0_30px_90px_rgba(168,85,247,0.35)]
transition-all duration-500
hover:-translate-y-1
"
          >
            <h3 className="text-xl font-semibold mb-6">
              How do referrals work?
            </h3>
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-primary-100 p-2 rounded-full mr-4">
                  <Send className="text-primary-600" size={20} />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">
                    1. Share your referral link
                  </h4>
                  <p className="text-gray-600">
                    Send your unique link or username to a friend, family
                    member, or anyone you think would love Deckoviz.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-primary-100 p-2 rounded-full mr-4">
                  <CreditCard className="text-primary-600" size={20} />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">
                    2. They make a purchase
                  </h4>
                  <p className="text-gray-600">
                    Once they buy a Deckoviz Smart Frame through your link,
                    they’re automatically tagged as your referral. If it's ten
                    people who have purchased through your link, here is a sweet
                    $200 in your pocket, just like that.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-primary-100 p-2 rounded-full mr-4">
                  <CheckCircle className="text-primary-600" size={20} />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">
                    3. They're enjoying Deckoviz - we know they will!{" "}
                  </h4>
                  <p className="text-gray-600">
                    The referred user keeps their subscription active and
                    doesn't request a refund.
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
          </motion.div>
        </motion.div>

        <div className="text-center">
          <a
            href="mailto:referrals@deckoviz.com?subject=Deckoviz Referral&body=Hi Deckoviz Team,%0D%0A%0D%0AI would like to start referring Deckoviz.%0D%0A%0D%0AThanks!  "
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center justify-center
px-10 py-4 rounded-full font-semibold text-lg text-white
bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600
shadow-xl hover:shadow-purple-500/40
transition-all duration-300 hover:scale-105 overflow-hidden"
          >
            Start Referring Now
          </a>
          <p className="mt-4 text-gray-500">
            <a
              href="terms-conditions"
              className="text-primary-600 hover:underline"
            >
              Terms of Service
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Referral;
