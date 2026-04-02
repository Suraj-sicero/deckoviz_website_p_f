import React, { useState, useEffect } from "react";
import { Gift, Send, CheckCircle, CreditCard, DollarSign, Sparkles } from "lucide-react";
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

// Floating Coin Component
const FloatingCoin: React.FC<{ delay: number; x: string; duration: number }> = ({ delay, x, duration }) => {
  return (
    <motion.div
      initial={{ y: "100vh", opacity: 0, rotate: 0 }}
      animate={{
        y: "-100vh",
        opacity: [0, 1, 1, 0],
        rotate: 360,
      }}
      transition={{
        duration: duration,
        delay: delay,
        repeat: Infinity,
        ease: "linear",
      }}
      className="absolute"
      style={{ left: x }}
    >
      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 shadow-lg flex items-center justify-center border-4 border-yellow-300">
        <DollarSign className="text-yellow-900" size={24} strokeWidth={3} />
      </div>
    </motion.div>
  );
};

// Money Rain Effect
const MoneyRain: React.FC = () => {
  const coins = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    delay: i * 1.5,
    x: `${10 + i * 11}%`,
    duration: 8 + Math.random() * 4,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {coins.map((coin) => (
        <FloatingCoin key={coin.id} delay={coin.delay} x={coin.x} duration={coin.duration} />
      ))}
    </div>
  );
};

