'use client';
import { motion } from 'framer-motion';
import React from 'react';

interface StatBarProps {
  label: string;
  value: number;
  icon: string;
  color?: string;
  index?: number;
}

const StatBar: React.FC<StatBarProps> = ({ label, value, icon, color, index = 0 }) => {
  const getFillColor = () => {
    if (color) return color;
    if (value >= 90) return 'var(--primary)';
    if (value >= 70) return 'var(--green)';
    if (value >= 40) return 'var(--purple)';
    return '#888';
  };

  return (
    <div className="mb-4">
      <div className="flex justify-between items-end mb-1">
        <span className="text-[0.85rem] font-bold text-gray-500 flex items-center gap-1">
          {icon} {label}
        </span>
        <span className="font-display text-[0.9rem]">
          {value}
        </span>
      </div>
      <div className="stat-bar-track">
        <motion.div
          className="stat-bar-fill"
          style={{ backgroundColor: getFillColor() }}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.8, delay: index * 0.1, ease: [0.34, 1.56, 0.64, 1] }}
        />
      </div>
    </div>
  );
};

export default StatBar;
