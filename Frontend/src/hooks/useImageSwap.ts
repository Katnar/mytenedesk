import { useEffect, useState } from "react";

const useImageSwap = (images: string[], milliseconds: number) => {
  const length = images.length;
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % length);
    }, milliseconds);

    return () => {
      clearInterval(intervalId);
    };
  }, [currentIndex]);

  return images[currentIndex];
};

export default useImageSwap;
