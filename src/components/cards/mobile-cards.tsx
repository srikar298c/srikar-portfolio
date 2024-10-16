import { details } from "@/lib/portfolio-details";
import { useMotionValue, useTransform, PanInfo, motion } from "framer-motion";
import { useState } from "react";
import CoolButton from "../ui/cool-button";
import { X } from "lucide-react";

interface CardRotateProps {
  children: React.ReactNode;
  onSendToBack: () => void;
}

function CardSwipe({ children, onSendToBack }: CardRotateProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [60, -60]);
  const rotateY = useTransform(x, [-250, 250], [-20, 20]);

  function handleDragEnd(_: any, info: PanInfo) {
    const threshold = 100;
    if (
      Math.abs(info.offset.x) > threshold ||
      Math.abs(info.offset.y) > threshold
    ) {
      onSendToBack();
    } else {
      x.set(0);
      y.set(0);
    }
  }

  return (
    <motion.div
      className="absolute h-[70%] w-[90%] cursor-grab"
      style={{ x, y, rotateY }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      drag
      dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
      dragElastic={0.6}
      whileTap={{ cursor: "grabbing" }}
      onDragEnd={handleDragEnd}
    >
      {children}
    </motion.div>
  );
}

export default function MobileCard({
  reveal,
  setReveal,
}: {
  reveal: boolean;
  setReveal: (value: boolean) => void;
}) {
  const [cards, setCards] = useState(details);

  const swipeCards = (id: number) => {
    setCards((prev) => {
      const newCards = [...prev];
      const index = newCards.findIndex((_, index) => index === id);
      const [card] = newCards.splice(index, 1);
      newCards.unshift(card);
      return newCards;
    });
  };

  return (
    <div
      className="inset-0 absolute h-screen w-screen flex items-start justify-center z-[100] "
      style={{ perspective: 600 }}
    >
      <div
      className="absolute h-screen w-screen inset-0 bg-black bg-opacity-50"
      />
      <button
        onClick={(e) => {
          e.stopPropagation();
          setReveal(false);
        }}
        className="absolute z-[999] p-3 text-gray-200 bg-zinc-800 rounded-full cursor-pointer pointer-events-auto bg-opacity-70 backdrop-filter backdrop-blur-lg bottom-5 left-1/2 -translate-x-1/2"
        aria-label="Close"
      >
        <X size={24} />
      </button>
      {cards.map((card, index) => {
        return (
          <CardSwipe key={card.title} onSendToBack={() => swipeCards(index)}>
            <motion.div
              className="h-full w-full rounded-lg bg-zinc-100 flex flex-col justify-between p-4 text-zinc-800 shadow-high"
              animate={{
                scale: 1 + index * 0.06 - cards.length * 0.04,
                y: index * 25,
                // transformOrigin: "90% 90%",
              }}
              initial={false}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
              <div className="flex gap-2 items-center text-2xl font-bold">
                {card.icon}
                <h2>{card.title}</h2>
              </div>
              <div className="flex flex-col gap-2">
                <video
                  src={card.videoUrl}
                  className="rounded-lg w-full h-72 object-cover"
                  autoPlay
                  loop
                />

                <p className="text-lg text-zinc-800">{card.content}</p>
              </div>
              <CoolButton className="flex justify-center" href={card.website}>
                visit
              </CoolButton>
            </motion.div>
          </CardSwipe>
        );
      })}
    </div>
  );
}
