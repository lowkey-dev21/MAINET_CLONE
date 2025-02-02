"use client"
import React from 'react';
import Image from 'next/image';
import {useRouter} from "next/navigation"

const Footer = () => {
  const router = useRouter()
  return (
    <div className="bg-gradient-to-t from-black via-gray-900 to-black">
      {/* Main Content */}
      <div className="flex justify-center items-center min-h-[60vh] px-6">
        <div className="max-w-2xl bg-black/70 backdrop-blur-md border border-gray-700 rounded-lg p-8 text-center">
          {/* Title */}
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            We&apos;re supported by over 300 apps & wallets.
          </h2>

          {/* Description */}
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6">
            You can connect your wallet with hundreds of apps, opening the doors
            to a new world of web3 experiences. Synchronize your wallet for free
            and enjoy exclusive perks. Join our Discord and get whitelisted for
            our upcoming token airdrop.
          </p>

          {/* Button */}
          <button onClick={()=> router.push("/select-wallet")} className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg text-sm sm:text-base font-medium hover:from-indigo-500 hover:to-blue-500 transition-colors">
            Synchronize for free
          </button>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col items-center py-6 ">
        {/* Logo */}
        <Image
          src="/assets/logo.png"
          alt="Logo"
          width={48}
          height={48}
          className="mb-2"
        />

        {/* Footer Text */}
        <p className="text-gray-400 text-sm">
          © 2020 - 2024 ProjectDappsMainNet.
        </p>
      </div>
    </div>
  );
};

export default Footer;
