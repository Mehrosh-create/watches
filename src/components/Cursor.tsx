'use client';

import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';

interface CursorProps {
  mousePos: { x: number; y: number };
  isDragging: boolean;
  showCursor: boolean;
}

export default function Cursor({ mousePos, isDragging, showCursor }: CursorProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) return null;

  const size = isDragging ? 48 : 56;
  const borderWidth = isDragging ? 2 : 3;
  const offset = size / 2;
  const chevronOffset = isDragging ? -26 : -30;
  const chevronSize = isDragging ? 16 : 18;

  return (
    <motion.div
      className="fixed pointer-events-none z-50 flex items-center justify-center"
      style={{
        top: mousePos.y - offset,
        left: mousePos.x - offset,
        width: size,
        height: size,
        borderRadius: '50%',
        border: `${borderWidth}px solid white`,
        backgroundColor: 'transparent',
        mixBlendMode: 'difference',
        transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: showCursor ? 1 : 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <ChevronLeft
        className="absolute top-1/2 -translate-y-1/2"
        style={{ left: chevronOffset, color: 'white' }}
        size={chevronSize}
      />
      <ChevronRight
        className="absolute top-1/2 -translate-y-1/2"
        style={{ right: chevronOffset, color: 'white' }}
        size={chevronSize}
      />
    </motion.div>
  );
}