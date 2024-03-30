import { useEffect, useState } from "react";

function useKeyboardDetection() {
  const [isKeyboardOpened, setIsKeyboardOpened] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const windowHeight = window.innerHeight;
      setIsKeyboardOpened((prevIsKeyboardOpened) => {
        // If the window height decreases, keyboard is likely opened
        return windowHeight < window.innerHeight ? true : false;
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return isKeyboardOpened;
}

export default function KeyboardDetector() {
  const isKeyboardOpened = useKeyboardDetection();

  return <div>{isKeyboardOpened ? <p>Keyboard is opened</p> : <p>Keyboard is not opened</p>}</div>;
}
