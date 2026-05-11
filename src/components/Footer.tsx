// src/components/Footer.tsx
// Separate minimal footer (the big CTA footer is IN the shop page, this is just the sub-footer bar)
// For other pages (cart, pet detail, success) use this standalone footer

export default function Footer() {
  return (
    <>
      {/* Ticker strip */}
      <div className="ticker-wrap" style={{ background: '#FFD700' }}>
        <div className="ticker-track-l" style={{ display: 'flex' }}>
          {[...Array(2)].map((_, ri) => (
            ['🔥 SPARK: 12.5 MNT', '◆', '⭐ NOVA: 15.0 MNT', '◆', '🌙 LUNA: 8.0 MNT', '◆',
             '💻 BYTE: 4.5 MNT', '◆', 'LIVE ON MANTLE', '◆'].map((t, i) => (
              <span key={`${ri}-${i}`} className="ticker-item" style={{ color: '#000' }}>{t}</span>
            ))
          ))}
        </div>
      </div>

      {/* Simple bottom footer for non-home pages */}
      <footer style={{
        background: '#171E19', borderTop: '2.5px solid #000',
        padding: '20px 32px', display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', flexWrap: 'wrap', gap: 8,
      }}>
        <span style={{ fontFamily: "'Satoshi', sans-serif", fontSize: '0.85rem', color: '#B7C6C2' }}>
          © 2025 AIBO Network. Built on Mantle.
        </span>
        <span style={{ fontFamily: "'Cabinet Grotesk', sans-serif", fontWeight: 800, fontSize: '0.85rem', color: '#FFD700', textTransform: 'uppercase' }}>
          MADE WITH ❤️ IN INDIA 🇮🇳
        </span>
      </footer>
    </>
  );
}
