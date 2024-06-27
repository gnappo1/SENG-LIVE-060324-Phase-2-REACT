import { useState, useEffect } from "react";

const Timer = () => {
    console.log("Component Rendered")
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    console.log("Inside the useEffect!")
    const intervalID = setInterval(() => {
      setTimer(currentTimer => currentTimer + 1);
    }, 1000);

    return () => {
        console.log("Inside the useEffect's cleanup function!");
        clearInterval(intervalID);
    };
  }, []);

  return <div>Timer: {timer}</div>;
};

export default Timer;
