"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, PanInfo, motionValue } from "framer-motion";
import { X } from "lucide-react";
import CoolButton from "./ui/cool-button";

export default function CardReveal({
  reveal,
  setReveal,
}: {
  reveal: boolean;
  setReveal: (value: boolean) => void;
}) {
  const [selected, setSelected] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const cards = [
    { id: 1, title: "Ace", content: "♠️", details: "Ace of Spades" },
    { id: 2, title: "King", content: "♥️", details: "King of Hearts" },
    { id: 3, title: "Queen", content: "♣️", details: "Queen of Clubs" },
    { id: 4, title: "Jack", content: "♦️", details: "Jack of Diamonds" },
    { id: 5, title: "10", content: "🃏", details: "10 of Jokers" },
  ];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setSelected(null);
      }
    }

    if (reveal) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [reveal]);

  return (
    <AnimatePresence>
      {reveal && (
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
              setReveal(false);
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
                details={card.details}
                isSelected={selected === index}
                setIsSelected={(index) => setSelected(index)}
                totalCards={cards.length}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

interface CardProps {
  title: string;
  content: string;
  index: number;
  isSelected: boolean;
  setIsSelected: (index: number | null) => void;
  totalCards: number;
  details: string;
}

function Card({
  index,
  title,
  content,
  isSelected,
  setIsSelected,
  totalCards,
  details,
}: CardProps) {
  const [dragging, setDragging] = useState(false);

  const centerIndex = Math.floor(totalCards / 2);
  const offset = index - centerIndex;
  const x = useRef(offset * 180);
  const y = useRef(Math.abs(offset) * 20);

  const handleDragStart = () => {
    setDragging(true);
  };

  useEffect(() => {
    console.log(x.current, "use effect");
  }, [x.current]);

  const handleDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    x.current = info.offset.x + x.current;
    y.current = info.offset.y + y.current;
    console.log(info.offset.x, x.current);
    setDragging(false);
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!dragging) {
      setIsSelected(index);
    }
  };

  return (
    <motion.div
      drag={!isSelected}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      initial={{ opacity: 0, y: 500, rotateY: -180 }}
      animate={{
        opacity: 1,
        y: isSelected ? 0 : y.current,
        rotateZ: isSelected
          ? 0
          : index === centerIndex + 1
          ? 0
          : -(index + 1 * 2),
        height: isSelected ? "70vh" : 400,
        width: isSelected ? "30vw" : 300,
        zIndex: isSelected ? 100 : 50 + offset,
        x: isSelected ? 0 : x.current,
        rotateY: isSelected ? 0 : -180,
        transition: {
          delay: isSelected ? 0 : index * 0.1,
          duration: 0.3,
          type: "spring",
          stiffness: 300,
          damping: 30,
        },
      }}
      style={{
        perspective: "1200px",
      }}
      whileDrag={{ scale: 0.95, cursor: "grabbing" }}
      onClick={handleClick}
      className="absolute bg-gray-100 rounded-xl  shadow-xl flex flex-col items-center justify-center cursor-pointer"
    >
      <motion.div
        animate={{
          opacity: isSelected ? "0" : "1",
        }}
        style={{
          rotateY: -180,
        }}
        transition={{
          delay: isSelected ? 0 : 0.3,
        }}
        className="relative w-full h-full flex flex-col items-center justify-center"
      >
        <h3 className="text-zinc-800 font-semibold mb-2 text-4xl">{title}</h3>
        <p className="text-4xl text-zinc-800">{content}</p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: isSelected ? 1 : 0,
        }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 rounded-xl text-zinc-800 flex items-center justify-center"
      >
        {details}
      </motion.div>
    </motion.div>
  );
}
