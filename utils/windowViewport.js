import { useState, useEffect } from "react";

function getWindowViewport() {
  const [windowHeight, setWindowHeight] = useState(undefined);
  const [windowWidth, setWindowWidth] = useState(undefined);

  useEffect(() => {
    function handleResize() {
      setWindowHeight(Math.floor(window.visualViewport.height));
      setWindowWidth(Math.floor(window.visualViewport.width));
    }

    if (typeof window !== "undefined") {
      setWindowHeight(Math.floor(window.visualViewport.height));
      setWindowWidth(Math.floor(window.visualViewport.width));
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, [windowHeight, windowWidth]);

  return [windowWidth, windowHeight];
}

export default getWindowViewport;
