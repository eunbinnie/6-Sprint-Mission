import { useEffect, useState } from "react";

/**
 * S: ~ 479px,
 * M: 480px ~ 744px,
 * L: 745px ~,
 */

const getWindowSizeCategory = (width: number) => {
  if (width < 480) {
    return "S";
  } else if (width < 745) {
    return "M";
  } else {
    return "L";
  }
};

const useWindowSize = () => {
  const [windowWidth, setWindowWidth] = useState("");

  useEffect(() => {
    const event = () => {
      const width = window.innerWidth;
      const category = getWindowSizeCategory(width);
      setWindowWidth(category);
    };

    event();
    window.addEventListener("resize", event);
    return () => {
      window.removeEventListener("resize", event);
    };
  }, [windowWidth]);

  return windowWidth;
};

export default useWindowSize;
