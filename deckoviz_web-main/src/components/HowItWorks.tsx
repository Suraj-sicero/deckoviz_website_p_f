import React from 'react';
import Step from './common/Step';

const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="section-padding bg-gray-50">
      <div className="container-custom">
        <h2 className="text-center mb-4">
          How <span className="text-primary-600">Deckoviz</span> Works
        </h2>
        <p className="text-center text-gray-600 max-w-3xl mx-auto mb-16">
          Getting started with your AI-powered art and space enhancement frame is simple, intuitive, and inspiring.
        </p>

        <div className="space-y-24">
          {/* Step 1 */}
          <div className="flex flex-col md:flex-row items-center">
            <div className="w-full md:w-1/2 order-2 md:order-1">
              <Step 
                number="01" 
                title="Choose Your Frame" 
                description="Select from our beautifully crafted frame designs that complement any interior style. (You can also explore add-ons and subscription options for an even richer experience.)"
              />
            </div>
            <div className="w-full md:w-1/2 order-1 md:order-2 mb-12 md:mb-0">
              <div className=" rounded-xl p-6 ">
                <div className="aspect-w-16 aspect-h-9 flex items-center justify-center text-center">
                  <div>
                    {/* <h3 className="text-xl font-semibold mb-2">Step 01 Visualization</h3>
                    <p className="text-gray-500">Interactive demo would appear here</p> */}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col md:flex-row items-center">
            <div className="w-full md:w-1/2 mb-12 md:mb-0">
              <div className=" rounded-xl p-6 ">
                <div className="aspect-w-16 aspect-h-9 flex items-center justify-center text-center">
                  <div>
                    {/* <h3 className="text-xl font-semibold mb-2">Step 02 Visualization</h3>
                    <p className="text-gray-500">Interactive demo would appear here</p> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 md:pl-16">
              <Step 
                number="02" 
                title="Connect & Setup" 
                description="Connect your frame to Wi-Fi and download the easy-to-use Deckoviz mobile app."
              />
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col md:flex-row items-center">
            <div className="w-full md:w-1/2 order-2 md:order-1">
              <Step 
                number="03" 
                title="Curate Your Experience" 
                description="Use our pre-curated painting and image collections or create your own personalized collections. Easily set preferences like: Display timings, Sequences, Music pairing, Collection moods, Frequency of updates. Manage everything seamlessly from the app."
              />
            </div>
            <div className="w-full md:w-1/2 order-1 md:order-2 mb-12 md:mb-0">
              <div className="rounded-xl p-6 ">
                <div className="aspect-w-16 aspect-h-9 flex items-center justify-center text-center">
                  <div>
                    {/* <h3 className="text-xl font-semibold mb-2">Step 03 Visualization</h3>
                    <p className="text-gray-500">Interactive demo would appear here</p> */}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 4 */}
          <div className="flex flex-col md:flex-row items-center">
            <div className="w-full md:w-1/2 mb-12 md:mb-0">
              <div className=" rounded-xl p-6 ">
                <div className="aspect-w-16 aspect-h-9 flex items-center justify-center text-center">
                  <div>
                    {/* <h3 className="text-xl font-semibold mb-2">Step 04 Visualization</h3>
                    <p className="text-gray-500">Interactive demo would appear here</p> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 md:pl-16">
              <Step 
                number="04" 
                title="Enjoy, Personalize, and Evolve" 
                description="Send your chosen collections to your Deckoviz AI Dynamic Frame Device. Your frame starts displaying art — and over time, it learns from your interactions, evolving with you to create even more personalized, dynamic, and emotionally resonant experiences."
                isLast={true}
              />
            </div>
          </div>
        </div>

        <div className="text-center mt-16">
          <p className="text-lg text-gray-600 italic">
            Every day, Deckoviz transforms your space — and your life — with beauty, wonder, and personal meaning.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;