"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, PanInfo, motionValue } from "framer-motion";
import { X } from "lucide-react";
import { details } from "@/lib/portfolio-details";
import Image from "next/image";
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
            {details.map((card, index) => (
              <Card
                key={card.title}
                index={index}
                title={card.title}
                content={card.content}
                details={card.content}
                isSelected={selected === index}
                setIsSelected={(index) => setSelected(index)}
                totalCards={details.length}
                icon={card.icon}
                image={card.videoUrl}
                website={card.website}
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
  icon: React.ReactNode;
  image: string;
  website: string;
}

function Card({
  website,
  icon,
  image,
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
        <h3 className="text-zinc-800 font-bold font-mono mb-2 text-4xl">
          {title}
        </h3>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: isSelected ? 1 : 0,
        }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 rounded-xl text-zinc-800 flex flex-col p-6  justify-between"
      >
        <div className="flex gap-2 items-start text-2xl font-bold">
          {icon}
          <h2>{title}</h2>
        </div>
        <div className="flex flex-col gap-2">
          <video
            src={image}
            className="rounded-lg w-full h-72 object-cover"
            autoPlay={true}
            loop={true}
            controls
          />

          <p className="text-lg text-zinc-800">{content}</p>
        </div>
        <CoolButton className="flex justify-center" href={website}>
          visit
        </CoolButton>
      </motion.div>
    </motion.div>
  );
}
