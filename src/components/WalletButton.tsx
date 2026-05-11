'use client';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import React from 'react';

const WalletButton = () => {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted && authenticationStatus !== 'loading';
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus ||
            authenticationStatus === 'authenticated');

        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              'style': {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button onClick={openConnectModal} type="button" className="btn btn-primary">
                    🔗 Connect Wallet
                  </button>
                );
              }

              if (chain.unsupported) {
                return (
                  <button onClick={openChainModal} type="button" className="btn btn-danger">
                    ⚠️ WRONG NETWORK
                  </button>
                );
              }

              return (
                <div style={{ display: 'flex', gap: 12 }}>
                  <button
                    onClick={openAccountModal}
                    type="button"
                    className="flex items-center gap-3 bg-white border-[2px] border-black rounded-full px-4 py-2 brutal-shadow hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#000] transition-all"
                  >
                    {account.displayBalance ? (
                      <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-[10px] font-bold border border-black overflow-hidden">
                        {account.ensAvatar ? (
                           <img src={account.ensAvatar} alt="avatar" className="w-full h-full object-cover" />
                        ) : (
                          "🐾"
                        )}
                      </div>
                    ) : null}
                    
                    <span className="font-display text-sm">
                      {account.displayName}
                    </span>

                    <div className="flex items-center gap-1.5 pl-2 border-l border-gray-200">
                       <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border border-black ${chain.testnet ? 'bg-green-400' : 'bg-primary'}`}>
                         {chain.testnet ? 'TESTNET' : 'MAINNET'}
                       </span>
                    </div>
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};

export default WalletButton;
