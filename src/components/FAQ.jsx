import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';

const Accordion = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-gray-50 rounded-lg">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between text-left text-gray-800 p-6"
      >
        <span className="text-lg font-medium">{question}</span>
        <span
          className="ml-6 flex h-7 items-center text-orange-500"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
          </svg>
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto'}}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-6 text-gray-600">{answer}</p>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const faqsList = [
    { question: 'How do I get started with ClientNest?', answer: 'Getting started is easy! Simply sign up for a free trial on our website, and you can begin exploring our features right away. No credit card required.' },
    { question: 'Can I import my existing contacts?', answer: 'Yes, you can easily import your contacts from a CSV file or directly from other services like Google Contacts. Our system will guide you through the process.' },
    { question: 'Is my data secure with ClientNest?', answer: 'Absolutely. We use industry-standard encryption and security protocols to ensure your data is always safe and private. Your security is our top priority.' },
    { question: 'What integrations do you offer?', answer: 'We offer a wide range of integrations with popular tools like Slack, Google Calendar, Mailchimp, and more. You can find the full list on our integrations page.' },
    { question: 'Is there a mobile app?', answer: 'Yes, ClientNest is available on both iOS and Android, so you can manage your customer relationships on the go. Download it from the App Store or Google Play.' },
    { question: 'What kind of support do you provide?', answer: 'We offer 24/7 email support, as well as live chat support during business hours. Our Pro and Enterprise plans also include a dedicated account manager.' },
];

const FAQ = () => {
  return (
    <section className="bg-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium text-gray-800 mb-4">Frequently Asked Questions</h2>
        <p className="max-w-3xl mx-auto text-gray-600 mb-12">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.
        </p>
        <div className="grid md:grid-cols-2 gap-8 text-left">
          {faqsList.map((faq, index) => (
            <Accordion key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
