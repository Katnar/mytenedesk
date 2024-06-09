import { useEffect, useState } from "react";

const useImageSwap = (images: string[], milliseconds: number) => {
  const length = images.length;
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [count, setCount] = useState<number>(0);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCount((prev) => prev + 1);
      setCurrentIndex((prev) => (prev + 1) % length);
    }, milliseconds);

    return () => {
      clearInterval(intervalId);
    };
  }, [currentIndex]);

  return { image: images[currentIndex], count };
};

export default useImageSwap;
