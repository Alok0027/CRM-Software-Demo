import React, { useRef } from 'react';
import { useScroll, useTransform } from 'framer-motion';
import mobileMockup from '../assets/mobile-mockup.svg';
import CrmMobileContent from './CrmMobileContent';

const MobileFeature = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '-50%']);

  return (
    <section ref={targetRef} className="bg-gray-100 py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 p-4 sm:p-8">
          <div className="sticky top-24">
            <div className="relative w-full max-w-xs mx-auto">
              <img src={mobileMockup} alt="Mobile App Mockup" className="w-full h-auto" />
              <div className="absolute inset-0 p-5 pt-12 pb-8">
                <div className="h-full w-full overflow-hidden rounded-2xl">
                  <div style={{ transform: `translateY(${y})` }}>
                    <CrmMobileContent />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="md:w-1/2 text-center md:text-left mt-12 md:mt-0">
          <h2 className="text-3xl font-medium text-gray-900 sm:text-4xl lg:text-5xl">
            We are available on the mobile phone also
          </h2>
          <div className="space-y-6 text-lg md:text-xl font-extralight text-gray-600 mt-4">
            <p>
              Access your CRM and stay connected with your team, even on the go. Our mobile experience gives you the power and flexibility you need, right in your pocket.
            </p>
            <p>
              Collaborate with your team in real-time, share notes, and assign tasks to keep everyone aligned, no matter where they are working from.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MobileFeature;
