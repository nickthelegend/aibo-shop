'use client';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { motion } from 'framer-motion';
import { Wallet, ChevronDown, LogOut, Copy, ExternalLink } from 'lucide-react';
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
          (!authenticationStatus || authenticationStatus === 'authenticated');

        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              style: {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button
                    onClick={openConnectModal}
                    type="button"
                    className="btn btn-secondary btn-lg flex items-center gap-3 group"
                  >
                    <Wallet size={20} className="group-hover:rotate-12 transition-transform" />
                    <span>Connect Wallet</span>
                  </button>
                );
              }

              if (chain.unsupported) {
                return (
                  <button
                    onClick={openChainModal}
                    type="button"
                    className="btn btn-danger btn-lg flex items-center gap-3"
                  >
                    <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                    Wrong Network
                  </button>
                );
              }

              return (
                <div className="flex items-center gap-3">
                  {/* Chain Switcher */}
                  <button
                    onClick={openChainModal}
                    className="hidden lg:flex items-center gap-2 px-4 py-2 border-[2.5px] border-black rounded-full font-display text-[10px] uppercase hover:bg-gray-50 transition-colors brutal-shadow-sm"
                  >
                    {chain.hasIcon && (
                      <div className="w-4 h-4 overflow-hidden rounded-full border border-black/10">
                        {chain.iconUrl && (
                          <img
                            alt={chain.name ?? 'Chain icon'}
                            src={chain.iconUrl}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                    )}
                    {chain.name}
                    <ChevronDown size={14} />
                  </button>

                  {/* Account Button */}
                  <button
                    onClick={openAccountModal}
                    type="button"
                    className="btn btn-primary btn-lg flex items-center gap-3"
                  >
                    <div className="flex flex-col items-end">
                      <span className="text-[10px] leading-none opacity-60 mb-0.5">Connected</span>
                      <span className="text-sm leading-none">{account.displayName}</span>
                    </div>
                    {account.displayBalance && (
                       <div className="hidden md:block h-6 w-[1px] bg-black/20 mx-1" />
                    )}
                    <span className="hidden md:block text-xs">
                      {account.displayBalance}
                    </span>
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
