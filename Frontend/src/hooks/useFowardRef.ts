import React, { useRef, useEffect } from "react";
const useInputFowardRef = (ref: React.ForwardedRef<HTMLInputElement>) => {
  const myRef = useRef<HTMLInputElement | null>();
  useEffect(() => {
    const node = myRef.current;
    const listen = (): void => console.log("foo");

    if (node) {
      node.addEventListener("mouseover", listen);
      return () => {
        node.removeEventListener("mouseover", listen);
      };
    }
  }, [ref]);

  return {
    inputRef: myRef,
    refFunc: (node: HTMLInputElement) => {
      myRef.current = node;
      if (typeof ref === "function") {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    },
  };
};

export default useInputFowardRef;
