'use client'

import React, { useState, useEffect } from 'react'
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, X } from "lucide-react"
import axios from 'axios'
import Image from "next/image"
import wallet from '../../public/assets/wallet.svg'
import { TypeAnimation } from 'react-type-animation'

interface Coin {
  id: string;
  icon: string;
  name: string;
  symbol: string;
  price: number;
  priceChange1d: number;
}

const Hero = () => {
  const [showAlert, setShowAlert] = useState(true)
  const [isExiting, setIsExiting] = useState(false)
  const [data, setData] = useState<Coin[]>([])
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      handleClose()
    }, 7000)

    const fetchCrypto = async () => {
      try {
        const res = await axios.get("https://openapiv1.coinstats.app/coins", {
          headers: {
            "X-API-KEY": "DrEgMRu0/EYSrJvvU6KoNZyvQDq/fW5C/ZWTOBF67hA=",
          },
        })
        setData(res.data.result as Coin[])
      } catch (error) {
        console.log(error)
      }
    }
    
    fetchCrypto()
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleClose = () => {
    setIsExiting(true)
    setTimeout(() => {
      setShowAlert(false)
    }, 500)
  }

  return (
    <div className="relative min-h-screen">
      {showAlert && (
        <Alert 
          variant="default" 
          className={`fixed top-20 left-1/2 transform -translate-x-1/2 w-[90%] max-w-2xl 
            border-none bg-yellow-500/90 text-white shadow-lg transition-all duration-500 z-50
            ${isExiting ? 'fade-out' : 'slide-down'}`}
        >
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            <AlertDescription className="text-sm font-medium">
              All processes on this webpage are manually done and encrypted to maximise security
            </AlertDescription>
          </div>
          <button
            onClick={handleClose}
            className="absolute right-2 top-2 hover:bg-blue-600/80 p-1 rounded-full
              transition-all duration-200 hover:rotate-90"
          >
            <X className="h-4 w-4" />
          </button>
        </Alert>
      )}

      {/* Price Ticker */}
      <div className="absolute top-0 w-full bg-black/40 backdrop-blur-sm py-2 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {data.slice(0, 20).map((coin) => (
            <div key={coin.id} className="mx-4 flex items-center text-white">
               <Image
                src={coin.icon} // e.g., "https://static.coinstats.app/coins/1650455588819.png"
                alt={coin.name}
                width={24}
                height={24}
                className="mr-2"
                onError={(e) => {
                  e.target.src = "/api/placeholder/24/24"; // Fallback for broken images
                }}
              />
              <span className="font-medium">{coin.symbol}</span>
              <span className={`ml-2 ${coin.priceChange1d >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                ${coin.price.toFixed(2)}
              </span>
              <span className={`ml-2 text-sm ${coin.priceChange1d >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {coin.priceChange1d >= 0 ? '+' : ''}{coin.priceChange1d}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Hero Content */}
      <div className=" justify-between flex w-full items-center mx-auto px-4 sm:px-8 md:px-20 lg:px-40  pt-20 pb-16">
        <div className="flex flex-col xl:flex-row w-full items-center justify-between gap-12">
          {/* Left Side Content */}
          <div className="flex-1 text-white">
            {isMobile ? (
              <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-500 to-blue-200 bg-clip-text text-transparent">
                ProjectDappsMainNet
              </h1>
            ) : (
              <div className="mb-8 h-24 flex items-center"> {/* Fixed height to prevent layout shift */}
                <TypeAnimation
                  sequence={[
                    'ProjectDappsMainNet', // Initial text
                    2000, // Increased delay for better mobile performance
                    'Secure. Fast.', // Shortened text for mobile
                    2000,
                  ]}
                  wrapper="h1"
                  speed={50} // Slowed down typing speed
                  deletionSpeed={70} // Slowed down deletion speed
                    className="text-6xl font-bold bg-gradient-to-r from-blue-500 to-blue-200 bg-clip-text text-transparent"
                    repeat={Infinity}
                    cursor={false} // Disable cursor for better performance
                  style={{
                    whiteSpace: 'pre', // Ensure consistent spacing
                    display: 'block', // Ensure the text is displayed as a block
                  }}
                />
              </div>
            )}

            <h2 className="text-xl sm:text-2xl lg:text-3xl text-blue-400 mb-6">
              Secure Multi-Chain Wallet Resolution Protocol
            </h2>

            <p className="text-xl lg:text-2xl text-gray-300 mb-8 max-w-3xl leading-relaxed">
              It is not an app, but a decentralized and open protocol. This protocol
              allows syncing of different Wallets issues on a Secure Server, creating
              a remote resolution between noncustodial wallets.
            </p>

            <div className="space-y-6 mb-8">
              <p className="text-xl lg:text-2xl text-gray-300 max-w-3xl leading-relaxed">
                Our protocol provides:
              </p>
              <ul className="list-disc list-inside space-y-4 text-lg lg:text-xl text-gray-300 ml-4">
                <li>Secure wallet synchronization across multiple chains</li>
                <li>24/7 automated wallet issue detection and resolution</li>
              </ul>
            </div>

            <button className="bg-blue-600 hover:bg-blue-700 text-white text-xl font-bold py-4 px-10 rounded-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(37,99,235,0.5)]">
              Synchronize Wallet
            </button>
          </div>

          {/* Right Side - Image */}
            <div className="xl:bg-gradient-to-r from-black to-blue-600 bg-gradient-to-b  rounded-lg xl:w-[50%] w-full flex justify-center items-center">
            <Image 
              src={wallet} 
              alt="wallet"
              width={400}
              height={400}
              className="flex-1 object-contain p-8 w-[150%] lg:max-w-[70%]"
            />
            </div>
        </div>
      </div>
    </div>
  )
}

export default Hero