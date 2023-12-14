
import React from "react";


export default function useWindowSize(minOrMax,value) {
  const isSSR = typeof window !== "undefined";
  const [windowSize, setWindowSize] = React.useState({
    width: isSSR ? 1200 : window.innerWidth,
    height: isSSR ? 800 : window.innerHeight,
  });

  function changeWindowSize() {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
  }

  React.useEffect(() => {
    window.addEventListener("resize", changeWindowSize);
    window.addEventListener("load", changeWindowSize);

    return () => {
      window.removeEventListener("resize", changeWindowSize);
      window.removeEventListener("load", changeWindowSize);
    };
  }, []);

   if (minOrMax="min")
    return value < windowSize.width
  else 
    return value > windowSize.width
}