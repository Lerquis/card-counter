import type { Card } from "@/core/types";
import { cardToFilename } from "@/core/deck";
import Image from "next/image";

interface CardImageProps {
  card: Card;
  className?: string;
  size?: "sm" | "md" | "lg";
  hidden?: boolean;
}

const sizeClasses = {
  sm: "w-16 h-24",
  md: "w-20 h-32",
  lg: "w-28 h-40",
};

export function CardImage({ card, className = "", size = "md", hidden = false }: CardImageProps) {
  const filename = cardToFilename(card);
  const suitSymbol = card.suit;
  const rankDisplay = card.rank;

  if (hidden) {
    return (
      <div
        className={`${sizeClasses[size]} ${className} bg-gradient-to-br from-blue-900 to-blue-700 rounded-lg shadow-lg border-2 border-white/20 flex items-center justify-center`}
      >
        <div className="text-white/30 text-4xl font-bold">?</div>
      </div>
    );
  }

  return (
    <div className={`${sizeClasses[size]} ${className} relative rounded-lg shadow-lg overflow-hidden`}>
      <Image
        src={`/cards/${filename}`}
        alt={`${rankDisplay} of ${suitSymbol}`}
        fill
        className="object-contain"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  );
}
