import React from "react";

const NotConnected = () => {
  return (
    <div className="mt-20">
      <div className="max-w-sm rounded overflow-hidden shadow-lg text-center m-auto">
        <img
          className="w-full h-96"
          src="https://img.freepik.com/premium-photo/broken-metal-chain-background_488220-23727.jpg"
          alt="Not Connected with Wallet"
        />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">Not Connected with Wallet</div>
          <p className="text-gray-700 text-base">
            You are not Connected with your wallet. If you want to Login please connect with your wallet. Different walltes are supported such as Metamask, Rainbow, CoinbaseWallet etc. 
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotConnected;
