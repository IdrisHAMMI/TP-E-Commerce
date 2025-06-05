import { useEffect, useState } from "react";

export default function HomeView() {
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

    return (
        <div>
        <h1>Welcome to the Home Page!</h1>
        <p>The current time is: {time}</p>
        </div>
    );
}