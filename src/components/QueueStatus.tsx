import React from 'react';
import { Clock } from 'lucide-react';
import { motion } from 'framer-motion';

interface QueueStatusProps {
  position: number;
}

export function QueueStatus({ position }: QueueStatusProps) {
  if (position <= 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className="mb-8 p-4 bg-blue-500/10 backdrop-blur-sm border border-blue-500/20 rounded-xl text-blue-400 flex items-center gap-3"
    >
      <Clock className="w-5 h-5 animate-pulse" />
      <span>
        You are in queue position {position}. Please wait...
      </span>
    </motion.div>
  );
}