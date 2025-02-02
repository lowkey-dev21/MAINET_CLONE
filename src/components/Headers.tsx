'use client'
import logo from "../../public/assets/logo.png"
import Image from "next/image"
import {useRouter} from "next/navigation"
import { webName } from '@/constants'


const Headers = () => {
const router = useRouter()
  return (
    <section>
      <nav className='w-full z-[500] fixed h-16 py-4 bg-none bg-black flex justify-between items-center px-4 sm:px-8 md:px-20 lg:px-40'>
        {/* Logo */}
        <div className='flex items-center gap-2'>
          <Image 
            src={logo} 
            width={30} 
            height={30} 
            alt='logo'
            className='object-contain'
            quality={100}
          />
          <h1 className='text-xl md:text-2xl font-semibold'>{webName[0]}</h1>
        </div>

        {/* Mobile Menu Toggle */}
        <div className='flex items-center gap-4'>
          {/* Desktop Wallet Button */}
          <button onClick={() => router.push("/select-wallet")} 
            className='flex bg-blue-600 text-white p-3 px-4 h-10 items-center justify-center text-base md:text-xl rounded-lg hover:bg-blue-700 transition-colors'
          >
            Connect Wallet
          </button>

    
        </div>
      </nav>

   
    </section>
  )
}

export default Headers