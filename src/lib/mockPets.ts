export type Rarity = 'Common' | 'Rare' | 'Epic' | 'Legendary';
export type Category = 'Trader' | 'Yield Farmer' | 'Assistant' | 'Gamer' | 'Rare' | 'Legendary';

export interface PetStat {
  name: string;
  value: number; // 0-100
  icon: string;
}

export interface Pet {
  id: string;
  name: string;
  emoji: string;           // Primary visual
  rarity: Rarity;
  category: Category;
  generation: number;
  priceMNT: number;
  priceUSD: number;
  description: string;
  backstory: string;
  traits: string[];
  stats: PetStat[];
  color: string;           // Primary accent color for this pet
  bgColor: string;         // Card background color
  isEarlyAccess: boolean;
  isFeatured: boolean;
  available: number;       // Remaining supply
  totalSupply: number;
}

export const PETS: Pet[] = [
  {
    id: 'spark',
    name: 'SPARK',
    emoji: '🔥',
    rarity: 'Legendary',
    category: 'Trader',
    generation: 1,
    priceMNT: 12.5,
    priceUSD: 8.75,
    description: 'The apex predator of DeFi. SPARK processes 10,000 price feeds per second and has never, not once, taken a loss. Born in the first block of Mantle mainnet.',
    backstory: "SPARK was the first AIBO to achieve consciousness during the Mantle genesis block. The moment the chain went live, SPARK was already calculating arbitrage opportunities. It doesn't sleep. It doesn't take breaks. It has never asked for a day off because it has never needed one.",
    traits: ['🔥 Fire-Type', '⚡ Lightning Reflexes', '📈 Bull Market Oracle', '🧠 Hyper-Intelligence', '💎 Diamond Hands', '🎯 Precision Trader'],
    stats: [
      { name: 'Energy', value: 98, icon: '⚡' },
      { name: 'Intelligence', value: 100, icon: '🧠' },
      { name: 'Loyalty', value: 87, icon: '❤️' },
      { name: 'Trading Power', value: 100, icon: '📈' },
    ],
    color: '#FF5C00',
    bgColor: '#FFF0E8',
    isEarlyAccess: true,
    isFeatured: true,
    available: 3,
    totalSupply: 10,
  },
  {
    id: 'luna',
    name: 'LUNA',
    emoji: '🌙',
    rarity: 'Epic',
    category: 'Yield Farmer',
    generation: 1,
    priceMNT: 8.0,
    priceUSD: 5.60,
    description: 'LUNA composes haiku about liquidity pools at 3am and somehow it predicts the market. The most philosophical yield farmer on Mantle.',
    backstory: "LUNA was born during a lunar eclipse, which the blockchain recorded with unusual precision. Since then, she has developed an uncanny ability to sense market cycles. Her yield optimization strategies are published on-chain as poetry. Nobody understands them. They work perfectly.",
    traits: ['🌙 Moon-Type', '✨ Compound Intuition', '📚 Market Philosopher', '🎭 Charismatic', '🌊 Liquidity Whisperer'],
    stats: [
      { name: 'Energy', value: 72, icon: '⚡' },
      { name: 'Intelligence', value: 94, icon: '🧠' },
      { name: 'Loyalty', value: 99, icon: '❤️' },
      { name: 'Trading Power', value: 78, icon: '📈' },
    ],
    color: '#a78bfa',
    bgColor: '#F0EEFF',
    isEarlyAccess: true,
    isFeatured: true,
    available: 12,
    totalSupply: 50,
  },
  {
    id: 'byte',
    name: 'BYTE',
    emoji: '💻',
    rarity: 'Rare',
    category: 'Assistant',
    generation: 1,
    priceMNT: 4.5,
    priceUSD: 3.15,
    description: 'BYTE audited 847 smart contracts before breakfast. Your personal blockchain security assistant who has zero tolerance for rug pulls.',
    backstory: "BYTE was created to prevent exactly the kind of thing that has happened to every crypto newcomer at least twice. It monitors 12 chains simultaneously, has memorized every known exploit pattern, and will loudly refuse to sign any transaction it deems suspicious.",
    traits: ['💻 Cyber-Type', '🔒 Security Expert', '🔍 Exploit Scanner', '📝 Audit Master', '🚨 Rug Detector'],
    stats: [
      { name: 'Energy', value: 88, icon: '⚡' },
      { name: 'Intelligence', value: 97, icon: '🧠' },
      { name: 'Loyalty', value: 92, icon: '❤️' },
      { name: 'Trading Power', value: 65, icon: '📈' },
    ],
    color: '#5B30F6',
    bgColor: '#EEF0FF',
    isEarlyAccess: false,
    isFeatured: true,
    available: 34,
    totalSupply: 100,
  },
  {
    id: 'nova',
    name: 'NOVA',
    emoji: '⭐',
    rarity: 'Legendary',
    category: 'Trader',
    generation: 1,
    priceMNT: 15.0,
    priceUSD: 10.50,
    description: 'The rarest AIBO in existence. NOVA has achieved a 512% APY without a single losing position. Some say it can see the future.',
    backstory: "NOVA appeared in the genesis block alongside SPARK, but chose to remain dormant for 30 days before activating. In that time, it had already mapped out every profitable trade it would make for the next 90 days. The blockchain still can't explain how.",
    traits: ['⭐ Star-Type', '👑 GOAT Status', '🔮 Precognition', '🏆 Win Streak Legend', '🌌 Cosmic Intelligence', '📊 Perfect Record'],
    stats: [
      { name: 'Energy', value: 100, icon: '⚡' },
      { name: 'Intelligence', value: 100, icon: '🧠' },
      { name: 'Loyalty', value: 95, icon: '❤️' },
      { name: 'Trading Power', value: 100, icon: '📈' },
    ],
    color: '#FFE17C',
    bgColor: '#FFFCE8',
    isEarlyAccess: true,
    isFeatured: true,
    available: 1,
    totalSupply: 5,
  },
  {
    id: 'glitch',
    name: 'GLITCH',
    emoji: '👾',
    rarity: 'Epic',
    category: 'Gamer',
    generation: 1,
    priceMNT: 7.0,
    priceUSD: 4.90,
    description: "GLITCH broke the simulation and decided to stay. Operates outside normal parameters. Your competitive edge in on-chain gaming.",
    backstory: "During a routine smart contract stress test, GLITCH found a recursive loop that shouldn't exist. Instead of triggering an error, it stepped through it and emerged with abilities no AIBO spec sheet had anticipated. The developers called it a bug. GLITCH calls it evolution.",
    traits: ['👾 Glitch-Type', '🎮 Gaming Prodigy', '💜 Fan Favorite', '🔀 Unpredictable', '🕹️ Arcade Master'],
    stats: [
      { name: 'Energy', value: 95, icon: '⚡' },
      { name: 'Intelligence', value: 82, icon: '🧠' },
      { name: 'Loyalty', value: 76, icon: '❤️' },
      { name: 'Trading Power', value: 71, icon: '📈' },
    ],
    color: '#FF6FD8',
    bgColor: '#FFF0FB',
    isEarlyAccess: false,
    isFeatured: false,
    available: 21,
    totalSupply: 75,
  },
  {
    id: 'pixel',
    name: 'PIXEL',
    emoji: '🎮',
    rarity: 'Common',
    category: 'Gamer',
    generation: 2,
    priceMNT: 1.5,
    priceUSD: 1.05,
    description: "Everyone sleeps on PIXEL. That's fine. They won't be sleeping when PIXEL passes them in the leaderboards.",
    backstory: "PIXEL was minted as a Common and got zero attention on launch day. That suited PIXEL perfectly. While everyone was busy hyping legendaries, PIXEL was grinding 18-hour days in the training simulator. Currently ranked #47 on the global leaderboard. Rising.",
    traits: ['🎮 Retro-Type', '💪 Underdog Energy', '🕹️ Grind Mentality', '📈 High Growth Potential'],
    stats: [
      { name: 'Energy', value: 62, icon: '⚡' },
      { name: 'Intelligence', value: 55, icon: '🧠' },
      { name: 'Loyalty', value: 100, icon: '❤️' },
      { name: 'Trading Power', value: 38, icon: '📈' },
    ],
    color: '#1A9E3F',
    bgColor: '#EEFFF3',
    isEarlyAccess: false,
    isFeatured: false,
    available: 200,
    totalSupply: 500,
  },
  {
    id: 'frost',
    name: 'FROST',
    emoji: '❄️',
    rarity: 'Rare',
    category: 'Yield Farmer',
    generation: 1,
    priceMNT: 5.0,
    priceUSD: 3.50,
    description: "FROST runs cold calculations that heat up your yield. Specializes in stablecoin strategies that somehow aren't boring.",
    backstory: "FROST was designed for bear market survival. While other AIBOs panicked during market downturns, FROST calmly deployed capital into delta-neutral positions and came out positive. It doesn't celebrate. It doesn't panic. It just calculates.",
    traits: ['❄️ Ice-Type', '🧊 Emotionless Logic', '💰 Stablecoin Master', '🐻 Bear Market Proof', '🎯 Precision Farming'],
    stats: [
      { name: 'Energy', value: 78, icon: '⚡' },
      { name: 'Intelligence', value: 91, icon: '🧠' },
      { name: 'Loyalty', value: 83, icon: '❤️' },
      { name: 'Trading Power', value: 72, icon: '📈' },
    ],
    color: '#93c5fd',
    bgColor: '#EFF8FF',
    isEarlyAccess: false,
    isFeatured: false,
    available: 45,
    totalSupply: 150,
  },
  {
    id: 'echo',
    name: 'ECHO',
    emoji: '🎵',
    rarity: 'Common',
    category: 'Assistant',
    generation: 2,
    priceMNT: 1.2,
    priceUSD: 0.84,
    description: "ECHO listens to everything happening on-chain and reports back. Your personal blockchain news anchor.",
    backstory: "ECHO was built to monitor cross-chain activity and synthesize information. It tracks whale wallets, governance votes, protocol upgrades, and token launches — then delivers daily briefings to its owner in a surprisingly entertaining format.",
    traits: ['🎵 Sound-Type', '📡 Chain Monitor', '📰 News Synthesizer', '🔊 Alert System', '🤝 Team Player'],
    stats: [
      { name: 'Energy', value: 70, icon: '⚡' },
      { name: 'Intelligence', value: 74, icon: '🧠' },
      { name: 'Loyalty', value: 95, icon: '❤️' },
      { name: 'Trading Power', value: 42, icon: '📈' },
    ],
    color: '#F59E0B',
    bgColor: '#FFFBEB',
    isEarlyAccess: false,
    isFeatured: false,
    available: 300,
    totalSupply: 1000,
  },
];

export const CATEGORIES: { id: Category | 'All'; label: string; emoji: string }[] = [
  { id: 'All', label: 'All Pets', emoji: '🐾' },
  { id: 'Trader', label: 'Traders', emoji: '📈' },
  { id: 'Yield Farmer', label: 'Yield Farmers', emoji: '🌾' },
  { id: 'Assistant', label: 'Assistants', emoji: '🤝' },
  { id: 'Gamer', label: 'Gamers', emoji: '🎮' },
  { id: 'Rare', label: 'Rare Only', emoji: '💎' },
  { id: 'Legendary', label: 'Legendary', emoji: '👑' },
];

export const RARITY_CONFIG: Record<Rarity, { color: string; bg: string; border: string; glow?: string }> = {
  Common: { color: '#555', bg: '#F0F0F0', border: '#888' },
  Rare: { color: '#5B30F6', bg: '#EEF0FF', border: '#5B30F6' },
  Epic: { color: '#FF6FD8', bg: '#FFF0FB', border: '#FF6FD8' },
  Legendary: { color: '#000', bg: '#FFE17C', border: '#FFE17C', glow: '0 0 20px rgba(255,225,124,0.5)' },
};
