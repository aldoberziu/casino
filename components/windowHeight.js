import { useState, useEffect } from "react";

function MyComponent() {
  const [windowHeight, setWindowHeight] = useState(undefined);

  useEffect(() => {
    function handleResize() {
      setWindowHeight(window.innerHeight);
    }

    if (typeof window !== "undefined") {
      setWindowHeight(window.innerHeight);
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, [windowHeight]);

  return (
    <div>
      {typeof windowHeight !== "undefined" && <p>Window Height: {windowHeight}</p>}
      {/* Your other components */}
    </div>
  );
}

export default MyComponent;
