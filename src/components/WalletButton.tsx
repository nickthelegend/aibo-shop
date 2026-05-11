// src/components/WalletButton.tsx
// Styled exactly like Byooooob's "GET IN TOUCH" pill button

'use client';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function WalletButton() {
  return (
    <ConnectButton.Custom>
      {({ account, chain, openAccountModal, openChainModal, openConnectModal, mounted }) => {
        const ready = mounted;
        const connected = ready && account && chain;

        return (
          <div {...(!ready && { 'aria-hidden': true, style: { opacity: 0, pointerEvents: 'none', userSelect: 'none' } })}>
            {!connected ? (
              <button onClick={openConnectModal} className="btn-byoo" style={{ fontSize: '0.88rem', padding: '12px 24px' }}>
                GET IN TOUCH
              </button>
            ) : chain?.unsupported ? (
              <button onClick={openChainModal} style={{
                background: '#FF5C00', color: '#FFF', border: '2.5px solid #000',
                boxShadow: '3px 3px 0 #000', borderRadius: 999, padding: '10px 18px',
                fontFamily: "'Cabinet Grotesk', sans-serif", fontWeight: 800, fontSize: '0.82rem',
                textTransform: 'uppercase', cursor: 'pointer',
              }}>⚠️ WRONG NETWORK</button>
            ) : (
              <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={openChainModal} style={{
                  background: '#FFF', border: '2.5px solid #000', boxShadow: '3px 3px 0 #000',
                  borderRadius: 999, padding: '8px 14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
                  fontFamily: "'Cabinet Grotesk', sans-serif", fontWeight: 800, fontSize: '0.78rem', textTransform: 'uppercase',
                }}>
                  {chain?.name === 'Mantle Sepolia Testnet' ? '🟢 TESTNET' : '🔵 MAINNET'}
                </button>
                <button onClick={openAccountModal} style={{
                  background: '#FFF', border: '2.5px solid #000', boxShadow: '3px 3px 0 #000',
                  borderRadius: 999, padding: '8px 16px', cursor: 'pointer',
                  fontFamily: "'Cabinet Grotesk', sans-serif", fontWeight: 800, fontSize: '0.82rem',
                  textTransform: 'uppercase', color: '#000',
                }}>
                  {account.displayName}
                </button>
              </div>
            )}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
}
