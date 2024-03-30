import { useState, useEffect } from "react";

function getWindowHeight() {
  const [windowHeight, setWindowHeight] = useState(undefined);

  useEffect(() => {
    function handleResize() {
      setWindowHeight(Math.floor(window.visualViewport.height));
    }

    if (typeof window !== "undefined") {
      setWindowHeight(Math.floor(window.visualViewport.height));
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, [windowHeight]);

  return windowHeight;
}

export default getWindowHeight;
