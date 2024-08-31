"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import CoolButton from "./ui/cool-button";

export default function CardReveal() {
  const [isRevealed, setIsRevealed] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const cards = [
    { id: 1, title: "Ace", content: "♠️" },
    { id: 2, title: "King", content: "♥️" },
    { id: 3, title: "Queen", content: "♣️" },
    { id: 4, title: "Jack", content: "♦️" },
    { id: 5, title: "10", content: "🃏" },
  ];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setSelected(null);
      }
    }

    if (isRevealed) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isRevealed]);

  return (
    <>
      <CoolButton onClick={() => setIsRevealed(true)}>
        <span className="relative">Reveal Cards</span>
      </CoolButton>
      <AnimatePresence>
        {isRevealed && (
          <motion.div
            ref={containerRef}
            className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsRevealed(false);
              }}
              className="absolute z-50 p-3 text-gray-200 bg-gray-800 rounded-full cursor-pointer pointer-events-auto bg-opacity-70 backdrop-filter backdrop-blur-lg top-4 right-4"
              aria-label="Close"
            >
              <X size={24} />
            </button>
            <div className="relative w-full h-full flex justify-center items-center">
              {cards.map((card, index) => (
                <Card
                  key={card.id}
                  index={index}
                  title={card.title}
                  content={card.content}
                  isSelected={selected === index}
                  setIsSelected={(index) => setSelected(index)}
                  totalCards={cards.length}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

interface CardProps {
  title: string;
  content: string;
  index: number;
  isSelected: boolean;
  setIsSelected: (index: number | null) => void;
  totalCards: number;
}

function Card({ index, title, content, isSelected, setIsSelected, totalCards }: CardProps) {
  const [dragging, setDragging] = useState(false);

  const handleDragStart = () => {
    setDragging(true);
  };

  const handleDragEnd = () => {
    setDragging(false);
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!dragging) {
      setIsSelected(index);
    }
  };

  const centerIndex = Math.floor(totalCards / 2);
  const offset = index - centerIndex;

  return (
    <motion.div
      drag={!isSelected}
      dragMomentum={false}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      initial={{ opacity: 0, y: 500 }}
      animate={{
        opacity: 1,
        y: isSelected ? 0 : Math.abs(offset) * 30,
        rotateZ: isSelected ? 0 : offset * 5,
        height: isSelected ? "70vh" : "40vh",
        width: isSelected ? "30vw" : "20vw",
        zIndex: isSelected ? 100 : 50 - Math.abs(offset),
        x: isSelected ? 0 : offset * 150,
        transition: {
          delay: isSelected ? 0 : index * 0.1,
          duration: 0.3,
          type: "spring",
          stiffness: 300,
          damping: 30,
        },
      }}
      whileDrag={{ scale: 0.95, cursor: "grabbing" }}
      onClick={handleClick}
      className="absolute bg-gray-100 rounded-xl shadow-xl flex flex-col items-center justify-center cursor-pointer"
    >
      <h3 className="text-zinc-800 font-semibold mb-2 text-4xl">{title}</h3>
      <p className="text-4xl text-zinc-800">{content}</p>
    </motion.div>
  );
}