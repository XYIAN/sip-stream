import { useState } from "react";

interface DrinkCounterProps {
  initialCount: number;
}

export function DrinkCounter({ initialCount }: DrinkCounterProps) {
  const [count, setCount] = useState(initialCount);

  function handleTap() {
    if (count > 0) setCount(count - 1);
  }

  return (
    <div className="flex flex-col items-center">
      <div className="text-6xl font-bold mb-2">{count}</div>
      <button
        onClick={handleTap}
        className="w-32 h-32 rounded-full bg-orange-600 text-white text-2xl flex items-center justify-center shadow-lg active:scale-95 transition-transform"
      >
        Tap to drink
      </button>
    </div>
  );
}