const Referral: React.FC = () => {
  const [earnings, setEarnings] = useState(0);
  const targetEarnings = 200;

  useEffect(() => {
    const interval = setInterval(() => {
      setEarnings((prev) => {
        if (prev >= targetEarnings) return 0;
        return prev + 20;
      });
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="section-padding relative overflow-hidden bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
      <StarSparkles />
      <MoneyRain />

      {/* Ambient gradient background */}
      <div className="absolute inset-0">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-purple-300/30 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] bg-pink-300/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-[700px] h-[700px] bg-indigo-300/20 rounded-full blur-[100px]" />
      </div>

      <div className="container-custom relative z-10">
        {/* Header with animated earnings counter */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="inline-block mb-6"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full blur-xl opacity-50 animate-pulse"></div>
              <div className="relative bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 text-white px-8 py-4 rounded-full shadow-2xl border-4 border-yellow-300">
                <div className="flex items-center gap-3">
                  <DollarSign size={32} strokeWidth={3} />
                  <span className="text-4xl font-bold">{earnings}</span>
                  <Sparkles size={24} className="animate-spin" />
                </div>
              </div>
            </div>
          </motion.div>

          <h2 className="text-5xl md:text-6xl font-extrabold mb-6">
            <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 bg-clip-text text-transparent drop-shadow-sm">
              Referral Bonus ✨
            </span>
          </h2>

          <div className="mx-auto w-24 h-1 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 opacity-70 mb-6"></div>

          <p className="text-xl text-gray-700 max-w-2xl mx-auto font-medium">
            If you refer Deckoviz to friends, family, or anyone else who might
            be interested, we'll send a neat{" "}
            <span className="text-3xl font-bold text-green-600 inline-flex items-center">
              <DollarSign size={28} className="inline" />20
            </span>{" "}
            into your bank account.
          </p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-2xl text-purple-600 font-bold mt-4 flex items-center justify-center gap-2"
          >
            <Sparkles className="animate-pulse" />
            Yes, it is as simple as that!
            <Sparkles className="animate-pulse" />
          </motion.p>
        </div>

        <motion.div
          variants={meetContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12"
        >
          {/* Left Card - Referral Rewards */}
          <motion.div
            variants={meetLeft}
            className="group relative p-8 rounded-3xl bg-white/90 backdrop-blur-xl border-2 border-purple-200 shadow-[0_20px_60px_rgba(168,85,247,0.25)] hover:shadow-[0_30px_90px_rgba(168,85,247,0.4)] transition-all duration-500 hover:-translate-y-2 overflow-hidden"
          >
            {/* Animated background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-100/50 via-pink-100/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Floating coins decoration */}
            <motion.div
              animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute top-4 right-4 w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-lg"
            >
              <DollarSign className="text-yellow-900" size={32} strokeWidth={3} />
            </motion.div>

            <div className="relative z-10">
              <div className="flex items-center mb-6">
                <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-3 rounded-2xl mr-4 shadow-lg">
                  <Gift className="text-white" size={28} />
                </div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Referral Rewards
                </h3>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-6 mb-6">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <DollarSign className="text-green-600" size={40} strokeWidth={3} />
                  <span className="text-5xl font-bold text-green-600">20</span>
                </div>
                <p className="text-center text-gray-700 font-semibold">Per Successful Referral</p>
              </div>

              <p className="text-gray-700 mb-4 leading-relaxed">
                For every person you refer using your unique referral code, we
                send a sweet <span className="font-bold text-green-600">$20</span> straight to your bank account.
              </p>
              
              <div className="bg-purple-50 border-2 border-purple-200 rounded-2xl p-5 mb-4">
                <p className="text-gray-700 font-semibold mb-3 flex items-center gap-2">
                  <Sparkles className="text-purple-600" size={20} />
                  Or choose subscription bonuses:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-700 bg-white rounded-lg p-3 shadow-sm">
                    <CheckCircle className="text-purple-600 mr-3 flex-shrink-0" size={20} />
                    <span className="font-medium">2 months of Ultra Premium</span>
                  </li>
                  <li className="flex items-center text-gray-700 bg-white rounded-lg p-3 shadow-sm">
                    <CheckCircle className="text-purple-600 mr-3 flex-shrink-0" size={20} />
                    <span className="font-medium">3 months of Premium</span>
                  </li>
                  <li className="flex items-center text-gray-700 bg-white rounded-lg p-3 shadow-sm">
                    <CheckCircle className="text-purple-600 mr-3 flex-shrink-0" size={20} />
                    <span className="font-medium">4 months of Basic</span>
                  </li>
                </ul>
              </div>

              <div className="text-sm text-purple-600 font-medium text-center bg-purple-100 rounded-lg py-2">
                💡 Psst... subscription rewards are better value!
              </div>
            </div>
          </motion.div>

          {/* Right Card - How It Works */}
          <motion.div
            variants={meetRight}
            className="group relative p-8 rounded-3xl bg-white/90 backdrop-blur-xl border-2 border-indigo-200 shadow-[0_20px_60px_rgba(99,102,241,0.25)] hover:shadow-[0_30px_90px_rgba(99,102,241,0.4)] transition-all duration-500 hover:-translate-y-2 overflow-hidden"
          >
            {/* Animated background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-100/50 via-purple-100/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-8 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                How do referrals work?
              </h3>

              <div className="space-y-6">
                {/* Step 1 */}
                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-start bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-5 border-2 border-blue-200 transition-all duration-300"
                >
                  <div className="bg-gradient-to-br from-blue-500 to-indigo-500 p-3 rounded-xl mr-4 shadow-lg flex-shrink-0">
                    <Send className="text-white" size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-2 text-gray-800">
                      1. Share your referral link
                    </h4>
                    <p className="text-gray-600 leading-relaxed">
                      Send your unique link or username to friends, family, or anyone you think would love Deckoviz.
                    </p>
                  </div>
                </motion.div>

                {/* Step 2 */}
                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-start bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-5 border-2 border-purple-200 transition-all duration-300"
                >
                  <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-3 rounded-xl mr-4 shadow-lg flex-shrink-0">
                    <CreditCard className="text-white" size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-2 text-gray-800">
                      2. They make a purchase
                    </h4>
                    <p className="text-gray-600 leading-relaxed">
                      Once they buy a Deckoviz Smart Frame through your link, they're automatically tagged as your referral.
                    </p>
                    <div className="mt-3 bg-white rounded-lg p-3 border border-purple-200">
                      <p className="text-sm text-purple-700 font-semibold">
                        💰 10 referrals = $200 in your pocket!
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Step 3 */}
                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-start bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-5 border-2 border-green-200 transition-all duration-300"
                >
                  <div className="bg-gradient-to-br from-green-500 to-emerald-500 p-3 rounded-xl mr-4 shadow-lg flex-shrink-0">
                    <CheckCircle className="text-white" size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-2 text-gray-800">
                      3. They're enjoying Deckoviz
                    </h4>
                    <p className="text-gray-600 leading-relaxed">
                      The referred user keeps their subscription active and doesn't request a refund.
                    </p>
                  </div>
                </motion.div>

                {/* Step 4 */}
                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-start bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-5 border-2 border-yellow-300 transition-all duration-300"
                >
                  <div className="bg-gradient-to-br from-yellow-500 to-orange-500 p-3 rounded-xl mr-4 shadow-lg flex-shrink-0 relative">
                    <Gift className="text-white" size={24} />
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"
                    ></motion.div>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-2 text-gray-800 flex items-center gap-2">
                      4. You get paid
                      <DollarSign className="text-green-600" size={24} />
                    </h4>
                    <p className="text-gray-600 leading-relaxed">
                      We wire $20 directly to your bank account or PayPal account.
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* CTA Button */}
        <div className="text-center">
          <motion.a
            href="mailto:referrals@deckoviz.com?subject=Deckoviz Referral&body=Hi Deckoviz Team,%0D%0A%0D%0AI would like to start referring Deckoviz.%0D%0A%0D%0AThanks!"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative inline-flex items-center justify-center gap-3 px-12 py-5 rounded-full font-bold text-xl text-white bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 overflow-hidden"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-purple-700 via-pink-600 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <DollarSign className="relative z-10" size={28} strokeWidth={3} />
            <span className="relative z-10">Start Referring Now</span>
            <Sparkles className="relative z-10 group-hover:animate-spin" size={24} />
          </motion.a>
          
          <p className="mt-6 text-gray-600">
            <a
              href="terms-conditions"
              className="text-purple-600 hover:text-purple-700 font-semibold hover:underline transition-colors"
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
