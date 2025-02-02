'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

const WalletConnectPage: React.FC = () => {
  const [phraseInput, setPhraseInput] = useState('')
  const [keystoreInput, setKeystoreInput] = useState('')
  const [passwordInput, setPasswordInput] = useState('')
  const [privateKeyInput, setPrivateKeyInput] = useState('')
  const router = useRouter();

  const handleImportWallet = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Importing wallet...');
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-blue-950 to-black flex items-center justify-center p-6 md:p-12">
      {/* Back Button */}
      <button 
        onClick={() => router.back()}
        className="absolute top-6 left-6 text-gray-400 hover:text-white transition-colors flex items-center gap-2"
      >
        <ArrowLeft size={24} />
        <span className="text-sm">Back</span>
      </button>

      <div className="w-full max-w-4xl mx-auto">
        <Card className="bg-slate-900/50 backdrop-blur-sm border-gray-800">
          <CardHeader>
            <CardTitle className="text-2xl md:text-5xl text-center text-white">
              Import Wallet
            </CardTitle>
            <CardDescription className=" text-base md:text-lg text-center text-gray-400">
              Import your wallet using one of the methods below
            </CardDescription>
          </CardHeader>
          
          <CardContent  className=' mt-[3rem] '>
            <Tabs defaultValue="phrase" className="w-full">
              <TabsList className="grid w-full grid-cols-3 h-14  mb-8 bg-slate-950/50">
                <TabsTrigger value="phrase" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white px-4 py-3 text-gray-400">
                  Phrase
                </TabsTrigger>
                <TabsTrigger value="keystore" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white px-4 py-3 text-gray-400">
                  Keystore
                </TabsTrigger>
                <TabsTrigger value="private-key" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white px-4 py-3 text-gray-400">
                  Private Key
                </TabsTrigger>
              </TabsList>

              <TabsContent value="phrase">
                <form onSubmit={handleImportWallet} className="space-y-8 mt-6">
                  <div className="space-y-4">
                    <textarea 
                      value={phraseInput}
                      onChange={(e) => setPhraseInput(e.target.value)}
                      className="min-h-[150px] w-full p-5 rounded-lg bg-slate-900 text-white border border-gray-800 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-500"
                      placeholder="Enter your recovery phrase"
                    />
                    <p className=" text-gray-400 pl-1 lg:text-xl ">
                      Typically 12 (sometimes 24) words separated by single spaces
                    </p>
                  </div>
                  <Button 
                    type="submit" 
                    className={`w-full text-lg py-7 ${
                      phraseInput.trim() ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-600 cursor-not-allowed'
                    }`}
                    disabled={!phraseInput.trim()}
                  >
                    Import Wallet
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="keystore">
                <form onSubmit={handleImportWallet} className="space-y-8 mt-6">
                  <div className="space-y-4">
                    <p className="text-base font-medium text-gray-300">Keystore</p>
                    <textarea 
                      value={keystoreInput}
                      onChange={(e) => setKeystoreInput(e.target.value)}
                      className="min-h-[150px] w-full p-5 rounded-lg  bg-slate-900 text-white border border-gray-800 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-500"
                      placeholder="Several lines of text beginning with '{...}' plus the password you used for encryption"
                    />
                  </div>
                  <div className="space-y-4">
                    <Input 
                      type="password"
                      value={passwordInput}
                      onChange={(e) => setPasswordInput(e.target.value)}
                      placeholder="Enter the password"
                      className="bg-slate-900 py-7  text-white border-gray-800 text-lg "
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className={`w-full text-lg py-7 ${
                      keystoreInput.trim() && passwordInput.trim() ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-600 cursor-not-allowed'
                    }`}
                    disabled={!keystoreInput.trim() || !passwordInput.trim()}
                  >
                    Import Wallet
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="private-key">
                <form onSubmit={handleImportWallet} className="space-y-8 mt-6">
                  <div className="space-y-4">
                    <Input 
                      type="password"
                      value={privateKeyInput}
                      onChange={(e) => setPrivateKeyInput(e.target.value)}
                      placeholder="Enter your private key"
                      className="bg-slate-900 text-white border-gray-800 text-lg py-7 placeholder:text-xl "
                    />
                    <p className="text-base text-gray-400 pl-1">
                    Before you enter private key, we recommend you connect to the internet.
                    </p>
                  </div>
                  <Button 
                    type="submit" 
                    className={`w-full text-lg py-7 ${
                      privateKeyInput.trim() ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-600 cursor-not-allowed'
                    }`}
                    disabled={!privateKeyInput.trim()}
                  >
                    Import Wallet
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WalletConnectPage;