'use client'

import { motion, useAnimation } from 'framer-motion'
import { ArrowRight, BarChart2, Code, Facebook, Headphones, Instagram, LinkedIn, Shield, Twitter, Users, Zap } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'

const sdkExamples = {
  nodejs: `import { MpesaFlow } from 'mpesaflow';

const mpesaflow = new MpesaFlow('your-api-key');

async function initiatePayment() {
  try {
    const result = await mpesaflow.initiatePayment({
      amount: 1000,
      phoneNumber: '254712345678',
      accountReference: 'INV001',
    });
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}`,
  python: `from mpesaflow import MpesaFlow

mpesaflow = MpesaFlow('your-api-key')

def initiate_payment():
    try:
        result = mpesaflow.initiate_payment(
            amount=1000,
            phone_number='254712345678',
            account_reference='INV001'
        )
        print(result)
    except Exception as e:
        print(f"Error: {e}")`,
  php: `<?php
require_once 'vendor/autoload.php';

use MpesaFlow\MpesaFlow;

$mpesaflow = new MpesaFlow('your-api-key');

try {
    $result = $mpesaflow->initiatePayment([
        'amount' => 1000,
        'phoneNumber' => '254712345678',
        'accountReference' => 'INV001',
    ]);
    print_r($result);
} catch (Exception $e) {
    echo 'Error: ' . $e->getMessage();
}`,
}

