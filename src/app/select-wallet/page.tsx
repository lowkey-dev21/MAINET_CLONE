'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import { Search, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { walletList } from '../../constants/index';

const SelectWalletPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const filteredWallets = walletList.filter((wallet) =>
    wallet.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-t from-black via-gray-900 to-black">
      {/* Back Button */}
      <button 
        onClick={() => router.back()}
        className="absolute top-6 left-6 text-gray-400 hover:text-white transition-colors flex items-center gap-2"
      >
        <ArrowLeft size={24} />
        <span className="text-sm">Back</span>
      </button>

      <div className="container mx-auto px-4 py-16">
        {/* Header Section */}
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Connect Your Wallet
          </h1>
          <p className="text-gray-400 text-sm md:text-base">
            Choose your preferred wallet to connect and continue with the synchronization process
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-12 relative">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search for your wallet..."
              className="w-full pl-10 pr-4 py-3 bg-black/40 backdrop-blur-sm border border-gray-800 
                        rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 
                        transition-all duration-300"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Wallet Grid */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredWallets.map((wallet) => (
              <button
              onClick={() => router.push("/connect-wallet")}
                key={wallet.name}
                className="group bg-black/40 backdrop-blur-sm p-6 rounded-2xl border border-gray-800 
                         hover:bg-gray-900/60 transition-all duration-300 
                         hover:border-gray-600 hover:shadow-lg hover:shadow-blue-500/10
                         flex flex-col items-center space-y-3"
              >
                <div className="relative w-12 h-12 mb-2">
                  <Image
                    src={wallet.img}
                    alt={wallet.name}
                    fill
                    className="object-fit  rounded-full group-hover:scale-110 transition-transform duration-300"
                    quality={100}
                  />
                </div>
                <span className="text-sm text-gray-300 group-hover:text-white text-center">
                  {wallet.name}
                </span>
              </button>
            ))}
          </div>

          {filteredWallets.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No wallets found matching your search.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SelectWalletPage;