function AnimatedSection({ children }: { children: React.ReactNode }) {
  const controls = useAnimation()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  useEffect(() => {
    if (inView) {
      controls.start('visible')
    }
  }, [controls, inView])

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={{
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 50 },
      }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

export default function LandingPage() {
  const [activeTab, setActiveTab] = useState('nodejs')

  return (
    <div className="min-h-screen bg-white text-gray-900 font-inter">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-green-600 font-satoshi">MpesaFlow</h1>
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-600 hover:text-green-600">Features</a>
            <a href="#docs" className="text-gray-600 hover:text-green-600">Docs</a>
            <a href="#pricing" className="text-gray-600 hover:text-green-600">Pricing</a>
            <a href="#contact" className="text-gray-600 hover:text-green-600">Contact</a>
            <a href="/login" className="text-gray-600 hover:text-green-600">Login</a>
            <Link
              href="/"
              className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition duration-300"
            >
              Get Started for Free
            </Link>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-16">
        <AnimatedSection>
          <section className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-4xl md:text-5xl font-bold mb-4 font-satoshi text-gray-900"
            >
              Simplify M-Pesa Integration Now
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-xl text-gray-600 mb-8"
            >
              Streamline payments, gain insights, and scale your business with MpesaFlow's powerful SDK and comprehensive dashboard.
            </motion.p>
            <motion.a
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              href="#"
              className="inline-flex items-center bg-green-500 text-white px-8 py-3 rounded-full text-lg hover:bg-green-600 transition duration-300"
            >
              Get Started for Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </motion.a>
          </section>
        </AnimatedSection>

        <AnimatedSection>
          <section className="mb-16">
            <Image
              src="/dashboard-preview.jpg"
              alt="MpesaFlow Dashboard Preview"
              width={1000}
              height={500}
              className="rounded-2xl shadow-lg"
            />
          </section>
        </AnimatedSection>

        <AnimatedSection>
          <section id="docs" className="mb-16">
            <h3 className="text-2xl font-bold mb-4 font-satoshi text-center">Integrate MpesaFlow SDK in Minutes</h3>
            <div className="mb-4 flex justify-center space-x-4">
              {Object.keys(sdkExamples).map((lang) => (
                <button
                  key={lang}
                  className={`px-4 py-2 rounded-full ${activeTab === lang ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'
                    }`}
                  onClick={() => setActiveTab(lang)}
                >
                  {lang.charAt(0).toUpperCase() + lang.slice(1)}
                </button>
              ))}
            </div>
            <pre className="bg-gray-900 text-green-500 p-4 rounded-lg overflow-x-auto">
              <code>{sdkExamples[activeTab as keyof typeof sdkExamples]}</code>
            </pre>
          </section>
        </AnimatedSection>

        <AnimatedSection>
          <section id="features" className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center font-satoshi">Why Choose MpesaFlow?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: 'Easy Integration', icon: Code, description: 'Integrate M-Pesa payments with just a few lines of code.' },
                { title: 'Real-time Analytics', icon: BarChart2, description: 'Get instant insights on your payment transactions.' },
                { title: 'Secure & Reliable', icon: Shield, description: 'Bank-grade security for all your payment processes.' },
                { title: 'Scalable Solution', icon: Zap, description: 'Grow your business without worrying about payment infrastructure.' },
                { title: 'Customer Support', icon: Headphones, description: '24/7 support to help you with any issues.' },
                { title: 'User Management', icon: Users, description: 'Easily manage user roles and permissions.' },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300 border border-gray-100"
                >
                  <feature.icon className="w-12 h-12 text-green-500 mb-4" />
                  <h3 className="text-xl font-semibold mb-2 font-satoshi">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </section>
        </AnimatedSection>

        <AnimatedSection>
          <section id="pricing" className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center font-satoshi">Simple, Transparent Pricing</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { name: 'Starter', price: '$29', features: ['Up to 1,000 transactions', 'Basic analytics', 'Email support'] },
                { name: 'Pro', price: '$99', features: ['Up to 10,000 transactions', 'Advanced analytics', 'Priority support'] },
                { name: 'Enterprise', price: 'Custom', features: ['Unlimited transactions', 'Custom integrations', 'Dedicated account manager'] },
              ].map((plan, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="bg-white p-6 rounded-2xl shadow-md text-center border border-gray-100"
                >
                  <h3 className="text-2xl font-bold mb-2 font-satoshi">{plan.name}</h3>
                  <p className="text-4xl font-bold text-green-600 mb-4">{plan.price}</p>
                  <ul className="mb-6">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="mb-2 flex items-center justify-center">
                        <Zap className="w-5 h-5 text-green-500 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition duration-300">
                    Choose Plan
                  </button>
                </motion.div>
              ))}
            </div>
          </section>
        </AnimatedSection>

        <AnimatedSection>
          <section id="contact" className="text-center">
            <h2 className="text-3xl font-bold mb-4 font-satoshi">Ready to Get Started?</h2>
            <p className="text-xl text-gray-600 mb-8">
              Contact our team today and learn how MpesaFlow can transform your business.
            </p>
            <a
              href="mailto:contact@mpesaflow.com"
              className="inline-flex items-center bg-green-500 text-white px-8 py-3 rounded-full text-lg hover:bg-green-600 transition duration-300"
            >
              Contact Us
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </section>
        </AnimatedSection>
      </main>

      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 font-satoshi">MpesaFlow</h3>
              <p className="text-sm text-gray-400">Simplifying M-Pesa integration for businesses of all sizes.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 font-satoshi">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#features" className="text-sm text-gray-400 hover:text-white">Features</a></li>
                <li><a href="#docs" className="text-sm text-gray-400 hover:text-white">Documentation</a></li>
                <li><a href="#pricing" className="text-sm text-gray-400 hover:text-white">Pricing</a></li>
                <li><a href="#contact" className="text-sm text-gray-400 hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 font-satoshi">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-gray-400 hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="text-sm text-gray-400 hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="text-sm text-gray-400 hover:text-white">Cookie Policy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 font-satoshi">Connect</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white"><Twitter size={24} /></a>
                <a href="#" className="text-gray-400 hover:text-white"><Facebook size={24} /></a>
                <a href="#" className="text-gray-400 hover:text-white"><LinkedIn size={24} /></a>
                <a href="#" className="text-gray-400 hover:text-white"><Instagram size={24} /></a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center">
            <p className="text-sm text-gray-400">&copy; 2023 MpesaFlow. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}